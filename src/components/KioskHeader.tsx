import React, { useId, useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { BRAND } from '../theme/brand';

function AnalogClock({ date, size = 52 }: { date: Date; size?: number }) {
  const gradientId = useId();
  const minutes = date.getMinutes() + date.getSeconds() / 60;
  const hours = (date.getHours() % 12) + minutes / 60;
  const minuteAngle = minutes * 6;
  const hourAngle = hours * 30;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND.cyan} />
          <stop offset="100%" stopColor={BRAND.navy} />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" />
      {[0, 90, 180, 270].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const inner = r - 5;
        const outer = r - 1.5;
        return (
          <line
            key={deg}
            x1={cx + inner * Math.cos(rad)}
            y1={cy + inner * Math.sin(rad)}
            x2={cx + outer * Math.cos(rad)}
            y2={cy + outer * Math.sin(rad)}
            stroke={BRAND.blue}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1={cx} y1={cy} x2={cx} y2={cy - r * 0.38}
        stroke={BRAND.navy}
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${hourAngle}, ${cx}, ${cy})`}
      />
      <line
        x1={cx} y1={cy} x2={cx} y2={cy - r * 0.58}
        stroke={BRAND.blue}
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle}, ${cx}, ${cy})`}
      />
      <circle cx={cx} cy={cy} r="2.25" fill={BRAND.navy} />
    </svg>
  );
}

interface KioskHeaderProps {
  subtitle?: string;
}

export default function KioskHeader({ subtitle }: KioskHeaderProps) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 48px',
      background: 'transparent',
      position: 'relative', flexShrink: 0,
    }}>
      <BrandLogo />

      {subtitle && (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 700,
            color: BRAND.blueDark,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {subtitle}
          </span>
        </div>
      )}

      <div className="liquid-glass-chip" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 18px' }}>
        <AnalogClock date={now} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <div style={{
            fontSize: '30px',
            fontWeight: 700,
            color: BRAND.navy,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.5px',
          }}>
            {time}
          </div>
          <div style={{
            fontSize: '15px',
            fontWeight: 500,
            color: BRAND.cyan,
            textTransform: 'capitalize',
            marginTop: '2px',
          }}>
            {date}
          </div>
        </div>
      </div>
    </header>
  );
}
