'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import LoginConnectionsPage from './settings-pages/login-connections';
import { ExtendedSession, UserWithSettings } from '@/lib/types/types';
import NotificationsPage from './settings-pages/notifications';
import GeneralSettingsPage from './settings-pages/general';
import useMutateUser from '@/hooks/useMutateUser';
import { cn } from '@/lib/utils/cn';

const menuVariants = {
  closed: {
    opacity: 0,
    height: '0%',
    display: 'none',
    marginBottom: 0,
  },
  open: {
    opacity: 1,
    height: '100%',
    display: 'block',
    marginBottom: 20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const SettingsContent = ({ user }: { user: UserWithSettings }) => {
  const searchParams = useSearchParams();

  const section = searchParams.get('s');
  const { update, data: session } = useSession();

  const { mutateUser, isLoading } = useMutateUser();

  const checkIfMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return true;
    return false;
  };

  const sectionIfMobileDefault = checkIfMobile() ? '' : 'General';

  const sectionFromSearchProper = section
    ? section.toLowerCase().slice(0, 1).toUpperCase() + section.slice(1)
    : sectionIfMobileDefault;

  const [activePage, setActivePage] = useState(sectionFromSearchProper);

  if (typeof document !== 'undefined' && !!document && !!activePage) {
    document.title = `${activePage || 'Settings'} | ByteNinja`;
  }

  const replaceSearchParams = (newSection?: string) => {
    const newParams = new URLSearchParams(window.location.search);
    if (typeof window !== 'undefined' && newSection) {
      newParams.set('s', newSection.toLocaleLowerCase());
    } else {
      newParams.delete('s');
    }
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${newParams.get('s') ? `?${newParams}` : ''}`,
    );
  };

  const settingsPages = [
    { name: 'General', component: GeneralSettingsPage },
    { name: 'Login', component: LoginConnectionsPage },
    //s{ name: 'Billing', component: NotificationsPage },
    { name: 'Notifications', component: NotificationsPage },
  ];

  return (
    <div className="flex flex-row px-0 sm:px-10">
      <div
        id="left"
        className="flex flex-col md:w-1/4 ml-[-12px] gap-0.5 justify-center sm:justify-start sm:items-start w-full"
      >
        {settingsPages.map((page) => {
          const ActivePageComponent = page.component;
          return (
            <div className="pl-6 w-full sm:pl-0 xl:pl-[72px]" key={page.name}>
              <div
                className={cn(
                  'flex flex-row text-neutral-500 transition-all text-lg sm:min-w-[150px] hover:bg-neutral-500/30 py-2 px-3 rounded-sm sm:w-4/5 font-light cursor-pointer sm:text-base',
                  activePage === page.name &&
                    'text-black dark:text-neutral-50 font-medium',
                )}
                onClick={() => {
                  setActivePage(page.name === activePage ? '' : page.name);
                  page.name === activePage
                    ? replaceSearchParams()
                    : replaceSearchParams(page.name);
                }}
              >
                <span>{page.name}</span>
              </div>
              <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800 sm:hidden block" />
              <div className="block sm:hidden overflow:hidden m-0">
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate={activePage === page.name ? 'open' : 'closed'}
                  className="mt-5"
                >
                  <ActivePageComponent
                    user={user}
                    key={0}
                    updateUser={(user: UserWithSettings) => {
                      mutateUser(user);
                    }}
                    updateSession={update}
                    session={session as ExtendedSession}
                    isLoading={isLoading}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      <div id="right" className="hidden sm:w-3/4 sm:block">
        {settingsPages.map((page) => {
          if (page.name === activePage) {
            const ActivePageComponent = page.component;
            return (
              <ActivePageComponent
                user={user}
                key={0}
                updateUser={(user: UserWithSettings) => mutateUser(user)}
                updateSession={update}
                session={session as ExtendedSession}
                isLoading={isLoading}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SettingsContent), {
  ssr: false,
});
