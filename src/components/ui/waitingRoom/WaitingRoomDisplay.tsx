
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, UserCheck } from 'lucide-react';
import { 
  Appointment, 
  getPatientById, 
  getDentistById,
  getTodaysAppointments
} from '@/lib/data';

interface WaitingRoomDisplayProps {
  className?: string;
  publicDisplay?: boolean;
}

const WaitingRoomDisplay: React.FC<WaitingRoomDisplayProps> = ({ 
  className,
  publicDisplay = false
}) => {
  const todayAppointments = getTodaysAppointments();
  
  // Filter for pending and in-progress appointments only
  const waitingAppointments = todayAppointments.filter(
    appointment => ['pending', 'in-progress'].includes(appointment.status)
  ).sort((a, b) => {
    // Sort by status first (in-progress first), then by time
    if (a.status === 'in-progress' && b.status !== 'in-progress') return -1;
    if (a.status !== 'in-progress' && b.status === 'in-progress') return 1;
    return a.startTime.localeCompare(b.startTime);
  });
  
  if (!waitingAppointments.length) {
    return (
      <div className={cn('glass-panel p-8 text-center', className)}>
        <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-800">Salle d&apos;attente vide</h3>
        <p className="text-gray-500 mt-2">Aucun patient en attente pour le moment</p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      'glass-panel overflow-hidden',
      publicDisplay ? 'text-lg' : '',
      className
    )}>
      <div className="bg-blue text-white p-4 flex items-center justify-between">
        <h3 className={cn(
          'font-medium',
          publicDisplay ? 'text-xl' : 'text-lg'
        )}>
          {publicDisplay ? 'Patients en attente' : 'Salle d&apos;attente'}
        </h3>
        <div className="flex items-center text-white/90">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {new Date().toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {publicDisplay ? 'Patient' : 'Nom'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Heure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {publicDisplay ? 'Dentiste' : 'Dr.'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {waitingAppointments.map((appointment) => {
              const patient = getPatientById(appointment.patientId);
              const dentist = getDentistById(appointment.dentistId);
              
              if (!patient || !dentist) return null;
              
              // For public display, anonymize patient info
              const displayName = publicDisplay
                ? `${patient.firstName[0]}. ${patient.lastName[0]}.`
                : `${patient.firstName} ${patient.lastName}`;
              
              return (
                <tr 
                  key={appointment.id}
                  className={cn(
                    appointment.status === 'in-progress' ? 'bg-blue/5' : '',
                    'hover:bg-gray-50 transition-colors'
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{displayName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{appointment.startTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {publicDisplay ? `Dr. ${dentist.lastName}` : dentist.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'badge',
                      appointment.status === 'in-progress' ? 'badge-blue' : 'badge-amber'
                    )}>
                      {appointment.status === 'in-progress' ? 'En consultation' : 'En attente'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaitingRoomDisplay;
