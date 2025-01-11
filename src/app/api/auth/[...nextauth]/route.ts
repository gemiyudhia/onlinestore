import { login } from "@/lib/firebase/service";
import { UserData } from "@/types/UserData";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: UserData | null = await login({ email });

        if (user) {
          if (!user.password) {
            throw new Error("Password hash tidak ditemukan untuk user.");
          }

          const confirmPassword = await compare(password, user.password);

          if (confirmPassword) {
            return {
              id: user.id,
              fullname: user.fullname,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } else {
          console.log("User tidak ditemukan");
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user) {
        const customUser = user as UserData;
        token.id = customUser.id;
        token.email = customUser.email;
        token.fullname = customUser.fullname;
        token.role = customUser.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        fullname: token.fullname as string,
        email: token.email as string,
        role: token.role as string | undefined,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
