import React from 'react';

import { cn } from '@/lib/utils/cn';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const PageContainer = (props: Props) => {
  const { className, children } = props;
  return (
    <main
      className={cn(
        'min-h-screen dark:bg-neutral-900/80 p-5 lg:px-10 pt-[82px]',
        className,
      )}
    >
      {children}
    </main>
  );
};

export default PageContainer;
