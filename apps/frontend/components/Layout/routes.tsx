'use client';

import { EnvironmentOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';

export const routes: MenuDataItem = [
  {
    path: '/',
    name: 'Welcome Page',
    component: './Welcome',
  },
  {
    path: '/catalog',
    name: 'Catalog of Earthquakes',
    icon: <EnvironmentOutlined />,
    component: './Catalog',
  },
];
