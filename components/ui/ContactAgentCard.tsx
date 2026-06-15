'use client';

import { useState } from 'react';
import WhatsAppAgentSelector from './WhatsAppAgentSelector';

interface Props {
  mode:  'whatsapp' | 'call';
  icon:  React.ReactNode;
  label: string;
}

export default function ContactAgentCard({ mode, icon, label }: Props) {
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
            {icon}
          </div>
          <p
            className="font-semibold uppercase tracking-widest text-subtle"
            style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}
          >
            {label}
          </p>
        </div>
      </button>

      <WhatsAppAgentSelector
        mode={mode}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
