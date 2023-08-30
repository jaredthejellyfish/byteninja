import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as z from 'zod';

import { AuthState, set } from '@/redux/features/authSlice';
import { UserExtendedSettings } from '@/lib/types/types';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { Input } from '@/components/ui/input';

export type GeneralFormSchemaType = z.infer<typeof GeneralFormSchema>;

const GeneralFormSchema = z.object({
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
  action?: (formData: GeneralFormSchemaType) => void;
};

const GeneralSettingsPage = (props: Props) => {
  const { user, action } = props;
  const FormSchema = GeneralFormSchema;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialFormState = useMemo(() => {
    return {
      id: user.id,
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      image: user.image || null,
    };
  }, [user]);

  const updatedSession = useCallback((): AuthState => {
    return {
      user: {
        name: initialFormState.name,
        email: initialFormState.email,
        image: initialFormState.image!,
      },
    };
  }, [initialFormState]);

  useEffect(() => {
    setFormState(initialFormState);
    dispatch(set(updatedSession()));
  }, [initialFormState, dispatch, updatedSession]);

  const [formState, setFormState] = useState(initialFormState);

  function onSubmit(e: FormEvent, data: GeneralFormSchemaType = formState) {
    e.preventDefault();

    try {
      FormSchema.parse(data);

      action!(data);

      toast({
        title: 'Success!',
        description: 'Your settings have been updated.',
      });

      router.refresh();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.map((error) => {
          return error.message;
        });

        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
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
              Help your buddies find you by using a unique username.
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
              disabled={initialFormState.username === formState.username}
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
              disabled={initialFormState.name === formState.name}
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
              Byteninja.
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
              disabled={initialFormState.email === formState.email}
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
              disabled={!initialFormState.image === !!formState.image}
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

export default GeneralSettingsPage;
