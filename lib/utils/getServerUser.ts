import { AuthOptions, getServerSession } from 'next-auth';

import {
  ExtendedSession,
  ExtendedUser,
  UserWithCourses,
  UserWithSettings,
  UserWithoutPassword,
} from '../types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '../prisma';

type GetServerUserType<T extends 'settings' | 'courses' | 'default'> =
  T extends 'default'
    ? { user: UserWithoutPassword; isError: boolean; error: null }
    : T extends 'courses'
    ? { user: UserWithCourses; isError: boolean; error: null }
    : T extends 'settings'
    ? { user: UserWithSettings; isError: boolean; error: null }
    : { user: null; isError: boolean; error: string | null };

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
            created_at: true,
            updated_at: true,
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

export async function getServerUser(): Promise<GetServerUserType<'default'>>;
// eslint-disable-next-line no-redeclare
export async function getServerUser<
  T extends 'settings' | 'courses' | 'default',
>(
  // eslint-disable-next-line no-unused-vars
  includes: T,
): Promise<GetServerUserType<T>>;
// eslint-disable-next-line no-redeclare
export async function getServerUser<
  T extends 'settings' | 'courses' | 'default' = 'default',
>(includes?: T): Promise<GetServerUserType<T>> {
  try {
    const session = (await getServerSession(
      authOptions as AuthOptions,
    )) as ExtendedSession;

    if (!session) {
      throw new Error('Session not found');
    }

    if (!session?.user.id) {
      throw new Error('Email not found');
    }

    const include = generateIncludes(includes);

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      include: include,
    });

    const userWithoutPassword = { ...user, password: undefined };

    if (user) {
      return {
        user: userWithoutPassword as ExtendedUser,
        isError: false,
        error: null,
      } as GetServerUserType<T>;
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
    } as GetServerUserType<T>;
  }
}
