import { Schema, model, models, type InferSchemaType } from "mongoose";

const TicketTypeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "VtixEvent", required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantityLimit: { type: Number, min: 0 },
    quantitySold: { type: Number, default: 0 },
    tier: { type: String, trim: true },
    isEarlyBird: { type: Boolean, default: false },
    saleStartsAt: { type: Date },
    saleEndsAt: { type: Date },
    status: { type: String, enum: ["active", "paused"], default: "active" },
  },
  { timestamps: true }
);

TicketTypeSchema.index({ eventId: 1 });

export type VtixTicketType = InferSchemaType<typeof TicketTypeSchema>;

const VtixTicketTypeModel =
  models.VtixTicketType || model("VtixTicketType", TicketTypeSchema);

export default VtixTicketTypeModel;
