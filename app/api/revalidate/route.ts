import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const path = (await request.json()) as { path: string };

    if (!path) {
      throw new Error('Invalid Request');
    }

    revalidatePath(path.path);

    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 },
    );
  } catch (e) {
    const error = e as Error;

    return NextResponse.json(error.message, { status: 500 });
  }
}
