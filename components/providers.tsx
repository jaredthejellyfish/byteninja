'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
        {props.children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
