import { User, UserSettings } from '@prisma/client';
import { Session } from 'next-auth';

export interface UserExtendedSettings extends Omit<User, 'password'> {
  settings?: UserSettings[];
  accounts?: {
    id: number;
    type: string;
    provider: string;
  }[];
}

export interface ExtendedSession extends Session {
  user: Session['user'] & { id: string };
}
