
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WaitingRoomDisplay from '@/components/ui/waitingRoom/WaitingRoomDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UsersRound, 
  Monitor, 
  CalendarClock,
  AlertCircle
} from 'lucide-react';

const WaitingRoom = () => {
  const [mode, setMode] = useState<'admin' | 'public'>('admin');
  
  return (
    <DashboardLayout>
      <div className="page-transition p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Salle d'attente</h1>
            <p className="text-gray-600 mt-1">Gestion et affichage des patients en attente</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setMode('admin')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'admin' 
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UsersRound className="h-4 w-4 mr-2" />
              Vue Admin
            </button>
            
            <button
              onClick={() => setMode('public')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'public' 
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Vue Publique
            </button>
          </div>
        </div>
        
        <div className="glass-panel p-4 mb-6">
          <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="text-sm">
              La vue publique est conçue pour être affichée sur un écran en salle d'attente. Les informations des patients sont partiellement anonymisées pour préserver la confidentialité.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="waiting">
          <TabsList className="mb-6">
            <TabsTrigger value="waiting" className="data-[state=active]:bg-blue data-[state=active]:text-white">
              <UsersRound className="h-4 w-4 mr-2" />
              Patients en attente
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-blue data-[state=active]:text-white">
              <CalendarClock className="h-4 w-4 mr-2" />
              Programme du jour
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="waiting" className="mt-0">
            <WaitingRoomDisplay publicDisplay={mode === 'public'} />
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-0">
            <div className="glass-panel p-8 text-center">
              <CalendarClock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800">Programme du jour</h3>
              <p className="text-gray-500 mt-2">Cette fonctionnalité sera disponible prochainement</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WaitingRoom;
