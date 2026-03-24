import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { loginInputSchema } from "@/server/validators/auth.validator";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (raw) => {
        const parsed = loginInputSchema.safeParse(raw);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user) return null;

        const matched = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!matched) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.userId = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) session.user.id = token.userId as string;
      return session;
    },
  },
});
