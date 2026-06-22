import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface KioskHeaderProps {
  subtitle?: string;
}

export default function KioskHeader({ subtitle }: KioskHeaderProps) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px', background: 'white', borderBottom: '1px solid #ccfbf1',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'relative', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: '#0d9488', borderRadius: '14px', padding: '10px', display: 'flex', boxShadow: '0 4px 12px rgba(13,148,136,0.3)' }}>
          <Shield size={28} color="white" strokeWidth={2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#134e4a', letterSpacing: '-0.5px' }}>
            SIST<span style={{ color: '#0d9488' }}>79</span>
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Prévention &amp; Santé au Travail
          </span>
        </div>
      </div>

      {subtitle && (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f766e', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {subtitle}
          </span>
        </div>
      )}

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#134e4a', fontVariantNumeric: 'tabular-nums' }}>{time}</div>
        <div style={{ fontSize: '12px', color: '#5eead4', textTransform: 'capitalize' }}>{date}</div>
      </div>
    </header>
  );
}
