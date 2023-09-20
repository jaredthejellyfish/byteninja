'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';

const motionVariants = {
  background: {
    hidden: {
      opacity: 0,
      display: 'none',
      transition: {
        duration: 0.3,
        display: {
          delay: 0.3,
        },
      },
    },
    visible: {
      opacity: 1,
      display: 'block',
      transition: {
        opacity: {
          delay: 0.3,
        },
      },
    },
  },
  banner: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
      },
    },
  },
};

function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(
    localStorage.getItem('cookie_consent') === 'true',
  );

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied';

    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    });

    if (window)
      localStorage.setItem('cookie_consent', JSON.stringify(cookieConsent));
  }, [cookieConsent]);

  return (
    <>
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 bg-black/60 w-screen h-screen z-40"
        initial="hidden"
        animate={cookieConsent ? 'hidden' : 'visible'}
        variants={motionVariants.background}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial="hidden"
        animate={cookieConsent ? 'hidden' : 'visible'}
        variants={motionVariants.banner}
        exit={{ opacity: 0, y: 50 }}
        className="dark:bg-neutral-950 right-5 left-5 sm:right-0 sm:left-0 bg-white border rounded-xl sm:rounded-none sm:border-x-0 sm:border-b-0 sm:border-t absolute sm:bottom-0 bottom-[50%] sm:w-full flex sm:flex-row flex-col justify-between sm:items-center sm:px-5 sm:py-5 lg:py-8 z-50"
      >
        <div className="sm:max-w-[66%] px-5 pt-5 sm:p-0">
          <h4 className="text-xl mb-2 sm:mb-0 sm:text-lg font-semibold">
            Cookies
          </h4>
          <span>
            Hey there! We use{' '}
            <Link
              className="text-blue-700 dark:text-blue-500"
              href="https://www.cloudflare.com/learning/privacy/what-are-cookies/"
              target="_blank"
            >
              cookies
            </Link>{' '}
            to make your browsing experience sweeter. Tap &apos;Accept&apos; to
            unlock the yumminess!
          </span>
        </div>

        <div className="flex flex-row gap-3 px-5 pt-4 pb-5 sm:p-0">
          <Link href="https://www.google.com">
            <Button variant="destructive">Decline</Button>
          </Link>
          <Button
            variant="secondary"
            className=""
            onClick={() => setCookieConsent(true)}
          >
            Accept
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export default dynamic(() => Promise.resolve(CookieBanner), {
  ssr: true,
});
