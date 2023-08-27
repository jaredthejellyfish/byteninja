'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

import { Button } from '../ui/button';

type Props = {};

const Navigation = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Button onClick={() => signIn()} disabled={status === 'authenticated'}>
        sign in
      </Button>
      <Button onClick={() => signOut()} disabled={status !== 'authenticated'}>
        sign out
      </Button>

      {JSON.stringify(session, null, 2)}
    </div>
  );
};

export default Navigation;
