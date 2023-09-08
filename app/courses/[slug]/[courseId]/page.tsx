import React, { Suspense } from 'react';

import PageContainer from '@/components/page-container';
import { Mdx } from '@/components/mdx';
import prisma from '@/lib/prisma';

export async function generateStaticParams() {
  const lessons = await prisma.course.findMany({
    select: {
      lessons: {
        select: {
          id: true,
        },
      },
    },
  });

  const flatLessons = lessons.flatMap((lesson) => lesson.lessons);

  return flatLessons.map((lesson) => ({
    params: {
      courseId: lesson.id,
    },
  }));
}

type Props = { params: { courseId: string } };

async function getLessonBySlug(courseId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: courseId,
    },
  });
  return lesson;
}

const CourseChallengePage = async (props: Props) => {
  const lesson = await getLessonBySlug(props.params.courseId);

  return (
    <PageContainer className="dark:bg-black w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx source={lesson?.description || '#nothing to show!'} />
      </Suspense>
    </PageContainer>
  );
};

export default CourseChallengePage;
