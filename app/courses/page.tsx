import type { Metadata } from 'next';
import React from 'react';

import getPaginatedCourses from '@/lib/utils/getPaginatedCourses';
import PageNavigation from '@/components/courses-page-nav';
import PageContainer from '@/components/page-container';
import CourseCard from '@/components/course-card';

export const metadata: Metadata = {
  title: 'Courses | ByteNinja',
};

const PAGE_SIZE = 9;

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
    <PageContainer
      className="relative flex items-center flex-col justify-between sm:pb-5 pb-5"
      id="course-container"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <CourseCard
            slug={course.slug}
            name={course.name}
            description={course.description}
            image={course.image}
            authorId={course.authorId}
            key={course.id}
            skills={course.skills}
          />
        ))}
      </div>

      <PageNavigation
        className="w-full lg:px-32 sm:px-14 px-10"
        {...{
          currentPage,
          coursesCount,
        }}
      />
    </PageContainer>
  );
};

export default CoursesPage;
