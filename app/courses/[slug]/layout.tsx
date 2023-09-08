import React from 'react';

import { CourseLesson } from '@/lib/types/types';
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
        },
      },
    },
  });

  return lessons as {
    name: string;
    id: string;
    slug: string;
    lessons: CourseLesson[];
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
