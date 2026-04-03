import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { token, email, password, name } = body as {
    token?: string;
    email?: string;
    password?: string;
    name?: string;
  };

  const bootstrapToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
  if (!bootstrapToken) {
    return NextResponse.json(
      { error: "Admin signup is disabled." },
      { status: 403 }
    );
  }

  if (!token || token !== bootstrapToken) {
    return NextResponse.json(
      { error: "Invalid admin signup code." },
      { status: 401 }
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
