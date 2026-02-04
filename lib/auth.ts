import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Extend session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      affiliateCode?: string
    } & DefaultSession["user"]
  }
  
  interface User {
    role: string
    affiliateCode?: string
  }
}

const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
        role: { label: "Role", type: "text", optional: true }
      },
      async authorize(credentials) {
        // Mock auth untuk testing
        if (credentials?.email === "admin@raziatech.com" && credentials?.password === "admin123") {
          return { id: "1", email: "admin@raziatech.com", name: "Admin", role: "ADMIN" }
        }
        if (credentials?.email === "affiliate@example.com" && credentials?.password === "password123") {
          return { id: "2", email: "affiliate@example.com", name: "John Affiliate", role: "AFFILIATE", affiliateCode: "AFF001" }
        }
        if (credentials?.email === "buyer@example.com" && credentials?.password === "password123") {
          return { id: "3", email: "buyer@example.com", name: "Jane Buyer", role: "BUYER" }
        }
        
        // New user registration (mock)
        if (credentials?.name) {
          return {
            id: "4",
            email: credentials.email as string,
            name: credentials.name as string,
            role: (credentials.role as string) || "BUYER",
            affiliateCode: credentials.role === "AFFILIATE" ? "AFF" + Math.random().toString(36).substr(2, 6).toUpperCase() : undefined
          }
        }
        
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "raziatech-secret-key-for-development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.affiliateCode = user.affiliateCode
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        session.user.affiliateCode = token.affiliateCode as string
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === "development",
}

// Export handlers untuk API route
const { handlers, auth: nextAuth, signIn: nextAuthSignIn, signOut: nextAuthSignOut } = NextAuth(authConfig)

// Export fungsi auth untuk getServerSession
export const auth = nextAuth

// Export signIn dan signOut
export const signIn = nextAuthSignIn
export const signOut = nextAuthSignOut

// Export handlers untuk API route
export { handlers }

// Helper function untuk getServerSession
export async function getServerSession() {
  return await nextAuth()
}
