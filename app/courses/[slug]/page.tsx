import type { Metadata } from 'next';
import React from 'react';

import type { CurrentCourse } from '@/redux/features/currentCourseSlice';
import PageContainer from '@/components/page-container';
import UpdateCourseRedux from './update-course-redux';
import prisma from '@/lib/prisma';

type Props = { params: { slug: string } };

export const metadata: Metadata = {
  title: 'ByteNinja | Courses',
};

async function getCourseBySlug(slug: string) {
  return await prisma.course.findUnique({
    where: {
      slug,
    },
  });
}

const CoursePage = async (props: Props) => {
  const course = (await getCourseBySlug(props.params.slug)) as CurrentCourse;
  if (!course) {
    return <div>404</div>;
  }

  return (
    <PageContainer>
      <UpdateCourseRedux currentCourse={course} />
    </PageContainer>
  );
};

export default CoursePage;
