'use client';

import {
  CheckCircle2,
  ChevronRight,
  Circle,
  CircleDot,
  SidebarClose,
  SidebarOpen,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { set, reset, SidebarStatus } from '@/redux/features/sidebarStatusSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch } from '@/redux/hooks';
import { cn } from '@/lib/utils/cn';

type Lesson = {
  name: string;
  id: string;
  slug: string;
  lessonOrder: number;
};

type Props = {
  course: {
    name: string;
    id: string;
    slug: string;
    lessons: Lesson[];
  };
};

const sidebarVariants = {
  container: {
    open: {
      width: '100%',
      display: 'flex',
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
    closed: {
      width: '0%',
      display: 'none',
      transition: {
        duration: 0.2,
        display: {
          delay: 0.19,
        },
      },
    },
  },
  openButton: {
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.2,
      },
    },
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
  caret: {
    open: {
      rotate: 90,
      transition: {
        duration: 0.2,
      },
    },

    closed: {
      rotate: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};

const generateLessonCircle = (
  isLoading: boolean,
  isAuthed: boolean,
  lessonComplete: boolean,
  currentLessonSlug: string,
  lessonSlug: string,
) => {
  if (isLoading)
    return (
      <Circle
        className="text-neutral-500 dark:text-neutral-400"
        size={16}
        strokeWidth={2}
      />
    );

  if (!isAuthed)
    return (
      <XCircle
        className="text-red-500 dark:text-red-700"
        size={16}
        strokeWidth={2}
      />
    );

  if (lessonComplete)
    return (
      <CheckCircle2
        className="text-green-500 dark:text-green-600"
        size={16}
        strokeWidth={2}
      />
    );

  if (lessonSlug === currentLessonSlug)
    return (
      <CircleDot
        className="text-neutral-500 dark:text-neutral-400"
        size={16}
        strokeWidth={2}
      />
    );

  return (
    <Circle
      className="text-neutral-500 dark:text-neutral-400"
      size={16}
      strokeWidth={2}
    />
  );
};

type LessonProps = {
  course: {
    name: string;
    id: string;
    slug: string;
    lessons: Lesson[];
  };
  lesson: Lesson;
  currentLessonSlug: string;
  lessonComplete?: boolean;
  isAuthed: boolean;
  isLoading: boolean;
  childLessons?: Lesson[];
};
const Lesson = (props: LessonProps) => {
  const {
    course,
    lesson,
    currentLessonSlug,
    lessonComplete,
    isAuthed,
    isLoading,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const childIsCurrentLesson =
    props.childLessons?.some(
      (childLesson) => childLesson.slug === currentLessonSlug,
    ) || false;

  return (
    <>
      <Link
        href={
          isAuthed
            ? `/courses/${course.slug}/${lesson.slug}`
            : `/courses/${course.slug}`
        }
        key={lesson.id}
        className={cn(
          'text-sm dark:text-neutral-400 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between',
          lesson.slug === currentLessonSlug
            ? 'bg-neutral-500/20 dark:text-white'
            : '',
          isAuthed ? 'cursor-pointer' : 'cursor-not-allowed',
          props.childLessons && props.childLessons.length > 0 ? 'pl-2' : 'pl-3',
          childIsCurrentLesson ? 'bg-neutral-600/20' : '',
        )}
        onClick={() => {
          if (lesson.slug === currentLessonSlug) setOpen(!isOpen);
        }}
      >
        <div className="flex flex-row items-center">
          {props.childLessons && props.childLessons.length > 0 && (
            <motion.div
              variants={sidebarVariants.caret}
              animate={isOpen ? 'open' : 'closed'}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(!isOpen);
              }}
              className="mr-1 flex items-center justyify-center"
            >
              <ChevronRight height={15} width={15} />
            </motion.div>
          )}
          <p className="line-clamp-1">
            {lesson.name.at(0)?.toUpperCase() + lesson.name.slice(1)}
          </p>
        </div>

        {generateLessonCircle(
          isLoading,
          isAuthed,
          lessonComplete || false,
          currentLessonSlug,
          lesson.slug,
        )}
      </Link>
      {props.childLessons &&
        props.childLessons.length > 0 &&
        isOpen &&
        props.childLessons.map((childLesson: Lesson) => (
          <Link
            key={childLesson.id}
            href={
              isAuthed
                ? `/courses/${course.slug}/${childLesson.slug}`
                : `/courses/${course.slug}`
            }
            className={cn(
              'text-sm dark:text-neutral-400 pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between',
              childLesson.slug === currentLessonSlug
                ? 'bg-neutral-500/20 dark:text-white'
                : '',
              isAuthed ? 'cursor-pointer' : 'cursor-not-allowed',
            )}
          >
            <div className="flex flex-row items-center gap-1.5">
              <div>•</div>
              <div>
                {childLesson.name.at(0)?.toUpperCase() +
                  childLesson.name.slice(1)}
              </div>
            </div>
            {generateLessonCircle(
              isLoading,
              isAuthed,
              lessonComplete || false,
              currentLessonSlug,
              childLesson.slug,
            )}
          </Link>
        ))}
    </>
  );
};

function findSubLessons(lessons: Lesson[], targetOrder: number) {
  const matchingLessons = lessons.filter((lesson) => {
    const lessonOrder = lesson.lessonOrder.toString();
    return lessonOrder.startsWith(targetOrder.toString() + '.');
  });

  return matchingLessons;
}

const fetchCompletedLessonsData = async () => {
  const res = await fetch(`/api/user/get/completedLessons`);
  const data = (await res.json()) as { completedLessons: string[] };

  if (!data.completedLessons) return [];

  return data.completedLessons;
};

const Sidebar = (props: Props) => {
  const [isHovering, setHovering] = useState(false);
  const showButtonBoundsRef = useRef(null);
  const currentLessonSlug = usePathname().split('/')[3];
  const dispatch = useAppDispatch();

  const { status } = useSession();

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  const [isHidden, setHidden] = useState(isMobile);

  const { data: completedLessons, isLoading } = useQuery({
    queryKey: ['completed-lessons'],
    queryFn: () => fetchCompletedLessonsData(),
    enabled: status === 'authenticated',
  });

  useEffect(() => {
    if (isHidden) {
      dispatch(set({ status: 'closed' } as SidebarStatus));
    } else {
      dispatch(set({ status: 'open' } as SidebarStatus));
    }
    return () => {
      dispatch(reset());
    };
  }, [isHidden, dispatch]);

  const { course } = props;

  return (
    <>
      <motion.div
        id="sidebar"
        variants={sidebarVariants.container}
        initial={isMobile ? 'closed' : 'open'}
        animate={isHidden ? 'closed' : 'open'}
        className="flex flex-col sm:min-w-max sm:w-1/3 sm:max-w-[350px] sm:pt-[80px] w-full pb-4 pt-[80px] overflow-hidden relative sm:h-screen dark:bg-black border border-neutral-200 dark:border-neutral-900"
      >
        <div className="flex flex-row gap-2 justify-between w-full items-center px-7">
          <h3 className="font-medium sm:text-xl line-clamp-1">
            <Link
              href={`/courses/${course.slug}`}
              onClick={(e) => e.stopPropagation()}
            >
              {course.name.at(0)?.toUpperCase() + course.name.slice(1)}
            </Link>
          </h3>
          <SidebarClose
            className="text-neutral-500"
            onClick={() => setHidden(!isHidden)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-1 text-xs sm:text-base pl-6 pr-8">
          {course.lessons
            .filter((lesson) => Number.isInteger(lesson.lessonOrder))
            .map((lesson) => (
              <Lesson
                key={lesson.id}
                course={course}
                lesson={lesson}
                currentLessonSlug={currentLessonSlug}
                isAuthed={status === 'authenticated'}
                isLoading={isLoading}
                childLessons={findSubLessons(
                  course.lessons,
                  lesson.lessonOrder,
                )}
                lessonComplete={
                  completedLessons
                    ? completedLessons.includes(lesson.id)
                    : false
                }
              />
            ))}
        </div>
      </motion.div>
      <motion.div
        ref={showButtonBoundsRef}
        onClick={() => {
          if (!isHovering) setHidden(!isHidden);
        }}
        className={cn(
          'absolute top-[72px] left-3 w-[95%]',
          isHidden ? 'z-50' : '-z-50',
        )}
      >
        <motion.button
          className="flex items-center justify-center p-1.5 rounded-lg bg-white dark:bg-black border dark:text-neutral-300 text-neutral-600 z-50"
          drag="x"
          variants={sidebarVariants.openButton}
          initial="hidden"
          animate={isHidden ? 'visible' : 'hidden'}
          onDragStart={() => setHovering(true)}
          onDragEnd={() => setHovering(false)}
          dragConstraints={showButtonBoundsRef}
        >
          <SidebarOpen />
        </motion.button>
      </motion.div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col sm:min-w-max sm:w-1/3 sm:max-w-[350px] sm:pt-[80px] w-full pb-4 pt-[80px] overflow-hidden relative sm:h-screen dark:bg-black border border-neutral-200 dark:border-neutral-900">
      <div className="flex flex-row gap-2 justify-between w-full items-center px-7 ">
        <h3 className="font-medium sm:text-xl line-clamp-1">
          <Skeleton className="h-[1.4em] w-44 rounded-sm" />
        </h3>
        <SidebarClose className="text-neutral-500" />
      </div>
      <div className="mt-4 flex flex-col gap-1 text-xs sm:text-base pl-6 pr-8 ">
        <div className="text-sm pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between bg-neutral-500/20 dark:text-white">
          <Skeleton className="h-[1.4em] w-44 rounded-sm" />
          <Circle
            className="text-neutral-500 dark:text-neutral-400"
            size={16}
            strokeWidth={2}
          />
        </div>
        <div className="text-sm dark:text-neutral-400 pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between">
          <Skeleton className="h-[1.4em] w-44 rounded-sm" />
          <Circle
            className="text-neutral-500 dark:text-neutral-400"
            size={16}
            strokeWidth={2}
          />
        </div>
        <div className="text-sm dark:text-neutral-400 pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between">
          <Skeleton className="h-[1.4em] w-44 rounded-sm" />
          <Circle
            className="text-neutral-500 dark:text-neutral-400"
            size={16}
            strokeWidth={2}
          />
        </div>
        <div className="text-sm dark:text-neutral-400 pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between">
          <Skeleton className="h-[1.4em] w-44 rounded-sm" />
          <Circle
            className="text-neutral-500 dark:text-neutral-400"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  ),
});
