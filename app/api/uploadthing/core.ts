import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { utapi } from 'uploadthing/server';

import { getServerUser } from '@/lib/utils/getServerUser';
import prisma from '@/lib/prisma';

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const { user, isError, error } = await getServerUser();
      const oldFileKey = user.image?.split('/').pop();

      if (!user) throw new Error('Unauthorized');
      if (isError) throw error;

      return { userId: user.id, oldFileKey };
    })
    .onUploadError(async (error) => {
      console.error(error);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const userId = metadata.userId;
        const fileUrl = file.url;
        const fileExtension = file.url.split('.').pop();
        const newFileName = `profileImage_${userId}.${fileExtension}`;

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { image: fileUrl },
        });

        if (
          !updatedUser ||
          updatedUser.image !== fileUrl ||
          updatedUser.id !== userId
        )
          throw new Error('Error updating database!');

        if (metadata.oldFileKey) await utapi.deleteFiles(metadata.oldFileKey);
        if (metadata.userId)
          await utapi.renameFile({
            fileKey: file.key,
            newName: newFileName,
          });
      } catch (error) {
        console.error(error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
