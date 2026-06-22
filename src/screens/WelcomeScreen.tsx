import React from 'react';
import { CalendarClock, ChevronRight, HeartPulse, ShieldCheck, Users } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f0fdfa 100%)' }}>
      <KioskHeader />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 80px', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 800, color: '#134e4a', margin: 0, lineHeight: 1.1 }}>
            Bienvenue chez{' '}
            <span style={{ color: '#0d9488' }}>SIST79</span>
          </h1>
          <p style={{ fontSize: '24px', color: '#5eead4', fontWeight: 500, marginTop: '16px' }}>
            Consultez votre rendez-vous en quelques secondes.
          </p>
        </div>

        <button
          onPointerDown={(e) => { e.preventDefault(); onStart(); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            background: '#0d9488', color: 'white', border: 'none',
            fontSize: '26px', fontWeight: 700, borderRadius: '24px',
            padding: '28px 64px', cursor: 'pointer', boxShadow: '0 20px 40px rgba(13,148,136,0.35)',
            fontFamily: 'inherit',
          }}
        >
          <CalendarClock size={36} />
          Consulter mon rendez-vous
          <ChevronRight size={32} />
        </button>

        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { icon: ShieldCheck, label: 'Données sécurisées' },
            { icon: HeartPulse,  label: 'Santé au travail' },
            { icon: Users,       label: 'Service interentreprises' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', borderRadius: '16px', padding: '12px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #ccfbf1', color: '#0d9488',
            }}>
              <Icon size={20} />
              <span style={{ fontWeight: 500, fontSize: '14px' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '16px', background: 'white', borderTop: '1px solid #ccfbf1', color: '#99f6e4', fontSize: '14px', fontWeight: 500 }}>
        SIST 79 — 1 Rue Alfred Nobel, 79000 Niort — Tél : 05 49 76 60 00
      </footer>
    </div>
  );
}
