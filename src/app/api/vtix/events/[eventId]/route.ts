import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import VtixEventModel from "@/lib/models/vtix-event";
import VtixTicketTypeModel from "@/lib/models/vtix-ticket-type";
import VtixTicketModel from "@/lib/models/vtix-ticket";
import VtixOrderModel from "@/lib/models/vtix-order";
import { getSessionUser, isOrganizerUser, isSiteAdmin } from "@/lib/vtix-access";

type VtixEventLean = {
  _id: Types.ObjectId;
  createdBy?: string;
  title?: string;
  description?: string;
  status?: string;
  startsAt?: unknown;
  city?: string;
  venueName?: string;
  currency?: string;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  if (!Types.ObjectId.isValid(eventId)) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  await connectMongoose();
  const event = (await VtixEventModel.findById(eventId).lean()) as VtixEventLean | null;
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const isAdmin = isSiteAdmin(user);
  if (!isAdmin && event.createdBy !== user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const ticketTypes = await VtixTicketTypeModel.find({ eventId: event._id }).lean();
  const tickets = await VtixTicketModel.find({ eventId: event._id }).lean();
  const orders = await VtixOrderModel.find({ eventId: event._id, status: "paid" }).lean();

  const ticketTypeMap = ticketTypes.reduce<Record<string, typeof ticketTypes[number]>>(
    (acc, ticket) => {
      acc[String(ticket._id)] = ticket;
      return acc;
    },
    {}
  );

  const attendees = tickets.map((ticket) => ({
    id: String(ticket._id),
    name: ticket.attendeeName,
    email: ticket.attendeeEmail,
    phone: ticket.attendeePhone,
    ticketType: ticketTypeMap[String(ticket.ticketTypeId)]?.name ?? "Ticket",
    status: ticket.status,
  }));

  const revenue = orders.reduce((sum, order) => sum + (order.totalAmount ?? 0), 0);
  const ticketsSold = orders.reduce((sum, order) => sum + (order.ticketCount ?? 0), 0);

  return NextResponse.json({
    event: {
      id: String(event._id),
      title: event.title,
      description: event.description,
      status: event.status,
      startsAt: event.startsAt,
      city: event.city,
      venueName: event.venueName,
      currency: event.currency,
      ticketsSold,
      revenue,
      ticketTypes: ticketTypes.map((ticket) => ({
        id: String(ticket._id),
        name: ticket.name,
        price: ticket.price,
        quantityLimit: ticket.quantityLimit,
        quantitySold: ticket.quantitySold,
      })),
      attendees,
    },
  });
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
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isOrganizerUser(user) && !isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const updates = body as Record<string, string>;

  await connectMongoose();
  const event = await VtixEventModel.findById(eventId);
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  if (!isSiteAdmin(user) && event.createdBy !== user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (updates.title !== undefined) event.title = updates.title.trim();
  if (updates.description !== undefined) event.description = updates.description.trim();
  if (updates.status !== undefined) event.status = updates.status as "draft" | "published" | "archived";

  await event.save();

  return NextResponse.json({ message: "Event updated." });
}
