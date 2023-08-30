import React from 'react';

import PageContainer from '@/components/page-container';
import useUserWithAuth from '@/hooks/useUserWithAuth';

const Home = async () => {
  const { user } = await useUserWithAuth();

  return (
    <PageContainer>
      <pre id="json-output">Home: {JSON.stringify(user, null, 2)}</pre>
    </PageContainer>
  );
};

export default Home;
