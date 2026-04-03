import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getDefaultInventoryState, type InventoryState } from "@/lib/admin-data";

const COLLECTION = "admin_inventory";
const STATE_KEY = "default";

type InventoryDoc = {
  key: string;
  state: InventoryState;
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<InventoryDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });

    if (!doc) {
      const state = getDefaultInventoryState();
      await collection.insertOne({
        key: STATE_KEY,
        state,
        updatedAt: new Date(),
      });
      return NextResponse.json({ state });
    }

    return NextResponse.json({ state: doc.state ?? getDefaultInventoryState() });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load inventory data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const state = body?.state as InventoryState | undefined;

  if (!state) {
    return NextResponse.json(
      { error: "Invalid inventory payload." },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection<InventoryDoc>(COLLECTION);
    await collection.updateOne(
      { key: STATE_KEY },
      { $set: { state, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save inventory data." },
      { status: 500 }
    );
  }
}
