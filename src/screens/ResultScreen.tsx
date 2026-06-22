import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, Stethoscope, DoorOpen, MapPin } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';
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
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f0fdfa 100%)' }}>
      <KioskHeader subtitle="Votre rendez-vous" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 48px', gap: '20px', overflow: 'auto' }}>
        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Bonjour</div>
          <h2 style={{ fontSize: '52px', fontWeight: 800, color: '#134e4a', margin: 0 }}>
            {appointment.firstName}{' '}
            <span style={{ color: '#0d9488' }}>{appointment.lastName}</span>
          </h2>
          <p style={{ color: '#5eead4', fontSize: '17px', marginTop: '8px' }}>Votre rendez-vous du jour a bien été trouvé.</p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {cards.map(({ icon: Icon, label, value, hi }) => (
            <div key={label} style={{
              background: hi ? '#f0fdfa' : 'white', borderRadius: '20px',
              border: `2px solid ${hi ? '#0d9488' : '#ccfbf1'}`,
              padding: '20px', display: 'flex', alignItems: 'center', gap: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ background: hi ? '#0d9488' : '#ccfbf1', borderRadius: '12px', padding: '12px', display: 'flex', color: hi ? 'white' : '#0d9488' }}>
                <Icon size={26} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#5eead4', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#134e4a' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Orientation */}
        <div style={{ background: '#0d9488', color: 'white', borderRadius: '20px', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', display: 'flex', flexShrink: 0 }}>
            <MapPin size={26} />
          </div>
          <p style={{ fontSize: '19px', fontWeight: 600, margin: 0 }}>{appointment.instructions}</p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onPointerDown={(e) => { e.preventDefault(); onBack(); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: '#0f766e', border: '2px solid #ccfbf1', borderRadius: '16px', padding: '20px', fontSize: '19px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <ArrowLeft size={22} /> Retour
          </button>
          <button
            onPointerDown={(e) => { e.preventDefault(); onConfirm(); }}
            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#059669', color: 'white', border: 'none', borderRadius: '16px', padding: '20px', fontSize: '19px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(5,150,105,0.35)', fontFamily: 'inherit' }}
          >
            <CheckCircle2 size={26} /> Confirmer mon arrivée
          </button>
        </div>
      </div>
    </div>
  );
}
