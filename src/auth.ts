import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { getUserByEmail } from "./app/actions/auth/getUserByEmail";
import { ACCESS_TOKEN_KEY } from "./global";
import { LOGIN_ROUTE } from "./routes";
import { LoginSchema } from "./schemas/login-schema";
export const prisma: PrismaClient = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.parseAsync(credentials);
        const { email } = await validatedFields;
        const res = await getUserByEmail(email, true);
        if (res.user) {
          return {
            ...res.user,
            access_token: res.access_token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // const providerIsCredentials = account?.provider === "credentials";
      (await cookies()).set(
        ACCESS_TOKEN_KEY,
        (user as { access_token: string }).access_token
      );
      return true;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exp, iat, jti, sub, access_token, ...tokenData } = token;

      Object.assign(session, {
        ...session,
        user: {
          ...tokenData,
        },
      });

      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        Object.assign(token, session);
      }
      return { ...token, ...user };
    },
  },
  pages: {
    signIn: LOGIN_ROUTE,
    // error: `/auth/error`,
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
});
