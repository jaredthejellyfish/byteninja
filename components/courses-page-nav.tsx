'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils/cn';

const PageNavigation = ({
  className,
  currentPage,
  coursesCount,
  pageSize = 9,
}: {
  className?: string;
  currentPage: number;
  coursesCount: number;
  pageSize?: number;
}) => {
  const nextPage =
    currentPage + 1 < coursesCount / pageSize ? currentPage + 1 : currentPage;
  const previousPage = currentPage > 0 ? currentPage - 1 : 0;
  const lastPage = Math.floor(coursesCount / pageSize);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    if (typeof document === 'undefined') return;

    const courseContainer = document?.querySelector('#course-container');
    if (courseContainer) {
      courseContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between h-7 mt-4 w-full font-medium select-none',
        className,
      )}
    >
      <div
        className={
          currentPage === 0 ? 'cursor-not-allowed text-neutral-500' : ''
        }
      >
        <Link
          className={cn(
            'flex flex-row items-center justify-center',
            currentPage === 0 && 'pointer-events-none',
          )}
          href={`/courses?p=${previousPage}`}
          onClick={() => {
            scrollToTop();
          }}
        >
          <ChevronLeft className="h-5 w-5" /> Last Page
        </Link>
      </div>
      <div className="h-5">
        {currentPage !== lastPage ? (
          <>
            {currentPage + 1}..{Math.ceil(coursesCount / pageSize)}{' '}
          </>
        ) : (
          <> {currentPage + 1}</>
        )}
      </div>
      <div
        className={
          currentPage === lastPage ? 'cursor-not-allowed text-neutral-500' : ''
        }
      >
        <Link
          className={cn(
            'flex flex-row items-center justify-center',
            currentPage === lastPage && 'pointer-events-none',
          )}
          href={`/courses?p=${nextPage}`}
          onClick={() => {
            scrollToTop();
          }}
        >
          Next Page <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default PageNavigation;
