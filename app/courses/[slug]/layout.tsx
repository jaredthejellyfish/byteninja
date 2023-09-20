import React from 'react';

import prisma from '@/lib/prisma';
import Sidebar from './sidebar';

async function getLessonsByCourseSlug(slug: string) {
  const lessons = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      name: true,
      id: true,
      slug: true,
      lessons: {
        select: {
          name: true,
          id: true,
          slug: true,
          lessonOrder: true,
        },
      },
    },
  });

  const lessonsInOrder = lessons
    ? lessons.lessons.sort((a, b) => {
        return a.lessonOrder - b.lessonOrder;
      })
    : [];

  return {
    ...lessons!,
    lessons: lessonsInOrder,
  } as {
    name: string;
    id: string;
    slug: string;
    lessons: {
      name: string;
      id: string;
      slug: string;
      lessonOrder: number;
    }[];
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const course = await getLessonsByCourseSlug(params.slug);

  return (
    <div className="h-full flex sm:flex-row flex-col">
      <Sidebar course={course} />
      {children}
    </div>
  );
}
