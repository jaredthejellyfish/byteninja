'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {props.children}
    </SessionProvider>
  );
};

export default Providers;
