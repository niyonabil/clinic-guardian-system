
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarDays, Phone, ChevronRight } from 'lucide-react';
import { Patient, calculateAge } from '@/lib/data';

interface PatientCardProps {
  patient: Patient;
  className?: string;
  onClick?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, className, onClick }) => {
  const age = calculateAge(patient.birthDate);
  
  return (
    <div 
      className={cn('glass-card p-4 card-hover cursor-pointer', className)}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {patient.profileImage ? (
            <img src={patient.profileImage} alt={patient.firstName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <h4 className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</h4>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <span className="inline-flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {age} ans
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {patient.phone}
            </span>
          </div>
        </div>
        
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
      
      {(patient.allergies && patient.allergies.length > 0) && (
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-start">
            <span className="badge badge-red text-xs">Allergies</span>
            <span className="ml-2 text-xs text-gray-600">{patient.allergies.join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
