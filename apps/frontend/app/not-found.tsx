'use client';

import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

const NoFoundPage: React.FC = () => {
  const router = useRouter();
  const handleClick = useCallback(() => router.push('/'), [router]);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
