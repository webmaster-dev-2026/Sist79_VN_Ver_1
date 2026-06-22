import React from 'react';
import { Delete } from 'lucide-react';
import { BRAND } from '../theme/brand';

interface KeyboardProps {
  value: string;
  onChange: (val: string) => void;
  maxLength: number;
  mode: 'alpha' | 'numeric';
}

const ALPHA_ROWS = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['W', 'X', 'C', 'V', 'B', 'N'],
];

const keyStyle: React.CSSProperties = {
  fontSize: '18px', width: '64px', height: '56px',
};

export default function VirtualKeyboard({ value, onChange, maxLength, mode }: KeyboardProps) {
  const press = (char: string) => { if (value.length < maxLength) onChange(value + char); };
  const backspace = () => onChange(value.slice(0, -1));

  if (mode === 'numeric') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        {[['7','8','9'],['4','5','6'],['1','2','3'],['0']].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '12px' }}>
            {row.map(k => (
              <button key={k} type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); press(k); }}
                style={{ ...keyStyle, width: '80px', height: '64px', fontSize: '22px' }}>
                {k}
              </button>
            ))}
          </div>
        ))}
        <button type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); backspace(); }}
          style={{ ...keyStyle, width: '96px', height: '52px', color: BRAND.blue, marginTop: '4px' }}>
          <Delete size={22} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {ALPHA_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {row.map(k => (
            <button key={k} type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); press(k); }}
              style={keyStyle}>
              {k}
            </button>
          ))}
          {ri === ALPHA_ROWS.length - 1 && (
            <button type="button" className="kiosk-key" onPointerDown={(e) => { e.preventDefault(); backspace(); }}
              style={{ ...keyStyle, width: '88px', color: BRAND.blue, marginLeft: '8px' }}>
              <Delete size={20} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
