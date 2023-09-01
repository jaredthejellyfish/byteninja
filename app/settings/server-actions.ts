'use server';

import { UserSettings } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { compare, hash } from 'bcryptjs';

import { AuthUpdate, ExtendedSession } from '@/lib/types/types';
import { areValuesEqual } from '@/lib/utils/areValuesEqual';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function deleteUserConnection({
  connectionId,
}: {
  connectionId: { id: string };
}) {
  if (!connectionId) {
    throw new Error('Invalid Request');
  }

  const session = (await getServerSession(authOptions)) as ExtendedSession;

  if (!session || !session.user.id) {
    throw new Error('Unauthenticated');
  }

  const connection = await prisma.account.findUnique({
    where: { id: connectionId.id },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!connection || !connection.id) {
    throw new Error('Could not find connection');
  }

  if (connection.userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const deletedConnection = await prisma.account.delete({
    where: { id: connection.id },
  });

  if (!deletedConnection || !deletedConnection.id) {
    throw new Error('Could not delete connection');
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

  if (!updatedUser || updatedUser.password !== hashedNewPassword) {
    throw new Error('Could not update user');
  }
}

export async function updateUser({ user }: { user: AuthUpdate }) {
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
}

export async function updateUserSettings({
  id,
  settings,
}: {
  id: string;
  settings: Partial<UserSettings>;
}) {
  if (!id) {
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
}
