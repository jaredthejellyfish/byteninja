import { Course } from '@prisma/client';
import { cache } from 'react';

import prisma from '@/lib/prisma';

export const revalidate = 600; // revalidate the data at most every 20 min

const fetchCourses = cache(
  async (page: number, pageSize: number): Promise<Course[]> => {
    return await prisma.course.findMany({
      skip: page * pageSize,
      take: pageSize,
      orderBy: {
        created_at: 'desc',
      },
    });
  },
);

type getPaginatedCoursesType = {
  page: number;
  pageSize: number;
  offset?: number;
};

export default async function getPaginatedCourses({
  page,
  pageSize,
}: getPaginatedCoursesType): Promise<{
  courses: Course[] | [];
  isError: boolean;
  error: string;
  coursesCount: number;
}> {
  try {
    const count = await prisma.course.count();
    const totalPages = Math.ceil(count / pageSize);
    const fixedPageSize = pageSize > count ? count : pageSize;

    if (page > totalPages) {
      return {
        courses: [],
        isError: false,
        error: 'null',
        coursesCount: count,
      };
    }

    const courses = await fetchCourses(page, fixedPageSize);

    return { courses, isError: false, error: 'null', coursesCount: count };
  } catch (e) {
    const error = e as Error;
    return {
      courses: [],
      isError: true,
      error: error.message,
      coursesCount: 0,
    };
  }
}
