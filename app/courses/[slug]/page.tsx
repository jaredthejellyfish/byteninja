import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';

import getCourseBySlug from '@/lib/utils/getCourseBySlug';
import PageContainer from '@/components/page-container';
import UpdateCourseRedux from './update-course-redux';

type Props = { params: { slug: string } };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { course, isError, error } = await getCourseBySlug(props.params.slug);

  if (!course || isError) {
    console.error(error);
    return {
      title: `Error | ByteNinja`,
    };
  }

  const fancyName =
    course?.name.length > 10 ? `${course?.name.slice(0, 8)}…` : course?.name;

  const fancyNameCapitalized =
    fancyName.charAt(0).toUpperCase() + fancyName.slice(1);

  return {
    title: `${fancyNameCapitalized} | ByteNinja`,
  };
}

const CoursePage = async (props: Props) => {
  const { course, isError, error } = await getCourseBySlug(props.params.slug);
  if (!course) return notFound();
  if (isError) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <PageContainer>
      <UpdateCourseRedux currentCourse={course} />
    </PageContainer>
  );
};

export default CoursePage;
