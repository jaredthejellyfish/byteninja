import { useSession } from 'next-auth/react';

function useUserCompletedLessons() {
  const { data: session, status } = useSession();
}

export default useUserCompletedLessons;
