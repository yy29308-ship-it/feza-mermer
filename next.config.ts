import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Kaynak fotoğraflar .jpg olsa bile Next bunları modern formatlara
    // dönüştürüp servis eder; ayrıca .webp'ye çevirmenize gerek yok.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
