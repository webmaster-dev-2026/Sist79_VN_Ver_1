import React from 'react';
import { CalendarClock, ChevronRight, HeartPulse, Shield, Users } from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import { BRAND } from '../theme/brand';

const FEATURES = [
  { icon: Shield, label: 'Données sécurisées' },
  { icon: HeartPulse, label: 'Santé au travail' },
  { icon: Users, label: 'Service interentreprises' },
] as const;

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <ScreenLayout footer="SiST 79 — 1 Rue Alfred Nobel, 79000 Niort — Tél : 05 49 76 60 00">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '32px 64px', gap: '50px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 800, color: BRAND.navy, margin: 0, lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            Bienvenue chez{' '}
            <span className="welcome-title-accent">SiST79</span>
          </h1>
          <p style={{ fontSize: '18px', color: BRAND.muted, fontWeight: 500, marginTop: '14px' }}>
            Consultez votre rendez-vous en quelques secondes.
          </p>
        </div>

        <button
          type="button"
          className="welcome-cta liquid-glass-blue liquid-glass-pill"
          onPointerDown={(e) => { e.preventDefault(); onStart(); }}
        >
          <CalendarClock size={32} strokeWidth={1.75} style={{ flexShrink: 0, justifySelf: 'start' }} />
          <span style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Consulter mon rendez-vous</span>
          <div className="welcome-cta-arrows" aria-hidden>
            <div className="welcome-cta-arrows-track">
              <ChevronRight size={26} strokeWidth={2.5} />
              <ChevronRight size={26} strokeWidth={2.5} />
              <ChevronRight size={26} strokeWidth={2.5} />
              <ChevronRight size={26} strokeWidth={2.5} />
            </div>
          </div>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '920px',
          width: '100%',
        }}>
          {FEATURES.map(({ icon: Icon, label }, index) => (
            <React.Fragment key={label}>
              {index > 0 && <div className="liquid-glass-divider" aria-hidden />}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 8px' }}>
                <div className="liquid-glass-icon" style={{
                  width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} strokeWidth={1.75} color={BRAND.blue} />
                </div>
                <span style={{
                  fontWeight: 600, fontSize: '15px', color: BRAND.navy,
                  letterSpacing: '-0.01em', lineHeight: 1.35, whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}
