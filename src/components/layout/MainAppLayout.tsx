import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // Sidebar width: w-56 (14rem)
  // Header height: h-[64px]

  return (
    <div className={cn('min-h-screen bg-background')}>
      <Sidebar />
      <TopHeader /> 
      {/* onMenuToggle can be passed to TopHeader if sidebar toggle functionality is needed */}
      
      <main 
        className={cn(
          'ml-56',      // Offset for the fixed sidebar (w-56)
          'mt-[64px]',  // Offset for the fixed header (h-[64px])
          'p-6',        // Padding for the content itself, as per mainContent.layout
          'overflow-y-auto', // For scrollability, as per overall.sizing.mainContent & mainContent.notes
          'h-[calc(100vh-64px)]' // Make it take the remaining height under the header
        )}
      >
        {/* This inner div is for mainContent.container styling if needed */}
        <div className={cn(
          'flex flex-col gap-6' // from mainContent.container
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
