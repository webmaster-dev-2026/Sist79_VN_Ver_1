import React from 'react';
import { Delete } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (v: string) => void;
}

const keyStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'white', border: '2px solid #ccfbf1', borderRadius: '12px',
  fontWeight: 700, color: '#134e4a', cursor: 'pointer',
  fontSize: '22px', height: '64px', fontFamily: 'inherit',
  boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
};

export default function DateInput({ value, onChange }: DateInputProps) {
  const raw = value.replace(/\D/g, '').slice(0, 8);

  const formatted = () => {
    let s = raw;
    if (s.length > 2) s = s.slice(0, 2) + '/' + s.slice(2);
    if (s.length > 5) s = s.slice(0, 5) + '/' + s.slice(5);
    return s;
  };

  const press = (d: string) => { if (raw.length < 8) onChange(raw + d); };
  const backspace = () => onChange(raw.slice(0, -1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '300px' }}>
      <div style={{ width: '100%', background: '#f0fdfa', border: '2px solid #99f6e4', borderRadius: '16px', padding: '16px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '32px', fontWeight: 700, color: formatted() ? '#134e4a' : '#99f6e4', fontVariantNumeric: 'tabular-nums', letterSpacing: '4px' }}>
          {formatted() || 'JJ/MM/AAAA'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
        {['7','8','9','4','5','6','1','2','3'].map(d => (
          <button key={d} onPointerDown={(e) => { e.preventDefault(); press(d); }} style={keyStyle}>{d}</button>
        ))}
        <div />
        <button onPointerDown={(e) => { e.preventDefault(); press('0'); }} style={keyStyle}>0</button>
        <div />
      </div>

      <button onPointerDown={(e) => { e.preventDefault(); backspace(); }}
        style={{ ...keyStyle, width: '140px', height: '50px', color: '#0d9488', gap: '8px', fontSize: '15px' }}>
        <Delete size={18} /> Effacer
      </button>
    </div>
  );
}
