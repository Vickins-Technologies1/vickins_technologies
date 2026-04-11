import { Schema, model, models, type InferSchemaType } from "mongoose";

const TicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "VtixEvent", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "VtixOrder", required: true },
    ticketTypeId: { type: Schema.Types.ObjectId, ref: "VtixTicketType", required: true },
    attendeeName: { type: String, trim: true },
    attendeeEmail: { type: String, trim: true, lowercase: true },
    attendeePhone: { type: String, trim: true },
    qrCode: { type: String, required: true },
    status: { type: String, enum: ["active", "used", "void"], default: "active" },
    scannedAt: { type: Date },
  },
  { timestamps: true }
);

TicketSchema.index({ eventId: 1 });
TicketSchema.index({ orderId: 1 });
TicketSchema.index({ qrCode: 1 }, { unique: true });

export type VtixTicket = InferSchemaType<typeof TicketSchema>;

const VtixTicketModel = models.VtixTicket || model("VtixTicket", TicketSchema);

export default VtixTicketModel;
