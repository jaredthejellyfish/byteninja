import { Course, UserSettings, User } from '@prisma/client';
import { Session } from 'next-auth';

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface UserWithSettings extends UserWithoutPassword {
  settings: UserSettings;
  accounts: {
    id: string;
    type: string;
    provider: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface UserWithCourses extends UserWithoutPassword {
  authoredCourses: Course[];
  subscribedCourse?: Course;
}

export interface AuthUpdate {
  id: string;
  name: string;
  email: string;
  image: string;
  username: string;
}

export type ExtendedUser =
  | UserWithCourses
  | UserWithSettings
  | UserWithoutPassword;

export interface ExtendedSession extends Session {
  user: Session['user'] & { id: string };
}

export type CourseLesson = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  courseId: string;
  created_at: Date | string;
  updated_at: Date | string;
};
