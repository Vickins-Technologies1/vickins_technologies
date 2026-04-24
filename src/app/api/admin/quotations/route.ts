import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import QuotationModel from "@/lib/models/quotation";
import { getSessionUser, isSiteAdmin } from "@/lib/chama-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await connectMongoose();

  const quotations = await QuotationModel.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  return NextResponse.json({
    quotations: quotations.map((q) => ({
      id: String(q._id),
      quoteNumber: q.quoteNumber,
      status: q.status,
      clientName: q.clientName,
      clientEmail: q.clientEmail,
      currency: q.currency,
      total: q.total,
      issuedAt: q.issuedAt,
      sentAt: q.sentAt ?? null,
      createdAt: q.createdAt,
      pdfFileName: q.pdfFileName,
      lastError: q.lastError ?? "",
    })),
  });
}

