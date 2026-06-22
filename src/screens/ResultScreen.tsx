import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, Stethoscope, DoorOpen, MapPin } from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import { BRAND } from '../theme/brand';
import type { Appointment } from '../types';

interface ResultScreenProps {
  appointment: Appointment;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ResultScreen({ appointment, onConfirm, onBack }: ResultScreenProps) {
  const cards = [
    { icon: Clock,       label: 'Heure du rendez-vous', value: appointment.time,             hi: true  },
    { icon: Stethoscope, label: 'Praticien',             value: appointment.doctor,           hi: true  },
    { icon: DoorOpen,    label: 'Salle',                 value: `Salle ${appointment.room}`,  hi: false },
    { icon: MapPin,      label: 'Étage',                 value: appointment.floor,            hi: false },
  ];

  return (
    <ScreenLayout subtitle="Votre rendez-vous">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 48px', gap: '20px', overflow: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="kiosk-label" style={{ marginBottom: '6px' }}>Bonjour</div>
          <h2 style={{ fontSize: '52px', fontWeight: 800, color: BRAND.navy, margin: 0 }}>
            {appointment.firstName}{' '}
            <span className="welcome-title-accent">{appointment.lastName}</span>
          </h2>
          <p style={{ color: BRAND.muted, fontSize: '17px', marginTop: '8px' }}>Votre rendez-vous du jour a bien été trouvé.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {cards.map(({ icon: Icon, label, value, hi }) => (
            <div key={label} className={`kiosk-field${hi ? ' kiosk-field--active' : ''}`} style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="liquid-glass-icon" style={{
                  borderRadius: '12px', padding: '12px', display: 'flex',
                  background: hi ? undefined : BRAND.surfaceSoft,
                }}>
                  <Icon size={26} color={BRAND.blue} />
                </div>
                <div>
                  <div className="kiosk-label" style={{ letterSpacing: '1.5px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: BRAND.navy }}>{value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="liquid-glass-blue" style={{
          borderRadius: '20px', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '20px',
        }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', display: 'flex', flexShrink: 0 }}>
            <MapPin size={26} />
          </div>
          <p style={{ fontSize: '19px', fontWeight: 600, margin: 0 }}>{appointment.instructions}</p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button type="button" className="kiosk-btn kiosk-btn-secondary" style={{ flex: 1 }} onPointerDown={(e) => { e.preventDefault(); onBack(); }}>
            <ArrowLeft size={22} /> Retour
          </button>
          <button type="button" className="kiosk-btn kiosk-btn-primary" style={{ flex: 2 }} onPointerDown={(e) => { e.preventDefault(); onConfirm(); }}>
            <CheckCircle2 size={26} /> Confirmer mon arrivée
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
