import { allLessons } from 'contentlayer/generated';
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
    throw new Error(
      `Failed to find lesson for course ID ${props.params.courseId}`,
    );
  }

  const post = allLessons.find((p) => p.id === lesson.id);
  if (!post) {
    throw new Error(
      `Failed to find post for course ID ${props.params.courseId}`,
    );
  }

  return (
    <PageContainer className="dark:bg-neutral-900/50 w-full px-0">
      <Mdx source={post.body.code} />
    </PageContainer>
  );
};

export default CourseChallengePage;
