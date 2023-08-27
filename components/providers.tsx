'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  session: SessionProviderProps['session'];
};

const Providers = (props: Props) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};

export default Providers;
