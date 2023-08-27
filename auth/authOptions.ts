import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { AuthOptions } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as AuthOptions['adapter'],
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // TODO: ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV !== 'production',
};
