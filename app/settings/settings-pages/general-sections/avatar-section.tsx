import { Separator } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExtendedSession, ExtendedUser } from '@/lib/types/types';
import { toast } from '@/components/ui/use-toast';

const UploadButton = dynamic(() =>
  import('@/lib/utils/uploadthing').then((mod) => mod.UploadButton),
);

type Props = {
  user: ExtendedUser;
  session: ExtendedSession;
  updateSession: (session: ExtendedSession) => void;
};

export default function AvatarSection(props: Props) {
  const { user, updateSession, session } = props;
  const router = useRouter();

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40 mb-10">
      <form className="relative flex flex-col w-full">
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold">Your Avatar</h3>
          <p className="pb-0 text-sm text-neutral-400 pr-20">
            This is your avatar.
            <br /> Click on the button to upload a custom one from your files.
          </p>
          <Avatar className="absolute h-[72px] w-[72px] top-7 sm:top-6 right-5 border-neutral-300 dark:border-neutral-700 border">
            <AvatarImage
              src={session.user.image!}
              alt="Profile Image"
              hidden={!session.user.image}
            />

            <AvatarFallback className="text-2xl">
              {user
                .name!.split(' ')
                .slice(0, 2)
                .map((x) => x.charAt(0).toUpperCase())
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <div className="flex flex-row items-center justify-between px-5 py-2">
          <span className="text-xs sm:text-sm text-neutral-400">
            An avatar is optional but strongly recommended.
          </span>
          <UploadButton
            appearance={{
              button:
                'bg-transparent border p-0 border-neutral-200 dark:border-neutral-700 hover:bg-accent hover:text-accent-foreground',
              allowedContent: 'hidden',
            }}
            endpoint="profileImage"
            className=""
            content={{
              button({ ready, isUploading }) {
                if (ready)
                  return (
                    <div className="text-black dark:text-white text-sm font-medium">
                      Upload
                    </div>
                  );

                if (isUploading) return <div>Uploading...</div>;

                return 'Getting ready...';
              },
            }}
            onClientUploadComplete={(res) => {
              try {
                const file = res?.at(0) ? res?.[0] : null;

                const fileUrl = file?.url;

                if (!fileUrl) {
                  toast({
                    variant: 'destructive',
                    title: 'Uh oh! An error occurred :C',
                    description: 'No file was uploaded.',
                  });
                  return;
                }
                const newSession: ExtendedSession = {
                  ...session,
                  user: {
                    ...session.user,
                    image: fileUrl,
                  },
                };

                updateSession(newSession);
                router.refresh();
              } catch (e) {
                const error = e as Error;
                toast({
                  variant: 'destructive',
                  title: 'Uh oh! An error occurred :C',
                  description: error.message,
                });
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                variant: 'destructive',
                title: 'Uh oh! An error occurred :C',
                description: `${error.message}.`,
              });
            }}
          />
        </div>
      </form>
    </div>
  );
}
