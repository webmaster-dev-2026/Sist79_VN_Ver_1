import { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  DoorOpen,
  Home,
  Layers,
  Stethoscope,
} from 'lucide-react';
import ScreenLayout from '../components/ScreenLayout';
import EmptyAvatar from '../components/EmptyAvatar';
import bgImage from '../assets/bgv2.png';
import { BRAND } from '../theme/brand';
import type { Appointment } from '../types';

interface ResultScreenProps {
  appointment: Appointment;
  onHome: () => void;
  onBack: () => void;
}

export default function ResultScreen({ appointment, onHome, onBack }: ResultScreenProps) {
  const appointments = appointment.appointments;
  const initialIndex = Math.max(
    0,
    appointments.findIndex((apt) => apt.id === appointment.id),
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const apt = appointments[currentIndex];
  const hasMultiple = appointments.length > 1;

  const goPrev = () => {
    setCurrentIndex((index) => (index - 1 + appointments.length) % appointments.length);
  };

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % appointments.length);
  };

  const locationRows = [
    { icon: Building2, label: 'Bâtiment', value: apt.building },
    { icon: Layers, label: 'Étage', value: apt.floor },
    { icon: DoorOpen, label: 'Salle', value: apt.room },
  ] as const;

  return (
    <ScreenLayout subtitle="Votre rendez-vous" backgroundImage={bgImage} overlay={false}>
      <div className="result-screen liquid-glass-chip">
        <div className="result-screen-user">
          <div className="result-avatar-wrap">
            <EmptyAvatar size={88} />
          </div>
          <h3 className="result-user-name">
            {appointment.firstName}{' '}
            <span className="welcome-title-accent">{appointment.lastName}</span>
          </h3>
          <div className="result-user-birth">
            <span className="result-user-birth-label">Date de naissance</span>
            <span className="result-user-birth-value">{appointment.birthDate}</span>
          </div>
        </div>

        <div className="result-screen-divider" aria-hidden />

        <div className="result-appointment-carousel">
          {hasMultiple && (
            <button
              type="button"
              className="result-carousel-btn"
              aria-label="Rendez-vous précédent"
              onPointerDown={(e) => {
                e.preventDefault();
                goPrev();
              }}
            >
              <ChevronLeft size={28} strokeWidth={2.25} />
            </button>
          )}

          <div className="result-appointment-carousel-main">
            <div className="result-appointment-body">
              <div className="result-appointment-datetime">
                <div className="result-appointment-datetime-item">
                  <CalendarDays size={22} strokeWidth={1.75} color={BRAND.blue} />
                  <div>
                    <div className="result-appointment-meta-label">Date</div>
                    <div className="result-appointment-meta-value">{apt.date}</div>
                  </div>
                </div>
                <div className="result-appointment-datetime-rule" aria-hidden />
                <div className="result-appointment-datetime-item">
                  <Clock size={22} strokeWidth={1.75} color={BRAND.blue} />
                  <div>
                    <div className="result-appointment-meta-label">Heure</div>
                    <div className="result-appointment-meta-value">{apt.time}</div>
                  </div>
                </div>
              </div>

              <div className="result-appointment-doctor-block">
                <div className="liquid-glass-icon result-appointment-doctor-icon">
                  <Stethoscope size={24} strokeWidth={1.75} color={BRAND.blue} />
                </div>
                <div>
                  <div className="result-appointment-meta-label">Médecin</div>
                  <div className="result-appointment-doctor-name">{apt.doctor}</div>
                  <div className="result-appointment-doctor-specialty">{apt.specialty}</div>
                </div>
              </div>

              <div className="result-appointment-location-grid">
                {locationRows.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="result-appointment-location-row">
                    <div className="liquid-glass-icon result-appointment-location-icon">
                      <Icon size={20} strokeWidth={1.75} color={BRAND.blue} />
                    </div>
                    <div className="result-appointment-location-text">
                      <div className="result-appointment-meta-label">{label}</div>
                      <div className="result-appointment-location-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {hasMultiple && (
              <div className="result-carousel-dots" role="tablist" aria-label="Rendez-vous">
                {appointments.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Rendez-vous ${index + 1}`}
                    className={`result-carousel-dot${index === currentIndex ? ' result-carousel-dot--active' : ''}`}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {hasMultiple && (
            <button
              type="button"
              className="result-carousel-btn"
              aria-label="Rendez-vous suivant"
              onPointerDown={(e) => {
                e.preventDefault();
                goNext();
              }}
            >
              <ChevronRight size={28} strokeWidth={2.25} />
            </button>
          )}
        </div>

        <div className="result-actions">
          <button
            type="button"
            className="kiosk-btn kiosk-btn-secondary"
            style={{ flex: 1 }}
            onPointerDown={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            <ArrowLeft size={22} /> Retour
          </button>
          <button
            type="button"
            className="kiosk-btn kiosk-btn-primary"
            style={{ flex: 2 }}
            onPointerDown={(e) => {
              e.preventDefault();
              onHome();
            }}
          >
            <Home size={26} /> Retour à l'accueil
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
