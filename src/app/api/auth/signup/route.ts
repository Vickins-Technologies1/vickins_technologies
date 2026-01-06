// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import type { User } from '@/types/User';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const db = await connectToDatabase();
  const usersCollection = db.collection<User>('users');

  const existing = await usersCollection.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await usersCollection.insertOne({
    email,
    password: hashedPassword,
    name,
    role: 'user' as const, // Default role
  });

  return NextResponse.json({
    success: true,
    user: {
      id: result.insertedId.toString(),
      email,
      name,
      role: 'user',
    },
  });
}