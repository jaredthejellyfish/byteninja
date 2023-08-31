import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      // This code runs on your server before upload
      const session = (await getServerSession(authOptions)) as ExtendedSession;

      // If you throw, the user will not be able to upload
      if (!session) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const userId = metadata.userId;
      const fileUrl = file.url;

      await prisma.user.update({
        where: { id: userId },
        data: { image: fileUrl },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
