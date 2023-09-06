import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { AuthState, reset, set } from '@/redux/features/authSlice';
import { AuthUpdate, UserWithSettings } from '@/lib/types/types';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/hooks';

const UserUpdateResponseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  emailVerified: z.string().nullable(),
  image: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  subCourseId: z.string().nullable(),
});

const fetchUpdateUser = async (
  user: UserWithSettings,
): Promise<z.infer<typeof UserUpdateResponseSchema>> => {
  const authUpdate: AuthUpdate = {
    id: user.id,
    name: user.name!,
    email: user.email!,
    image: user.image!,
    username: user.username!,
  };

  const res = await fetch('/api/user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...authUpdate }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data = await res.json();

  const parsedData = UserUpdateResponseSchema.parse(data);

  return parsedData;
};

function useMutateUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { update, data: session } = useSession();

  const {
    mutate: mutateUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(fetchUpdateUser, {
    onSuccess: async (user) => {
      dispatch(reset());

      const newReduxUser: AuthState = {
        id: user.id,
        user: {
          name: user.name!,
          email: user.email!,
          image: user.image!,
          id: user.id!,
        },
      };

      dispatch(set(newReduxUser));

      const newSession = {
        expires: session?.expires ?? undefined,
        user: {
          email: user.email!,
          id: user.id!,
          image: user.image!,
          name: user.name!,
        },
      };

      await update(newSession);

      toast({
        title: 'Success!',
        description: 'Your settings have been updated.',
      });

      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutateUser, isLoading, isError, error, isSuccess };
}

export default useMutateUser;
