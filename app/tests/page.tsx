"use client";
import dynamic from 'next/dynamic';
import React from 'react';

import PageContainer from '@/components/page-container';

const MDIde = dynamic(() => import('./md-ide'), {
  ssr: false,
});

const Tests = () => {
  return (
    <PageContainer>
      <MDIde />
    </PageContainer>
  );
};

export default Tests;
