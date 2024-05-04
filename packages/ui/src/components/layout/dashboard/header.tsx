import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { UnstyledLink } from '@/components/unstyled-link';
import { Typography } from '@/components/typography';
import { Banner } from '@/components/banner';
import cn from '@/lib/classnames';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';

type User = {
  id: number;
  email: string;
  username: string;
  name: string;
  permissions: string[];
  related_model_id?: number;
  related_model_type?: 'App\\Domain\\Schools\\Models\\Smp';
  token: string;
  adminable?: {
    accreditation_score: number;
    city_id: number;
    code: string;
    id: number;
    name: string;
    npsn: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
};

export type HeaderProps = {
  bannerContents: (() => React.ReactNode)[];
  handleLogout: () => void;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};

const userNavigation = [{ name: 'Ubah Password', href: '/akun/ubah-password' }];

const Header = ({
  bannerContents,
  handleLogout,
  setSidebarOpen,
  user,
}: HeaderProps) => {
  const description = (() => {
    switch (user?.related_model_type) {
      case 'App\\Domain\\Schools\\Models\\Smp':
        return `${user.adminable?.name} - ${user.adminable?.npsn}`;
      default:
        return 'Super Admin';
    }
  })();

  return (
    <div className='sticky top-0 z-20 bg-white shadow'>
      <div className='relative z-10 dashboard-layout'>
        <div className='flex min-h-[3.5rem] flex-shrink-0 py-2 lg:min-h-[4rem]'>
          <button
            className={cn([
              '-ml-4 px-4',
              'border-r border-gray-200 text-gray-500 md:hidden',
              'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
            ])}
            onClick={() => setSidebarOpen(true)}
            type='button'
          >
            <span className='sr-only'>Open sidebar</span>
            <Menu aria-hidden='true' size={24} />
          </button>
          <div className='flex items-center justify-between flex-1'>
            <div className='flex flex-1 px-2 md:px-0'>
              <Typography color='secondary' variant='b3'>
                {format(new Date(), 'PPPP', {
                  locale: id,
                })}
              </Typography>
            </div>
            <div className='flex items-center md:ml-6'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={cn([
                      '-mr-2 flex max-w-xs items-center gap-4 rounded-md bg-white px-0.5 py-1 text-sm',
                      'focus:outline-none cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    ])}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <div className='flex-col items-end flex-1 hidden min-w-0 sm:flex'>
                      <Typography font='averta' variant='b2'>
                        Administrator
                      </Typography>
                      <Typography font='averta' variant='b3'>
                        ({description})
                      </Typography>
                    </div>
                    <img
                      alt='user-profile'
                      className='w-10 h-10 rounded-full'
                      src='https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <UnstyledLink className='flex-1' href={item.href}>
                        {item.name}
                      </UnstyledLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={handleLogout}>
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <Banner contents={bannerContents} />
    </div>
  );
};
Header.displayName = 'DashboardHeader';

export { Header };
