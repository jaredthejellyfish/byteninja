'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { UserWithSettings } from '@/lib/types/types';
import { cn } from '@/lib/utils/cn';

const GeneralSettingsPage = dynamic(() => import('./settings-pages/general'));

const LoginConnectionsPage = dynamic(
  () => import('./settings-pages/login-connections'),
);

const BlankSettingsPage = (props: { user: UserWithSettings }) => {
  return <pre>{JSON.stringify(props.user, null, 2)}</pre>;
};

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
  const router = useRouter();

  const section = searchParams.get('s');

  const sectionFromSearchProper = section
    ? section.toLowerCase().slice(0, 1).toUpperCase() + section.slice(1)
    : 'General';

  const [activePage, setActivePage] = useState(sectionFromSearchProper);

  const settingsPages = [
    { name: 'General', component: GeneralSettingsPage },
    { name: 'Login', component: LoginConnectionsPage },
    { name: 'Billing', component: BlankSettingsPage },
    { name: 'Notifications', component: BlankSettingsPage },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // if the window is defined, check the size of the screen
      if (window.innerWidth < 640) {
        setActivePage('');
        router.replace('/settings');
      }
    }
  }, [router]);

  return (
    <div className="flex flex-row px-0 sm:px-10 h-[calc(100vh - 170px)]">
      <div
        id="left"
        className="flex flex-col sm:w-1/4 ml-[-12px] gap-0.5 justify-center sm:justify-start sm:items-start w-full"
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
                    ? router.replace('/settings')
                    : router.replace(
                        `/settings?s=${page.name.toLocaleLowerCase()}`,
                      );
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
                  {<ActivePageComponent user={user} key={0} />}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      <div id="right" className="hidden sm:w-3/4 sm:block h-screen">
        <AnimatePresence>
          {settingsPages.map((page) => {
            if (page.name === activePage) {
              const ActivePageComponent = page.component;
              return <ActivePageComponent user={user} key={0} />;
            }
            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsContent;
