'use client';

import { cva } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils/cn';

type Props = {
  title: string;
  children: React.ReactNode;
  variant?: 'header' | 'footer';
  initiallyOpen?: boolean;
  className?: string;
};

const animationVariants = {
  titleChevron: {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  },
  body: {
    open: {
      opacity: 1,
      height: 'auto',
      display: 'block',
      transition: {
        duration: 0.2,
        height: {
          delay: 0.05,
        },
        opacity: {
          delay: 0.05,
        },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      display: 'none',
      transition: {
        duration: 0.2,
        display: {
          delay: 0.19,
        },
      },
    },
  },
};

const variants = cva('flex flex-row items-center m-0 cursor-pointer', {
  variants: {
    variant: {
      header: 'text-xl font-semibold text-neutral-900 dark:text-neutral-100',
      sectionTitle: 'text-2xl font-bold text-neutral-900 dark:text-neutral-100',
      footer: 'text-base font-medium text-neutral-700 dark:text-neutral-300',
    },
  },
});

const CollapsibleSkeleton = () => {
  return (
    <div className="flex flex-col gap-0 mb-3">
      <h3 className="flex flex-row items-center m-0">
        <div className="p-0 mr-2">
          <ChevronRight height={'1em'} className="w-4" />
        </div>
        <Skeleton className="w-1/4 h-[1.1em] rounded-lg " />
      </h3>
    </div>
  );
};

const Collapsible = (props: Props) => {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(!props.initiallyOpen || false);

  return (
    <div className="flex flex-col gap-0">
      <h3
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          variants({
            variant: props.variant || 'header',
            className: props.className || '',
          }),
        )}
      >
        <motion.div
          variants={animationVariants.titleChevron}
          animate={!isOpen ? 'open' : 'closed'}
          initial={'closed'}
          transition={{ duration: 0.1 }}
          className="p-0 mr-2"
        >
          <ChevronRight height={'1em'} className="w-4" />
        </motion.div>
        {title}
      </h3>
      <motion.div
        variants={animationVariants.body}
        animate={!isOpen ? 'open' : 'closed'}
        initial={'closed'}
        transition={{ duration: 0.1 }}
        className="m-0"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Collapsible), {
  ssr: false,
  loading: () => <CollapsibleSkeleton />,
});
