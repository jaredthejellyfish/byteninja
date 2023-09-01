import React, { FormEvent } from 'react';
import * as z from 'zod';

import {
  ExtendedSession,
  ExtendedUser,
  UserWithSettings,
} from '@/lib/types/types';
import PasswordSection from './general-sections/password-section';
import GeneralSection from './general-sections/general-section';
import AvatarSection from './general-sections/avatar-section';
import { toast } from '@/components/ui/use-toast';

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

export type SectionInfoType = {
  id: SectionId;
  title: string;
  description: string;
  secondaryDescription: string;
  placeholder: string;
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

function GeneralSettingsPage(props: {
  user: ExtendedUser;
  updateUser: (user: UserWithSettings) => void;
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

      updateUser(updatedUser as UserWithSettings);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.map((error) => {
          return { message: error.message, name: error.path[0] };
        });

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
