import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getDefaultFinanceState, type FinanceState } from "@/lib/admin-data";

const COLLECTION = "admin_finance";
const STATE_KEY = "default";

type FinanceDoc = {
  key: string;
  state: FinanceState;
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<FinanceDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });

    if (!doc) {
      return NextResponse.json({ state: getDefaultFinanceState() });
    }

    return NextResponse.json({ state: doc.state ?? getDefaultFinanceState() });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load finance data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const state = body?.state as FinanceState | undefined;

  if (!state) {
    return NextResponse.json(
      { error: "Invalid finance payload." },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection<FinanceDoc>(COLLECTION);
    await collection.updateOne(
      { key: STATE_KEY },
      { $set: { state, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save finance data." },
      { status: 500 }
    );
  }
}
