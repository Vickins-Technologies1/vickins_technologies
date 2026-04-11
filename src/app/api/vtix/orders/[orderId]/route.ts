import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import VtixOrderModel from "@/lib/models/vtix-order";
import { getSessionUser } from "@/lib/vtix-access";

type VtixOrderLean = {
  _id: unknown;
  userId?: string;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  if (!Types.ObjectId.isValid(orderId)) {
    return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectMongoose();
  const order = (await VtixOrderModel.findById(orderId).lean()) as VtixOrderLean | null;
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.userId && order.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return NextResponse.json({ order });
}
