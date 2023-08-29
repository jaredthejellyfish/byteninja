import { redirect } from 'next/navigation';

import { getServerUser } from '@/lib/utils/getServerUser';
import PageContainer from '@/components/page-container';

export default async function Home() {
  const { user, isError, error } = await getServerUser();

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin');
  }

  return (
    <PageContainer>
      <pre id="json-output">Home: {JSON.stringify(user, null, 2)}</pre>
    </PageContainer>
  );
}
