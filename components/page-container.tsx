import React from 'react';

import { cn } from '@/lib/utils/cn';

type Props = {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
};

const PageContainer = (props: Props) => {
  const { className, children, ref } = props;
  return (
    <main
      ref={ref ? ref : null}
      id={props.id}
      className={cn(
        'h-screen dark:bg-neutral-900/80 p-5 lg:px-10 pt-[82px] pb-[100px] overflow-y-auto',
        className,
      )}
    >
      {children}
    </main>
  );
};

export default PageContainer;
