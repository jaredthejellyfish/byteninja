import type { Metadata } from 'next';
import React from 'react';

import PageContainer from '@/components/page-container';
import useUserWithAuth from '@/hooks/useUserWithAuth';
import CourseCard from '@/components/course-card';

export const metadata: Metadata = {
  title: 'ByteNinja | Courses',
};

const CoursesPage = async () => {
  const { user } = await useUserWithAuth('courses');

  return (
    <PageContainer>
      <div className="flex flex-row">
        {user?.courses?.map((course) => (
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
