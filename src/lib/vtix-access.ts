import { headers } from "next/headers";
import { Types } from "mongoose";
import { auth } from "@/lib/auth";
import { connectMongoose } from "@/lib/mongoose";
import VtixOrganizerMemberModel from "@/lib/models/vtix-organizer-member";

export type SessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
};

export const getSessionUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session && typeof session === "object" && "user" in session ? session.user : null;
  if (!user) return null;
  return user as SessionUser;
};

export const isSiteAdmin = (user: SessionUser | null) => {
  if (!user?.role) return false;
  return user.role
    .split(",")
    .map((value) => value.trim())
    .includes("admin");
};

export const isOrganizerUser = (user: SessionUser | null) => {
  if (!user?.role) return false;
  return user.role
    .split(",")
    .map((value) => value.trim())
    .some((role) => role === "moderator" || role === "admin");
};

export const isAttendeeUser = (user: SessionUser | null) => {
  if (!user?.role) return false;
  return user.role
    .split(",")
    .map((value) => value.trim())
    .some((role) => role === "member" || role === "user");
};

export const getOrganizerMember = async (organizerId: string, user: SessionUser) => {
  if (!Types.ObjectId.isValid(organizerId)) return null;
  const orConditions: Record<string, unknown>[] = [{ userId: user.id }];
  if (user.email) {
    orConditions.push({ email: user.email.toLowerCase() });
  }
  const query = {
    organizerId: new Types.ObjectId(organizerId),
    $or: orConditions,
  };
  await connectMongoose();
  return (await VtixOrganizerMemberModel.findOne(query).lean()) as
    | {
        _id?: unknown;
        userId?: string;
        email?: string | null;
        role?: string | null;
        status?: string | null;
      }
    | null;
};
