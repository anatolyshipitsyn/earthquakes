'use client';

import {
  MenuDataItem,
  PageContainer,
  ProCard,
} from '@ant-design/pro-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import { routes } from '@/components/Layout/routes';

const ProLayout = dynamic(
  () => import('@ant-design/pro-components').then((com) => com.ProLayout),
  {
    ssr: false,
  }
);

interface LayoutProps {
  children: ReactNode;
  subTitle?: string;
  hasTour?: boolean;
  helpUrl?: string;
}

export const Layout = ({ children, subTitle }: LayoutProps) => {
  const pathname = usePathname();

  const menuItemRender = (item: MenuDataItem, element: React.ReactNode) => (
    <Link href={item.path ?? '/'}>{element}</Link>
  );

  return (
      <ProLayout
        prefixCls="fc"
        route={{ routes }}
        title="Earthquakes"
        logo={false}
        layout="side"
        location={{
          pathname,
        }}
        menuItemRender={menuItemRender}
        contentStyle={{
          padding: 0,
        }}
      >
        <PageContainer content={subTitle}>
          <ProCard bordered headerBordered>
            {children}
          </ProCard>
        </PageContainer>
      </ProLayout>
  );
};
