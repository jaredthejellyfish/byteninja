import { cache } from 'react';

import { CurrentCourse } from '@/redux/features/currentCourseSlice';
import prisma from '@/lib/prisma';

export const revalidate = 600; // revalidate the data at most every 20 min

const getCourseBySlug = cache(
  async (
    slug: string,
  ): Promise<{
    course: CurrentCourse | null;
    isError: boolean;
    error?: string;
  }> => {
    try {
      const currentCourse = await prisma.course.findUnique({
        where: {
          slug,
        },
      });

      if (!currentCourse)
        return { course: null, isError: true, error: 'Course not found' };

      const currentCourseRedux = {
        id: currentCourse.id,
        authorId: currentCourse.authorId,
        name: currentCourse.name,
        slug: currentCourse.slug,
        description: currentCourse.description,
        image: currentCourse.image || '',
      };

      return { course: currentCourseRedux, isError: false };
    } catch (e) {
      const error = e as Error;
      return { course: null, isError: true, error: error.message };
    }
  },
);

export default getCourseBySlug;
