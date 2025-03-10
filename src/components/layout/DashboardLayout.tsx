
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { PageTransition } from '@/lib/transitions';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [pageKey, setPageKey] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(null);
  const [nextPage, setNextPage] = useState<React.ReactNode>(null);
  
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname !== pageKey) {
      setIsTransitioning(true);
      setNextPage(children);
      setPageKey(location.pathname);
    }
  }, [location.pathname, children, pageKey]);
  
  const handleExited = () => {
    setCurrentPage(nextPage);
    setNextPage(null);
    setIsTransitioning(false);
  };
  
  useEffect(() => {
    if (!isTransitioning && !currentPage) {
      setCurrentPage(children);
    }
  }, [children, isTransitioning, currentPage]);
  
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <PageTransition in={!isTransitioning} onExited={handleExited}>
            {currentPage}
          </PageTransition>
          {isTransitioning && (
            <PageTransition in={isTransitioning}>
              {nextPage}
            </PageTransition>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
