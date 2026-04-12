import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

type AppQueryClientProviderProps = {
  children: ReactNode;
};

export function AppQueryClientProvider({ children }: AppQueryClientProviderProps) {
  const [client] = useState(createQueryClient);

  console.log('client', client);

  return <TanStackQueryClientProvider client={client}>{children}</TanStackQueryClientProvider>;
}
