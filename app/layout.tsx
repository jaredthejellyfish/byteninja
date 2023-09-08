import { Inter } from 'next/font/google';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import React from 'react';

import KeyboardShortcuts from '@/components/keyboard-shortcuts';
import Navigation from '@/components/navigation/navigation';
import GoogleAnalytics from '@/components/google-analytics';
import { ThemeProvider } from '@/components/theme-provider';
import CookieBanner from '@/components/cookie-banner';
import { Toaster } from '@/components/ui/toaster';
import { ReduxProvider } from '@/redux/provider';
import Providers from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ByteNinja',
  description: 'Created by Gerard Hernandez',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-YE1ND0HBBW" />
      <body className={inter.className + ' ' + 'overflow-y-hidden'}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <Providers>
              <Navigation />
              {children}
              <CookieBanner />
              <Toaster />
              <KeyboardShortcuts />
            </Providers>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
