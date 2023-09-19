'use client';

import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

type Props = {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
};

const variants = {
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

const CollapsibleSection = (props: Props) => {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(!props.initiallyOpen || false);

  return (
    <div className="flex flex-col gap-0">
      <h3
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center m-0"
      >
        <motion.div
          variants={variants.titleChevron}
          animate={!isOpen ? 'open' : 'closed'}
          initial={'closed'}
          transition={{ duration: 0.1 }}
          className="p-0 mr-2"
        >
          <ChevronRight height={'1em'} className="w-4" />
        </motion.div>
        {title}
      </h3>
      <motion.p
        variants={variants.body}
        animate={!isOpen ? 'open' : 'closed'}
        initial={'closed'}
        transition={{ duration: 0.1 }}
        className="m-0"
      >
        {children}
      </motion.p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CollapsibleSection));
