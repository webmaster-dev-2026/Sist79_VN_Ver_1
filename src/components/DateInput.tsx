import React from 'react';
import { Delete, Calendar } from 'lucide-react';
import { BRAND } from '../theme/brand';

interface DateInputProps {
  value: string;
  onChange: (v: string) => void;
}

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
    <div className="date-input">
      <div className="kiosk-field kiosk-field--active date-input-display">
        <div className="kiosk-field-row">
          <span className="kiosk-field-value kiosk-field-value--compact date-input-value" style={{
            flex: 1,
            color: formatted() ? BRAND.navy : BRAND.placeholder,
          }}>
            {formatted() || 'JJ/MM/AAAA'}
          </span>
          <div className="liquid-glass-icon kiosk-field-icon">
            <Calendar size={22} strokeWidth={1.75} color={BRAND.blue} />
          </div>
        </div>
      </div>

      <div className="date-input-grid">
        {['7','8','9','4','5','6','1','2','3'].map(d => (
          <button key={d} type="button" className="kiosk-key kiosk-key--numeric" onPointerDown={(e) => { e.preventDefault(); press(d); }}>{d}</button>
        ))}
        <div />
        <button type="button" className="kiosk-key kiosk-key--numeric" onPointerDown={(e) => { e.preventDefault(); press('0'); }}>0</button>
        <div />
      </div>

      <button type="button" className="kiosk-key kiosk-key--numeric-backspace date-input-clear" onPointerDown={(e) => { e.preventDefault(); backspace(); }}
        style={{ color: BRAND.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}>
        <Delete size={18} /> Effacer
      </button>
    </div>
  );
}
