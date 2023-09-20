import { allLessons } from 'contentlayer/generated';
import { redirect } from 'next/navigation';
import React, { cache } from 'react';
import type { Metadata } from 'next';

import { getServerUser } from '@/lib/utils/getServerUser';
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

type Props = { params: { slug: string; lessonSlug: string } };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const lesson = await getLessonBySlug(props.params.lessonSlug);

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

export const revalidate = 600; // revalidate the data at most every 20 min

const getLessonBySlug = cache(async (lessonSlug: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      slug: lessonSlug,
    },
  });
  return lesson;
});

const CourseChallengePage = async (props: Props) => {
  const { user } = await getServerUser();

  if (!user) {
    redirect(`/courses/${props.params.slug}?reason=notAllowed`);
  }

  const lesson = await getLessonBySlug(props.params.lessonSlug);
  if (!lesson) {
    return `Failed to find lesson for course ID ${props.params.lessonSlug}`;
  }

  const mdLesson = allLessons.find((p) => p.id === lesson.id);
  if (!mdLesson) {
    return `Failed to find post for course ID ${props.params.lessonSlug}`;
  }

  return (
    <PageContainer className="dark:bg-neutral-900/50 bg-neutral-100/30 w-full px-0">
      <Mdx source={mdLesson.body.code} />
    </PageContainer>
  );
};

export default CourseChallengePage;

export const dynamic = 'force-static';