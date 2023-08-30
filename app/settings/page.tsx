import { redirect } from 'next/navigation';
import React from 'react';

import { getServerUser } from '@/lib/utils/getServerUser';
import { UserExtendedSettings } from '@/lib/types/types';
import PageContainer from '@/components/page-container';
import { GeneralFormSchemaType } from './page-content';
import { Separator } from '@/components/ui/separator';
import SettingsMenu from './page-content';
import prisma from '@/lib/prisma';

const UserSettings = async () => {
  const { user, isError, error } = await getServerUser('settings');

  async function editUser(formData: GeneralFormSchemaType) {
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
  }

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin?callbackUrl=/settings');
  }

  return (
    <PageContainer className="dark:bg-neutral-950 px-0 sm:px-5 lg:px-10 pt-[72px]">
      <h2 className="px-5 sm:px-10 my-5 mb-10 text-3xl lg:px-28">
        Personal Account Settings
      </h2>
      <Separator className="lg:ml-[-40px] sm:ml-[-20px] ml-0 w-screen mb-10" />
      <SettingsMenu action={editUser} user={user as UserExtendedSettings} />
    </PageContainer>
  );
};

export default UserSettings;
