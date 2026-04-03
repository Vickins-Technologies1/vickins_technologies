import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type InternalAdapter = {
  listUsers: (
    limit?: number,
    offset?: number,
    sortBy?: { field: string; direction: "asc" | "desc" }
  ) => Promise<Array<{
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    emailVerified?: boolean | null;
  }>>;
};

export async function GET() {
  try {
    const context = await auth.$context;
    const adapter = context.internalAdapter as unknown as InternalAdapter;
    const users = await adapter.listUsers(100, 0, {
      field: "createdAt",
      direction: "desc",
    });

    const sanitized = users.map((user) => ({
      id: user.id,
      name: user.name || user.email?.split("@")[0] || "Unknown",
      email: user.email || "unknown",
      role: user.role || "user",
      status: user.emailVerified ? "Active" : "Pending",
    }));

    return NextResponse.json({ users: sanitized });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load users." },
      { status: 500 }
    );
  }
}
