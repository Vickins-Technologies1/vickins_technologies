import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import VtixTicketModel from "@/lib/models/vtix-ticket";
import VtixEventModel from "@/lib/models/vtix-event";
import VtixTicketTypeModel from "@/lib/models/vtix-ticket-type";

type VtixEventLean = {
  title?: string;
};

type VtixTicketTypeLean = {
  name?: string;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { code } = body as { code?: string };
  if (!code) {
    return NextResponse.json({ error: "Missing ticket code." }, { status: 400 });
  }

  await connectMongoose();
  const ticket = await VtixTicketModel.findOne({ qrCode: code });
  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  }

  const event = (await VtixEventModel.findById(ticket.eventId).lean()) as
    | VtixEventLean
    | null;
  const ticketType = (await VtixTicketTypeModel.findById(ticket.ticketTypeId).lean()) as
    | VtixTicketTypeLean
    | null;

  if (ticket.status === "used") {
    return NextResponse.json({
      result: {
        status: "used",
        attendee: ticket.attendeeName || ticket.attendeeEmail || "Guest",
        ticketType: ticketType?.name ?? "Ticket",
        eventTitle: event?.title ?? "Event",
      },
    });
  }

  ticket.status = "used";
  ticket.scannedAt = new Date();
  await ticket.save();

  return NextResponse.json({
    result: {
      status: "valid",
      attendee: ticket.attendeeName || ticket.attendeeEmail || "Guest",
      ticketType: ticketType?.name ?? "Ticket",
      eventTitle: event?.title ?? "Event",
    },
  });
}
