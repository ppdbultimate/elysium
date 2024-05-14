import * as React from 'react';
import {
  Navigation,
  type TGroupNavigation,
} from '@/components/layout/dashboard/navigation';

export type DesktopNavigationProps = {
  logo: React.ReactNode;
  sidebarMenu: TGroupNavigation[];
};

const DesktopNavigation = ({ logo, sidebarMenu }: DesktopNavigationProps) => {
  return (
    <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
      <div className='fixed inset-x-0 top-0 flex min-h-[4rem] flex-shrink-0 items-center px-4'>
        {logo}
      </div>
      <div className='mt-16 flex flex-grow flex-col overflow-y-auto'>
        <Navigation
          className='flex-1 space-y-1 pb-4 px-2 md:px-3'
          groupNavs={sidebarMenu}
        />
      </div>
    </div>
  );
};
DesktopNavigation.displayName = 'DesktopNavigation';

export { DesktopNavigation };
