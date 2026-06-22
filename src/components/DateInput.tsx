import React from 'react';
import { Delete, Calendar } from 'lucide-react';
import { BRAND } from '../theme/brand';

interface DateInputProps {
  value: string;
  onChange: (v: string) => void;
}

const keyStyle: React.CSSProperties = {
  fontSize: '22px', height: '64px',
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
      <div className="kiosk-field kiosk-field--active" style={{ width: '100%', cursor: 'default', padding: '16px 20px' }}>
        <div className="kiosk-field-row">
          <span className="kiosk-field-value kiosk-field-value--compact" style={{
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
        {['7','8','9','4','5','6','1','2','3'].map(d => (
          <button key={d} type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); press(d); }} style={keyStyle}>{d}</button>
        ))}
        <div />
        <button type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); press('0'); }} style={keyStyle}>0</button>
        <div />
      </div>

      <button type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); backspace(); }}
        style={{ ...keyStyle, width: '140px', height: '50px', color: BRAND.blue, gap: '8px', fontSize: '15px', display: 'flex' }}>
        <Delete size={18} /> Effacer
      </button>
    </div>
  );
}
