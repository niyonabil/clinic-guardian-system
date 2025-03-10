
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/dashboard/StatCard';
import AppointmentCard from '@/components/ui/dashboard/AppointmentCard';
import PatientSummary from '@/components/ui/dashboard/PatientSummary';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  samplePatients,
  getAppointmentWithDetails,
  getTodaysAppointments,
  getUpcomingAppointments
} from '@/lib/data';

const Dashboard = () => {
  const todayAppointments = getTodaysAppointments();
  const upcomingAppointments = getUpcomingAppointments().slice(0, 3);
  
  // Get today's appointments with patient and dentist details
  const todayAppointmentsWithDetails = todayAppointments
    .map(appointment => getAppointmentWithDetails(appointment.id))
    .filter(Boolean);
  
  // Get upcoming appointments with details
  const upcomingAppointmentsWithDetails = upcomingAppointments
    .map(appointment => getAppointmentWithDetails(appointment.id))
    .filter(Boolean);
  
  return (
    <DashboardLayout>
      <div className="page-transition p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Bienvenue sur le gestionnaire de cabinet dentaire</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              Export
            </button>
            <button className="btn-primary">
              Nouveau patient
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Patients" 
            value={samplePatients.length} 
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard 
            title="Rendez-vous aujourd'hui" 
            value={todayAppointments.length} 
            icon={Calendar}
            iconClassName="bg-coral/10 text-coral"
          />
          <StatCard 
            title="Chiffre d'affaires" 
            value="8,250 DH" 
            icon={DollarSign}
            trend={{ value: 8.1, isPositive: true }}
            iconClassName="bg-green-500/10 text-green-600"
          />
          <StatCard 
            title="Taux d'occupation" 
            value="85%" 
            icon={Activity}
            trend={{ value: 5.2, isPositive: false }}
            iconClassName="bg-amber-500/10 text-amber-600"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Rendez-vous d'aujourd'hui</h2>
                <button className="text-sm text-blue flex items-center hover:underline">
                  Voir tous
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
              
              {todayAppointmentsWithDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todayAppointmentsWithDetails.map(appointment => (
                    appointment && (
                      <AppointmentCard 
                        key={appointment.id}
                        appointment={appointment}
                        patient={appointment.patient}
                        dentist={appointment.dentist}
                      />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-gray-500">Pas de rendez-vous aujourd'hui</h3>
                </div>
              )}
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Prochains rendez-vous</h2>
                <button className="text-sm text-blue flex items-center hover:underline">
                  Voir agenda
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
              
              {upcomingAppointmentsWithDetails.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointmentsWithDetails.map(appointment => (
                    appointment && (
                      <AppointmentCard 
                        key={appointment.id}
                        appointment={appointment}
                        patient={appointment.patient}
                        dentist={appointment.dentist}
                      />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-gray-500">Pas de rendez-vous à venir</h3>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <PatientSummary patient={samplePatients[0]} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
