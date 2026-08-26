/* ===========================================================================
   YAPILAN İŞLER (GALERİ)

   Buradaki fotoğrafların hepsi Feza Mermer'in kendi uyguladığı işlerdir.

   YENİ İŞ EKLEMEK İÇİN 2 ADIM:
   1) Fotoğrafı  public/images/projects/  klasörüne kopyalayın.
   2) Aşağıdaki listeye bir satır ekleyin (var olanlardan birini kopyalayıp
      değiştirmek en kolayı).

   Fotoğraf ipuçları:
   - Yatay çekin, en az 1600 piksel genişlik olsun.
   - .jpg olarak kaydetmeniz yeterli; site otomatik sıkıştırıp hızlandırır.
   - "featured: true" yazdıklarınız anasayfada da görünür (6 tanesi yeterli).
   - "alt" metnini boş bırakmayın: Google sizi bu metinden bulur.

   NOT: "stone" (taşın cinsi) ve "location" (işin yeri) alanları isteğe bağlı.
   Hangi işte hangi taşı kullandığınızı ve işin nerede yapıldığını yazarsanız
   fotoğrafın altında görünür ve Google'da yerel aramada işe yarar.
   Örnek:  stone: 'Calacatta',  location: 'Kepez / Çanakkale',
   =========================================================================== */

export type Category = 'mutfak' | 'banyo' | 'merdiven' | 'duvar'

export type Project = {
  id: string
  title: string
  category: Category
  image: string
  /** Görme engelli okuyucular ve Google için fotoğrafın tarifi. */
  alt: string
  /** Kullanılan taşın adı. */
  stone?: string
  /** İşin yapıldığı yer. */
  location?: string
  /** Anasayfada gösterilsin mi? */
  featured?: boolean
}

/** Filtre butonlarının etiketleri ve sırası. */
export const categories: { id: Category; label: string }[] = [
  { id: 'mutfak', label: 'Mutfak Tezgahı' },
  { id: 'banyo', label: 'Banyo & Lavabo' },
  { id: 'merdiven', label: 'Merdiven & Zemin' },
  { id: 'duvar', label: 'Duvar Kaplama' },
]

