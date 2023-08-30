import { redirect } from 'next/navigation';

import { getServerUser } from '@/lib/utils/getServerUser';

const useUserWithAuth = async (
  includes: 'settings' | 'courses' | 'default' = 'default',
) => {
  const { user, isError, error } = await getServerUser(includes);

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin');
  }

  return { user, isError, error };
};

export default useUserWithAuth;
