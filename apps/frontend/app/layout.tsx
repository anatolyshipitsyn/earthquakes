import 'antd/dist/reset.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import ApolloWrapper from '../components/ApolloWrapper';

import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Earthquakes Example',
  description: 'This is an example site to demonstrate earthquakes list',
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider locale={enUS} theme={theme} wave={{ disabled: true }}>
          <AntdRegistry>
            <ApolloWrapper>{children}</ApolloWrapper>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
