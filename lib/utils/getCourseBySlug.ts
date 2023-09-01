import { CurrentCourse } from '@/redux/features/currentCourseSlice';
import prisma from '@/lib/prisma';

export default async function getCourseBySlug(
  slug: string,
): Promise<{ course: CurrentCourse | null; isError: boolean; error?: string }> {
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
}
