/* ===========================================================================
   HİZMETLER
   Anasayfadaki üç kart ve /hizmetler sayfası aynı bu listeden beslenir.
   Metinleri kendi işinize göre serbestçe değiştirebilirsiniz.
   =========================================================================== */

import type { Category } from './projects'

export type Service = {
  /** Galeri kategorisiyle aynı olmalı — "İşlerini gör" bağlantısı bunu kullanır. */
  id: Category
  title: string
  /** Kartlarda görünen kısa cümle. */
  summary: string
  /** /hizmetler sayfasındaki uzun anlatım. */
  body: string
  /** Madde madde kapsam. */
  includes: string[]
  /** Sık kullanılan taşlar. */
  stones: string[]
  image: string
  alt: string
}

export const services: Service[] = [
  {
    id: 'mutfak',
    title: 'Mutfak Tezgahı',
    summary:
      'Ada tezgah, tezgah arası panel ve damlalıklı evye montajı dahil, milimetrik ölçüyle hazırlanan mutfak tezgahları.',
    body:
      'Mutfak tezgahı, evin en çok yıpranan yüzeyidir. Bu yüzden hem taşın cinsi hem de işçiliği fark yaratır. Yerinde lazer ölçüyle başlıyor, CNC tezgahta kesip pahını elde perdahlıyor ve montajı kendi ekibimizle yapıyoruz. Evye ve ocak boşlukları fabrikada açılır, mutfağınızda toz çıkmaz.',
    includes: [
      'Yerinde lazer ölçü ve şablon',
      'Ada tezgah ve uzun açıklıklı tezgahlar',
      'Tezgah arası panel (arkalık)',
      'Damlalıklı ve tezgah altı evye montajı',
      'Ocak, batarya ve priz boşluklarının açılması',
      'Kenar profili seçenekleri: düz, pah kırma, yarım daire',
    ],
    stones: ['Emperador', 'Carrara', 'Silver Travertine', 'Granit Absolute Black'],
    image: '/images/services/mutfak.jpg',
    alt: 'Mermer mutfak tezgahı ve tezgah arası panel uygulaması',
  },
  {
    id: 'banyo',
    title: 'Banyo & Lavabo',
    summary:
      'Banyo tezgahı, taştan oyma lavabo, duş alanı kaplaması ve gömme niş çözümleri.',
    body:
      'Banyoda taş, sürekli suyla temas ettiği için doğru cinsi seçmek ve doğru emprenye etmek işin yarısıdır. Tezgah, lavabo, duş teknesi ve niş detaylarını aynı taştan çalışarak bütünlüklü bir görünüm elde ediyoruz. Tüm yüzeyler leke tutmaya karşı koruyucu ile kapatılarak teslim edilir.',
    includes: [
      'Banyo tezgahı ve etajer',
      'Taştan oyma (tek parça) lavabo',
      'Duş alanı zemin ve duvar kaplaması',
      'Gömme şampuanlık nişi',
      'Küvet kenarı ve denizlik',
      'Su itici koruyucu uygulaması',
    ],
    stones: ['Beige Travertine', 'Carrara', 'Calacatta', 'Toros Siyahı'],
    image: '/images/services/banyo.jpg',
    alt: 'Mermer banyo tezgahı ve taştan oyma lavabo',
  },
  {
    id: 'merdiven',
    title: 'Merdiven & Zemin',
    summary:
      'Basamak, rıht, süpürgelik, salon zemini, pencere denizliği ve kapı sövesi uygulamaları.',
    body:
      'Merdiven ve zemin, bir mekânın ilk izlenimini belirler. Basamakları tek parça çalışıyor, ön kenarına kaymayı önleyen ince kanallar açıyoruz. Geniş zeminlerde damar yönünü baştan planlayarak plakaları eşleştiriyoruz — böylece ek yerleri belli olmaz, zemin tek parça gibi görünür.',
    includes: [
      'Tek parça basamak ve rıht',
      'Kaymaz kanal açma',
      'Salon ve hol zemin kaplaması',
      'Damar eşleştirmeli plaka dizilimi',
      'Süpürgelik ve küpeşte',
      'Pencere denizliği ve kapı sövesi',
    ],
    stones: ['Marmara Beyazı', 'Muğla Beyazı', 'Limra', 'Granit'],
    image: '/images/services/merdiven.jpg',
    alt: 'Mermer merdiven basamağı ve zemin kaplaması',
  },
]

/** Anasayfada gösterilecek kısa güven maddeleri. */
export const highlights = [
  {
    title: 'Ücretsiz yerinde ölçü',
    text: 'Ekibimiz adresinize gelir, lazer ölçü alır ve aynı gün fiyat verir.',
  },
  {
    title: 'Kendi atölyemizde kesim',
    text: 'CNC ve köprü kesme tezgahlarımızla aracı olmadan üretiyoruz.',
  },
  {
    title: 'Montaj bize ait',
    text: 'Taşı taşıyan da yerine koyan da bizim ekibimiz. Sorumluluk tek elde.',
  },
]
