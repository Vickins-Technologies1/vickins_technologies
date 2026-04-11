import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import VtixEventModel from "@/lib/models/vtix-event";
import VtixOrganizerModel from "@/lib/models/vtix-organizer";
import VtixOrganizerMemberModel from "@/lib/models/vtix-organizer-member";
import VtixTicketTypeModel from "@/lib/models/vtix-ticket-type";
import VtixOrderModel from "@/lib/models/vtix-order";
import { getSessionUser, isOrganizerUser, isSiteAdmin } from "@/lib/vtix-access";
import { slugify } from "@/lib/vtix-utils";

type VtixEventLean = {
  _id: unknown;
  slug?: string;
  title?: string;
  description?: string;
  category?: string;
  venueName?: string;
  venueAddress?: string;
  city?: string;
  country?: string;
  mapEmbedUrl?: string;
  coverImageUrl?: string;
  startsAt?: unknown;
  endsAt?: unknown;
  organizerId?: unknown;
  currency?: string;
  status?: string;
  createdBy?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const status = searchParams.get("status");
  const scope = searchParams.get("scope");

  await connectMongoose();

  if (slug) {
    const event = (await VtixEventModel.findOne({ slug }).lean()) as VtixEventLean | null;
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }
    const ticketTypes = await VtixTicketTypeModel.find({ eventId: event._id })
      .sort({ price: 1 })
      .lean();
    return NextResponse.json({
      event: {
        id: String(event._id),
        slug: event.slug,
        title: event.title,
        description: event.description,
        category: event.category,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        city: event.city,
        country: event.country,
        mapEmbedUrl: event.mapEmbedUrl,
        coverImageUrl: event.coverImageUrl,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        organizerName: event.organizerId ? "V-Tix Organizer" : undefined,
        currency: event.currency,
        ticketTypes: ticketTypes.map((ticket) => ({
          id: String(ticket._id),
          name: ticket.name,
          price: ticket.price,
          quantityLimit: ticket.quantityLimit,
          quantitySold: ticket.quantitySold,
          tier: ticket.tier,
          isEarlyBird: ticket.isEarlyBird,
        })),
      },
    });
  }

  if (scope === "dashboard" || scope === "organizer") {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const isAdmin = isSiteAdmin(user);
    const isOrganizer = isOrganizerUser(user);
    if (!isAdmin && !isOrganizer) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    const organizerFilter = isAdmin ? {} : { createdBy: user.id };
    const events = await VtixEventModel.find(organizerFilter).sort({ createdAt: -1 }).lean();
    const eventIds = events.map((event) => event._id);
    const ticketTypes = await VtixTicketTypeModel.find({ eventId: { $in: eventIds } }).lean();
    const orders = await VtixOrderModel.find({ eventId: { $in: eventIds }, status: "paid" }).lean();

    const ticketTypeByEvent = ticketTypes.reduce<Record<string, typeof ticketTypes>>((acc, ticket) => {
      const key = String(ticket.eventId);
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});

    const orderAgg = orders.reduce<Record<string, { ticketsSold: number; revenue: number }>>(
      (acc, order) => {
        const key = String(order.eventId);
        if (!acc[key]) acc[key] = { ticketsSold: 0, revenue: 0 };
        acc[key].ticketsSold += order.ticketCount ?? 0;
        acc[key].revenue += order.totalAmount ?? 0;
        return acc;
      },
      {}
    );

    const eventsPayload = events.map((event) => {
      const eventId = String(event._id);
      const types = ticketTypeByEvent[eventId] ?? [];
      const startingPrice = types.length ? Math.min(...types.map((ticket) => ticket.price)) : 0;
      const aggregates = orderAgg[eventId] ?? { ticketsSold: 0, revenue: 0 };
      return {
        id: eventId,
        title: event.title,
        status: event.status,
        startsAt: event.startsAt,
        city: event.city,
        currency: event.currency,
        startingPrice,
        ticketsSold: aggregates.ticketsSold,
        revenue: aggregates.revenue,
      };
    });

    if (scope === "dashboard") {
      const metrics = {
        totalEvents: events.length,
        publishedEvents: events.filter((event) => event.status === "published").length,
        ticketsSold: eventsPayload.reduce((sum, item) => sum + (item.ticketsSold || 0), 0),
        totalRevenue: eventsPayload.reduce((sum, item) => sum + (item.revenue || 0), 0),
      };
      return NextResponse.json({ metrics, events: eventsPayload });
    }

    return NextResponse.json({ events: eventsPayload });
  }

  const eventQuery: Record<string, unknown> = {};
  if (status) eventQuery.status = status;
  const events = await VtixEventModel.find(eventQuery).sort({ startsAt: 1 }).lean();
  const eventIds = events.map((event) => event._id);
  const ticketTypes = await VtixTicketTypeModel.find({ eventId: { $in: eventIds } }).lean();

  const ticketTypeMap = ticketTypes.reduce<Record<string, typeof ticketTypes>>((acc, ticket) => {
    const key = String(ticket.eventId);
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  return NextResponse.json({
    events: events.map((event) => {
      const eventId = String(event._id);
      const types = ticketTypeMap[eventId] ?? [];
      const startingPrice = types.length ? Math.min(...types.map((ticket) => ticket.price)) : 0;
      return {
        id: eventId,
        slug: event.slug,
        title: event.title,
        startsAt: event.startsAt,
        venueName: event.venueName,
        city: event.city,
        country: event.country,
        category: event.category,
        coverImageUrl: event.coverImageUrl,
        organizerName: "V-Tix Organizer",
        startingPrice,
        currency: event.currency,
      };
    }),
  });
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!isOrganizerUser(user) && !isSiteAdmin(user)) {
      return NextResponse.json({ error: "Only organizers can create events." }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const {
      title,
      description,
      category,
      startsAt,
      endsAt,
      venueName,
      venueAddress,
      city,
      country,
      mapEmbedUrl,
      coverImageUrl,
      ticketTypes,
    } = body as Record<string, unknown>;

    if (!title || !startsAt) {
      return NextResponse.json(
        { error: "Title and start date are required." },
        { status: 400 }
      );
    }

    await connectMongoose();

    let organizer = await VtixOrganizerModel.findOne({ createdBy: user.id });
    if (!organizer) {
      organizer = await VtixOrganizerModel.create({
        name: user.name || user.email?.split("@")[0] || "Organizer",
        slug: slugify(user.name || user.email || "organizer"),
        createdBy: user.id,
        country: "Kenya",
        city: "Nairobi",
      });
    }

    const existingMember = await VtixOrganizerMemberModel.findOne({
      organizerId: organizer._id,
      userId: user.id,
    });
    if (!existingMember) {
      await VtixOrganizerMemberModel.create({
        organizerId: organizer._id,
        userId: user.id,
        name: user.name || user.email?.split("@")[0] || "Organizer",
        email: user.email?.toLowerCase(),
        role: "admin",
        status: "active",
        joinedAt: new Date(),
        invitedBy: user.id,
      });
    }

    const event = await VtixEventModel.create({
      organizerId: organizer._id,
      slug: `${slugify(String(title))}-${Date.now().toString().slice(-5)}`,
      title: String(title),
      description: String(description ?? ""),
      category: String(category ?? ""),
      startsAt: new Date(String(startsAt)),
      endsAt: endsAt ? new Date(String(endsAt)) : undefined,
      venueName: String(venueName ?? ""),
      venueAddress: String(venueAddress ?? ""),
      city: String(city ?? ""),
      country: String(country ?? ""),
      mapEmbedUrl: String(mapEmbedUrl ?? ""),
      coverImageUrl: String(coverImageUrl ?? ""),
      createdBy: user.id,
      status: "draft",
    });

    const ticketList = Array.isArray(ticketTypes) ? ticketTypes : [];
    if (ticketList.length) {
      await VtixTicketTypeModel.insertMany(
        ticketList.map((ticket) => ({
          eventId: event._id,
          name: String(ticket?.name ?? "General"),
          price: Number(ticket?.price ?? 0),
          quantityLimit: ticket?.quantityLimit ? Number(ticket.quantityLimit) : undefined,
          tier: String(ticket?.tier ?? ""),
          isEarlyBird: Boolean(ticket?.isEarlyBird),
        }))
      );
    }

    return NextResponse.json({ eventId: String(event._id) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create event." }, { status: 500 });
  }
}
