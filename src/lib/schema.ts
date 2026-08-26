import { z } from 'zod'

/** İletişim formunun konu seçenekleri. */
export const subjects = [
  { value: 'mutfak', label: 'Mutfak tezgahı' },
  { value: 'banyo', label: 'Banyo & lavabo' },
  { value: 'merdiven', label: 'Merdiven & zemin' },
  { value: 'diger', label: 'Diğer' },
] as const

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Lütfen adınızı yazın.')
    .max(80, 'Ad çok uzun.'),

  phone: z
    .string()
    .trim()
    .min(10, 'Telefon numarası eksik görünüyor.')
    .max(20, 'Telefon numarası çok uzun.')
    .regex(/^[0-9\s()+-]+$/, 'Telefon numarası yalnızca rakam içermeli.'),

  // E-posta isteğe bağlı: boş bırakılabilir, ama yazıldıysa geçerli olmalı.
  email: z.union([
    z.literal(''),
    z.string().trim().email('Geçerli bir e-posta adresi yazın.').max(120),
  ]),

  subject: z.enum(['mutfak', 'banyo', 'merdiven', 'diger'], {
    message: 'Lütfen bir konu seçin.',
  }),

  message: z
    .string()
    .trim()
    .min(10, 'Biraz daha ayrıntı yazar mısınız? (en az 10 karakter)')
    .max(2000, 'Mesaj çok uzun.'),

  consent: z
    .string()
    .refine((v) => v === 'on', {
      message: 'Devam etmek için aydınlatma metnini onaylamanız gerekiyor.',
    }),
})

export type ContactFields = z.infer<typeof contactSchema>
export type FieldName = keyof ContactFields

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  /** Formun tepesinde gösterilecek genel mesaj. */
  message?: string
  /** Alan bazlı hatalar. */
  errors?: Partial<Record<FieldName, string>>
  /** Hata durumunda kullanıcının yazdıklarını kaybetmemek için. */
  values?: Partial<Record<FieldName, string>>
}

export const initialContactState: ContactState = { status: 'idle' }
