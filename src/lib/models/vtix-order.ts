import { Schema, model, models, type InferSchemaType } from "mongoose";

const OrderSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "VtixEvent", required: true },
    organizerId: { type: Schema.Types.ObjectId, ref: "VtixOrganizer", required: true },
    userId: { type: String },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    totalAmount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "KES" },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "mpesa" },
    paymentReference: { type: String, trim: true },
    ticketCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

OrderSchema.index({ eventId: 1, createdAt: -1 });
OrderSchema.index({ userId: 1, createdAt: -1 });

export type VtixOrder = InferSchemaType<typeof OrderSchema>;

const VtixOrderModel = models.VtixOrder || model("VtixOrder", OrderSchema);

export default VtixOrderModel;
