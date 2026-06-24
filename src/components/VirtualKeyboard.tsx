import React from 'react';
import { Delete } from 'lucide-react';
import { BRAND } from '../theme/brand';

interface KeyboardProps {
  value: string;
  onChange: (val: string) => void;
  maxLength: number;
  mode: 'alpha' | 'numeric';
}

const ALPHA_ROWS_DESKTOP = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['W', 'X', 'C', 'V', 'B', 'N'],
];

const ALPHA_ROWS_MOBILE = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U'],
  ['I', 'O', 'P', 'Q', 'S', 'D', 'F'],
  ['G', 'H', 'J', 'K', 'L', 'M', 'W'],
  ['X', 'C', 'V', 'B', 'N'],
];

function useMobileKeyboard() {
  const [mobile, setMobile] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 499px)').matches,
  );

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 499px)');
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return mobile;
}

const keyStyle: React.CSSProperties = {
  fontSize: '18px',
};

export default function VirtualKeyboard({ value, onChange, maxLength, mode }: KeyboardProps) {
  const mobile = useMobileKeyboard();
  const alphaRows = mobile ? ALPHA_ROWS_MOBILE : ALPHA_ROWS_DESKTOP;
  const press = (char: string) => { if (value.length < maxLength) onChange(value + char); };
  const backspace = () => onChange(value.slice(0, -1));

  if (mode === 'numeric') {
    return (
      <div className="virtual-keyboard virtual-keyboard--numeric">
        {[['7','8','9'],['4','5','6'],['1','2','3'],['0']].map((row, ri) => (
          <div key={ri} className="virtual-keyboard-row">
            {row.map(k => (
              <button key={k} type="button" className="kiosk-key kiosk-key--numeric" onPointerDown={(e) => { e.preventDefault(); press(k); }}>
                {k}
              </button>
            ))}
          </div>
        ))}
        <button type="button" className="kiosk-key kiosk-key--numeric-backspace" onPointerDown={(e) => { e.preventDefault(); backspace(); }}
          style={{ color: BRAND.blue }}>
          <Delete size={22} />
        </button>
      </div>
    );
  }

  return (
    <div className="virtual-keyboard virtual-keyboard--alpha">
      {alphaRows.map((row, ri) => (
        <div key={ri} className="virtual-keyboard-row">
          {row.map(k => (
            <button key={k} type="button" className="kiosk-key kiosk-key--alpha" style={keyStyle} onPointerDown={(e) => { e.preventDefault(); press(k); }}>
              {k}
            </button>
          ))}
          {ri === alphaRows.length - 1 && (
            <button type="button" className="kiosk-key kiosk-key--alpha-backspace" style={{ ...keyStyle, color: BRAND.blue }} onPointerDown={(e) => { e.preventDefault(); backspace(); }}>
              <Delete size={20} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
