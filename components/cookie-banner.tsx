'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils/cn';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(
    localStorage.getItem('cookie_consent') === 'true',
  );

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied';

    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    });

    localStorage.setItem('cookie_consent', JSON.stringify(cookieConsent));
  }, [cookieConsent]);

  return (
    <div
      className={cn(
        'my-10 mx-auto max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 bg-gray-700 rounded-lg shadow',
        cookieConsent ? 'hidden' : '',
      )}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            We use <span className="font-bold text-sky-400">cookies</span> on
            our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button className="..." onClick={() => setCookieConsent(false)}>
          Decline
        </button>
        <button className="..." onClick={() => setCookieConsent(true)}>
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
