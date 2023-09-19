import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import type { Metadata } from 'next';

import PageContainer from '@/components/page-container';
import { Separator } from '@/components/ui/separator';
import useUserWithAuth from '@/hooks/useUserWithAuth';
import SettingsContent from './page-content';

export const metadata: Metadata = {
  title: 'Settings | ByteNinja',
};

const SettingsPage = async () => {
  const { user } = await useUserWithAuth('settings');

  return (
    <PageContainer className="dark:bg-neutral-950 px-0 sm:px-5 lg:px-10 pt-[72px]">
      <h2 className="px-5 sm:px-10 my-5 mb-10 text-3xl lg:px-28">
        Account Settings
      </h2>
      <Separator className="lg:ml-[-40px] sm:ml-[-20px] ml-0 w-screen mb-10" />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <SettingsContent user={user!} />
      </ErrorBoundary>
    </PageContainer>
  );
};

export default SettingsPage;
