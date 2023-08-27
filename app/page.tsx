import { AuthOptions, getServerSession } from 'next-auth';
import Image from 'next/image';

import { ModeToggle } from '@/components/darkmode-toggle';
import { authOptions } from '@/auth/authOptions';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await getServerSession(authOptions as AuthOptions);
  return <main className="">Hi yes hello? {JSON.stringify(session)}</main>;
}
