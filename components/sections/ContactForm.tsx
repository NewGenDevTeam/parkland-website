'use client';

import { useState } from 'react';

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

function IcCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gold" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

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

export default function ContactForm() {
  const [fields,    setFields]    = useState<Fields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ── Thank-you state ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-14 px-6
        border border-border rounded-2xl bg-[#FAFAF8]">
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
          <IcCheck />
        </div>
        <h3
          className="font-display font-bold text-ink mb-2"
          style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}
        >
          Thank you{fields.name ? `, ${fields.name.split(' ')[0]}` : ''}!
        </h3>
        <p className="text-[1.0625rem] leading-relaxed text-body max-w-sm mb-7">
          We&apos;ve received your message. Our team will be in touch with
          you shortly.
        </p>
        <button
          onClick={() => { setFields(EMPTY); setSubmitted(false); }}
          className="text-[1rem] font-semibold text-gold hover:text-gold-deep
            underline underline-offset-2 transition-colors duration-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

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
          Preferred Unit Type
        </label>
        <div className="relative">
          <select
            id="cf-unit"
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full btn-base btn-primary mt-1"
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
