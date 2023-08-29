import { redirect } from 'next/navigation';
import React from 'react';

import { getServerUser } from '@/lib/utils/getServerUser';
import PageContainer from '@/components/page-container';

type Props = {};

const UserSettings = async (props: Props) => {
  const { user, isError, error } = await getServerUser('settings');

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin');
  }

  return (
    <PageContainer className="dark:bg-zinc-950">
      <pre>Settings: {JSON.stringify(user, null, 2)}</pre>
    </PageContainer>
  );
};

export default UserSettings;
