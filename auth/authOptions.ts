import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import TwitchProvider from 'next-auth/providers/twitch';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { AuthOptions } from 'next-auth';
import { compare } from 'bcryptjs';
import { z } from 'zod';

import { ExtendedSession } from '@/lib/types/types';

const SessionSchema = z.object({
  expires: z.union([z.string(), z.undefined()]),
  user: z.object({
    email: z.string().email(),
    id: z.string().cuid(),
    image: z.string(),
    name: z.string(),
  }),
});

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as AuthOptions['adapter'],
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;
        const { username, password: passwordInput } = credentials;
        // Add logic here to look up the user from the credentials supplied
        const dbUser = await prisma.user.findFirst({
          where: {
            email: username,
          },
        });

        const password = dbUser?.password;

        if (!password) return null;

        const isValid = await compare(passwordInput, password);

        if (!isValid) return null;

        const user = {
          id: dbUser?.id,
          name: dbUser?.name,
          email: dbUser?.email,
          image: dbUser?.image,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session }) => {
      if (user) {
        token.id = user.id;
      }

      if (session) {
        const sessionSchema = SessionSchema.safeParse(session);

        if (sessionSchema.success) {
          token.id = sessionSchema.data.user.id;
          token.name = sessionSchema.data.user.name;
          token.email = sessionSchema.data.user.email;
          token.picture = sessionSchema.data.user.image;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      const extendedSession = session as ExtendedSession;
      if (token) {
        extendedSession.user.id = token.id as string;
      }
      return extendedSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
};
