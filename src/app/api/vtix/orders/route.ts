import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { randomUUID } from "crypto";
import { connectMongoose } from "@/lib/mongoose";
import VtixEventModel from "@/lib/models/vtix-event";
import VtixTicketTypeModel from "@/lib/models/vtix-ticket-type";
import VtixOrderModel from "@/lib/models/vtix-order";
import VtixTicketModel from "@/lib/models/vtix-ticket";
import { getSessionUser } from "@/lib/vtix-access";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  if (scope !== "mine") {
    return NextResponse.json({ error: "Invalid scope." }, { status: 400 });
  }

  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectMongoose();
  const orConditions: Record<string, unknown>[] = [{ userId: user.id }];
  if (user.email) {
    orConditions.push({ email: user.email.toLowerCase() });
  }
  const orders = await VtixOrderModel.find({ $or: orConditions }).lean();
  const orderIds = orders.map((order) => order._id);
  const tickets = await VtixTicketModel.find({ orderId: { $in: orderIds } }).lean();
  const eventIds = tickets.map((ticket) => ticket.eventId);
  const ticketTypeIds = tickets.map((ticket) => ticket.ticketTypeId);
  const events = await VtixEventModel.find({ _id: { $in: eventIds } }).lean();
  const ticketTypes = await VtixTicketTypeModel.find({ _id: { $in: ticketTypeIds } }).lean();

  const eventMap = events.reduce<Record<string, typeof events[number]>>((acc, event) => {
    acc[String(event._id)] = event;
    return acc;
  }, {});

  const ticketTypeMap = ticketTypes.reduce<Record<string, typeof ticketTypes[number]>>((acc, type) => {
    acc[String(type._id)] = type;
    return acc;
  }, {});

  return NextResponse.json({
    tickets: tickets.map((ticket) => {
      const event = eventMap[String(ticket.eventId)];
      const ticketType = ticketTypeMap[String(ticket.ticketTypeId)];
      return {
        id: String(ticket._id),
        eventTitle: event?.title ?? "Event",
        eventDate: event?.startsAt,
        venue: event?.venueName,
        ticketType: ticketType?.name ?? "Ticket",
        qrCode: ticket.qrCode,
        currency: event?.currency ?? "KES",
        price: ticketType?.price ?? 0,
      };
    }),
  });
}

  export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const body = await request.json().catch(() => ({}));
    const {
      eventId,
      ticketTypeId,
      quantity,
      buyerName,
      buyerEmail,
      buyerPhone,
      paymentMethod,
    } = body as Record<string, unknown>;

    if (!eventId || !ticketTypeId || !quantity) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!user && !buyerEmail) {
      return NextResponse.json(
        { error: "Provide an email address for ticket delivery." },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(String(eventId)) || !Types.ObjectId.isValid(String(ticketTypeId))) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    await connectMongoose();
    const event = await VtixEventModel.findById(eventId);
    if (!event || event.status !== "published") {
      return NextResponse.json({ error: "Event is not available." }, { status: 400 });
    }

    const ticketType = await VtixTicketTypeModel.findById(ticketTypeId);
    if (!ticketType) {
      return NextResponse.json({ error: "Ticket type not found." }, { status: 404 });
    }

    const requestedQty = Number(quantity);
    const available =
      ticketType.quantityLimit === undefined
        ? Infinity
        : Math.max(ticketType.quantityLimit - (ticketType.quantitySold ?? 0), 0);
    if (requestedQty > available) {
      return NextResponse.json({ error: "Not enough tickets left." }, { status: 400 });
    }

    const totalAmount = ticketType.price * requestedQty;
    const order = await VtixOrderModel.create({
      eventId: event._id,
      organizerId: event.organizerId,
      userId: user?.id,
      email: String(buyerEmail ?? user?.email ?? "").toLowerCase(),
      phone: String(buyerPhone ?? ""),
      totalAmount,
      currency: event.currency,
      status: "paid",
      paymentMethod: String(paymentMethod ?? "mpesa"),
      paymentReference: `VTIX-${Date.now()}`,
      ticketCount: requestedQty,
    });

    const ticketsToCreate = Array.from({ length: requestedQty }).map(() => ({
      eventId: event._id,
      orderId: order._id,
      ticketTypeId: ticketType._id,
      attendeeName: String(buyerName ?? ""),
      attendeeEmail: String(buyerEmail ?? user?.email ?? "").toLowerCase(),
      attendeePhone: String(buyerPhone ?? ""),
      qrCode: `VTIX-${randomUUID()}`,
      status: "active",
    }));

    const createdTickets = await VtixTicketModel.insertMany(ticketsToCreate);
    ticketType.quantitySold = (ticketType.quantitySold ?? 0) + requestedQty;
    await ticketType.save();

    return NextResponse.json({
      orderId: String(order._id),
      tickets: createdTickets.map((ticket) => ({
        id: String(ticket._id),
        qrCode: ticket.qrCode,
        ticketTypeName: ticketType.name,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Unable to complete order." }, { status: 500 });
  }
}
