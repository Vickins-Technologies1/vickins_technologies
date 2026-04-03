import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  getDefaultFinanceState,
  type FinanceState,
  type Hustle,
  type InventoryState,
} from "@/lib/admin-data";

const COLLECTION = "admin_finance";
const INVENTORY_COLLECTION = "admin_inventory";
const STATE_KEY = "default";

type FinanceDoc = {
  key: string;
  state: FinanceState;
  updatedAt: Date;
};

type InventoryDoc = {
  key: string;
  state: InventoryState;
  updatedAt: Date;
};

const getSeedHustles = (inventory?: InventoryState): Hustle[] | undefined => {
  if (!inventory?.hustles?.length) return undefined;
  return inventory.hustles.map((hustle) => ({
    id: hustle.id,
    name: hustle.name,
  }));
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<FinanceDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });

    if (!doc) {
      const inventoryCollection = db.collection<InventoryDoc>(INVENTORY_COLLECTION);
      const inventoryDoc = await inventoryCollection.findOne({ key: STATE_KEY });
      const seededHustles = getSeedHustles(inventoryDoc?.state);
      const state = getDefaultFinanceState(seededHustles);

      await collection.insertOne({
        key: STATE_KEY,
        state,
        updatedAt: new Date(),
      });

      return NextResponse.json({ state });
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
