'use client';

import { useState } from 'react';
import WhatsAppAgentSelector from './WhatsAppAgentSelector';

function IcWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.306-1.508A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.528-5.354-1.447l-.387-.228-3.943.942.974-3.832-.252-.399A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

export default function WhatsAppContactRow({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full text-left border border-border rounded-xl px-5 py-5
          hover:border-gold/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          transition-[border-color,box-shadow] duration-300 cursor-pointer bg-transparent"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
            <IcWhatsApp />
          </div>
          <div>
            <p
              style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}
              className="font-semibold uppercase tracking-widest text-subtle mb-0.5"
            >
              WhatsApp
            </p>
            <p
              className="text-ink font-semibold leading-snug"
              style={{ fontSize: 'clamp(1.15rem, 1.2vw, 1.3rem)', lineHeight: '1.55' }}
            >
              {phone}
            </p>
          </div>
        </div>
      </button>
      <WhatsAppAgentSelector isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
