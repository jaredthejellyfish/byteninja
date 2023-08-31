import React from 'react';

import PageContainer from '@/components/page-container';
import useUserWithAuth from '@/hooks/useUserWithAuth';

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
