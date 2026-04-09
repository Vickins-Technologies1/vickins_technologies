import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  mergeGraphicCollection,
  type GraphicCollection,
} from "@/lib/portfolio-collection";

const COLLECTION = "admin_portfolio";
const STATE_KEY = "graphic_collection";

export const dynamic = "force-dynamic";

type PortfolioDoc = {
  key: string;
  collection: GraphicCollection;
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<PortfolioDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });
    const merged = mergeGraphicCollection(doc?.collection ?? null);

    return NextResponse.json({ collection: merged });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load portfolio collection." },
      { status: 500 }
    );
  }
}
