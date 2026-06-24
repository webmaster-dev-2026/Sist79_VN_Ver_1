import React, { useEffect, useRef, useState } from 'react';
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
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featuresWidth, setFeaturesWidth] = useState<number>();

  useEffect(() => {
    const node = featuresRef.current;
    if (!node) return;

    const update = () => {
      if (window.innerWidth < 900) {
        setFeaturesWidth(undefined);
        return;
      }
      setFeaturesWidth(node.getBoundingClientRect().width);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <ScreenLayout footer="SiST 79 — 1 Rue Alfred Nobel, 79000 Niort — Tél : 05 49 76 60 00" overlay={false}>
      <div className="welcome-hero-wrap">
        <div className="liquid-glass-chip welcome-hero-panel">
        <div style={{ textAlign: 'center' }}>
          <h1 className="welcome-hero-title" style={{ fontWeight: 700, color: BRAND.navy, margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Bienvenue chez{' '}
            <span className="welcome-title-accent">SiST79</span>
          </h1>
          <p style={{ fontSize: '18px', color: BRAND.muted, fontWeight: 400, marginTop: '14px' }}>
            Consultez votre rendez-vous en quelques secondes.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            type="button"
            className="welcome-cta liquid-glass-blue liquid-glass-pill"
            style={featuresWidth ? { width: featuresWidth } : undefined}
            onPointerDown={(e) => { e.preventDefault(); onStart(); }}
          >
            <CalendarClock size={32} strokeWidth={1.75} className="welcome-cta-icon" />
            <span className="welcome-cta-label">Consulter mon rendez-vous</span>
            <div className="welcome-cta-arrows" aria-hidden>
              <div className="welcome-cta-arrows-track">
                <ChevronRight size={26} strokeWidth={2.5} />
                <ChevronRight size={26} strokeWidth={2.5} />
                <ChevronRight size={26} strokeWidth={2.5} />
                <ChevronRight size={26} strokeWidth={2.5} />
              </div>
            </div>
          </button>

          <div ref={featuresRef} className="welcome-features">
          {FEATURES.map(({ icon: Icon, label }, index) => (
            <React.Fragment key={label}>
              {index > 0 && <div className="liquid-glass-divider" aria-hidden />}
              <div className="welcome-feature-item">
                <div className="liquid-glass-icon welcome-feature-icon">
                  <Icon size={24} strokeWidth={1.75} color={BRAND.blue} />
                </div>
                <span className="welcome-feature-label">{label}</span>
              </div>
            </React.Fragment>
          ))}
          </div>
        </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
