
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarDays, Phone, Mail, MapPin } from 'lucide-react';
import { Patient, calculateAge } from '@/lib/data';

interface PatientSummaryProps {
  patient: Patient;
  className?: string;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patient, className }) => {
  const age = calculateAge(patient.birthDate);
  
  return (
    <div className={cn('glass-card overflow-hidden', className)}>
      <div className="flex flex-col items-center p-6 bg-blue/5 border-b border-blue/10">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-4">
          {patient.profileImage ? (
            <img src={patient.profileImage} alt={patient.firstName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{patient.firstName} {patient.lastName}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {age} ans • {patient.bloodType || 'Groupe sanguin non spécifié'}
        </p>
        
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mt-3 text-center">
            <span className="badge badge-red inline-block mb-1">Allergies</span>
            <p className="text-xs text-gray-600">{patient.allergies.join(', ')}</p>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-start">
          <Phone className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <p className="text-sm text-gray-900">{patient.phone}</p>
            <p className="text-xs text-gray-500">Téléphone</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <p className="text-sm text-gray-900">{patient.email}</p>
            <p className="text-xs text-gray-500">Email</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <p className="text-sm text-gray-900">{patient.address}</p>
            <p className="text-xs text-gray-500">Adresse</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <CalendarDays className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <p className="text-sm text-gray-900">{new Date(patient.birthDate).toLocaleDateString('fr-FR')}</p>
            <p className="text-xs text-gray-500">Date de naissance</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-4 flex justify-between">
        <button className="btn-secondary text-xs py-1 px-3">Historique</button>
        <button className="btn-primary text-xs py-1 px-3">Nouveau RDV</button>
      </div>
    </div>
  );
};

export default PatientSummary;
