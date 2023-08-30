import { AuthOptions, getServerSession } from 'next-auth';

import { authOptions } from '@/auth/authOptions';
import { ExtendedSession } from '../types/types';
import prisma from '../prisma';

function generateIncludes(
  includes: 'settings' | 'courses' | 'default' = 'default',
) {
  switch (includes) {
    case 'settings':
      return {
        settings: true,
        accounts: {
          select: {
            id: true,
            type: true,
            provider: true,
          },
        },
      };
    case 'courses':
      return {
        courses: true,
      };
    default:
      return {};
  }
}

export async function getServerUser(
  includes: 'settings' | 'courses' | 'default' = 'default',
) {
  try {
    const session = (await getServerSession(
      authOptions as AuthOptions,
    )) as ExtendedSession;

    if (!session) {
      throw new Error('Session not found');
    }

    const id = session?.user.id;

    if (!id) {
      throw new Error('Email not found');
    }

    const include = generateIncludes(includes);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: include,
    });

    const userWithoutPassword = { ...user, password: undefined };

    if (user) {
      return { user: userWithoutPassword, isError: false, error: null };
    } else {
      throw new Error('User not found');
    }
  } catch (e: unknown) {
    const error = e as Error;
    const message = error.message || 'Error getting user';

    return {
      user: null,
      isError: true,
      error: message || 'Error getting user',
    };
  }
}
