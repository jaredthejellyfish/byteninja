import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { AuthUpdate, ExtendedSession } from '@/lib/types/types';
import { areValuesEqual } from '@/lib/utils/areValuesEqual';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  try {
    const user = (await request.json()) as AuthUpdate;

    console.log('user', user);

    if (!user) {
      throw new Error('Invalid Request');
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || session.user.id !== user.id) {
      throw new Error('Unauthenticated');
    }

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });

    if (!newUser || !areValuesEqual(user, newUser)) {
      throw new Error('Could not update user');
    }

    const newUserWithoutPassword = { ...newUser, password: undefined };

    return NextResponse.json(newUserWithoutPassword, { status: 200 });
  } catch (e) {
    const error = e as Error;

    return NextResponse.json(error.message, { status: 500 });
  }
}
