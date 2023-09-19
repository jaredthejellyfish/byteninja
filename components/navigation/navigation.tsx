'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { set, reset, AuthState } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SiteLogoLight from '@/public/site-logo-light.png';
import SiteLogoDark from '@/public/site-logo-dark.png';
import { ProfileDropdown } from './profile-dropdown';
import { DarkModeToggle } from './darkmode-toggle';

const SiteLogo = () => (
  <Link href="/" className='flex flex-row items-center'>
    <Image
      className="block dark:hidden"
      src={SiteLogoLight}
      width={60}
      height={60}
      alt="logo"
    />
    <Image
      className="hidden dark:block"
      src={SiteLogoDark}
      width={60}
      height={60}
      alt="logo"
    />
    <h2 className="text-xl tracking-wide">
      Byte<span className="text-neutral-400">Ninja</span>
    </h2>
  </Link>
);

const Navigation = () => {
  const { data: session, status } = useSession();

  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const pathname = usePathname().split('/').filter(Boolean);

  useEffect(() => {
    const updateRedux = () => {
      if (status === 'authenticated' && session) {
        dispatch(set(session as AuthState));
      } else {
        dispatch(reset());
      }
    };

    updateRedux();
  }, [status, session, dispatch]);

  return (
    <nav className="shadow border-b fixed top-0 left-0 right-0 border-b-neutral-800/20 h-[62px] dark:border-b-neutral-800 dark:bg-black bg-white flex flex-row items-center px-5 lg:px-11 justify-between z-10">
      <div id="nav-left" className="flex w-2/3">
        <div className="flex flex-row items-center justify-center gap-1">
          <SiteLogo />
        </div>
      </div>
      <div id="nav-right" className="flex items-center justify-end w-1/3">
        <DarkModeToggle className="dark:bg-neutral-950 dark:text-white bg-white text-black hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black border border-neutral-200 dark:border-neutral-800 focus-visible:dark:border-neutral-800" />
        <ProfileDropdown
          pathname={pathname}
          authStatus={status === 'authenticated'}
          image={session?.user?.image ?? ''}
          name={user?.name ?? ''}
          id={user?.id ?? ''}
        />
      </div>
    </nav>
  );
};

export default Navigation;
