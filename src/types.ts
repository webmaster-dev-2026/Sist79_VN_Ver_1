export type Screen = 'welcome' | 'identification' | 'result' | 'confirmation' | 'notfound';

export interface UserAppointment {
  id: string;
  time: string;
  date: string;
  building: string;
  floor: string;
  room: string;
  specialty: string;
  doctor: string;
}

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  fullName: string;
  birthDate: string;
  avatar: string;
  medicalRecordId: string;
  appointments: UserAppointment[];
}

export interface Appointment {
  id: string;
  userId: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  avatar: string;
  medicalRecordId: string;
  date: string;
  time: string;
  doctor: string;
  room: string;
  floor: string;
  building: string;
  specialty: string;
  instructions: string;
  isToday: boolean;
  appointments: UserAppointment[];
}

export interface SearchParams {
  namePrefix: string;
  birthDate: string;
}
