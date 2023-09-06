import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { toast } from '@/components/ui/use-toast';

const UserDeleteConnectionResponseSchema = z.object({
  id: z.string().cuid(),
});

const fetchDeleteUserConnection = async (
  id: string,
): Promise<z.infer<typeof UserDeleteConnectionResponseSchema>> => {
  const res = await fetch('/api/user/delete/login-connection', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data = await res.json();

  const parsedData = UserDeleteConnectionResponseSchema.parse(data);

  return parsedData;
};

function useDeleteUserConnection() {
  const router = useRouter();

  const {
    mutate: deleteUserConnection,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(fetchDeleteUserConnection, {
    onSuccess: async () => {
      toast({
        title: 'Success!',
        description: 'Your settings have been updated.',
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
  });

  return { deleteUserConnection, isLoading, isError, error, isSuccess };
}

export default useDeleteUserConnection;
