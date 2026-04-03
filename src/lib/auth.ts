// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import connectToDatabase from "@/lib/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(await connectToDatabase()),
  emailAndPassword: {
    enabled: true,
    // Optional: strengthen password requirements
    // minPasswordLength: 8,
  },
  plugins: [
    admin({
      adminRoles: ["admin"],
      defaultRole: "user", // All new users start as "user"
    }),
  ],
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.BETTER_AUTH_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
        "https://vickins-technologies.vercel.app"
      : "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "https://vickins-technologies.vercel.app",
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.BETTER_AUTH_BASE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[],
  // Optional: enable if deploying on Vercel/Netlify/etc.
  // trustHost: true,
});
