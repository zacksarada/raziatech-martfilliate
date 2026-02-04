import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      affiliateCode?: string;
    } & DefaultSession["user"];
  }
  
  interface User {
    role: string;
    affiliateCode?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    affiliateCode?: string;
    id?: string;
  }
}
