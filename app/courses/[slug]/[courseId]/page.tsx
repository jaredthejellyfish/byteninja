import { allLessons } from 'contentlayer/generated';
import type { Metadata } from 'next';
import React from 'react';

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const lesson = await getLessonBySlug(props.params.courseId);

  if (!lesson) {
    return {
      title: `Error | ByteNinja`,
    };
  }

  const fancyName =
    lesson?.name.length > 10
      ? `${lesson?.name.slice(0, 8).replace(' ', '')}…`
      : lesson?.name;

  const fancyNameCapitalized =
    fancyName.charAt(0).toUpperCase() + fancyName.slice(1);

  return {
    title: `${fancyNameCapitalized} | ByteNinja`,
  };
}

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
  if (!lesson) {
    return `Failed to find lesson for course ID ${props.params.courseId}`;
  }

  const mdLesson = allLessons.find((p) => p.id === lesson.id);
  if (!mdLesson) {
    return `Failed to find post for course ID ${props.params.courseId}`;
  }

  return (
    <PageContainer className="dark:bg-neutral-900/50 bg-neutral-100/30 w-full px-0">
      <Mdx source={mdLesson.body.code} />
    </PageContainer>
  );
};

export default CourseChallengePage;
