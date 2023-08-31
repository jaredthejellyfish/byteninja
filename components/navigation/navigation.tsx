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
  <Link href="/">
    <Image
      className="block dark:hidden"
      src={SiteLogoLight}
      width={50}
      height={50}
      alt="logo"
    />
    <Image
      className="hidden dark:block"
      src={SiteLogoDark}
      width={50}
      height={50}
      alt="logo"
    />
  </Link>
);

const NavigationLeftDisplay = ({ pathname }: { pathname: string[] }) => {
  const currentCourse = useAppSelector((state) => state.currentCourseReducer);

  switch (pathname[0]) {
    case 'courses':
      if (currentCourse.name)
        return (
          <div className="flex flex-row items-center justify-center gap-1">
            {currentCourse.image ? (
              <Image
                className="rounded-full"
                src={currentCourse.image}
                width={50}
                height={50}
                alt="logo"
              />
            ) : (
              <SiteLogo />
            )}
            <h2 className="font-medium">{currentCourse.name}</h2>
          </div>
        );
      else
        return (
          <div className="flex flex-row items-center justify-center gap-1">
            <SiteLogo />
            <h2 className="font-medium">Courses</h2>
          </div>
        );

    case 'settings':
      return (
        <div className="flex flex-row items-center justify-center gap-1">
          <SiteLogo />
          <h2 className="font-medium">Settings</h2>
        </div>
      );

    case undefined: // Home
      return (
        <div className="flex flex-row items-center justify-center gap-1">
          <SiteLogo />
          <h2 className="font-medium">Home</h2>
        </div>
      );

    default:
      return (
        <div className="flex flex-row items-center justify-center gap-1">
          <SiteLogo />
          <h2 className="font-medium">ByteNinja</h2>
        </div>
      );
  }
};

const Navigation = () => {
  const { data: session, status } = useSession();

  const auth = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const pathname = usePathname().split('/').filter(Boolean);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      dispatch(set(session as AuthState));
    } else {
      dispatch(reset());
    }
  }, [status, dispatch, session]);

  return (
    <nav className="shadow border-b fixed top-0 left-0 right-0 border-b-neutral-800/20 h-[62px] dark:border-b-neutral-800 dark:bg-black bg-white flex flex-row items-center px-5 lg:px-11 justify-between">
      <div id="nav-left" className="flex w-2/3 pt-0.5">
        <NavigationLeftDisplay pathname={pathname} />
      </div>
      <div id="nav-right" className="flex items-center justify-end w-1/3">
        <DarkModeToggle className="mt-0.5 dark:bg-neutral-950 dark:text-white bg-white text-black hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black border border-neutral-200 dark:border-neutral-800 focus-visible:dark:border-neutral-800" />
        <ProfileDropdown
          pathname={pathname}
          authStatus={status === 'authenticated'}
          image={session?.user?.image ?? ''}
          name={auth?.user?.name ?? ''}
          id={auth?.id ?? ''}
        />
      </div>
    </nav>
  );
};

export default Navigation;
