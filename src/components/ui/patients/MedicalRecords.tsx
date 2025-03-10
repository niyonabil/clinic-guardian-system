
import React from 'react';
import { Heart, AlertTriangle, PlusCircle, FileText, Calendar } from 'lucide-react';

interface MedicalRecordsProps {
  patientId: string;
}

// Types simplifiés pour les dossiers médicaux (ils seront enrichis avec les données réelles plus tard)
interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  isImportant: boolean;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ patientId }) => {
  // Données de test, à remplacer par les données réelles
  const medicalRecords: MedicalRecord[] = [
    {
      id: 'm1',
      date: '2023-04-10',
      type: 'Antécédent médical',
      description: 'Patient diagnostiqué avec hypertension, sous traitement régulier.',
      isImportant: true
    },
    {
      id: 'm2',
      date: '2023-02-05',
      type: 'Allergie',
      description: 'Allergie à la pénicilline confirmée lors d\'un test allergologique.',
      isImportant: true
    },
    {
      id: 'm3',
      date: '2022-09-15',
      type: 'Examen général',
      description: 'Tension artérielle normale. Aucun problème significatif détecté.',
      isImportant: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Dossier médical</h3>
        <button className="btn-primary flex items-center text-sm">
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter un élément
        </button>
      </div>
      
      {medicalRecords.length > 0 ? (
        <div className="space-y-4">
          {medicalRecords.map(record => (
            <div key={record.id} className={`glass-card p-4 ${record.isImportant ? 'border-l-4 border-amber-500' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {record.isImportant ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                  ) : (
                    <Heart className="h-4 w-4 text-blue-500 mr-2" />
                  )}
                  <h4 className="font-medium">{record.type}</h4>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(record.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{record.description}</p>
              
              <div className="flex justify-end">
                <button className="text-blue-600 hover:underline flex items-center text-sm">
                  <FileText className="h-3 w-3 mr-1" />
                  Voir rapport complet
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 glass-card">
          <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucun dossier médical</h3>
          <p className="text-gray-500 mt-2">Ce patient n'a pas encore d'informations médicales enregistrées</p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
