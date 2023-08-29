import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

import { getServerUser } from '@/lib/utils/getServerUser';
import { UserExtendedSettings } from '@/lib/types/types';
import PageContainer from '@/components/page-container';
import { Separator } from '@/components/ui/separator';
import SettingsMenu from './page-content';
import prisma from '@/lib/prisma';

const UserSettings = async () => {
  const { user, isError, error } = await getServerUser('settings');



  async function editUser(formData: UserExtendedSettings) {
    'use server';

    console.log(formData);

    await prisma.user.update({
      where: {
        id: formData.id,
      },
      data: {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        image: formData.image,
      },
    });

    revalidatePath('/settings');
  }

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin?callbackUrl=/settings');
  }

  return (
    <PageContainer className="dark:bg-neutral-950">
      <h2 className="px-10 my-5 mb-10 text-3xl lg:px-28">
        Personal Account Settings
      </h2>
      <Separator className="mx-[-40px] w-screen mb-10" />
      <SettingsMenu action={editUser} user={user as UserExtendedSettings} />
    </PageContainer>
  );
};

export default UserSettings;
