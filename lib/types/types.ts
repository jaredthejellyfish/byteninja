import { User, UserSettings } from '@prisma/client';

export interface UserExtendedSettings extends Omit<User, 'password'> {
  settings?: UserSettings[];
  accounts?: {
    id: number;
    type: string;
    provider: string;
  }[];
}
