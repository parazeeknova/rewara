import { PrismaAdapter } from '@auth/prisma-adapter';
import { database } from '@rewara/db';
import { compare } from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import RedditProvider from 'next-auth/providers/reddit';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(database),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await database.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-google-client-id'
          : (() => {
              throw new Error('GOOGLE_CLIENT_ID is not defined');
            })()),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-google-client-secret'
          : (() => {
              throw new Error('GOOGLE_CLIENT_SECRET is not defined');
            })()),
    }),
    GithubProvider({
      clientId:
        process.env.GITHUB_CLIENT_ID ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-github-client-id'
          : (() => {
              throw new Error('GITHUB_CLIENT_ID is not defined');
            })()),
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-github-client-secret'
          : (() => {
              throw new Error('GITHUB_CLIENT_SECRET is not defined');
            })()),
    }),
    DiscordProvider({
      clientId:
        process.env.DISCORD_CLIENT_ID ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-discord-client-id'
          : (() => {
              throw new Error('DISCORD_CLIENT_ID is not defined');
            })()),
      clientSecret:
        process.env.DISCORD_CLIENT_SECRET ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-discord-client-secret'
          : (() => {
              throw new Error('DISCORD_CLIENT_SECRET is not defined');
            })()),
    }),
    RedditProvider({
      clientId:
        process.env.REDDIT_CLIENT_ID ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-reddit-client-id'
          : (() => {
              throw new Error('REDDIT_CLIENT_ID is not defined');
            })()),
      clientSecret:
        process.env.REDDIT_CLIENT_SECRET ||
        (process.env.NODE_ENV === 'development'
          ? 'dev-reddit-client-secret'
          : (() => {
              throw new Error('REDDIT_CLIENT_SECRET is not defined');
            })()),
    }),
  ],
  pages: {
    signIn: '/auth/login',
    // @ts-expect-error
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};
