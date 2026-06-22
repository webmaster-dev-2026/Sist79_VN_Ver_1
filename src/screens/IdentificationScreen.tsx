import React, { useState } from 'react';
import { ArrowLeft, Search, AlertCircle } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';
import VirtualKeyboard from '../components/VirtualKeyboard';
import DateInput from '../components/DateInput';
import type { SearchParams } from '../types';

type Field = 'name' | 'date';

interface IdentificationScreenProps {
  onSearch: (params: SearchParams) => void;
  onBack: () => void;
}

const S = {
  screen: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' as const, background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f0fdfa 100%)' },
  main: { flex: 1, display: 'flex', gap: '32px', padding: '24px 40px', overflow: 'hidden', minHeight: 0 },
  left: { display: 'flex', flexDirection: 'column' as const, gap: '20px', width: '400px', flexShrink: 0 },
  field: (active: boolean): React.CSSProperties => ({
    background: 'white', borderRadius: '20px', padding: '20px 24px',
    border: `2px solid ${active ? '#0d9488' : '#ccfbf1'}`,
    boxShadow: active ? '0 0 0 4px rgba(13,148,136,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
    cursor: 'pointer', transition: 'all 0.15s',
  }),
  fieldLabel: { fontSize: '11px', fontWeight: 700, color: '#5eead4', textTransform: 'uppercase' as const, letterSpacing: '2px', marginBottom: '8px' },
  fieldValue: (hasValue: boolean): React.CSSProperties => ({
    fontSize: '40px', fontWeight: 700, letterSpacing: '0.2em',
    color: hasValue ? '#134e4a' : '#ccfbf1', fontVariantNumeric: 'tabular-nums',
  }),
  btnPrimary: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
    background: '#0d9488', color: 'white', border: 'none', borderRadius: '16px',
    padding: '20px', fontSize: '20px', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(13,148,136,0.3)', fontFamily: 'inherit',
  } as React.CSSProperties,
  btnSecondary: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
    background: 'white', color: '#0f766e', border: '2px solid #ccfbf1', borderRadius: '16px',
    padding: '20px', fontSize: '20px', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'inherit',
  } as React.CSSProperties,
  divider: { width: '1px', background: '#ccfbf1', flexShrink: 0, alignSelf: 'stretch' } as React.CSSProperties,
  right: { flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '20px', overflow: 'hidden' },
};

export default function IdentificationScreen({ onSearch, onBack }: IdentificationScreenProps) {
  const [namePrefix, setNamePrefix] = useState('');
  const [birthRaw, setBirthRaw] = useState('');
  const [activeField, setActiveField] = useState<Field>('name');
  const [error, setError] = useState('');

  const birthDate = (() => {
    const d = birthRaw.replace(/\D/g, '');
    if (d.length !== 8) return '';
    return `${d.slice(0,2)}/${d.slice(2,4)}/${d.slice(4,8)}`;
  })();

  const handleSearch = () => {
    if (namePrefix.length < 3) { setError('Veuillez saisir au moins 3 lettres de votre nom.'); setActiveField('name'); return; }
    if (!birthDate) { setError('Veuillez saisir votre date de naissance complète.'); setActiveField('date'); return; }
    setError('');
    onSearch({ namePrefix, birthDate });
  };

  return (
    <div style={S.screen}>
      <KioskHeader subtitle="Identification" />
      <div style={S.main}>
        {/* Left */}
        <div style={S.left}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#134e4a', margin: 0 }}>Vos informations</h2>

          {error && (
            <div style={{ display: 'flex', gap: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px', color: '#dc2626' }}>
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontWeight: 500, fontSize: '15px' }}>{error}</span>
            </div>
          )}

          <div style={S.field(activeField === 'name')} onPointerDown={() => setActiveField('name')}>
            <div style={S.fieldLabel}>3 premières lettres du nom</div>
            <div style={S.fieldValue(!!namePrefix)}>{namePrefix || '_ _ _'}</div>
            <div style={{ fontSize: '13px', color: '#5eead4', marginTop: '6px' }}>Exemple : DUP pour DUPONT</div>
          </div>

          <div style={S.field(activeField === 'date')} onPointerDown={() => setActiveField('date')}>
            <div style={S.fieldLabel}>Date de naissance</div>
            <div style={S.fieldValue(!!birthDate)}>{birthDate || 'JJ/MM/AAAA'}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
            <button style={S.btnPrimary} onPointerDown={(e) => { e.preventDefault(); handleSearch(); }}>
              <Search size={22} /> Rechercher
            </button>
            <button style={S.btnSecondary} onPointerDown={(e) => { e.preventDefault(); onBack(); }}>
              <ArrowLeft size={22} /> Retour
            </button>
          </div>
        </div>

        <div style={S.divider} />

        {/* Right */}
        <div style={S.right}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#0d9488', textAlign: 'center' }}>
            {activeField === 'name' ? 'Tapez les 3 premières lettres de votre nom' : 'Tapez votre date de naissance'}
          </p>
          {activeField === 'name'
            ? <VirtualKeyboard value={namePrefix} onChange={setNamePrefix} maxLength={3} mode="alpha" />
            : <DateInput value={birthRaw} onChange={setBirthRaw} />
          }
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '14px', background: 'white', borderTop: '1px solid #ccfbf1', color: '#99f6e4', fontSize: '13px', fontWeight: 500, flexShrink: 0 }}>
        Vos données sont traitées uniquement pour la gestion de votre rendez-vous — RGPD
      </footer>
    </div>
  );
}
