import React, { useState, useCallback } from 'react';
import type { Appointment, SearchParams } from './types';
import { searchAppointment } from './api';
import WelcomeScreen from './screens/WelcomeScreen';
import IdentificationScreen from './screens/IdentificationScreen';
import ResultScreen from './screens/ResultScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import NotFoundScreen from './screens/NotFoundScreen';

type Screen = 'welcome' | 'identification' | 'result' | 'confirmation' | 'notfound';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const handleStart = useCallback(() => setScreen('identification'), []);

  const handleSearch = useCallback((params: SearchParams) => {
    const found = searchAppointment(params);
    if (found) {
      setAppointment(found);
      setScreen('result');
      return;
    }
    setAppointment(null);
    setScreen('notfound');
  }, []);

  const handleHome = useCallback(() => {
    setAppointment(null);
    setScreen('welcome');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {screen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {screen === 'identification' && (
        <IdentificationScreen onSearch={handleSearch} onBack={handleHome} />
      )}
      {screen === 'result' && appointment && (
        <ResultScreen
          key={appointment.id}
          appointment={appointment}
          onHome={handleHome}
          onBack={() => setScreen('identification')}
        />
      )}
      {screen === 'confirmation' && <ConfirmationScreen onReturn={handleHome} />}
      {screen === 'notfound' && <NotFoundScreen onBack={() => setScreen('identification')} onHome={handleHome} />}
    </div>
  );
}
