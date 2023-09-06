import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import getPaginatedCourses from '@/lib/utils/getPaginatedCourses';
import PageContainer from '@/components/page-container';
import CourseCard from '@/components/course-card';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = {
  title: 'Courses | ByteNinja',
};

const PAGE_SIZE = 9;

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
        >
          Next Page <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const { coursesCount } = await getPaginatedCourses({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const numberOfPages = Math.ceil(coursesCount / 9);

  const params: { p: string }[] = [];

  for (let i = 0; i < numberOfPages; i++) {
    params[i] = {
      p: String(i),
    };
  }

  return params;
}

const CoursesPage = async (params: { searchParams: { p: number } }) => {
  const currentPage = Number(params.searchParams.p) || 0;
  const pageSize = PAGE_SIZE;

  const { courses, isError, error, coursesCount } = await getPaginatedCourses({
    page: currentPage,
    pageSize: pageSize,
  });

  if (isError === true) {
    if (error !== null) {
      return <div>{error}</div>;
    }
  }

  return (
    <PageContainer className="flex items-center flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <CourseCard
            slug={course.slug}
            name={course.name}
            description={course.description}
            image={course.image}
            authorId={course.authorId}
            key={course.id}
          />
        ))}

        <PageNavigation
          className="col-span-full"
          {...{
            currentPage,
            coursesCount,
          }}
        />
      </div>
    </PageContainer>
  );
};

export default CoursesPage;
