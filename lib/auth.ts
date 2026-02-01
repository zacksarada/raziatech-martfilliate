import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Cari user di database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          // Jika user tidak ditemukan atau tidak ada password
          if (!user || !user.password) {
            return null;
          }

          // Verifikasi password
          const passwordMatch = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          // Return user object untuk session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || "AFFILIATE",
            affiliateCode: user.affiliateCode || ""
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.affiliateCode = user.affiliateCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.affiliateCode = token.affiliateCode as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
