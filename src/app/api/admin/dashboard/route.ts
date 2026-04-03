import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  getDefaultAdminConfig,
  mergeAdminConfig,
  type AdminConfig,
} from "@/lib/admin-config";
import {
  getDefaultFinanceState,
  getDefaultInventoryState,
  type FinanceState,
  type InventoryState,
} from "@/lib/admin-data";

const CONFIG_COLLECTION = "admin_config";
const INVENTORY_COLLECTION = "admin_inventory";
const FINANCE_COLLECTION = "admin_finance";
const STATE_KEY = "default";

type ConfigDoc = {
  key: string;
  config: AdminConfig;
  updatedAt: Date;
};

type InventoryDoc = {
  key: string;
  state: InventoryState;
  updatedAt: Date;
};

type FinanceDoc = {
  key: string;
  state: FinanceState;
  updatedAt: Date;
};

const getTotalCash = (state: FinanceState) =>
  state.accounts.reduce((sum, account) => {
    const flow = state.entries.reduce((entrySum, entry) => {
      if (entry.accountId !== account.id) return entrySum;
      return entrySum + (entry.direction === "in" ? entry.amount : -entry.amount);
    }, 0);
    return sum + account.openingBalance + flow;
  }, 0);

export async function GET() {
  try {
    const db = await connectToDatabase();

    const configCollection = db.collection<ConfigDoc>(CONFIG_COLLECTION);
    const configDoc = await configCollection.findOne({ key: STATE_KEY });

    const inventoryCollection = db.collection<InventoryDoc>(INVENTORY_COLLECTION);
    const financeCollection = db.collection<FinanceDoc>(FINANCE_COLLECTION);

    const inventoryDoc = await inventoryCollection.findOne({ key: STATE_KEY });
    const financeDoc = await financeCollection.findOne({ key: STATE_KEY });

    const inventoryState = inventoryDoc?.state ?? getDefaultInventoryState();
    const financeState = financeDoc?.state ?? getDefaultFinanceState();

    const stats = {
      activeHustles: inventoryState.hustles.length,
      stockItems: inventoryState.items.length,
      totalCash: getTotalCash(financeState),
    };

    return NextResponse.json({
      config: mergeAdminConfig(configDoc?.config),
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load dashboard data." },
      { status: 500 }
    );
  }
}
