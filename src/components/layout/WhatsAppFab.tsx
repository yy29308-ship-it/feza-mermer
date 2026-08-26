import { whatsappUrl } from '@/data/site'

/** Her sayfada sağ altta duran sabit WhatsApp butonu. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform duration-200 hover:scale-105 md:bottom-8 md:right-8"
    >
      <span className="sr-only">WhatsApp ile yazın</span>
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 18.15h-.01a8.26 8.26 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.39c0-4.56 3.71-8.27 8.27-8.27a8.2 8.2 0 0 1 5.84 2.42 8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.71 8.25-8.27 8.25Zm4.53-6.18c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.19-.54.06a6.8 6.8 0 0 1-2-1.23 7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    </a>
  )
}
