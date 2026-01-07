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
      ? "https://your-production-domain.com" // ← CHANGE TO YOUR DOMAIN
      : "http://localhost:3000",
  // Optional: enable if deploying on Vercel/Netlify/etc.
  // trustHost: true,
});