// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "4CB963", // Hex color code
    logo: "https://nextjs-football-eight.vercel.app/assets/soccer_ball.gif" // Absolute URL to image
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  
};

export default authHandler;