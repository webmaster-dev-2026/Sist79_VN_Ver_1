import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Home } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

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
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f0fdfa 100%)' }}>
      <KioskHeader />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '40px', textAlign: 'center' }}>
        <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(5,150,105,0.2)' }}>
          <CheckCircle2 size={84} color="#059669" strokeWidth={1.5} />
        </div>

        <div>
          <h2 style={{ fontSize: '48px', fontWeight: 800, color: '#065f46', margin: '0 0 12px 0', lineHeight: 1.1 }}>
            Votre arrivée a été enregistrée.
          </h2>
          <p style={{ fontSize: '22px', color: '#0f766e', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
            Merci de patienter dans la salle d'attente.<br />
            Le praticien vous appellera dès que possible.
          </p>
        </div>

        {/* Countdown */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #ccfbf1' }}>
          <Clock size={24} color="#0d9488" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase' }}>Retour automatique</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#134e4a', fontVariantNumeric: 'tabular-nums' }}>
              dans {remaining} seconde{remaining > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: '480px', height: '8px', background: '#ccfbf1', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#0d9488', borderRadius: '99px', width: `${(remaining / TOTAL) * 100}%`, transition: 'width 1s linear' }} />
        </div>

        <button
          onPointerDown={(e) => { e.preventDefault(); onReturn(); }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', color: '#0f766e', border: '2px solid #ccfbf1', borderRadius: '16px', padding: '16px 32px', fontSize: '17px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'inherit' }}
        >
          <Home size={20} /> Retour à l'accueil
        </button>
      </div>

      <footer style={{ textAlign: 'center', padding: '16px', background: 'white', borderTop: '1px solid #ccfbf1', color: '#99f6e4', fontSize: '14px', fontWeight: 500 }}>
        SIST 79 — Service Interentreprise de Santé au Travail des Deux-Sèvres
      </footer>
    </div>
  );
}
