// src/auth.config.ts
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { DbUser } from "@/types/User";

// Define app-level allowed roles
type AppRole = "user" | "admin";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await connectToDatabase();

        const user = (await db
          .collection("users")
          .findOne({ email: credentials.email })) as DbUser | null;

        if (!user || !user.password) return null;

        // Validate password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // `_id` exists at runtime, so assert non-null
        const userId = user._id?.toString();
        if (!userId) return null;

        // Cast role to your app's roles
        const role = (user.role ?? "user") as AppRole;

        return {
          id: userId,
          name: user.name ?? "",
          email: user.email,
          role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt" satisfies SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user.role as AppRole) ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = (token.role as AppRole) ?? "user";
      }
      return session;
    },
  },
};
