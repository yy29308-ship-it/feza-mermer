'use server'

import { Resend } from 'resend'
import { site } from '@/data/site'
import { prisma } from './prisma'
import {
  contactSchema,
  subjects,
  type ContactState,
  type FieldName,
} from './schema'

/**
 * Talebi veritabanına kaydeder ve kaydın id'sini döndürür.
 *
 * Hata durumunda ATMAZ, null döner. Gerekçe: veritabanı erişilemez olsa bile
 * formun çalışmaya ve e-posta göndermeye devam etmesi gerekir. Veritabanı bu
 * akışta bir güvence katmanıdır, tek nokta arıza hâline gelmemelidir.
 */
async function saveRequest(data: {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}): Promise<number | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: data.subject },
      select: { id: true },
    })

    const record = await prisma.contactRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
        // "diger" seçeneğinin karşılığı bir kategori değil; boş bırakılır.
        categoryId: category?.id ?? null,
      },
      select: { id: true },
    })

    return record.id
  } catch (err) {
    console.error('[iletisim] Talep veritabanına yazılamadı:', err)
    return null
  }
}

/** Kaydın e-posta durumunu damgalar. Hata olursa sessizce geçer. */
async function markEmail(id: number | null, sent: boolean, error?: string) {
  if (id === null) return
  try {
    await prisma.contactRequest.update({
      where: { id },
      data: { emailSent: sent, emailError: error ?? null },
    })
  } catch (err) {
    console.error('[iletisim] E-posta durumu güncellenemedi:', err)
  }
}

/**
 * Form gösterilsin mi? İletişim sayfası buna bakar.
 *
 * İki yoldan biri yeterli:
 *   - E-posta yapılandırılmışsa talep mail olarak gider,
 *   - Veritabanı erişilebilirse talep kaydedilir ve işletme sonradan görür.
 *
 * İkisi de yoksa form gösterilmez; yarım çalışan bir form (müşteri doldurur,
 * mesaj hiçbir yere gitmez) hiç olmamasından kötüdür.
 */
export async function isContactFormEnabled() {
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) return true

  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
    consent: String(formData.get('consent') ?? ''),
  }

  // --- Spam savunması -------------------------------------------------------
  // 1) Bal küpü: insanlara görünmeyen alan. Doluysa gönderen bir bottur.
  // 2) Süre: form açıldıktan 3 saniyeden kısa sürede gönderildiyse bottur.
  // İkisinde de bota "başarılı" diyoruz; böylece hangi kurala takıldığını öğrenemez.
  const honeypot = String(formData.get('website') ?? '')
  const openedAt = Number(formData.get('openedAt') ?? 0)
  const tooFast = openedAt > 0 && Date.now() - openedAt < 3000

  if (honeypot.length > 0 || tooFast) {
    return { status: 'success', message: 'Mesajınız alındı.' }
  }

  // --- Doğrulama ------------------------------------------------------------
  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    const errors: Partial<Record<FieldName, string>> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as FieldName | undefined
      if (field && !errors[field]) errors[field] = issue.message
    }

    return {
      status: 'error',
      message: 'Lütfen işaretli alanları kontrol edin.',
      errors,
      values: raw,
    }
  }

  const data = parsed.data
  const subjectLabel =
    subjects.find((s) => s.value === data.subject)?.label ?? data.subject

  // --- Kayıt ----------------------------------------------------------------
  // Talep e-postadan ÖNCE kaydedilir. Böylece mail servisi çökse, kutu dolsa
  // ya da mesaj spam'e düşse bile talep kaybolmaz.
  const requestId = await saveRequest(data)

  // --- Gönderim -------------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!apiKey || !to) {
    await markEmail(requestId, false, 'E-posta servisi yapılandırılmamış')

    // Talep kaydedilebildiyse müşteriye "kayboldu" hissi vermeyelim.
    if (requestId !== null) {
      return {
        status: 'success',
        message:
          'Talebiniz bize ulaştı. En kısa sürede size dönüş yapacağız.',
      }
    }

    // Yapılandırma eksikse kullanıcıyı boşuna bekletmeyelim, alternatif sunalım.
    return {
      status: 'error',
      message: `Form şu anda gönderilemiyor. Lütfen bizi ${site.phoneDisplay} numarasından arayın veya WhatsApp'tan yazın.`,
      values: raw,
    }
  }

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: `${site.name} Web Sitesi <${from}>`,
      to: [to],
      replyTo: data.email || undefined,
      subject: `Yeni teklif talebi — ${subjectLabel} (${data.name})`,
      text: [
        `Konu     : ${subjectLabel}`,
        `Ad Soyad : ${data.name}`,
        `Telefon  : ${data.phone}`,
        `E-posta  : ${data.email || '—'}`,
        '',
        'Mesaj:',
        data.message,
        '',
        `Gönderim: ${new Date().toLocaleString('tr-TR')}`,
      ].join('\n'),
    })

    if (error) {
      console.error('[iletisim] Resend hatası:', error)
      await markEmail(requestId, false, String(error.message ?? error))

      // Mail gitmedi ama talep kayıtlıysa müşteri açısından sorun yok:
      // işletme kaydı veritabanında görecek.
      if (requestId !== null) {
        return {
          status: 'success',
          message: 'Talebiniz bize ulaştı. En kısa sürede size dönüş yapacağız.',
        }
      }

      return {
        status: 'error',
        message: `Mesaj gönderilemedi. Lütfen ${site.phoneDisplay} numarasından arayın.`,
        values: raw,
      }
    }

    await markEmail(requestId, true)
  } catch (err) {
    console.error('[iletisim] Beklenmeyen hata:', err)
    await markEmail(requestId, false, err instanceof Error ? err.message : String(err))

    if (requestId !== null) {
      return {
        status: 'success',
        message: 'Talebiniz bize ulaştı. En kısa sürede size dönüş yapacağız.',
      }
    }

    return {
      status: 'error',
      message: `Mesaj gönderilemedi. Lütfen ${site.phoneDisplay} numarasından arayın.`,
      values: raw,
    }
  }

  return {
    status: 'success',
    message: 'Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.',
  }
}
