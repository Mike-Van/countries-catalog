import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

export const queryClient = new QueryClient({});

export const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
