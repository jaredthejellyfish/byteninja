import type { Metadata } from 'next';
import React from 'react';

import getPaginatedCourses from '@/lib/utils/getPaginatedCourses';
import PageContainer from '@/components/page-container';
import CourseCard from '@/components/course-card';

export const metadata: Metadata = {
  title: 'Courses | ByteNinja',
};

const CoursesPage = async (params: { searchParams: { p: number } }) => {
  const { courses, isError, error } = await getPaginatedCourses({
    page: params.searchParams.p || 0,
    pageSize: 9,
  });

  if (isError === true) {
    if (error !== null) {
      return <div>{error}</div>;
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-row flex-wrap px-10 items-center justify-center gap-5">
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
      </div>
    </PageContainer>
  );
};

export default CoursesPage;
