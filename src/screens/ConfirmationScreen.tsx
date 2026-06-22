import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Home } from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import { BRAND } from '../theme/brand';

interface ConfirmationScreenProps {
  onReturn: () => void;
}

const TOTAL = 30;

export default function ConfirmationScreen({ onReturn }: ConfirmationScreenProps) {
  const [remaining, setRemaining] = useState(TOTAL);

  useEffect(() => {
    if (remaining <= 0) { onReturn(); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onReturn]);

  return (
    <ScreenLayout footer="SIST 79 — Service Interentreprise de Santé au Travail des Deux-Sèvres">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '40px', textAlign: 'center' }}>
        <div className="liquid-glass-icon" style={{
          width: '160px', height: '160px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckCircle2 size={84} color={BRAND.blue} strokeWidth={1.5} />
        </div>

        <div>
          <h2 style={{ fontSize: '48px', fontWeight: 800, color: BRAND.navy, margin: '0 0 12px 0', lineHeight: 1.1 }}>
            Votre arrivée a été enregistrée.
          </h2>
          <p style={{ fontSize: '22px', color: BRAND.muted, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
            Merci de patienter dans la salle d'attente.<br />
            Le praticien vous appellera dès que possible.
          </p>
        </div>

        <div className="liquid-glass-chip" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Clock size={24} color={BRAND.blue} />
          <div style={{ textAlign: 'left' }}>
            <div className="kiosk-label">Retour automatique</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: BRAND.navy, fontVariantNumeric: 'tabular-nums' }}>
              dans {remaining} seconde{remaining > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '480px', height: '8px', background: BRAND.border, borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: `linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.blue})`,
            borderRadius: '99px', width: `${(remaining / TOTAL) * 100}%`, transition: 'width 1s linear',
          }} />
        </div>

        <button type="button" className="kiosk-btn kiosk-btn-secondary" style={{ padding: '16px 32px', fontSize: '17px' }} onPointerDown={(e) => { e.preventDefault(); onReturn(); }}>
          <Home size={20} /> Retour à l'accueil
        </button>
      </div>
    </ScreenLayout>
  );
}
