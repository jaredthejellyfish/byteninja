import React from 'react';

import { CurrentCourse } from '@/redux/features/currentCourseSlice';
import PageContainer from '@/components/page-container';
import UpdateCourseRedux from './update-course-redux';
import { prisma } from '@/lib/prisma';

type Props = { params: { slug: string } };

async function getCourseBySlug(slug: string) {
  return await prisma.course.findUnique({
    where: {
      slug,
    },
  });
}

const Course = async (props: Props) => {
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

export default Course;
