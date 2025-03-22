import { PrismaAdapter } from '@auth/prisma-adapter';
import { database } from '@rewara/db';
import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(database),
  providers: [
    GoogleProvider({
      // biome-ignore lint/style/noNonNullAssertion: Required
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // biome-ignore lint/style/noNonNullAssertion: Required
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};
