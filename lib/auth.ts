import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@quantalyt.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Quantalyt@2024!';

        if (credentials.email !== adminEmail) return null;

        // Check if password is already hashed (starts with $2b)
        let isValid = false;
        if (adminPassword.startsWith('$2b$')) {
          isValid = await bcrypt.compare(credentials.password, adminPassword);
        } else {
          isValid = credentials.password === adminPassword;
        }

        if (!isValid) return null;

        return {
          id: '1',
          email: adminEmail,
          name: 'Quantalyt Admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'quantalyt-super-secret-key-2024',
};
