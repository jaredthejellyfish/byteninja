'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  session: SessionProviderProps['session'];
};

const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        session={props.session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        {props.children}
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
