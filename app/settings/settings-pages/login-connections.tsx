import { Separator } from '@radix-ui/react-dropdown-menu';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import React from 'react';

import { UserWithSettings } from '@/lib/types/types';
import DiscordIcon from '@/public/discord-icon.svg';
import GithubIcon from '@/public/github-icon.svg';
import TwitchIcon from '@/public/twitch-icon.svg';
import GoogleIcon from '@/public/google-icon.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

type PasswordSectionProps = {
  disabled: boolean;
  onSubmit: ({
    //eslint-disable-next-line no-unused-vars
    oldPassword,
    //eslint-disable-next-line no-unused-vars
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => void;
};

const providers = [
  {
    name: 'github',
    icon: GithubIcon,
    color: 'bg-github gap-2.5 pl-3.5 pr-4',
    wh: 20,
  },
  {
    name: 'twitch',
    icon: TwitchIcon,
    color: 'bg-twitch gap-1 pl-3 pr-4.5',
    wh: 29,
  },
  {
    name: 'discord',
    icon: DiscordIcon,
    color: 'bg-discord gap-1.5 pl-3 pr-4',
    wh: 29,
  },
  {
    name: 'google',
    icon: GoogleIcon,
    color: 'bg-google gap-1 pl-3 pr-4.5',
    wh: 29,
  },
];

function PasswordSection(props: PasswordSectionProps) {
  const { disabled, onSubmit } = props;

  const { register, handleSubmit } = useForm<{
    oldPassword: string;
    newPassword: string;
  }>({});

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40">
      <form
        onSubmit={handleSubmit((password) => onSubmit(password))}
        className="flex flex-col w-full"
      >
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold">Your Password</h3>
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
            disabled={disabled}
            className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

function ProviderLabel(props: { provider: string }) {
  const { provider } = props;

  const providerData = providers.find(
    (providerData) =>
      providerData.name.toLowerCase() === provider.toLowerCase(),
  );

  if (!providerData) return null;

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-start py-1.5 px-4 rounded-lg',
        providerData.color,
      )}
    >
      <Image
        src={providerData.icon}
        alt={`${provider} icon`}
        className="filter invert"
        height={providerData.wh}
        width={providerData.wh}
      />
      <span className="text-sm font-medium">
        {providerData.name.charAt(0).toUpperCase() + providerData.name.slice(1)}
      </span>
    </div>
  );
}

function LoginConnectionsSection(props: {
  accounts: UserWithSettings['accounts'];
}) {
  const { accounts } = props;
  const registeredProviders = accounts.map((account) => account.provider);
  const unusedProviders = providers.filter(
    (provider) => !registeredProviders.includes(provider.name),
  );

  return (
    <div className="mt-8">
      <h3 className="text-xl">Login Connections:</h3>
      <p className="text-sm text-neutral-400 mb-2 lg:w-3/4 mt-2">
        Connect your Personal Account on ByteNinja with a third-party service to
        use it for login. One Login Connection can be added per third-party
        service.
      </p>
      <div className="border rounded-lg dark:bg-neutral-900/40 mt-4 px-5">
        <h3 className="pt-3.5 pb-3 text-base">Add new:</h3>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <div className="flex flex-row gap-x-3 py-3">
          {unusedProviders.map((provider) => (
            <ProviderLabel key={provider.name} provider={provider.name} />
          ))}
        </div>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <p className="pt-4 pb-4 text-xs font-light text-neutral-400">
          Learn more about Login Connections.
        </p>
      </div>
    </div>
  );
}

const LoginConnectionsPage = (props: { user: UserWithSettings }) => {
  const accounts = props.user.accounts;
  function handleSubmit({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    console.log(oldPassword, newPassword);
  }
  return (
    <div>
      <PasswordSection disabled={false} onSubmit={handleSubmit} />
      <LoginConnectionsSection accounts={accounts} />
    </div>
  );
};

export default LoginConnectionsPage;
