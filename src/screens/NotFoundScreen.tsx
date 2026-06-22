import React from 'react';
import { ArrowLeft, SearchX, Phone } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

interface NotFoundScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export default function NotFoundScreen({ onBack, onHome }: NotFoundScreenProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #f0fdfa 100%)' }}>
      <KioskHeader />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '40px', textAlign: 'center' }}>
        <div style={{ width: '128px', height: '128px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(249,115,22,0.15)' }}>
          <SearchX size={64} color="#f97316" strokeWidth={1.5} />
        </div>

        <div>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#134e4a', margin: '0 0 12px 0' }}>
            Rendez-vous introuvable
          </h2>
          <p style={{ fontSize: '20px', color: '#5eead4', fontWeight: 500, margin: 0, maxWidth: '480px' }}>
            Aucun rendez-vous ne correspond à ces informations pour aujourd'hui.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '24px 32px', maxWidth: '400px', width: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #ccfbf1' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Besoin d'aide ?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#134e4a' }}>
            <Phone size={22} color="#0d9488" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>Présentez-vous à l'accueil</div>
              <div style={{ color: '#5eead4', fontSize: '15px' }}>ou composez le 05 49 76 60 00</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', maxWidth: '440px', width: '100%' }}>
          <button
            onPointerDown={(e) => { e.preventDefault(); onBack(); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: '#0f766e', border: '2px solid #ccfbf1', borderRadius: '16px', padding: '20px', fontSize: '19px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <ArrowLeft size={22} /> Réessayer
          </button>
          <button
            onPointerDown={(e) => { e.preventDefault(); onHome(); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d9488', color: 'white', border: 'none', borderRadius: '16px', padding: '20px', fontSize: '19px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(13,148,136,0.3)', fontFamily: 'inherit' }}
          >
            Accueil
          </button>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '16px', background: 'white', borderTop: '1px solid #ccfbf1', color: '#99f6e4', fontSize: '14px', fontWeight: 500 }}>
        SIST 79 — 1 Rue Alfred Nobel, 79000 Niort — Tél : 05 49 76 60 00
      </footer>
    </div>
  );
}
