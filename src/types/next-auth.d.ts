import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    fullname?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      fullname: string;
      email: string;
      role?: string;
    };
  }

  interface JWT {
    id: string;
    fullname: string;
    email: string;
    role?: string;
  }
}
