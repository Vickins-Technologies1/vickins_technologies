import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, password, name } = body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 }
    );
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
        name,
      },
    });

    const createdUser =
      result && typeof result === "object" && "user" in result ? result.user : result;

    const context = await auth.$context;
    await context.internalAdapter.updateUser(createdUser.id, {
      role: "member",
    });

    return NextResponse.json({ user: { ...createdUser, role: "member" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create member user.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
