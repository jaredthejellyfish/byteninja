import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { ExtendedSession } from '@/lib/types/types';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const connectionId = (await request.json()) as { id: string };

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
      select: {
        id: true,
      },
    });

    if (!deletedConnection || deletedConnection.id !== connection.id) {
      throw new Error('Could not delete connection');
    }
    return NextResponse.json(deletedConnection, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(error.message, { status: 500 });
  }
}
