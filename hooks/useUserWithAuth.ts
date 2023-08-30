import { redirect } from 'next/navigation';

import {
  UserWithCourses,
  UserWithSettings,
  UserWithoutPassword,
} from '@/lib/types/types';
import { getServerUser } from '@/lib/utils/getServerUser';

type UseUserWithAuthType<T extends 'settings' | 'courses' | 'default'> =
  T extends 'default'
    ? { user: UserWithoutPassword; isError: boolean; error: null }
    : T extends 'courses'
    ? { user: UserWithCourses; isError: boolean; error: null }
    : T extends 'settings'
    ? { user: UserWithSettings; isError: boolean; error: null }
    : { user: null; isError: boolean; error: string | null };

async function useUserWithAuth<
  T extends 'settings' | 'courses' | 'default' = 'default',
>(includes?: T): Promise<UseUserWithAuthType<T>> {
  const { user, isError, error } = await getServerUser(includes ?? 'default');

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin');
  }

  if (isError)
    return { user: null, isError: true, error } as UseUserWithAuthType<T>;

  return {
    user: user,
    isError: false,
    error: null,
  } as UseUserWithAuthType<T>;
}

export default useUserWithAuth;
