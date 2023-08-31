import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const passwords = (await request.json()) as {
      oldPassword: string;
      newPassword: string;
    };

    if (!passwords) {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const passwordFromDB = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        password: true,
      },
    });

    if (!passwordFromDB || !passwordFromDB.password) {
      return NextResponse.json({ error: 'No password' }, { status: 403 });
    }

    const isValid = await compare(
      passwords.oldPassword,
      passwordFromDB.password,
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
    }

    const hashedNewPassword = await hash(passwords.newPassword, 12);

    if (!hashedNewPassword) {
      return NextResponse.json(
        { error: 'Could not hash new password' },
        { status: 500 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Could not update password' },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 'success' });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}
