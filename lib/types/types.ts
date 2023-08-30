import { Course, UserSettings, User } from '@prisma/client';
import { Session } from 'next-auth';

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface UserWithSettings extends UserWithoutPassword {
  settings: UserSettings;
}

export interface UserWithCourses extends UserWithoutPassword {
  courses: Course[];
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
