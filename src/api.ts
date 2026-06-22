import type { Appointment, SearchParams } from './types';

const DEMO_DATA: Appointment[] = [
  {
    id: 'APT-001',
    lastName: 'DUPONT',
    firstName: 'Jean',
    birthDate: '15/03/1975',
    time: '09h30',
    doctor: 'Dr Martin',
    room: '12',
    floor: 'Rez-de-chaussée',
    instructions: 'Veuillez vous présenter en salle d\'attente.',
  },
  {
    id: 'APT-002',
    lastName: 'MARTIN',
    firstName: 'Claire',
    birthDate: '22/07/1982',
    time: '10h15',
    doctor: 'Dr Bernard',
    room: '4',
    floor: '1er étage',
    instructions: 'Prenez l\'ascenseur jusqu\'au 1er étage.',
  },
  {
    id: 'APT-003',
    lastName: 'LEROUX',
    firstName: 'Michel',
    birthDate: '08/11/1968',
    time: '11h00',
    doctor: 'Dr Fontaine',
    room: '7',
    floor: 'Rez-de-chaussée',
    instructions: 'Veuillez vous présenter en salle d\'attente.',
  },
  {
    id: 'APT-004',
    lastName: 'BERNARD',
    firstName: 'Sophie',
    birthDate: '14/04/1990',
    time: '14h30',
    doctor: 'Dr Leroy',
    room: '3',
    floor: 'Rez-de-chaussée',
    instructions: 'Veuillez vous présenter en salle d\'attente.',
  },
];

const arrivals = new Set<string>();

export function searchAppointment(params: SearchParams): Appointment | null {
  const prefix = params.namePrefix.toUpperCase().trim();
  const birth = params.birthDate.trim();

  const found = DEMO_DATA.find(
    (apt) =>
      apt.lastName.startsWith(prefix) &&
      apt.birthDate === birth
  );

  return found ?? null;
}

export function confirmArrival(appointmentId: string): boolean {
  arrivals.add(appointmentId);
  console.info(`[SIST79 LOG] Arrival confirmed — ID: ${appointmentId} at ${new Date().toISOString()}`);
  return true;
}
