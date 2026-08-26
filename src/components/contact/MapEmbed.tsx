import { fullAddress, mapEmbedUrl, site } from '@/data/site'

/**
 * Google Haritalar gömme çerçevesi.
 * Adres site.ts içindeki adres/koordinat alanlarından otomatik üretilir.
 */
export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-line">
      <iframe
        src={mapEmbedUrl}
        title={`${site.name} konumu — ${fullAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[380px] w-full border-0 md:h-[440px]"
      />
    </div>
  )
}
