import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  getDefaultAdminConfig,
  mergeAdminConfig,
  type AdminConfig,
} from "@/lib/admin-config";

const COLLECTION = "admin_config";
const STATE_KEY = "default";

type ConfigDoc = {
  key: string;
  config: AdminConfig;
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ConfigDoc>(COLLECTION);
    const doc = await collection.findOne({ key: STATE_KEY });

    if (!doc) {
      return NextResponse.json({ config: getDefaultAdminConfig() });
    }

    return NextResponse.json({ config: mergeAdminConfig(doc.config) });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load admin config." },
      { status: 500 }
    );
  }
}
