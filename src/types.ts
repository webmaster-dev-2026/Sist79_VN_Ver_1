export type Screen = 'welcome' | 'identification' | 'result' | 'confirmation' | 'notfound';

export interface Appointment {
  id: string;
  lastName: string;
  firstName: string;
  birthDate: string; // DD/MM/YYYY
  time: string;      // HH:mm
  doctor: string;
  room: string;
  floor: string;
  instructions: string;
}

export interface SearchParams {
  namePrefix: string; // 3 lettres
  birthDate: string;  // DD/MM/YYYY
}
