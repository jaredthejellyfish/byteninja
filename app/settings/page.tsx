import React from 'react';

import { GeneralFormSchemaType } from './settings-pages/general';
import { UserExtendedSettings } from '@/lib/types/types';
import PageContainer from '@/components/page-container';
import { Separator } from '@/components/ui/separator';
import useUserWithAuth from '@/hooks/useUserWithAuth';
import SettingsContent from './page-content';
import prisma from '@/lib/prisma';

const SettingsPage = async () => {
  const { user } = await useUserWithAuth();

  async function editUser(formData: GeneralFormSchemaType) {
    'use server';

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

  return (
    <PageContainer className="dark:bg-neutral-950 px-0 sm:px-5 lg:px-10 pt-[72px]">
      <h2 className="px-5 sm:px-10 my-5 mb-10 text-3xl lg:px-28">
        Account Settings
      </h2>
      <Separator className="lg:ml-[-40px] sm:ml-[-20px] ml-0 w-screen mb-10" />
      <SettingsContent action={editUser} user={user as UserExtendedSettings} />
    </PageContainer>
  );
};

export default SettingsPage;
