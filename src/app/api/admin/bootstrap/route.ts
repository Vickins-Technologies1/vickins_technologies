import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, password, name } = body as {
    email?: string;
    password?: string;
    name?: string;
  };

  try {
    const context = await auth.$context;
    const adapter = context.internalAdapter as unknown as {
      countTotalUsers: (
        where?: Array<{ field: string; operator: string; value: string }>
      ) => Promise<number>;
    };
    const adminCount = await adapter.countTotalUsers?.([
      { field: "role", operator: "contains", value: "admin" },
    ]);

    if (adminCount && adminCount > 0) {
      return NextResponse.json(
        { error: "Admin signup is closed. An admin already exists." },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to verify admin signup status." },
      { status: 500 }
    );
  }

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 }
    );
  }

  try {
    const result = await auth.api.createUser({
      body: {
        email,
        password,
        name,
        role: "admin",
      },
    });

    const user = "user" in result ? result.user : result;
    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create admin user.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
