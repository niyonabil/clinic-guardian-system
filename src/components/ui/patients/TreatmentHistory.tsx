
import React from 'react';
import { FileText, Calendar, AlertCircle, PlusCircle } from 'lucide-react';

interface TreatmentHistoryProps {
  patientId: string;
}

// Types simplifiés pour les traitements (ils seront enrichis avec les données réelles plus tard)
interface Treatment {
  id: string;
  date: string;
  type: string;
  description: string;
  dentist: string;
}

const TreatmentHistory: React.FC<TreatmentHistoryProps> = ({ patientId }) => {
  // Données de test, à remplacer par les données réelles
  const treatments: Treatment[] = [
    {
      id: 't1',
      date: '2023-05-15',
      type: 'Détartrage',
      description: 'Détartrage complet et polissage des surfaces dentaires.',
      dentist: 'Dr. Benjelloun'
    },
    {
      id: 't2',
      date: '2023-03-10',
      type: 'Traitement de carie',
      description: 'Traitement d\'une carie sur la molaire supérieure droite (16).',
      dentist: 'Dr. Mansouri'
    },
    {
      id: 't3',
      date: '2022-11-22',
      type: 'Consultation',
      description: 'Examen de routine. Aucun problème détecté.',
      dentist: 'Dr. Kadiri'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Historique des traitements</h3>
        <button className="btn-primary flex items-center text-sm">
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter un traitement
        </button>
      </div>
      
      {treatments.length > 0 ? (
        <div className="space-y-4">
          {treatments.map(treatment => (
            <div key={treatment.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{treatment.type}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(treatment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{treatment.dentist}</span>
                <button className="text-blue-600 hover:underline flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 glass-card">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucun traitement enregistré</h3>
          <p className="text-gray-500 mt-2">Ce patient n'a pas encore de traitements enregistrés</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentHistory;
