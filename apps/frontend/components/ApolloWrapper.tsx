'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { apolloConfig } from '@/app/configs/apollo';

interface Props {
  children: ReactNode;
}

export default function ApolloWrapper({ children }: Props) {
  return <ApolloProvider client={apolloConfig}>{children}</ApolloProvider>;
}
