import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import QuotationModel from "@/lib/models/quotation";
import { getSessionUser, isSiteAdmin } from "@/lib/chama-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ quotationId: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSiteAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { quotationId } = await context.params;
  if (!Types.ObjectId.isValid(quotationId)) {
    return NextResponse.json({ error: "Invalid quotation id." }, { status: 400 });
  }

  await connectMongoose();
  const quotation = await QuotationModel.findById(quotationId).lean();

  if (!quotation) {
    return NextResponse.json({ error: "Quotation not found." }, { status: 404 });
  }

  const pdfBase64 = quotation.pdfBase64;
  if (!pdfBase64) {
    return NextResponse.json({ error: "No PDF stored for this quotation." }, { status: 404 });
  }

  const buffer = Buffer.from(pdfBase64, "base64");
  const fileName = quotation.pdfFileName || `${quotation.quoteNumber || "quotation"}.pdf`;

  return new Response(buffer, {
    headers: {
      "Content-Type": quotation.pdfContentType || "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName.replace(/\"/g, "")}"`,
      "Cache-Control": "no-store",
    },
  });
}
