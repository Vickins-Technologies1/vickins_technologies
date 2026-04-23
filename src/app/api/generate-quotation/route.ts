import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import path from "path";
import { readFile } from "fs/promises";
import transporter from "@/lib/nodemailer";
import QuotationPDF from "@/components/QuotationPDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type QuoteItem = {
  description: string;
  quantity: number;
  price: number;
};

type GenerateQuotationPayload = {
  clientName: string;
  clientEmail: string;
  items: QuoteItem[];
  notes?: string;
  currency?: string;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const sanitizeMoney = (value: unknown) => {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return num;
};

const sanitizeQty = (value: unknown) => {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || num <= 0) return 1;
  return Math.floor(num);
};

const toDataUrl = (buffer: Buffer, mime: string) =>
  `data:${mime};base64,${buffer.toString("base64")}`;

const readPublicAssetDataUrl = async (relativePath: string) => {
  const fullPath = path.join(process.cwd(), "public", relativePath);
  const ext = path.extname(relativePath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".svg"
          ? "image/svg+xml"
          : "application/octet-stream";
  const data = await readFile(fullPath);
  return toDataUrl(data, mime);
};

const createQuoteNumber = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `QTN-${yyyy}${mm}${dd}-${rand}`;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Partial<GenerateQuotationPayload> | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const clientName = isNonEmptyString(body.clientName) ? body.clientName.trim() : "";
    const clientEmail = isNonEmptyString(body.clientEmail) ? body.clientEmail.trim() : "";
    const currency = isNonEmptyString(body.currency) ? body.currency.trim().toUpperCase() : "KES";
    const notes = isNonEmptyString(body.notes) ? body.notes.trim() : "";

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!clientName || !clientEmail || !emailRegex.test(clientEmail)) {
      return NextResponse.json({ error: "Client name and a valid email are required." }, { status: 400 });
    }

    const itemsRaw = Array.isArray(body.items) ? body.items : [];
    const items: QuoteItem[] = itemsRaw
      .map((item) => {
        const description = isNonEmptyString((item as QuoteItem).description)
          ? String((item as QuoteItem).description).trim()
          : "";
        const quantity = sanitizeQty((item as QuoteItem).quantity);
        const price = sanitizeMoney((item as QuoteItem).price);
        return { description, quantity, price };
      })
      .filter((item) => item.description.length > 0);

    if (items.length === 0) {
      return NextResponse.json({ error: "At least one item is required." }, { status: 400 });
    }

    const quoteNumber = createQuoteNumber();
    const issuedAt = new Date().toISOString();
    const overallTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const [logoDataUrl, signatureDataUrl] = await Promise.all([
      readPublicAssetDataUrl("logo1.png").catch(() => undefined),
      readPublicAssetDataUrl("director-signature.png").catch(() => undefined),
    ]);

    const doc = QuotationPDF({
      clientName,
      clientEmail,
      items,
      notes,
      currency,
      quoteNumber,
      issuedAt,
      logoDataUrl,
      signatureDataUrl,
      directorName: "Kelvin Thuo",
      directorTitle: "Company Director",
    }) as unknown as React.ReactElement;

    const pdfBuffer = await renderToBuffer(doc as never);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      bcc: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `Quotation ${quoteNumber} • Vickins Technologies`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.55; color: #0b1220;">
          <h2 style="margin:0 0 8px;">Quotation from Vickins Technologies</h2>
          <p style="margin:0 0 12px;">
            Hello ${clientName},<br/>
            Attached is your quotation <strong>${quoteNumber}</strong>.
          </p>
          <p style="margin:0 0 16px;">
            <strong>Total:</strong> ${overallTotal.toLocaleString("en-KE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} ${currency}
          </p>
          <p style="margin:0 0 16px; color:#475569;">
            If you have any questions, just reply to this email.
          </p>
          <p style="margin:0; color:#64748b; font-size: 12px;">
            Signed by Kelvin Thuo (Company Director)
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `${quoteNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true, quoteNumber }, { status: 200 });
  } catch (error) {
    console.error("generate-quotation error:", error);
    return NextResponse.json({ error: "Failed to generate quotation." }, { status: 500 });
  }
}
