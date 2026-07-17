'use client';

import { useState } from 'react';
import WhatsAppAgentSelector from '@/components/ui/WhatsAppAgentSelector';

const UNIT_OPTIONS = [
  { value: 'type-a', label: 'Type A — 562 sqft (1 Bed)' },
  { value: 'type-b', label: 'Type B — 820 sqft (2 Bed)' },
  { value: 'type-c', label: 'Type C — 1,020 sqft (3 Bed)' },
  { value: 'unsure', label: 'Not Sure Yet' },
];

const FIELD_CLASS = `
  w-full border border-border rounded-xl px-[1.15rem] py-[1.05rem]
  text-[1.175rem] text-ink placeholder:text-muted placeholder:text-[1.05rem] bg-white
  focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20
  transition-colors duration-200
`.trim();

const LABEL_CLASS = 'block text-[1.125rem] font-semibold text-ink mb-2 leading-snug';

type Fields = {
  name:    string;
  phone:   string;
  email:   string;
  unit:    string;
  message: string;
};
const EMPTY: Fields = { name: '', phone: '', email: '', unit: '', message: '' };

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4 text-muted pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
      aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.306-1.508A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.528-5.354-1.447l-.387-.228-3.943.942.974-3.832-.252-.399A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function SuccessBox({ name, onSelectAgent }: { name: string; onSelectAgent: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-8
      border border-border rounded-2xl bg-[#FAFAF8]"
    >
      {/* Check circle */}
      <div className="w-16 h-16 rounded-full border border-gold/40 bg-gold/8
        flex items-center justify-center mb-6 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          className="w-7 h-7 text-gold" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      {/* Heading */}
      <p className="section-label-on-light mb-4">Interest Received</p>
      <h3
        className="font-display font-bold text-ink mb-4 leading-tight"
        style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', letterSpacing: '-0.025em' }}
      >
        {name ? `Thank you, ${name.split(' ')[0]}.` : 'Thank you.'}
      </h3>

      {/* Divider */}
      <div className="w-10 h-px bg-gold/40 mb-5" />

      {/* Description */}
      <p className="text-body leading-relaxed max-w-sm mb-6"
        style={{ fontSize: 'clamp(1rem, 1.05vw, 1.125rem)', lineHeight: '1.75' }}
      >
        Your enquiry has been prepared successfully.{' '}
        <span className="text-ink font-medium">Choose a sales agent below</span>{' '}
        to send your message on WhatsApp.
      </p>

      <button
        onClick={onSelectAgent}
        className="btn-base btn-primary flex items-center gap-2 cursor-pointer"
        style={{ fontSize: 'clamp(1rem, 1.05vw, 1.1rem)' }}
      >
        <WaIcon />
        Choose Sales Agent
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [fields,     setFields]     = useState<Fields>(EMPTY);
  const [submitted,  setSubmitted]  = useState(false);
  const [pendingMsg, setPendingMsg] = useState('');
  const [agentOpen,  setAgentOpen]  = useState(false);
  const [accepted,   setAccepted]   = useState(false);

  const set = (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || !accepted) return;

    const unitLabel = UNIT_OPTIONS.find(o => o.value === fields.unit)?.label || fields.unit;
    const text = [
      'Hi Parkland By The River, I would like to register my interest.',
      '',
      `Full Name: ${fields.name}`,
      `Phone Number: ${fields.phone}`,
      `Email Address: ${fields.email}`,
      `Preferred Unit Type: ${unitLabel}`,
      `Message: ${fields.message.trim() || 'N/A'}`,
      '',
      'Please contact me for more information.',
    ].join('\n');

    setPendingMsg(text);
    setSubmitted(true);
    setAgentOpen(true);
    setAccepted(false);
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <>
        <SuccessBox name={fields.name} onSelectAgent={() => setAgentOpen(true)} />
        <WhatsAppAgentSelector
          isOpen={agentOpen}
          onClose={() => setAgentOpen(false)}
          message={pendingMsg}
        />
      </>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Full Name */}
      <div>
        <label htmlFor="cf-name" className={LABEL_CLASS}>
          Full Name <span className="text-gold">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={fields.name}
          onChange={set('name')}
          className={FIELD_CLASS}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cf-phone" className={LABEL_CLASS}>
          Phone Number <span className="text-gold">*</span>
        </label>
        <input
          id="cf-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. 012-345 6789"
          value={fields.phone}
          onChange={set('phone')}
          className={FIELD_CLASS}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={LABEL_CLASS}>
          Email Address <span className="text-gold">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={fields.email}
          onChange={set('email')}
          className={FIELD_CLASS}
        />
      </div>

      {/* Unit type */}
      <div>
        <label htmlFor="cf-unit" className={LABEL_CLASS}>
          Preferred Unit Type <span className="text-gold">*</span>
        </label>
        <div className="relative">
          <select
            id="cf-unit"
            required
            value={fields.unit}
            onChange={set('unit')}
            className={`${FIELD_CLASS} appearance-none pr-10`}
          >
            <option value="">Select a unit type</option>
            {UNIT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={LABEL_CLASS}>
          Message{' '}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          rows={4}
          placeholder="Any questions or specific requirements?"
          value={fields.message}
          onChange={set('message')}
          className={`${FIELD_CLASS} resize-none`}
        />
      </div>

      {/* Privacy Policy consent */}
      <div className="flex items-start gap-3">
        <input
          id="cf-privacy"
          type="checkbox"
          required
          checked={accepted}
          onChange={e => setAccepted(e.target.checked)}
          aria-describedby="cf-privacy-label"
          className="mt-[0.2em] w-4 h-4 shrink-0 accent-gold cursor-pointer
            border border-border rounded focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        <label
          id="cf-privacy-label"
          htmlFor="cf-privacy"
          className="text-ink font-semibold uppercase tracking-wide leading-snug cursor-pointer select-none"
          style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)' }}
        >
          By continuing, you accept the{' '}
          <a
            href="https://parklandgroup.my/PRIVACY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-2 hover:text-gold-deep transition-colors"
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!accepted}
        aria-disabled={!accepted}
        className={`w-full btn-base btn-primary mt-1 ${
          accepted ? '' : 'opacity-50 cursor-not-allowed pointer-events-auto hover:bg-gold!'
        }`}
        style={{ fontSize: 'clamp(1.1rem, 1.1vw, 1.25rem)' }}
      >
        Send Message
      </button>

      {/* Disclaimer */}
      <p className="text-subtle text-center leading-relaxed"
        style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.65' }}>
        Submitting this form does not confirm booking or purchase.
        Our team will contact you for more information.
      </p>

    </form>
  );
}
