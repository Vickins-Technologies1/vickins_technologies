import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getDefaultWorkState, mergeWorkState, type WorkState } from "@/lib/admin-work";

const COLLECTION = "admin_work";
const STATE_KEY = "default";

type WorkDoc = {
  key: string;
  state: WorkState;
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<WorkDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });

    if (!doc) {
      return NextResponse.json({ state: getDefaultWorkState() });
    }

    return NextResponse.json({ state: mergeWorkState(doc.state) });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load work data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const state = body?.state as WorkState | undefined;

  if (!state) {
    return NextResponse.json(
      { error: "Invalid work payload." },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection<WorkDoc>(COLLECTION);
    await collection.updateOne(
      { key: STATE_KEY },
      { $set: { state, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save work data." },
      { status: 500 }
    );
  }
}
