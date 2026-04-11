import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import VtixTicketTypeModel from "@/lib/models/vtix-ticket-type";
import { getSessionUser, isOrganizerUser, isSiteAdmin } from "@/lib/vtix-access";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  if (!Types.ObjectId.isValid(eventId)) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isOrganizerUser(user) && !isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const { name, price, quantityLimit, tier, isEarlyBird } = body as Record<string, unknown>;
  if (!name || price === undefined) {
    return NextResponse.json({ error: "Name and price are required." }, { status: 400 });
  }
  await connectMongoose();
  const ticketType = await VtixTicketTypeModel.create({
    eventId,
    name: String(name),
    price: Number(price),
    quantityLimit: quantityLimit ? Number(quantityLimit) : undefined,
    tier: String(tier ?? ""),
    isEarlyBird: Boolean(isEarlyBird),
  });
  return NextResponse.json({ ticketTypeId: String(ticketType._id) }, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  if (!Types.ObjectId.isValid(eventId)) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isOrganizerUser(user) && !isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const { ticketTypeId, updates } = body as {
    ticketTypeId?: string;
    updates?: Record<string, unknown>;
  };
  if (!ticketTypeId || !Types.ObjectId.isValid(ticketTypeId)) {
    return NextResponse.json({ error: "Invalid ticket type." }, { status: 400 });
  }
  await connectMongoose();
  await VtixTicketTypeModel.updateOne({ _id: ticketTypeId, eventId }, { $set: updates ?? {} });
  return NextResponse.json({ message: "Ticket type updated." });
}
