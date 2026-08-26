import { PrismaClient } from '@prisma/client'

/**
 * Tekil (singleton) Prisma istemcisi.
 *
 * Neden gerekli: Next.js geliştirme modunda her dosya kaydında modüller
 * yeniden yükleniyor. Her seferinde "new PrismaClient()" çağrılsaydı yeni bir
 * bağlantı havuzu açılır ve MySQL kısa sürede "too many connections" derdi.
 * İstemciyi globalThis üzerinde saklayarak yeniden yüklemelerde aynı örneği
 * kullanıyoruz. Yayında (production) zaten tek örnek oluşur.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