export const projects: Project[] = [
  // --- Mutfak tezgahı ------------------------------------------------------
  {
    id: 'mutfak-01',
    title: 'Ada tezgahlı geniş mutfak',
    category: 'mutfak',
    image: '/images/projects/mutfak-01.jpg',
    alt: 'Beyaz damarlı mermer ada tezgah, aynı taştan tezgah arası panel ve U şeklinde mutfak tezgahı',
    featured: true,
  },
  {
    id: 'mutfak-02',
    title: 'Yandan inen bar tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-02.jpg',
    alt: 'Altın damarlı beyaz mermerden bar tezgah, yan yüzü yere kadar inen tek parça kaplama',
  },
  {
    id: 'mutfak-03',
    title: 'L tezgah ve tezgah altı evye',
    category: 'mutfak',
    image: '/images/projects/mutfak-03.jpg',
    alt: 'Beyaz mermer L mutfak tezgahı, pencere önünde tezgah altı paslanmaz evye',
  },
  {
    id: 'mutfak-04',
    title: 'Tezgah ve tam boy arkalık',
    category: 'mutfak',
    image: '/images/projects/mutfak-04.jpg',
    alt: 'Mermer mutfak tezgahı ve dolap altına kadar uzanan tam boy tezgah arası panel',
  },
  {
    id: 'mutfak-05',
    title: 'Damar eşleştirmeli tezgah arası',
    category: 'mutfak',
    image: '/images/projects/mutfak-05.jpg',
    alt: 'Tezgahla arkalığın damarları eşleştirilmiş beyaz mermer mutfak uygulaması',
  },
  {
    id: 'mutfak-06',
    title: 'Uzun açıklıklı düz tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-06.jpg',
    alt: 'Tek parça uzun mermer mutfak tezgahı ve gömme evye montajı',
  },
  {
    id: 'mutfak-07',
    title: 'Klasik mutfakta altın damarlı tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-07.jpg',
    alt: 'Beyaz klasik mutfak dolaplarıyla altın damarlı mermer tezgah ve arkalık',
  },
  {
    id: 'mutfak-08',
    title: 'Pencere önü peninsula tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-08.jpg',
    alt: 'Pencere önünden devam eden mermer peninsula tezgah ve yan kaplaması',
  },
  {
    id: 'mutfak-09',
    title: 'Köşe dönüşlü mutfak tezgahı',
    category: 'mutfak',
    image: '/images/projects/mutfak-09.jpg',
    alt: 'Köşe dönüşü eksiz çalışılmış mermer mutfak tezgahı ve evye boşluğu',
  },
  {
    id: 'mutfak-10',
    title: 'Ocak ve evye boşluklu tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-10.jpg',
    alt: 'Ankastre ocak ve evye boşlukları açılmış beyaz mermer mutfak tezgahı',
  },
  {
    id: 'mutfak-11',
    title: 'Damlalıklı evye ve tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-11.jpg',
    alt: 'Damlalık kanalı açılmış mermer mutfak tezgahı ve tezgah altı evye',
  },
  {
    id: 'mutfak-12',
    title: 'Ahşap dolapla beyaz tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-12.jpg',
    alt: 'Ahşap desenli mutfak dolaplarıyla beyaz mermer tezgah ve uzatma raf',
  },
  {
    id: 'mutfak-13',
    title: 'Siyah granit tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-13.jpg',
    alt: 'Beyaz klasik mutfak dolaplarıyla siyah granit tezgah ve tezgah altı lavabo',
  },
  {
    id: 'mutfak-14',
    title: 'Gömme evyeli beyaz tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-14.jpg',
    alt: 'Beyaz mermer mutfak tezgahına açılmış dikdörtgen evye boşluğu ve aynı taştan tam boy tezgah arası panel',
  },
  {
    id: 'mutfak-15',
    title: 'Tam boy mermer arkalık',
    category: 'mutfak',
    image: '/images/projects/mutfak-15.jpg',
    alt: 'Gri damarlı beyaz mermer tezgah ve dolap altına kadar uzanan tam boy tezgah arası panel',
  },
  {
    id: 'mutfak-16',
    title: 'Ankastre ocaklı düz tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-16.jpg',
    alt: 'Krem mutfak dolaplarıyla beyaz mermer tezgah, ankastre ocak boşluğu ve mermer arkalık',
  },
  {
    id: 'mutfak-17',
    title: 'Zeytin yeşili dolapla mermer tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-17.jpg',
    alt: 'Parlak zeytin yeşili alt dolaplarla beyaz damarlı mermer mutfak tezgahı ve tezgah arası panel',
  },
  {
    id: 'mutfak-18',
    title: 'Yandan inen ada tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-18.jpg',
    alt: 'Pencere önünde beyaz mermer ada tezgah, yan yüzü yere kadar inen tek parça kaplama',
  },
  {
    id: 'mutfak-19',
    title: 'Altın damarlı L tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-19.jpg',
    alt: 'Beyaz klasik kapaklı mutfakta altın damarlı mermer L tezgah, ocak ve evye boşlukları açılmış',
    featured: true,
  },
  {
    id: 'mutfak-20',
    title: 'Pencere önü evye tezgahı',
    category: 'mutfak',
    image: '/images/projects/mutfak-20.jpg',
    alt: 'Pencere önüne yerleştirilmiş evyeli beyaz mermer mutfak tezgahı ve gri üst dolaplar',
  },
  {
    id: 'mutfak-21',
    title: 'Ocak ve evye boşluklu tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-21.jpg',
    alt: 'Beyaz mutfak dolaplarıyla açık renk mermer tezgah, ankastre ocak ve gömme evye boşlukları',
  },
  {
    id: 'mutfak-22',
    title: 'Uzun düz mutfak tezgahı',
    category: 'mutfak',
    image: '/images/projects/mutfak-22.jpg',
    alt: 'Beyaz klasik mutfak dolapları üzerinde tek parça uzun mermer tezgah ve gömme evye',
  },
  {
    id: 'mutfak-23',
    title: 'Yuvarlak evye boşluklu tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-23.jpg',
    alt: 'Beyaz mermer mutfak tezgahına açılmış yuvarlak evye boşluğu, mermer arkalık ve davlumbaz',
  },
  {
    id: 'mutfak-24',
    title: 'Damlalıklı tek parça evye',
    category: 'mutfak',
    image: '/images/projects/mutfak-24.jpg',
    alt: 'Beyaz mermerden oyulmuş tek parça mutfak evyesi ve tezgaha açılmış damlalık kanalları, yakın çekim',
  },
  {
    id: 'mutfak-25',
    title: 'Pencere önü ada tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-25.jpg',
    alt: 'Geniş pencereli mutfakta beyaz mermer ada tezgah ve yan yüzü yere inen kaplama',
  },
  {
    id: 'mutfak-26',
    title: 'Ahşap dolapla beyaz tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-26.jpg',
    alt: 'Ahşap desenli alt dolaplarla beyaz mermer L mutfak tezgahı ve mermer zemin',
  },
  {
    id: 'mutfak-27',
    title: 'Siyah tezgah, beyaz dolap',
    category: 'mutfak',
    image: '/images/projects/mutfak-27.jpg',
    alt: 'Beyaz klasik mutfak dolaplarıyla siyah taş tezgah ve oval lavabo boşluğu',
  },
  {
    id: 'mutfak-28',
    title: 'Çift evyeli uzun tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-28.jpg',
    alt: 'Gri mutfak dolapları üzerinde iki evye boşluğu açılmış uzun beyaz mermer tezgah ve arkalık',
  },
  {
    id: 'mutfak-29',
    title: 'Damar eşleştirmeli mutfak',
    category: 'mutfak',
    image: '/images/projects/mutfak-29.jpg',
    alt: 'Tezgahla arkalığın damarları eşleştirilmiş beyaz mermer mutfak, ankastre ocak montajlı',
  },
  {
    id: 'mutfak-30',
    title: 'Calacatta ada tezgahlı mutfak',
    category: 'mutfak',
    image: '/images/projects/mutfak-30.jpg',
    alt: 'Zeytin yeşili dolaplı geniş mutfakta calacatta mermer ada tezgah, U şeklinde tezgah ve tam boy arkalık',
    featured: true,
  },
  {
    id: 'mutfak-31',
    title: 'Çay ocağı tezgahı',
    category: 'mutfak',
    image: '/images/projects/mutfak-31.jpg',
    alt: 'Beyaz dolaplar üzerinde gri granit çay ocağı tezgahı ve yuvarlak evye boşluğu',
  },
  {
    id: 'mutfak-32',
    title: 'Siyah mermer tezgah ve arkalık',
    category: 'mutfak',
    image: '/images/projects/mutfak-32.jpg',
    alt: 'Atölyede hazırlanmış beyaz damarlı siyah mermer mutfak tezgahı, gömme evye ve tek parça arkalık',
  },
  {
    id: 'mutfak-33',
    title: 'Uzun siyah tezgah',
    category: 'mutfak',
    image: '/images/projects/mutfak-33.jpg',
    alt: 'Tek parça uzun siyah mermer mutfak tezgahı, gömme evye ve aynı taştan arkalık',
  },

  // --- Banyo & lavabo ------------------------------------------------------
  {
    id: 'banyo-01',
    title: 'Tezgahtan oyma banyo lavabosu',
    category: 'banyo',
    image: '/images/projects/banyo-01.jpg',
    alt: 'Mermer banyo tezgahına oyulmuş köşeli lavabo, aynı taştan arkalık ve yan bordür',
    featured: true,
  },
  {
    id: 'banyo-02',
    title: 'Banyo tezgahı ve gömme lavabo',
    category: 'banyo',
    image: '/images/projects/banyo-02.jpg',
    alt: 'Uzun mermer banyo tezgahı, tezgah altı oval lavabo ve arkalık kaplaması',
  },
  {
    id: 'banyo-03',
    title: 'Taştan oyma eğimli lavabo',
    category: 'banyo',
    image: '/images/projects/banyo-03.jpg',
    alt: 'Gri mermerden tek parça oyulmuş eğimli banyo lavabosu, duvardan çıkan krom batarya ve aynı taştan tezgah',
  },
  {
    id: 'banyo-04',
    title: 'Sıra lavabo tezgahı',
    category: 'banyo',
    image: '/images/projects/banyo-04.jpg',
    alt: 'Toplu kullanım alanında L şeklinde uzanan traverten tezgah ve arka arkaya yerleştirilmiş yedi gömme lavabo',
  },

  // --- Merdiven & zemin ----------------------------------------------------
  {
    id: 'merdiven-01',
    title: 'Siyah damarlı mermer merdiven',
    category: 'merdiven',
    image: '/images/projects/merdiven-01.jpg',
    alt: 'Siyah damarlı beyaz mermerden tek parça basamak ve rıhtlarla döşenmiş iç mekan merdiveni',
    featured: true,
  },
  {
    id: 'merdiven-02',
    title: 'Tek parça basamak ve rıht',
    category: 'merdiven',
    image: '/images/projects/merdiven-02.jpg',
    alt: 'Montajı süren beyaz mermer merdiven, tek parça basamaklar ve küpeşte boşluğu',
  },
  {
    id: 'merdiven-03',
    title: 'Dış mekan taş merdiven',
    category: 'merdiven',
    image: '/images/projects/merdiven-03.jpg',
    alt: 'Bahçe girişinde gri doğal taştan dış mekan merdiveni ve yan süpürgelik',
  },
  {
    id: 'merdiven-04',
    title: 'Damar eşleştirmeli zemin',
    category: 'merdiven',
    image: '/images/projects/merdiven-04.jpg',
    alt: 'Gri mermer zemin plakalarının damar yönü eşleştirilerek dizilmesi',
  },
  {
    id: 'merdiven-05',
    title: 'Bahçe yolu taş kaplama',
    category: 'merdiven',
    image: '/images/projects/merdiven-05.jpg',
    alt: 'Bina kenarında traverten plakalarla döşenmiş dış mekan yürüme yolu',
  },

  // --- Duvar kaplama -------------------------------------------------------
  {
    id: 'duvar-01',
    title: 'Salon televizyon duvarı',
    category: 'duvar',
    image: '/images/projects/duvar-01.jpg',
    alt: 'Salonda damar eşleştirmeli mermer plakalarla kaplanmış televizyon duvarı ve gömme televizyon nişi',
    featured: true,
  },
]

/** Anasayfadaki "Öne çıkan işler" bölümü — en fazla 6 tane. */
export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6)

/** Belirli bir kategorideki işler. */
export function projectsByCategory(category: Category | 'tumu') {
  return category === 'tumu'
    ? projects
    : projects.filter((p) => p.category === category)
}
