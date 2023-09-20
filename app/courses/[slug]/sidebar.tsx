'use client';

import {
  CheckCircle2,
  Circle,
  CircleDot,
  SidebarClose,
  SidebarOpen,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { set, reset, SidebarStatus } from '@/redux/features/sidebarStatusSlice';
import { CourseLesson } from '@/lib/types/types';
import { useAppDispatch } from '@/redux/hooks';
import { cn } from '@/lib/utils/cn';

type Props = {
  course: {
    name: string;
    id: string;
    slug: string;
    lessons: CourseLesson[];
  };
  completedLessons: string[];
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
};

type LessonProps = {
  course: {
    name: string;
    id: string;
    slug: string;
    lessons: CourseLesson[];
  };
  lesson: CourseLesson;
  currentLessonSlug: string;
  lessonComplete?: boolean;
  isAuthed: boolean;
};
const Lesson = (props: LessonProps) => {
  const { course, lesson, currentLessonSlug, lessonComplete, isAuthed } = props;
  return (
    <Link
      href={
        isAuthed
          ? `/courses/${course.slug}/${lesson.slug}`
          : `/courses/${course.slug}`
      }
      key={lesson.id}
      className={cn(
        'text-sm dark:text-neutral-400 pl-3 pr-4 py-2 transition-colors rounded hover:bg-neutral-500/20 flex flex-row items-center justify-between',
        lesson.slug === currentLessonSlug
          ? 'bg-neutral-500/20 dark:text-white'
          : '',
        isAuthed ? 'cursor-pointer' : 'cursor-not-allowed',
      )}
    >
      <p className="line-clamp-1">
        {lesson.name.at(0)?.toUpperCase() + lesson.name.slice(1)}
      </p>

      {isAuthed ? (
        lessonComplete ? (
          <CheckCircle2
            className="text-green-500 dark:text-green-600"
            size={16}
            strokeWidth={2}
          />
        ) : !lessonComplete && lesson.slug === currentLessonSlug ? (
          <CircleDot
            className="text-neutral-500 dark:text-neutral-400"
            size={16}
            strokeWidth={2}
          />
        ) : (
          !lessonComplete &&
          lesson.slug !== currentLessonSlug && (
            <Circle
              className="text-neutral-500 dark:text-neutral-400"
              size={16}
              strokeWidth={2}
            />
          )
        )
      ) : (
        <XCircle
          className="text-red-500 dark:text-red-700"
          size={16}
          strokeWidth={2}
        />
      )}
    </Link>
  );
};

const Sidebar = (props: Props) => {
  const [isHovering, setHovering] = useState(false);
  const showButtonBoundsRef = useRef(null);
  const currentLessonSlug = usePathname().split('/')[3];
  const dispatch = useAppDispatch();

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  const [isHidden, setHidden] = useState(isMobile);

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
          {course.lessons.map((lesson) => (
            <Lesson
              key={lesson.id}
              course={course}
              lesson={lesson}
              currentLessonSlug={currentLessonSlug}
              isAuthed={!!props.completedLessons}
              lessonComplete={
                props.completedLessons
                  ? props.completedLessons.includes(lesson.id)
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

export default Sidebar;
