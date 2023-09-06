import { useMutation } from '@tanstack/react-query';
import { UserSettings } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { toast } from '@/components/ui/use-toast';

const UserUpdateSettingsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

const userUpdateSettings = async ({
  id,
  settings,
}: {
  id: string;
  settings: Partial<UserSettings>;
}): Promise<z.infer<typeof UserUpdateSettingsSchema>> => {
  const res = await fetch('/api/user/update/settings', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      settings,
    }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data = await res.json();

  const parsedData = UserUpdateSettingsSchema.parse(data);

  return parsedData;
};

function useMutateUserSettings() {
  const router = useRouter();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    userUpdateSettings,
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

  return { mutateUserSettings: mutate, isLoading, isError, error, isSuccess };
}

export default useMutateUserSettings;
