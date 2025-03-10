
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AppointmentList from '@/components/ui/appointments/AppointmentList';
import { CalendarPlus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { sampleAppointments } from '@/lib/data';

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formatDateHeader = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const navigateDay = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };
  
  const resetToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Get appointments for the current selected date
  const currentDateStr = currentDate.toISOString().split('T')[0];
  const filteredAppointments = sampleAppointments.filter(
    appointment => appointment.date === currentDateStr
  );
  
  return (
    <DashboardLayout>
      <div className="page-transition p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="text-gray-600 mt-1">Gestion de l'agenda et des consultations</p>
          </div>
          <button className="btn-primary flex items-center">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Nouveau rendez-vous
          </button>
        </div>
        
        <div className="glass-panel p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigateDay(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-medium text-gray-900 capitalize">
                {formatDateHeader(currentDate)}
              </h2>
              
              <button 
                onClick={resetToToday}
                className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
              >
                <CalendarIcon className="h-3 w-3 mr-1" />
                Aujourd'hui
              </button>
            </div>
            
            <button 
              onClick={() => navigateDay(1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="badge-blue">Tous</span>
            <span className="badge-gray">En attente</span>
            <span className="badge-gray">En cours</span>
            <span className="badge-gray">Terminés</span>
            <span className="badge-gray">Annulés</span>
          </div>
        </div>
        
        <AppointmentList appointments={filteredAppointments} />
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
