import { allCourses } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';

import getCourseBySlug from '@/lib/utils/getCourseBySlug';
import PageContainer from '@/components/page-container';
import UpdateCourseRedux from './update-course-redux';
import { Mdx } from '@/components/mdx';
import prisma from '@/lib/prisma';

type Props = {
  params: { slug: string };
  searchParams: { reason: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { course, isError, error } = await getCourseBySlug(props.params.slug);

  if (!course || isError) {
    console.error(error);
    return {
      title: `Error | ByteNinja`,
    };
  }

  const fancyName =
    course?.name.length > 10
      ? `${course?.name.slice(0, 8).replace(' ', '')}…`
      : course?.name;

  const fancyNameCapitalized =
    fancyName.charAt(0).toUpperCase() + fancyName.slice(1);

  return {
    title: `${fancyNameCapitalized} | ByteNinja`,
  };
}

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: {
      slug: true,
    },
  });

  return courses.map((course) => ({
    params: {
      slug: course.slug,
    },
  }));
}

const CoursePage = async (props: Props) => {
  const { course, isError, error } = await getCourseBySlug(props.params.slug);

  if (isError) {
    console.error(error);
    return <div>Error</div>;
  }

  if (!course) return notFound();

  const mdCourse = allCourses.find((course) => course.id === course.id);

  if (!mdCourse) return notFound();

  return (
    <PageContainer className="bg-neutral-100/30 dark:bg-neutral-900/60 px-0">
      <Mdx source={mdCourse?.body.code} />
      <UpdateCourseRedux currentCourse={course} />
    </PageContainer>
  );
};

export default CoursePage;

export const dynamic = 'force-static';