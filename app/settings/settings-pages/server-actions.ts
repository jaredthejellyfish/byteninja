'use server';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';

import { AuthUpdate, ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function deleteUserConnection({
  connectionId,
}: {
  connectionId: { id: string };
}) {
  try {
    if (!connectionId) {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const connection = await prisma.account.findUnique({
      where: { id: connectionId.id },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!connection || !connection.id) {
      return NextResponse.json({ error: 'No connection' }, { status: 403 });
    }

    if (connection.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const deletedConnection = await prisma.account.delete({
      where: { id: connection.id },
    });

    if (!deletedConnection || !deletedConnection.id) {
      return NextResponse.json(
        { error: 'Could not delete connection' },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ status: error.message }, { status: 500 });
  }
}

export async function updatePassword({
  passwords,
}: {
  passwords: {
    oldPassword: string;
    newPassword: string;
  };
}) {
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

  const isValid = await compare(passwords.oldPassword, passwordFromDB.password);

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

  if (!updatedUser) {
    throw new Error('Could not update user');
  }
}

export async function updateUser({ user }: { user: AuthUpdate }) {
  try {
    if (!user) {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });
    }

    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || session.user.id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });
    return NextResponse.json({ user: newUser });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
