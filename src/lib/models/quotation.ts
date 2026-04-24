import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const QuotationItemSchema = new Schema(
  {
    description: { type: String, trim: true, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const QuotationSchema = new Schema(
  {
    quoteNumber: { type: String, required: true, trim: true, unique: true },
    status: { type: String, enum: ["draft", "sent", "failed"], default: "draft" },

    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true, lowercase: true },
    currency: { type: String, default: "KES" },

    issuedAt: { type: Date, required: true },
    sentAt: { type: Date },

    notes: { type: String, default: "" },
    items: { type: [QuotationItemSchema], default: [] },
    total: { type: Number, required: true, min: 0 },

    pdfBase64: { type: String, required: true },
    pdfFileName: { type: String, default: "" },
    pdfContentType: { type: String, default: "application/pdf" },

    createdByUserId: { type: String },
    createdByEmail: { type: String, trim: true, lowercase: true },

    lastError: { type: String, default: "" },
  },
  { timestamps: true }
);

QuotationSchema.index({ clientEmail: 1, createdAt: -1 });
QuotationSchema.index({ status: 1, createdAt: -1 });

export type Quotation = InferSchemaType<typeof QuotationSchema>;

const QuotationModel =
  (models.Quotation as Model<Quotation> | undefined) || model<Quotation>("Quotation", QuotationSchema);

export default QuotationModel;
