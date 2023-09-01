import type { Metadata } from 'next';
import React from 'react';

import { getServerUser } from '@/lib/utils/getServerUser';
import PageContainer from '@/components/page-container';
import useUserWithAuth from '@/hooks/useUserWithAuth';

export async function generateMetadata(): Promise<Metadata> {
  const { user, isError } = await getServerUser('default');

  if (isError) {
    return {
      title: 'Profile | ByteNinja',
    };
  }

  return {
    title: `${user?.username} | ByteNinja`,
  };
}

export default async function Profile() {
  const { user } = await useUserWithAuth('settings');

  return (
    <PageContainer>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </PageContainer>
  );
}
