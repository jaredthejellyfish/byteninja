import { Separator } from '@radix-ui/react-dropdown-menu';
import { useForm } from 'react-hook-form';
import React from 'react';

import useMutateUserPassword from '@/hooks/useMutateUserPassword';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PasswordSection(props: { disabled: boolean }) {
  const { disabled } = props;

  const { register, handleSubmit, reset, watch } = useForm<{
    oldPassword: string;
    newPassword: string;
  }>({});

  const { mutateUserPassword, isLoading, isError } = useMutateUserPassword();

  function onSubmit(passwords: { oldPassword: string; newPassword: string }) {
    mutateUserPassword(passwords);
    if (!isError) reset();
  }

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40 shadow-sm">
      <form
        onSubmit={handleSubmit((passwords) => onSubmit(passwords))}
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
            disabled={
              isLoading ||
              disabled ||
              !watch('oldPassword') ||
              !watch('newPassword')
            }
            className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
