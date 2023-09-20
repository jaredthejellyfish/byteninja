import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as ExtendedSession;

    if (!session || !session.user.id) {
      throw new Error('Unauthenticated');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.id) {
      throw new Error('Could not find user');
    }

    if (user.id !== session.user.id) {
      throw new Error('Unauthorized');
    }

    const completedLessons = user.completedLessons;

    if (!completedLessons) {
      throw new Error('Could not find completed lessons');
    }
    return NextResponse.json(completedLessons, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(error.message, { status: 500 });
  }
}
