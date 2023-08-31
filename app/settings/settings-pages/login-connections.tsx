import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { format } from 'timeago.js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DiscordIcon from '@/public/icons/discord-icon.svg';
import GithubIcon from '@/public/icons/github-icon.svg';
import TwitchIcon from '@/public/icons/twitch-icon.svg';
import GoogleIcon from '@/public/icons/google-icon.svg';
import { UserWithSettings } from '@/lib/types/types';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils/cn';

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
        'flex flex-row items-center justify-start py-1.5 px-4 rounded-lg cursor-pointer',
        providerData.color,
      )}
      onClick={() => signIn(provider)}
    >
      <Image
        src={providerData.icon}
        alt={`${provider} icon`}
        className="filter invert"
        height={providerData.wh}
        width={providerData.wh}
      />
      <span className="text-sm font-medium text-white">
        {providerData.name.charAt(0).toUpperCase() + providerData.name.slice(1)}
      </span>
    </div>
  );
}

async function fetchDeleteConnection({ id }: { id: string }) {
  const res = await fetch('/api/user/delete-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  return res.json();
}

function ConnectionLabels(props: { accounts: UserWithSettings['accounts'] }) {
  const router = useRouter();
  const { mutate: deleteConnection } = useMutation(fetchDeleteConnection, {
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'The connection has been deleted.',
      });
      router.refresh();
    },
    onError: (e) => {
      const error = e as Error;
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: error.message,
      });
    },
  });

  return props.accounts.map((account) => {
    const { id, provider, updated_at } = account;

    const providerData = providers.find(
      (providerData) =>
        providerData.name.toLowerCase() === provider.toLowerCase(),
    );

    if (!providerData) return null;

    const { wh, name } = providerData;

    return (
      <div
        className="flex flex-col mt-3 border rounded border-neutral-300 shadow-sm dark:border-neutral-700"
        key={id}
      >
        <div className="dark:bg-black text-neutral-600 flex flex-row items-center justify-between px-5 py-3.5">
          <div className="flex flex-row items-center justify-center">
            <Image
              src={providers.find((p) => p.name === provider)?.icon}
              alt={`${provider} icon`}
              className="filter dark:invert"
              height={wh}
              width={wh * 1.5}
            />
            <div className="flex flex-col ml-3">
              <span className="text-sm font-medium">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
              <span className="text-xs font-light text-neutral-400">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="items-center justify-center hidden text-xs font-light text-neutral-400 sm:flex">
              Connected {format(updated_at)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-red-700"
                  onClick={() => deleteConnection({ id })}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  });
}

function LoginConnectionsPage(props: { user: UserWithSettings }) {
  const accounts = props.user.accounts;

  const registeredProviders = accounts.map((account) => account.provider);
  const unusedProviders = providers.filter(
    (provider) => !registeredProviders.includes(provider.name),
  );

  return (
    <div>
      <div className="">
        <h3 className="text-xl">Login Connections:</h3>
        <p className="mt-2 mb-2 text-sm text-neutral-400 lg:w-3/4">
          Connect your Personal Account on ByteNinja with a third-party service
          to use it for login. One Login Connection can be added per third-party
          service.
        </p>
        {unusedProviders.length > 0 && (
          <div className="px-5 mt-4 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-neutral-900/40 shadow-sm">
            <h3 className="pt-3.5 pb-3 text-base">Add new:</h3>
            <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
            <div className="flex flex-row py-3 gap-x-3">
              {unusedProviders.map((provider) => (
                <ProviderLabel key={provider.name} provider={provider.name} />
              ))}
            </div>
            <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
            <span className="flex flex-row items-center gap-1 pt-4 pb-4 text-xs font-light text-neutral-400">
              Learn more about
              <Link
                href="https://auth0.com/intro-to-iam/what-is-oauth-2"
                className="text-blue-600"
              >
                Login Connections.
              </Link>
            </span>
          </div>
        )}
        <div className="mt-8">
          <ConnectionLabels accounts={accounts} />
        </div>
      </div>
    </div>
  );
}

export default LoginConnectionsPage;
