import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import React from 'react';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

async function fetchUpdatePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  if (!oldPassword || !newPassword) throw new Error('Please fill all fields.');
  if (oldPassword === newPassword)
    throw new Error('Your new password cannot be the same as your old one.');

  const res = await fetch('/api/user/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  return res.json();
}

export default function PasswordSection(props: { disabled: boolean }) {
  const { disabled } = props;

  const { register, handleSubmit, reset } = useForm<{
    oldPassword: string;
    newPassword: string;
  }>({});

  const { mutate: updatePassword, isLoading } = useMutation(
    fetchUpdatePassword,
    {
      onSuccess: () => {
        reset();
        toast({
          title: 'Success!',
          description: 'Your settings have been updated.',
        });
      },
      onError: (e) => {
        const error = e as Error;
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: error.message,
        });
      },
    },
  );

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40">
      <form
        onSubmit={handleSubmit((password) => updatePassword(password))}
        className="flex flex-col w-full"
      >
        <div className="p-5">
          <h3 className="mb-3 text-xl font-semibold">Your Password</h3>
          <p className="text-sm pb-1 text-neutral-400">
            Please enter your current password.
          </p>
          <Input
            type="password"
            placeholder=""
            {...register('oldPassword')}
            className="max-w-[650px]"
          />
          <p className="text-sm mt-4 pb-1 text-neutral-400">
            Please enter your new password.
          </p>
          <Input
            type="password"
            placeholder=""
            {...register('newPassword')}
            className="max-w-[650px]"
          />
        </div>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <div className="flex flex-row items-center justify-between px-5 py-2">
          <span className="text-xs sm:text-sm text-neutral-400">
            Please use 32 characters at maximum.
          </span>
          <Button
            variant={'ghost'}
            disabled={isLoading || disabled}
            className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
