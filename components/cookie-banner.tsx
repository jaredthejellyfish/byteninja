'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';

import { Button } from './ui/button';

const motionVariants = {
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
    <motion.div
      initial="hidden"
      animate={cookieConsent ? 'hidden' : 'visible'}
      variants={motionVariants}
      exit={{ opacity: 0, y: 50 }}
      className={
        'bg-neutral-950 absolute bottom-0 w-full flex sm:flex-row flex-col justify-between items-center px-5 py-5 lg:py-8'
      }
    >
      <div className="max-w-[66%]">
        <h4 className="text-lg font-semibold">Cookies</h4>
        <p>
          Hey there! We use cookies to make your browsing experience sweeter.
          Tap &apos;Accept&apos; to unlock the yumminess!
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <Button
          variant="secondary"
          className=""
          onClick={() => setCookieConsent(true)}
        >
          Accept
        </Button>
        <Button
          variant="destructive"
          className=""
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </Button>
      </div>
    </motion.div>
  );
}

export default dynamic(() => Promise.resolve(CookieBanner), {
  ssr: true,
});
