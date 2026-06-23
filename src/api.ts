import userData from './data/user.json';
import type { Appointment, SearchParams, User, UserAppointment } from './types';

const users = userData.users as User[];
const arrivals = new Set<string>();

function todayString(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function parseDate(value: string): Date {
  const [dd, mm, yyyy] = value.split('/').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function pickAppointment(appointments: UserAppointment[]): UserAppointment | null {
  if (!appointments.length) return null;

  const today = todayString();
  const todayApt = appointments.find((a) => a.date === today);
  if (todayApt) return todayApt;

  const todayTime = parseDate(today).getTime();
  const sorted = [...appointments].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );

  return sorted.find((a) => parseDate(a.date).getTime() >= todayTime) ?? sorted[sorted.length - 1];
}

function sortAppointments(appointments: UserAppointment[]): UserAppointment[] {
  return [...appointments].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );
}

function buildInstructions(apt: UserAppointment): string {
  return `Rendez-vous au ${apt.building}, ${apt.floor}, ${apt.room}.`;
}

export function searchAppointment(params: SearchParams): Appointment | null {
  const prefix = params.namePrefix.toUpperCase().trim();
  const birth = params.birthDate.trim();

  const user = users.find(
    (u) => u.lastName.startsWith(prefix) && u.birthDate === birth,
  );
  if (!user) return null;

  const apt = pickAppointment(user.appointments);
  if (!apt) return null;

  const today = todayString();
  const allAppointments = sortAppointments(user.appointments);

  return {
    id: apt.id,
    userId: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    birthDate: user.birthDate,
    avatar: user.avatar,
    medicalRecordId: user.medicalRecordId,
    date: apt.date,
    time: apt.time,
    doctor: apt.doctor,
    room: apt.room,
    floor: apt.floor,
    building: apt.building,
    specialty: apt.specialty,
    instructions: buildInstructions(apt),
    isToday: apt.date === today,
    appointments: allAppointments,
  };
}

export function confirmArrival(appointmentId: string): boolean {
  arrivals.add(appointmentId);
  console.info(`[SIST79 LOG] Arrival confirmed — ID: ${appointmentId} at ${new Date().toISOString()}`);
  return true;
}
