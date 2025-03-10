
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientCard from '@/components/ui/patients/PatientCard';
import { Patient, samplePatients } from '@/lib/data';
import { PlusCircle, Search, FilterX, UserPlus } from 'lucide-react';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const filteredPatients = samplePatients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           patient.phone.includes(searchTerm) || 
           patient.email.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handlePatientClick = (patient: Patient) => {
    navigate(`/patient/${patient.id}`);
  };
  
  return (
    <DashboardLayout>
      <div className="page-transition p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-1">Gestion des dossiers patients</p>
          </div>
          <button className="btn-primary flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau patient
          </button>
        </div>
        
        <div className="glass-panel p-4 mb-6">
          <div className="relative flex items-center mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un patient par nom, téléphone ou email..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue/20 focus:bg-white transition-all"
            />
            
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <FilterX className="h-3 w-3 text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="badge-blue">Tous</span>
            <span className="badge-gray">Récents</span>
            <span className="badge-gray">Programmés</span>
            <span className="badge-gray">Traitement en cours</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(patient => (
              <PatientCard 
                key={patient.id}
                patient={patient}
                onClick={() => handlePatientClick(patient)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800">Aucun patient trouvé</h3>
              <p className="text-gray-500 mt-2 mb-4">Aucun patient ne correspond à votre recherche</p>
              <button className="btn-primary inline-flex items-center">
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter un patient
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
