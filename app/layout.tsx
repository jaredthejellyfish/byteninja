import { AuthOptions, getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import KeyboardShortcuts from '@/components/keyboard-shortcuts';
import Navigation from '@/components/navigation/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import PageContainer from '@/components/page-container';
import { Toaster } from '@/components/ui/toaster';
import { authOptions } from '@/auth/authOptions';
import { ReduxProvider } from '@/redux/provider';
import Providers from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learncode',
  description: 'Created by Gerard Hernandez',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions as AuthOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <Providers session={session}>
              <Navigation />
              {children}
              <Toaster />
              <KeyboardShortcuts />
            </Providers>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
