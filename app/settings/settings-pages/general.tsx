import React, { FormEvent, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import * as z from 'zod';

import {
  AuthUpdate,
  ExtendedUser,
  UserWithoutPassword,
} from '@/lib/types/types';
import { AuthState, set } from '@/redux/features/authSlice';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
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
  //eslint-disable-next-line no-unused-vars
  onSubmit: (e: DefaultValuesType) => void;
};

type defaultValuesType<K extends SectionId> = {
  // eslint-disable-next-line no-unused-vars
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
      'Please enter the email address you want to use to log in with Byteninja.',
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
    <div className="border rounded-lg dark:bg-neutral-900/40">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold">{info.title}</h3>
          <p className="pb-3 text-sm text-neutral-400">{info.description}</p>
          <Input
            placeholder={info.placeholder}
            {...register(info.id)}
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

async function postUser(user: ExtendedUser) {
  const authUpdateData: AuthUpdate = {
    id: user.id!,
    name: user.name!,
    email: user.email!,
    image: user.image!,
    username: user.username!,
  };

  const response = await fetch('/api/user/update', {
    method: 'POST',
    body: JSON.stringify(authUpdateData),
  });

  return response.json() as Promise<{ user: UserWithoutPassword }>;
}

function GeneralSettingsPage(props: { user: ExtendedUser }) {
  const FormSchema = GeneralSettingsFormSchema;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate: updateUser, isLoading } = useMutation(postUser, {
    onSuccess: ({ user }: { user: UserWithoutPassword }) => {
      toast({
        title: 'Success!',
        description: 'Your settings have been updated.',
      });

      const newReduxUser: AuthState = {
        id: user.id,
        user: {
          name: user.name!,
          email: user.email!,
          image: user.image!,
        },
      };

      dispatch(set(newReduxUser));

      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const user = props.user;

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

      <div className="border rounded-lg dark:bg-neutral-900/40">
        <form onSubmit={onSubmit} className="relative flex flex-col w-full">
          <div className="p-5">
            <h3 className="mb-2 text-xl font-semibold">Your Avatar</h3>
            <p className="pb-0 text-sm text-neutral-400 sm:w-full w-3/4">
              This is your avatar.
              <br /> Click on the avatar to upload a custom one from your files.
            </p>
            {!!user.image && (
              <Image
                src={user.image}
                alt="user avatar"
                className="absolute rounded-full top-7 sm:top-6 right-5"
                width={70}
                height={70}
              />
            )}
          </div>
          <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <div className="flex flex-row items-center justify-between px-5 py-2">
            <span className="text-xs sm:text-sm text-neutral-400">
              An avatar is optional but strongly recommended.
            </span>
            <Button
              variant={'ghost'}
              disabled={true}
              className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralSettingsPage;
