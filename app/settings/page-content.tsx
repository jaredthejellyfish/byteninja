'use client';
import { Separator } from '@radix-ui/react-dropdown-menu';
import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as z from 'zod';

import { UserExtendedSettings } from '@/lib/types/types';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

export const GeneralFormSchema = z.object({
  id: z.string(),
  name: z.string().max(32, { message: 'Please use 32 characters at maximum.' }),
  username: z
    .string()
    .max(48, { message: 'Please use 48 characters at maximum.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  image: z.nullable(z.string().url({ message: 'Please enter a valid URL.' })),
});

type Props = {
  user: UserExtendedSettings;
  // eslint-disable-next-line no-unused-vars
  action: (formData: z.infer<typeof GeneralFormSchema>) => void;
};

const BlankSettingsPage = ({ user }: { user: UserExtendedSettings }) => {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

const GeneralSettingsPage = ({
  user,
  action,
}: {
  user: UserExtendedSettings;
  // eslint-disable-next-line no-unused-vars
  action: (formData: z.infer<typeof GeneralFormSchema>) => void;
}) => {
  const FormSchema = GeneralFormSchema;

  const initialFormState = {
    id: user.id,
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    image: user.image || null,
  };

  const [formState, setFormState] = useState(initialFormState);

  function onSubmit(
    e: FormEvent,
    data: z.infer<typeof FormSchema> = formState,
  ) {
    e.preventDefault();

    try {
      FormSchema.parse(data);

      action(data);

      toast({
        title: 'Success!',
        description: 'Your settings have been updated.',
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.map((error) => {
          return error.message;
        });

        toast({
          title: 'Error!',
          description: errorMessages[0],
        });
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border rounded-lg dark:bg-neutral-900/40">
        <form onSubmit={onSubmit} className="flex flex-col w-full">
          <div className="p-5">
            <h3 className="mb-2 text-xl font-semibold">Your Username</h3>
            <p className="pb-3 text-sm text-neutral-400">
              Please use 48 characters at maximum.
            </p>
            <Input
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
              placeholder="skankhoe69420"
              value={formState.username}
              className="max-w-[340px]"
            />
          </div>
          <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <div className="flex flex-row items-center justify-between px-5 py-2">
            <span className="text-xs sm:text-sm text-neutral-400">
              Please use 48 characters at maximum.
            </span>
            <Button
              variant={'ghost'}
              className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>

      <div className="border rounded-lg dark:bg-neutral-900/40">
        <form onSubmit={onSubmit} className="flex flex-col w-full">
          <div className="p-5">
            <h3 className="mb-2 text-xl font-semibold">Your Name</h3>
            <p className="pb-3 text-sm text-neutral-400">
              Please enter your full name, or a display name you are comfortable
              with.
            </p>
            <Input
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              placeholder="shadcn"
              value={formState.name}
              className="max-w-[340px]"
            />
          </div>
          <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <div className="flex flex-row items-center justify-between px-5 py-2">
            <span className="text-xs sm:text-sm text-neutral-400">
              Please use 32 characters at maximum.
            </span>
            <Button
              variant={'ghost'}
              className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>

      <div className="border rounded-lg dark:bg-neutral-900/40">
        <form onSubmit={onSubmit} className="flex flex-col w-full">
          <div className="p-5">
            <h3 className="mb-2 text-xl font-semibold">Your Email</h3>
            <p className="pb-3 text-sm text-neutral-400">
              Please enter the email address you want to use to log in with
              Learncode.
            </p>
            <Input
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              placeholder="shadcn"
              value={formState.email}
              className="max-w-[340px]"
            />
          </div>
          <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <div className="flex flex-row items-center justify-between px-5 py-2">
            <span className="text-xs sm:text-sm text-neutral-400">
              We will email you to verify the change.
            </span>
            <Button
              variant={'ghost'}
              className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>

      <div className="border rounded-lg dark:bg-neutral-900/40">
        <form onSubmit={onSubmit} className="relative flex flex-col w-full">
          <div className="p-5">
            <h3 className="mb-2 text-xl font-semibold">Your Avatar</h3>
            <div className="flex flex-row">
              <p className="pb-0 text-sm text-neutral-400">
                This is your avatar.
                <br /> Click on the avatar to upload a custom one from your
                files.
              </p>
              {!!user.image && (
                <Image
                  src={user.image}
                  alt="user avatar"
                  className="absolute rounded-full top-6 right-5"
                  width={70}
                  height={70}
                />
              )}
            </div>
          </div>
          <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <div className="flex flex-row items-center justify-between px-5 py-2">
            <span className="text-xs sm:text-sm text-neutral-400">
              An avatar is optional but strongly recommended.
            </span>
            <Button
              variant={'ghost'}
              className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const menuVariants = {
  closed: {
    opacity: 0,
    outerHeight: 0,
    height: '0%',
    display: 'none',
    marginBottom: 0,
    transition: {
      duration: 0.2,
      display: {
        delay: 0.2,
      },
    },
  },
  open: {
    opacity: 1,
    height: '100%',
    display: 'block',
    marginBottom: 20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export default function SettingsMenu(props: Props) {
  const [activePage, setActivePage] = useState('General');

  const settingsPages = [
    {
      name: 'General',
      component: (
        <GeneralSettingsPage action={props.action} user={props.user} />
      ),
    },
    {
      name: 'Login Connections',
      component: <BlankSettingsPage user={props.user} />,
    },
    {
      name: 'Billing',
      component: <BlankSettingsPage user={props.user} />,
    },
    {
      name: 'Notifications',
      component: <BlankSettingsPage user={props.user} />,
    },
  ];

  return (
    <div className="flex flex-row px-0 sm:px-10 lg:px-28">
      <div
        id="left"
        className="flex flex-col w-full sm:w-1/4 ml-[-12px] gap-0.5 justify-center sm:justify-start"
      >
        {settingsPages.map((page) => (
          <div className="pl-5" key={page.name}>
            <div
              className={cn(
                'flex flex-row text-neutral-500 transition-all text-lg sm:min-w-[150px] hover:bg-neutral-500/30 py-2 px-3 rounded-sm sm:w-4/5 font-light cursor-pointer sm:text-base',
                activePage === page.name &&
                  'text-black dark:text-neutral-50 font-medium',
              )}
              onClick={() =>
                setActivePage(page.name === activePage ? '' : page.name)
              }
            >
              <span className="">{page.name}</span>
            </div>
            <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800 sm:hidden block" />
            <div className={'block sm:hidden overflow:hidden m-0'}>
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate={activePage === page.name ? 'open' : 'closed'}
                className="mt-5"
              >
                {page.component}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div id="right" className="hidden sm:w-3/4 sm:block">
        {settingsPages.find((page) => page.name === activePage)?.component}
      </div>
    </div>
  );
}
