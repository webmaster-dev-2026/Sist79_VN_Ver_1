import React from 'react';
import { ArrowLeft, SearchX, Phone } from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import { BRAND } from '../theme/brand';

interface NotFoundScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export default function NotFoundScreen({ onBack, onHome }: NotFoundScreenProps) {
  return (
    <ScreenLayout footer="SIST 79 — 1 Rue Alfred Nobel, 79000 Niort — Tél : 05 49 76 60 00">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '40px', textAlign: 'center' }}>
        <div style={{
          width: '128px', height: '128px', borderRadius: '50%',
          background: 'rgba(255, 237, 213, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.6)',
        }}>
          <SearchX size={64} color="#f97316" strokeWidth={1.5} />
        </div>

        <div>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: BRAND.navy, margin: '0 0 12px 0' }}>
            Rendez-vous introuvable
          </h2>
          <p style={{ fontSize: '20px', color: BRAND.muted, fontWeight: 500, margin: 0, maxWidth: '480px' }}>
            Aucun rendez-vous ne correspond à ces informations pour aujourd'hui.
          </p>
        </div>

        <div className="liquid-glass-chip" style={{ padding: '24px 32px', maxWidth: '400px', width: '100%' }}>
          <div className="kiosk-label" style={{ marginBottom: '12px' }}>Besoin d'aide ?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: BRAND.navy }}>
            <Phone size={22} color={BRAND.blue} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>Présentez-vous à l'accueil</div>
              <div style={{ color: BRAND.muted, fontSize: '15px' }}>ou composez le 05 49 76 60 00</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', maxWidth: '440px', width: '100%' }}>
          <button type="button" className="kiosk-btn kiosk-btn-secondary" style={{ flex: 1 }} onPointerDown={(e) => { e.preventDefault(); onBack(); }}>
            <ArrowLeft size={22} /> Réessayer
          </button>
          <button type="button" className="kiosk-btn kiosk-btn-primary" style={{ flex: 1 }} onPointerDown={(e) => { e.preventDefault(); onHome(); }}>
            Accueil
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
