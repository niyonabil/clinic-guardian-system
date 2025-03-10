
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  PieChart, 
  Settings, 
  Package, 
  FileText, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Tooth
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const active = isActive(to);
    
    return (
      <Link
        to={to}
        className={cn(
          'flex items-center px-3 py-2 my-1 rounded-lg text-sm font-medium transition-all duration-200',
          active 
            ? 'bg-blue text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    );
  };
  
  return (
    <aside 
      className={cn(
        'h-screen flex flex-col bg-white border-r border-gray-100 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue rounded-lg">
            <Tooth className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <h1 className="ml-3 text-xl font-semibold text-gray-900">Dentali</h1>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-4 px-3 overflow-y-auto">
        <nav className="space-y-1 flex-1">
          <NavItem to="/" icon={LayoutDashboard} label="Tableau de bord" />
          <NavItem to="/patients" icon={Users} label="Patients" />
          <NavItem to="/appointments" icon={Calendar} label="Rendez-vous" />
          <NavItem to="/waiting-room" icon={ClipboardList} label="Salle d'attente" />
          <NavItem to="/consultations" icon={FileText} label="Consultations" />
          <NavItem to="/inventory" icon={Package} label="Inventaire" />
          <NavItem to="/analytics" icon={PieChart} label="Analytique" />
          <NavItem to="/settings" icon={Settings} label="Paramètres" />
        </nav>
        
        <div className="pt-2 border-t border-gray-100">
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;
