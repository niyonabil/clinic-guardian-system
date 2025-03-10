
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientSummary from '@/components/ui/dashboard/PatientSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, FileText, PlusCircle, Activity, 
  Clock, RotateCw, CheckCircle, XCircle
} from 'lucide-react';
import { 
  Patient, Appointment, 
  getPatientById, getPatientAppointments, 
  getAppointmentWithDetails, calculateAge, getStatusColor
} from '@/lib/data';
import TreatmentHistory from '@/components/ui/patients/TreatmentHistory';
import MedicalRecords from '@/components/ui/patients/MedicalRecords';

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!id) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h2 className="text-xl text-red-500">Erreur: Identifiant patient manquant</h2>
          <button 
            className="btn-primary mt-4"
            onClick={() => navigate('/patients')}
          >
            Retour à la liste des patients
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  const patient = getPatientById(id);
  
  if (!patient) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h2 className="text-xl text-red-500">Patient non trouvé</h2>
          <button 
            className="btn-primary mt-4"
            onClick={() => navigate('/patients')}
          >
            Retour à la liste des patients
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  const patientAppointments = getPatientAppointments(id);
  const appointmentsWithDetails = patientAppointments
    .map(appointment => getAppointmentWithDetails(appointment.id))
    .filter(Boolean);
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center">
              <button 
                className="text-gray-400 hover:text-gray-600 mr-2"
                onClick={() => navigate('/patients')}
              >
                ← Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dossier patient</h1>
            </div>
            <p className="text-gray-600 mt-1">
              {patient.firstName} {patient.lastName} • {calculateAge(patient.birthDate)} ans
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Nouveau rendez-vous
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PatientSummary patient={patient} />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="glass-panel"
            >
              <div className="px-4 pt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="treatments">Traitements</TabsTrigger>
                  <TabsTrigger value="records">Dossier médical</TabsTrigger>
                  <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="p-4">
                <div className="grid grid-cols-1 gap-6">
                  <div className="glass-card p-4">
                    <h3 className="text-lg font-medium mb-4">Résumé du patient</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Informations personnelles</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li><span className="text-gray-500">Nom:</span> {patient.firstName} {patient.lastName}</li>
                          <li><span className="text-gray-500">Âge:</span> {calculateAge(patient.birthDate)} ans</li>
                          {patient.cin && <li><span className="text-gray-500">CIN:</span> {patient.cin}</li>}
                          <li><span className="text-gray-500">Téléphone:</span> {patient.phone}</li>
                          <li><span className="text-gray-500">Email:</span> {patient.email}</li>
                          <li><span className="text-gray-500">Adresse:</span> {patient.address}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Informations médicales</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                          {patient.bloodType && <li><span className="text-gray-500">Groupe sanguin:</span> {patient.bloodType}</li>}
                          <li>
                            <span className="text-gray-500">Allergies:</span> 
                            {patient.allergies && patient.allergies.length > 0 
                              ? <span className="badge badge-red ml-2">{patient.allergies.join(', ')}</span>
                              : <span className="text-gray-700 ml-2">Aucune allergie connue</span>}
                          </li>
                          <li>
                            <span className="text-gray-500">Antécédents:</span>
                            <span className="text-gray-700 ml-2">{patient.medicalHistory || 'Aucun antécédent médical connu'}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Prochains rendez-vous</h3>
                      <button className="text-sm text-blue flex items-center hover:underline">
                        Voir tous
                        <RotateCw className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                    
                    {appointmentsWithDetails.length > 0 ? (
                      <div className="space-y-4">
                        {appointmentsWithDetails
                          .filter(appointment => appointment && appointment.status === 'pending')
                          .slice(0, 3)
                          .map(appointment => appointment && (
                            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <p className="font-medium">{new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{appointment.startTime} - {appointment.endTime}</span>
                                    <span className="mx-2">•</span>
                                    <span>Dr. {appointment.dentist?.lastName}</span>
                                  </div>
                                </div>
                              </div>
                              <span className={`badge ${getStatusColor(appointment.status)}`}>
                                {appointment.status === 'pending' ? 'À venir' : appointment.status}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-gray-500">Aucun rendez-vous à venir</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="treatments" className="p-4">
                <TreatmentHistory patientId={id} />
              </TabsContent>
              
              <TabsContent value="records" className="p-4">
                <MedicalRecords patientId={id} />
              </TabsContent>
              
              <TabsContent value="appointments" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Historique des rendez-vous</h3>
                  <button className="btn-primary flex items-center text-sm">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Nouveau rendez-vous
                  </button>
                </div>
                
                {appointmentsWithDetails.length > 0 ? (
                  <div className="space-y-3">
                    {appointmentsWithDetails.map(appointment => appointment && (
                      <div key={appointment.id} className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="font-medium">{new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                          <span className={`badge ${getStatusColor(appointment.status)}`}>
                            {appointment.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {appointment.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                            {appointment.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {appointment.status === 'in-progress' && <Activity className="h-3 w-3 mr-1" />}
                            {appointment.status === 'completed' && 'Terminé'}
                            {appointment.status === 'cancelled' && 'Annulé'}
                            {appointment.status === 'pending' && 'À venir'}
                            {appointment.status === 'in-progress' && 'En cours'}
                            {appointment.status === 'rescheduled' && 'Reporté'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{appointment.startTime} - {appointment.endTime}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{appointment.treatment || 'Consultation'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-sm">Dr. {appointment.dentist?.lastName}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Notes:</span> {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 glass-card">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Aucun rendez-vous</h3>
                    <p className="text-gray-500 mt-2">Ce patient n'a pas encore de rendez-vous enregistrés</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetail;
