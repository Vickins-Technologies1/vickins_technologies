import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import VtixOrganizerModel from "@/lib/models/vtix-organizer";
import VtixEventModel from "@/lib/models/vtix-event";
import VtixOrderModel from "@/lib/models/vtix-order";
import VtixTicketModel from "@/lib/models/vtix-ticket";
import { getSessionUser, isSiteAdmin } from "@/lib/vtix-access";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await connectMongoose();

  const organizersCount = await VtixOrganizerModel.countDocuments();
  const events = await VtixEventModel.find().sort({ createdAt: -1 }).lean();
  const ticketsCount = await VtixTicketModel.countDocuments();
  const paidOrders = await VtixOrderModel.find({ status: "paid" }).lean();
  const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.totalAmount ?? 0), 0);

  return NextResponse.json({
    metrics: {
      organizersCount,
      totalEvents: events.length,
      publishedEvents: events.filter((event) => event.status === "published").length,
      ticketsCount,
      totalRevenue,
    },
    events: events.map((event) => ({
      id: String(event._id),
      title: event.title,
      status: event.status,
      city: event.city,
      startsAt: event.startsAt,
      createdBy: event.createdBy,
    })),
  });
}
