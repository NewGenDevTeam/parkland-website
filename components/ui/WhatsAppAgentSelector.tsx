'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SALES_AGENTS, buildAgentWhatsAppUrl } from '@/lib/salesAgents';

interface Props {
  isOpen:   boolean;
  onClose:  () => void;
  message?: string;
  mode?:    'whatsapp' | 'call';
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.306-1.508A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.528-5.354-1.447l-.387-.228-3.943.942.974-3.832-.252-.399A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
    </svg>
  );
}

export default function WhatsAppAgentSelector({
  isOpen,
  onClose,
  message,
  mode = 'whatsapp',
}: Props) {
  /* Portal mount gate — avoids SSR mismatch */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* Don't render until mounted on client, or when closed */
  if (!mounted || !isOpen) return null;

  const isCall   = mode === 'call';
  const title    = isCall ? 'Choose Sales Agent to Call'            : 'Choose Sales Agent on WhatsApp';
  const subtitle = isCall ? 'Select a sales agent to call directly' : 'Select a sales agent to continue on WhatsApp';

  /*
   * createPortal renders the modal directly under document.body,
   * escaping any CSS stacking context created by parent transforms
   * (e.g. Framer Motion Reveal wrappers on the contact column).
   */
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Full-screen dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — bottom sheet on mobile, centered card on desktop */}
      <div
        className="
          relative z-10
          w-full md:w-130
          bg-white
          rounded-t-2xl md:rounded-2xl
          shadow-[0_24px_64px_rgba(0,0,0,0.30)]
          flex flex-col
          max-h-[80vh] md:max-h-[80vh]
        "
      >
        {/* Mobile drag handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border md:hidden" />

        {/* Header — fixed at top, never scrolls */}
        <div className="shrink-0 flex items-start justify-between px-6 pt-7 pb-4 border-b border-border">
          <div>
            <p
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)', letterSpacing: '-0.02em' }}
            >
              {title}
            </p>
            <p className="text-subtle mt-1" style={{ fontSize: 'clamp(0.875rem, 0.9vw, 0.9375rem)' }}>
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-4 shrink-0 w-8 h-8 rounded-full bg-[#F5F3F0]
              flex items-center justify-center
              text-ink/50 hover:text-ink hover:bg-[#EBEBEB]
              transition-colors duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* Agent list — scrolls independently inside the modal */}
        <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-border">
          {SALES_AGENTS.map((agent) => {
            const href = isCall
              ? `tel:+${agent.whatsappPhone}`
              : buildAgentWhatsAppUrl(agent.whatsappPhone, message);
            return (
              <a
                key={agent.whatsappPhone}
                href={href}
                target={isCall ? undefined : '_blank'}
                rel={isCall ? undefined : 'noopener noreferrer'}
                onClick={onClose}
                className="flex items-center justify-between px-6 py-4
                  hover:bg-[#FAFAF8] transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isCall ? '#C8A97E' : '#25D366' }}
                  />
                  <div>
                    <p className="font-semibold text-ink leading-snug"
                      style={{ fontSize: 'clamp(1rem, 1.05vw, 1.1rem)' }}>
                      {agent.name}
                    </p>
                    <p className="text-subtle" style={{ fontSize: 'clamp(0.875rem, 0.9vw, 0.9375rem)' }}>
                      {agent.displayPhone}
                    </p>
                  </div>
                </div>

                {isCall ? (
                  <span
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-2
                      rounded-lg text-white font-semibold
                      group-hover:opacity-90 transition-opacity duration-200"
                    style={{
                      fontSize: 'clamp(0.8125rem, 0.85vw, 0.875rem)',
                      backgroundColor: '#C8A97E',
                    }}
                  >
                    <PhoneIcon />
                    Call Now
                  </span>
                ) : (
                  <span
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-2
                      rounded-lg bg-[#25D366] text-white font-semibold
                      group-hover:bg-[#20BC5A] transition-colors duration-200"
                    style={{ fontSize: 'clamp(0.8125rem, 0.85vw, 0.875rem)' }}
                  >
                    <WaIcon />
                    Chat Now
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Bottom safe-area padding for mobile home-bar */}
        <div className="shrink-0 h-5 md:h-3" />
      </div>
    </div>,
    document.body,
  );
}
