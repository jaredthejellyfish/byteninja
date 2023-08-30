import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const connectionId = (await request.json()) as { id: string };

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
  } catch (error) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
