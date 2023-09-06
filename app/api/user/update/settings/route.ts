import { UserSettings } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { areValuesEqual } from '@/lib/utils/areValuesEqual';
import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const { id, settings } = (await request.json()) as {
      id: string;
      settings: Partial<UserSettings>;
    };
    if (!id || !settings) {
      throw new Error('Invalid Request');
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || session.user.id !== id) {
      throw new Error('Unauthenticated');
    }

    const userSettings = await prisma.userSettings.findUnique({
      where: { userId: id },
    });

    if (!userSettings) {
      throw new Error('Could not find user settings');
    }

    const updatedUserSettings = await prisma.userSettings.update({
      where: { userId: id },
      data: {
        ...userSettings,
        ...settings,
      },
    });

    if (
      !updatedUserSettings ||
      !areValuesEqual(settings, updatedUserSettings)
    ) {
      throw new Error('Could not update user settings');
    }

    return NextResponse.json(updatedUserSettings, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(error.message, { status: 500 });
  }
}
