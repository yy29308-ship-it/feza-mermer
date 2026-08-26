/* ===========================================================================
   VERİTABANI DOLDURMA (SEED)

   Katalog verisinin KAYNAĞI hâlâ src/data/*.ts dosyalarıdır — sayfalar
   oradan statik üretilir. Bu betik o veriyi veritabanına kopyalar.

   Burada elle veri YAZILMAZ; her şey mevcut dosyalardan okunur. Böylece
   galeriye fotoğraf eklediğinizde tek yapmanız gereken bu betiği yeniden
   çalıştırmaktır:   npx prisma db seed

   upsert kullanıldığı için betik defalarca çalıştırılabilir; var olan
   kayıtlar güncellenir, kopya oluşmaz.
   =========================================================================== */

import { PrismaClient } from '@prisma/client'
import { categories, projects } from '../src/data/projects'
import { services } from '../src/data/services'

const prisma = new PrismaClient()

async function main() {
  console.log('Veritabanı dolduruluyor…\n')

  // --- 1) Kategoriler -------------------------------------------------------
  for (const [i, c] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: c.id },
      update: { label: c.label, sortOrder: i },
      create: { slug: c.id, label: c.label, sortOrder: i },
    })
  }
  const categoryBySlug = new Map(
    (await prisma.category.findMany()).map((c) => [c.slug, c.id]),
  )
  console.log(`  kategori        : ${categoryBySlug.size}`)

  // --- 2) Taşlar ------------------------------------------------------------
  // Taş listesi hizmetlerdeki "stones" dizilerinden ve işlerdeki "stone"
  // alanlarından türetiliyor; ayrı bir liste tutmaya gerek yok.
  const stoneNames = new Set<string>()
  for (const s of services) s.stones.forEach((n) => stoneNames.add(n))
  for (const p of projects) if (p.stone) stoneNames.add(p.stone)

  for (const name of stoneNames) {
    await prisma.stone.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
  const stoneByName = new Map(
    (await prisma.stone.findMany()).map((s) => [s.name, s.id]),
  )
  console.log(`  taş çeşidi      : ${stoneByName.size}`)

  // --- 3) Galeri işleri -----------------------------------------------------
  for (const p of projects) {
    const categoryId = categoryBySlug.get(p.category)
    if (!categoryId) {
      console.warn(`  ! atlandı (kategori yok): ${p.id} → ${p.category}`)
      continue
    }

    const data = {
      title: p.title,
      image: p.image,
      alt: p.alt,
      location: p.location ?? null,
      featured: p.featured ?? false,
      categoryId,
      stoneId: p.stone ? (stoneByName.get(p.stone) ?? null) : null,
    }

    await prisma.project.upsert({
      where: { slug: p.id },
      update: data,
      create: { slug: p.id, ...data },
    })
  }
  console.log(`  galeri işi      : ${await prisma.project.count()}`)

  // --- 4) Hizmetler + kapsam maddeleri + taş bağları ------------------------
  for (const s of services) {
    const categoryId = categoryBySlug.get(s.id)
    if (!categoryId) {
      console.warn(`  ! atlandı (kategori yok): hizmet ${s.id}`)
      continue
    }

    const data = {
      title: s.title,
      summary: s.summary,
      body: s.body,
      image: s.image,
      alt: s.alt,
    }

    const service = await prisma.service.upsert({
      where: { categoryId },
      update: data,
      create: { categoryId, ...data },
    })

    // Kapsam maddeleri sıralı; en temizi silip yeniden yazmak.
    await prisma.serviceInclude.deleteMany({ where: { serviceId: service.id } })
    await prisma.serviceInclude.createMany({
      data: s.includes.map((text, i) => ({
        serviceId: service.id,
        text,
        sortOrder: i,
      })),
    })

    // Hizmet ↔ taş bağları
    await prisma.serviceStone.deleteMany({ where: { serviceId: service.id } })
    await prisma.serviceStone.createMany({
      data: s.stones
        .map((n) => stoneByName.get(n))
        .filter((id): id is number => typeof id === 'number')
        .map((stoneId) => ({ serviceId: service.id, stoneId })),
    })
  }
  console.log(`  hizmet          : ${await prisma.service.count()}`)
  console.log(`  kapsam maddesi  : ${await prisma.serviceInclude.count()}`)
  console.log(`  hizmet-taş bağı : ${await prisma.serviceStone.count()}`)

  console.log(
    `\nTeklif talebi tablosunda ${await prisma.contactRequest.count()} kayıt var (bu tablo seed ile doldurulmaz).`,
  )
  console.log('\nTamamlandı.')
}

main()
  .catch((e) => {
    console.error('Seed başarısız:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
