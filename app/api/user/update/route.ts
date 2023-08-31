import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { AuthUpdate, ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const user = (await request.json()) as AuthUpdate;

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
