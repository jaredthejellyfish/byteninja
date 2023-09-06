import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const passwords = (await request.json()) as {
      oldPassword: string;
      newPassword: string;
    };
    if (!passwords) {
      throw new Error('Invalid Request');
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || !session.user.id) {
      throw new Error('Unauthenticated');
    }

    const passwordFromDB = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        password: true,
      },
    });

    if (!passwordFromDB || !passwordFromDB.password) {
      throw new Error('Could not find password');
    }

    const isValid = await compare(
      passwords.oldPassword,
      passwordFromDB.password,
    );

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const hashedNewPassword = await hash(passwords.newPassword, 12);

    if (!hashedNewPassword) {
      throw new Error('Could not hash new password');
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    if (!updatedUser || updatedUser.password !== hashedNewPassword) {
      throw new Error('Could not update user');
    }

    return NextResponse.json(
      { status: 'success', error: null },
      { status: 200 },
    );
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { status: 'error', error: error },
      { status: 500 },
    );
  }
}
