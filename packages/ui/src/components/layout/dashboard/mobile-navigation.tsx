import * as React from 'react';
import { Sheet, SheetContent, SheetHeader } from '@/components/sheet';
import type { GroupedNavigation } from '@/components/layout/dashboard/navigation';
import { Navigation } from '@/components/layout/dashboard/navigation';

export type MobileNavigationProps = {
  logo: React.ReactNode;
  sidebarMenu: GroupedNavigation[];
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavigation = ({
  logo,
  sidebarMenu,
  sidebarOpen,
  setSidebarOpen,
}: MobileNavigationProps) => {
  return (
    <Sheet onOpenChange={setSidebarOpen} open={sidebarOpen}>
      <SheetContent className='flex flex-col w-[85%] max-w-xs' side='left'>
        <SheetHeader className='text-left'>{logo}</SheetHeader>
        <div className='overflow-y-auto'>
          <Navigation className='pr-1' groupNavs={sidebarMenu} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
MobileNavigation.displayName = 'MobileNavigation';

export { MobileNavigation };
