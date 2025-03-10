
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  cin?: string; // Only for adults
  phone: string;
  email: string;
  address: string;
  bloodType?: string;
  allergies?: string[];
  medicalHistory?: string;
  createdAt: string;
  profileImage?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  treatment?: string;
  created: string;
}

export interface Dentist {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'dentist' | 'secretary';
  avatar?: string;
}

// Sample data for development
export const samplePatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'Mohammed',
    lastName: 'Alami',
    birthDate: '1985-05-15',
    cin: 'AB123456',
    phone: '0661234567',
    email: 'mohammed.alami@example.com',
    address: '123 Rue Hassan II, Casablanca',
    bloodType: 'O+',
    allergies: ['Pénicilline'],
    medicalHistory: 'Hypertension',
    createdAt: '2023-01-10T10:30:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'p2',
    firstName: 'Fatima',
    lastName: 'Benali',
    birthDate: '1990-08-22',
    cin: 'CD789012',
    phone: '0662345678',
    email: 'fatima.benali@example.com',
    address: '45 Avenue Mohammed V, Rabat',
    bloodType: 'A+',
    allergies: [],
    medicalHistory: '',
    createdAt: '2023-02-15T14:20:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'p3',
    firstName: 'Youssef',
    lastName: 'Lahlou',
    birthDate: '1975-12-03',
    cin: 'EF345678',
    phone: '0663456789',
    email: 'youssef.lahlou@example.com',
    address: '78 Boulevard Anfa, Casablanca',
    bloodType: 'B-',
    allergies: ['Aspirine', 'Sulfamides'],
    medicalHistory: 'Diabète type 2',
    createdAt: '2023-03-05T09:15:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'p4',
    firstName: 'Amina',
    lastName: 'Hakimi',
    birthDate: '2010-04-18',
    phone: '0664567890',
    email: 'parent.hakimi@example.com',
    address: '12 Rue Ibn Sina, Marrakech',
    bloodType: 'AB+',
    allergies: [],
    medicalHistory: 'Asthme léger',
    createdAt: '2023-02-28T11:45:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'p5',
    firstName: 'Karim',
    lastName: 'Tazi',
    birthDate: '1982-09-30',
    cin: 'GH901234',
    phone: '0665678901',
    email: 'karim.tazi@example.com',
    address: '34 Avenue Hassan II, Fès',
    bloodType: 'O-',
    allergies: ['Iode'],
    medicalHistory: 'Hypothyroïdie',
    createdAt: '2023-04-10T16:30:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=8',
  },
];

export const sampleDentists: Dentist[] = [
  {
    id: 'd1',
    firstName: 'Ahmed',
    lastName: 'Benjelloun',
    specialization: 'Orthodontie',
    email: 'dr.benjelloun@dental-clinic.com',
    phone: '0667890123',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'd2',
    firstName: 'Leila',
    lastName: 'Mansouri',
    specialization: 'Parodontologie',
    email: 'dr.mansouri@dental-clinic.com',
    phone: '0668901234',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'd3',
    firstName: 'Omar',
    lastName: 'Kadiri',
    specialization: 'Chirurgie dentaire',
    email: 'dr.kadiri@dental-clinic.com',
    phone: '0669012345',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
];

export const sampleAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    dentistId: 'd1',
    date: '2023-06-15',
    startTime: '09:00',
    endTime: '10:00',
    status: 'completed',
    notes: 'Contrôle orthodontique mensuel',
    treatment: 'Ajustement d\'appareil',
    created: '2023-06-01T08:30:00Z',
  },
  {
    id: 'a2',
    patientId: 'p2',
    dentistId: 'd2',
    date: '2023-06-15',
    startTime: '10:30',
    endTime: '11:30',
    status: 'completed',
    notes: 'Détartrage',
    treatment: 'Nettoyage professionnel',
    created: '2023-06-02T15:45:00Z',
  },
  {
    id: 'a3',
    patientId: 'p3',
    dentistId: 'd3',
    date: '2023-06-15',
    startTime: '14:00',
    endTime: '15:30',
    status: 'completed',
    notes: 'Extraction dent de sagesse',
    treatment: 'Extraction dentaire',
    created: '2023-06-05T11:20:00Z',
  },
  {
    id: 'a4',
    patientId: 'p4',
    dentistId: 'd1',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    status: 'in-progress',
    notes: 'Premier rendez-vous orthodontique',
    treatment: 'Consultation et plan de traitement',
    created: '2023-06-07T09:15:00Z',
  },
  {
    id: 'a5',
    patientId: 'p5',
    dentistId: 'd2',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '12:00',
    status: 'pending',
    notes: 'Douleur à la molaire',
    treatment: 'Examen et diagnostic',
    created: '2023-06-10T14:30:00Z',
  },
  {
    id: 'a6',
    patientId: 'p1',
    dentistId: 'd3',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:00',
    status: 'pending',
    notes: 'Implant dentaire consultation',
    treatment: 'Évaluation pour implant',
    created: '2023-06-12T10:45:00Z',
  },
  {
    id: 'a7',
    patientId: 'p2',
    dentistId: 'd1',
    date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '09:30',
    endTime: '10:30',
    status: 'pending',
    notes: 'Suivi traitement orthodontique',
    treatment: 'Ajustement d\'appareil',
    created: '2023-06-13T16:20:00Z',
  },
];

export const getPatientById = (id: string): Patient | undefined => {
  return samplePatients.find(patient => patient.id === id);
};

export const getDentistById = (id: string): Dentist | undefined => {
  return sampleDentists.find(dentist => dentist.id === id);
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return sampleAppointments.find(appointment => appointment.id === id);
};

export const getTodaysAppointments = (): Appointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return sampleAppointments.filter(appointment => appointment.date === today);
};

export const getUpcomingAppointments = (): Appointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return sampleAppointments.filter(
    appointment => appointment.date > today && appointment.status === 'pending'
  );
};

export const getPatientAppointments = (patientId: string): Appointment[] => {
  return sampleAppointments.filter(appointment => appointment.patientId === patientId);
};

export const getAppointmentWithDetails = (appointmentId: string) => {
  const appointment = getAppointmentById(appointmentId);
  if (!appointment) return null;
  
  const patient = getPatientById(appointment.patientId);
  const dentist = getDentistById(appointment.dentistId);
  
  return {
    ...appointment,
    patient,
    dentist,
  };
};

export const getStatusColor = (status: Appointment['status']): string => {
  switch (status) {
    case 'pending':
      return 'badge-amber';
    case 'in-progress':
      return 'badge-blue';
    case 'completed':
      return 'badge-green';
    case 'cancelled':
      return 'badge-red';
    case 'rescheduled':
      return 'badge-gray';
    default:
      return 'badge-gray';
  }
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};
