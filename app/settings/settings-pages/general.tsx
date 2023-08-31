import React, { FormEvent, useEffect, useMemo } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  ExtendedSession,
  ExtendedUser,
  UserWithoutPassword,
} from '@/lib/types/types';
import PasswordSection from './general-sections/update-password-section';
import AvatarSection from './general-sections/avatar-section';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GeneralSettingsFormSchema = z.object({
  id: z.string(),
  name: z.string().max(32, { message: 'Please use 32 characters at maximum.' }),
  username: z
    .string()
    .max(48, { message: 'Please use 48 characters at maximum.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  image: z.nullable(z.string().url({ message: 'Please enter a valid URL.' })),
});

export type GeneralSettingsFormSchemaType = z.infer<
  typeof GeneralSettingsFormSchema
>;

type SectionId = 'id' | 'name' | 'username' | 'email' | 'image';

type SectionInfoType = {
  id: SectionId;
  title: string;
  description: string;
  secondaryDescription: string;
  placeholder: string;
};

type GeneralSectionProps = {
  info: SectionInfoType;
  user: ExtendedUser;
  disabled: boolean;
  onSubmit: (e: DefaultValuesType) => void;
};

type defaultValuesType<K extends SectionId> = {
  [key in K]: string;
};

export type DefaultValuesType = defaultValuesType<SectionId>;

const generalSettingsSections: SectionInfoType[] = [
  {
    id: 'username',
    title: 'Your Username',
    placeholder: 'skankhoe69420',
    description: 'Help your buddies find you by using a unique username.',
    secondaryDescription: 'Please use 48 characters at maximum.',
  },
  {
    id: 'name',
    title: 'Your Name',
    placeholder: 'Dwight Schrute',
    description:
      'Please enter your full name, or a display name you are comfortable with.',
    secondaryDescription: 'Please use 32 characters at maximum.',
  },
  {
    id: 'email',
    title: 'Your Email',
    placeholder: 'email@byteninja.xyz',
    description:
      'Please enter the email address you want to use to log in with ByteNinja.',
    secondaryDescription: 'We will email you to verify the change.',
  },
];

function GeneralSection(props: GeneralSectionProps) {
  const { info, disabled, user, onSubmit } = props;

  const defaultValues: DefaultValuesType = useMemo(() => {
    return {
      [info.id]: user[info.id]!,
    } as DefaultValuesType;
  }, [info.id, user]);

  const { register, handleSubmit, setValue, watch } =
    useForm<DefaultValuesType>({
      defaultValues,
    });

  useEffect(() => {
    setValue(info.id, defaultValues[info.id]);
  }, [defaultValues, setValue, info.id]);

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold">{info.title}</h3>
          <p className="text-sm pb-1 text-neutral-400">{info.description}</p>
          <Input
            placeholder={info.placeholder}
            {...register(info.id)}
            className="max-w-[650px]"
          />
        </div>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <div className="flex flex-row items-center justify-between px-5 py-2">
          <span className="text-xs sm:text-sm text-neutral-400">
            {info.secondaryDescription}
          </span>
          <Button
            variant={'ghost'}
            disabled={watch(info.id) === user[info.id] || disabled}
            className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

function GeneralSettingsPage(props: {
  user: ExtendedUser;
  updateUser: UseMutateFunction<
    { user: UserWithoutPassword },
    Error,
    ExtendedUser
  >;
  isLoading: boolean;
  updateSession: () => void;
  session: ExtendedSession;
}) {
  const FormSchema = GeneralSettingsFormSchema;

  const { user, updateUser, isLoading, updateSession, session } = props;

  function onSubmit(event: FormEvent | DefaultValuesType) {
    try {
      const updatedUser: ExtendedUser = {
        ...user,
        ...event,
      };

      if (JSON.stringify(updatedUser) === JSON.stringify(user))
        throw new Error('No changes were made.');

      if (Object.values(event).includes(''))
        throw new Error('The field is empty.');

      const isValid = FormSchema.safeParse(updatedUser);

      if (!isValid.success) {
        throw isValid.error;
      }

      updateUser(updatedUser);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.map((error) => {
          return { message: error.message, name: error.path[0] };
        });

        console.log(errorMessages);
        toast({
          variant: 'destructive',
          title: `Uh oh! ${
            errorMessages[0].name.toString().charAt(0).toUpperCase() +
            errorMessages[0].name.toString().slice(1)
          } error :C`,
          description: errorMessages[0].message,
        });
      }

      const error = err as Error;
      toast({
        variant: 'destructive',
        title: 'Uh oh! An error occurred :C',
        description: error.message,
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {generalSettingsSections.map((section) => (
        <GeneralSection
          key={section.title}
          info={section}
          user={user}
          onSubmit={onSubmit}
          disabled={isLoading}
        />
      ))}
      <PasswordSection disabled={isLoading} />
      <AvatarSection
        user={user}
        updateSession={updateSession}
        session={session}
      />
    </div>
  );
}

export default GeneralSettingsPage;
