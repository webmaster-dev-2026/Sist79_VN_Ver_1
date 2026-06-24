import React, { useState } from 'react';
import { ArrowLeft, Search, AlertCircle, User, Calendar } from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import VirtualKeyboard from '../components/VirtualKeyboard';
import DateInput from '../components/DateInput';
import bgImage from '../assets/bgv2.png';
import { BRAND } from '../theme/brand';
import type { SearchParams } from '../types';

type Field = 'name' | 'date';

function todayBirthDisplay(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

interface IdentificationScreenProps {
  onSearch: (params: SearchParams) => void;
  onBack: () => void;
}

export default function IdentificationScreen({ onSearch, onBack }: IdentificationScreenProps) {
  const [namePrefix, setNamePrefix] = useState('');
  const [birthRaw, setBirthRaw] = useState('');
  const [activeField, setActiveField] = useState<Field>('name');
  const [error, setError] = useState('');

  const birthDate = (() => {
    const d = birthRaw.replace(/\D/g, '');
    if (d.length !== 8) return '';
    return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4, 8)}`;
  })();

  const handleNameChange = (val: string) => {
    setNamePrefix(val);
    if (val.length >= 3) setActiveField('date');
  };

  const handleSearch = () => {
    if (namePrefix.length < 3) { setError('Veuillez saisir au moins 3 lettres de votre nom.'); setActiveField('name'); return; }
    if (!birthDate) { setError('Veuillez saisir votre date de naissance complète.'); setActiveField('date'); return; }
    setError('');
    onSearch({ namePrefix, birthDate });
  };

  return (
    <ScreenLayout footer="Vos données sont traitées uniquement pour la gestion de votre rendez-vous — RGPD" backgroundImage={bgImage}>
      <div className="identification-layout">
        <div className="liquid-glass-chip identification-panel">
          <h2 className="identification-panel-title">Vos informations</h2>

          {error && (
            <div style={{
              display: 'flex', gap: '12px', background: 'rgba(254, 242, 242, 0.9)',
              border: '1px solid #fecaca', borderRadius: '16px', padding: '16px', color: '#dc2626',
            }}>
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontWeight: 500, fontSize: '15px' }}>{error}</span>
            </div>
          )}

          <div
            className={`kiosk-field${activeField === 'name' ? ' kiosk-field--active' : ''}`}
            onPointerDown={() => setActiveField('name')}
          >
            <div className="kiosk-field-row">
              <div className="kiosk-field-content">
                <div className="kiosk-label" style={{ marginBottom: '8px' }}>3 premières lettres du nom</div>
                <div className="kiosk-field-value" style={{
                  color: namePrefix ? BRAND.navy : BRAND.placeholder,
                }}>
                  {namePrefix || '_ _ _'}
                </div>
                <div className="identification-field-hint">Exemple : DUP pour DUPONT</div>
              </div>
              <div className="liquid-glass-icon kiosk-field-icon">
                <User size={24} strokeWidth={1.75} color={BRAND.blue} />
              </div>
            </div>
          </div>

          <div
            className={`kiosk-field${activeField === 'date' ? ' kiosk-field--active' : ''}`}
            onPointerDown={() => setActiveField('date')}
          >
            <div className="kiosk-field-row">
              <div className="kiosk-field-content">
                <div className="kiosk-label" style={{ marginBottom: '8px' }}>Date de naissance</div>
                <div className="kiosk-field-value" style={{
                  color: birthDate ? BRAND.navy : BRAND.placeholder,
                }}>
                  {birthDate || todayBirthDisplay()}
                </div>
              </div>
              <div className="liquid-glass-icon kiosk-field-icon">
                <Calendar size={24} strokeWidth={1.75} color={BRAND.blue} />
              </div>
            </div>
          </div>

          <div className="identification-panel-actions">
            <button type="button" className="kiosk-btn kiosk-btn-primary" onPointerDown={(e) => { e.preventDefault(); handleSearch(); }}>
              <Search size={22} /> Rechercher
            </button>
            <button type="button" className="kiosk-btn kiosk-btn-secondary" onPointerDown={(e) => { e.preventDefault(); onBack(); }}>
              <ArrowLeft size={22} /> Retour
            </button>
          </div>
        </div>

        <div className="kiosk-keyboard-frame">
          <div className="liquid-glass-chip kiosk-keyboard-panel">
            <div className="kiosk-keyboard-body">
              <p className="kiosk-keyboard-hint">
                {activeField === 'name' ? 'Tapez les 3 premières lettres de votre nom' : 'Tapez votre date de naissance'}
              </p>
              {activeField === 'name'
                ? <VirtualKeyboard value={namePrefix} onChange={handleNameChange} maxLength={3} mode="alpha" />
                : <DateInput value={birthRaw} onChange={setBirthRaw} />
              }
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
