import { fullAddress, site, whatsappDisplay, whatsappUrl } from '@/data/site'

/** Telefon, WhatsApp, e-posta, adres ve çalışma saatleri kartı. */
export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <a
          href={`tel:${site.phoneHref}`}
          className="flex items-center gap-4 rounded-sm border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
        >
          <PhoneIcon />
          <span>
            <span className="block text-xs uppercase tracking-[0.14em] text-muted">
              Telefon
            </span>
            <span className="text-lg">{site.phoneDisplay}</span>
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-sm border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
        >
          <WhatsAppIcon />
          <span>
            <span className="block text-xs uppercase tracking-[0.14em] text-muted">
              WhatsApp
            </span>
            <span className="block text-lg">{whatsappDisplay}</span>
            <span className="block text-sm text-muted">
              Fotoğraf gönderin, fiyat verelim
            </span>
          </span>
        </a>

        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-4 rounded-sm border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
        >
          <MailIcon />
          <span>
            <span className="block text-xs uppercase tracking-[0.14em] text-muted">
              E-posta
            </span>
            <span className="text-lg break-all">{site.email}</span>
          </span>
        </a>
      </div>

      <div>
        <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Adres
        </h2>
        <address className="mt-3 not-italic">
          {fullAddress}
          {site.address.postalCode && (
            <>
              <br />
              {site.address.postalCode} {site.address.city}
            </>
          )}
        </address>
      </div>

      <div>
        <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Çalışma Saatleri
        </h2>
        <ul className="mt-3 space-y-2">
          {site.openingHours.map((o) => (
            <li key={o.days} className="flex justify-between gap-6 border-b border-line pb-2">
              <span className="text-muted">{o.days}</span>
              <span>{o.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Hizmet Bölgeleri
        </h2>
        <p className="mt-3 text-muted">{site.serviceAreas.join(' · ')}</p>
      </div>
    </div>
  )
}

const iconClass = 'h-6 w-6 shrink-0 text-accent'

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm4.53 12.97c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.19-.54.06a6.8 6.8 0 0 1-2-1.23 7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}
