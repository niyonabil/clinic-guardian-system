
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope,
  MoreVertical
} from 'lucide-react';
import { 
  Appointment, 
  Patient, 
  Dentist, 
  getStatusColor,
  getPatientById,
  getDentistById
} from '@/lib/data';

interface AppointmentListProps {
  appointments: Appointment[];
  className?: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, className }) => {
  if (!appointments.length) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">Aucun rendez-vous disponible</p>
      </div>
    );
  }
  
  const getStatusText = (status: Appointment['status']): string => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      case 'rescheduled':
        return 'Reporté';
      default:
        return 'Inconnu';
    }
  };
  
  return (
    <div className={cn('space-y-2', className)}>
      {appointments.map((appointment) => {
        const patient = getPatientById(appointment.patientId);
        const dentist = getDentistById(appointment.dentistId);
        
        if (!patient || !dentist) return null;
        
        return (
          <div 
            key={appointment.id}
            className="glass-card p-4 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-gray-500 mr-1.5" />
                <span className="text-sm text-gray-700">
                  {new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={cn('badge', getStatusColor(appointment.status))}>
                  {getStatusText(appointment.status)}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{appointment.startTime} - {appointment.endTime}</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700 truncate">{patient.firstName} {patient.lastName}</span>
              </div>
              
              <div className="flex items-center">
                <Stethoscope className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Dr. {dentist.lastName}</span>
              </div>
            </div>
            
            {appointment.treatment && (
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Traitement:</span> {appointment.treatment}
                </p>
              </div>
            )}
            
            <div className="mt-3 flex justify-end space-x-2">
              <button className="text-xs py-1 px-3 btn-secondary">Modifier</button>
              <button className="text-xs py-1 px-3 btn-primary">Détails</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
