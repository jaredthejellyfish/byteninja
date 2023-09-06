import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { toast } from '@/components/ui/use-toast';

const UserUpdatePasswordResponseSchema = z.object({
  status: z.string(),
  error: z.string().nullable(),
});

const userUpdatePassword = async (passwords: {
  oldPassword: string;
  newPassword: string;
}): Promise<z.infer<typeof UserUpdatePasswordResponseSchema>> => {
  const res = await fetch('/api/user/update/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...passwords }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data = await res.json();

  const parsedData = UserUpdatePasswordResponseSchema.parse(data);

  return parsedData;
};

function useMutateUserPassword() {
  const router = useRouter();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    userUpdatePassword,
    {
      onSuccess: async () => {
        toast({
          title: 'Success!',
          description: 'Your password has been updated.',
        });
        router.refresh();
      },
      onError: (e) => {
        const error = e as Error;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      },
    },
  );

  return { mutateUserPassword: mutate, isLoading, isError, error, isSuccess };
}

export default useMutateUserPassword;
