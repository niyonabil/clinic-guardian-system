
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { Appointment, Patient, Dentist, getStatusColor } from '@/lib/data';

interface AppointmentCardProps {
  appointment: Appointment;
  patient: Patient;
  dentist: Dentist;
  className?: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  patient,
  dentist,
  className,
}) => {
  return (
    <div className={cn('glass-card p-4 card-hover', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className={cn('badge', getStatusColor(appointment.status))}>
          {appointment.status === 'pending' && 'En attente'}
          {appointment.status === 'in-progress' && 'En cours'}
          {appointment.status === 'completed' && 'Terminé'}
          {appointment.status === 'cancelled' && 'Annulé'}
          {appointment.status === 'rescheduled' && 'Reporté'}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-3 w-3 mr-1" />
          <span>{appointment.startTime} - {appointment.endTime}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {patient.profileImage ? (
            <img src={patient.profileImage} alt={`${patient.firstName} ${patient.lastName}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
          )}
        </div>
        
        <div className="ml-3">
          <h4 className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</h4>
          <p className="text-sm text-gray-500">{appointment.treatment || 'Consultation'}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
        <span>Dr. {dentist.lastName}</span>
        <button className="btn-secondary text-xs py-1 px-3">Détails</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
