import remarkFlexibleContainers from 'remark-flexible-containers';
import { defineDocumentType } from 'contentlayer/source-files';
import { makeSource } from 'contentlayer/source-remote-files';
import rehypeTwemojify from 'rehype-twemojify';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import fs from 'fs/promises';

import prisma from './lib/prisma';

const escapeMarkdown = (title: string) =>
  title.replace(/([*_#])/g, '\\$1').replace(/:/g, '&#58;');

const Lesson = defineDocumentType(() => ({
  name: 'Lesson',
  contentType: 'mdx',
  filePathPattern: '**/*.mdx',

  fields: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    course: {
      type: 'string',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: async (post) => {
        const course = await prisma.lesson.findUnique({
          where: {
            id: post.id,
          },
          select: {
            course: {
              select: {
                slug: true,
              },
            },
          },
        });

        const courseSlug = course?.course?.slug;

        return `/${courseSlug}/${post.id}`;
      },
    },
  },
}));

const Course = defineDocumentType(() => ({
  name: 'Course',
  contentType: 'mdx',
  filePathPattern: '**/*.mdx',
  fields: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: async (post) => {
        const course = await prisma.course.findUnique({
          where: {
            id: post.id,
          },
        });
        const courseSlug = course?.slug;
        return `/${courseSlug}`;
      },
    },
  },
}));

const syncContentFromPrisma = async (contentDir: string) => {
  let wasCancelled = false;
  let syncInterval: NodeJS.Timeout;

  const syncRun = async () => {
    const coursesWithLessons = await prisma.course.findMany({
      include: {
        lessons: true,
      },
    });

    // create course folders
    for (const course of coursesWithLessons) {
      const courseDir = `${contentDir}/content/${course.slug}`;
      await fs.mkdir(courseDir, { recursive: true });

      // create course and lesson files
      for (const course of coursesWithLessons) {
        const courseContent = `---
title: ${escapeMarkdown(course.name)}
date: ${course.created_at}
id: ${course.id}
type: Course
---

${course.description}`;

        const courseFilePath = `/${courseDir}/course_${course.id}.mdx`;
        await fs.writeFile(courseFilePath, courseContent);

        // create lesson files
        for (const lesson of course.lessons) {
          const lessonContent = `---
title: ${escapeMarkdown(lesson.name)}
date: ${lesson.created_at}
course: ${course.slug}
id: ${lesson.id}
type: Lesson
---

${lesson.description}`;

          const lessonFilePath = `/${courseDir}/lesson_${lesson.id}.mdx`;
          await fs.writeFile(lessonFilePath, lessonContent);
        }
      }
    }
  };
  const syncLoop = async () => {
    await syncRun();

    if (wasCancelled) return;

    syncInterval = setTimeout(syncLoop, 1000 * 60);
  };

  // Block until the first sync is done
  await syncLoop();

  return () => {
    wasCancelled = true;
    clearTimeout(syncInterval);
  };
};

export default makeSource({
  contentDirPath: '.contentlayer/content',
  syncFiles: syncContentFromPrisma,
  documentTypes: [Lesson, Course],
  mdx: {
    remarkPlugins: [
      remarkGfm,

      // @ts-expect-error - remark-flexible-containers is not typed correctly
      remarkFlexibleContainers,
      // @ts-expect-error - remark-emoji is not typed correctly
      [emoji, { emoticon: true, accessible: true, padSpaceAfter: true }],
    ],
    rehypePlugins: [rehypeSlug, rehypeTwemojify],
  },
});
