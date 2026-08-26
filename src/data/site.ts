/* ===========================================================================
   İŞLETME BİLGİLERİ — sitenin tamamı bu dosyadan besleniyor.
   Telefon, adres, e-posta değişirse SADECE burayı düzenleyin;
   header, footer, iletişim sayfası ve Google kaydı otomatik güncellenir.

   >>> "TODO" yazan satırları kendi bilgilerinizle değiştirin. <<<
   =========================================================================== */

export const site = {
  /** Tam ticari ünvan. Sekme başlığında ve Google'da görünür. */
  name: 'Feza Mermer',

  /** Logonun altında / başlıkta geçen kısa slogan. */
  tagline: 'Taşın en zarif hali',

  /** Google arama sonucunda görünen açıklama. 150-160 karakter idealdir. */
  description:
    'Çanakkale Kepez Sanayi\'de mermer ve granit atölyesi. Mutfak tezgahı, banyo tezgahı, lavabo ve zemin uygulamalarında ölçüden montaja kadar tek elden işçilik.',

  /** Kuruluş yılı — "X yıllık tecrübe" rakamı bundan hesaplanır. */
  foundedYear: 2005, // TODO: gerçek kuruluş yılını yazın

  /* --- İletişim ---------------------------------------------------------- */

  /** Ekranda görünen telefon numarası. */
  phoneDisplay: '0536 810 68 43',
  /** Tıklanınca aranacak hali — boşluksuz, +90 ile. */
  phoneHref: '+905368106843',

  /** WhatsApp numarası — başında + YOK, boşluk YOK. */
  whatsapp: '905368106843',
  /** WhatsApp'a tıklayınca kutuya hazır gelecek mesaj. */
  whatsappMessage: 'Merhaba, mermer işi hakkında bilgi almak istiyorum.',

  email: 'feza.mermer@hotmail.com',

  address: {
    street: 'Muhtar Uzun Ahmed Caddesi, Hızarcılar Sokak No: 53',
    district: 'Kepez',
    city: 'Çanakkale',
    postalCode: '', // TODO: posta kodunuzu yazın — boş bırakırsanız hiç görünmez
    country: 'TR',
  },

  /**
   * Haritadaki KESİN konum. Doldurulursa harita tam bu noktayı gösterir;
   * boş bırakılırsa aşağıdaki adres yazısına göre tahmini konum gösterilir.
   *
   * Nasıl alınır (30 saniye):
   *   1. Google Haritalar'ı açın, atölyenizin tam üstüne SAĞ TIKLAYIN
   *   2. Çıkan menüde en üstteki sayı çiftine tıklayın (ör. 40.146829, 26.409214)
   *      — tıklayınca panoya kopyalanır
   *   3. Aşağıya olduğu gibi yapıştırın:  coordinates: '40.146829, 26.409214',
   *
   * Adres yazısıyla bulunan konum sokak numarasına kadar isabetli olmayabilir;
   * pin'in yeri önemliyse burayı doldurun.
   */
  coordinates: '', // TODO: yukarıdaki 3 adımla alıp yapıştırın

  /**
   * Çalışma saatleri — iletişim sayfasında, footer'da ve Google kaydında görünür.
   *
   * Gün adlarını Türkçe ve tam yazın ("Pazartesi - Cumartesi" gibi); Google'a
   * gönderilen kayıt bu yazımdan otomatik üretiliyor (bkz. lib/jsonld.ts).
   * Kapalı günler için saat yerine "Kapalı" yazmanız yeterli.
   */
  openingHours: [
    { days: 'Pazartesi - Cumartesi', hours: '09:00 - 18:00' },
    { days: 'Pazar', hours: 'Kapalı' },
  ],

  /** Sosyal medya — kullanmadığınızı boş bırakın (''), otomatik gizlenir. */
  social: {
    instagram: '', // örn: 'https://instagram.com/fezamermer'
    facebook: '',
  },

  /** Hizmet verilen bölgeler — Google'da yerel aramada işe yarar. */
  serviceAreas: [
    'Çanakkale',
    'Kepez',
    'Lapseki',
    'Çan',
    'Biga',
    'Ezine',
  ], // TODO: gerçekten iş aldığınız ilçelere göre düzenleyin
} as const

/** WhatsApp sohbetini hazır mesajla açan bağlantı. */
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`

/**
 * WhatsApp numarasının okunabilir hali: 905368106843 -> 0536 810 68 43
 *
 * Ekranda yazan numarayı doğrudan `site.whatsapp` alanından üretiyoruz.
 * Böylece WhatsApp numarasını değiştirdiğinizde ekrandaki yazı da
 * kendiliğinden değişir — "yazan numara" ile "açılan numara" asla ayrışmaz.
 */
export const whatsappDisplay = (() => {
  const local = site.whatsapp.replace(/^90/, '')
  // Beklenmedik bir format girilirse uydurmak yerine telefon numarasını göster.
  if (!/^\d{10}$/.test(local)) return site.phoneDisplay
  return `0${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8)}`
})()

/** Tek satır halinde tam adres. */
export const fullAddress = `${site.address.street}, ${site.address.district} / ${site.address.city}`

/**
 * İletişim sayfasındaki harita çerçevesinin adresi.
 *
 * Adresten otomatik üretilir — site.address alanını değiştirdiğinizde harita
 * da kendiliğinden oraya kayar, ayrıca bir yeri düzeltmeniz gerekmez.
 * site.coordinates doluysa tahmin yerine tam o nokta gösterilir.
 */
export const mapEmbedUrl = site.coordinates
  ? `https://www.google.com/maps?q=${encodeURIComponent(site.coordinates)}&z=17&output=embed`
  : `https://www.google.com/maps?q=${encodeURIComponent(
      `${site.name}, ${fullAddress}`,
    )}&z=16&output=embed`

/** Bugüne göre kaç yıllık tecrübe olduğu. */
export const yearsOfExperience = new Date().getFullYear() - site.foundedYear

/** Sitenin canlı adresi — sitemap ve paylaşım önizlemeleri için. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fezamermer.com'
).replace(/\/$/, '')

/** Header ve footer'daki menü. */
export const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/iletisim', label: 'İletişim' },
] as const