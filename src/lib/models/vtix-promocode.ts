import { Schema, model, models, type InferSchemaType } from "mongoose";

const PromoCodeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "VtixEvent", required: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    discountType: { type: String, enum: ["percent", "fixed"], default: "percent" },
    discountValue: { type: Number, required: true, min: 0 },
    maxRedemptions: { type: Number },
    redeemedCount: { type: Number, default: 0 },
    startsAt: { type: Date },
    endsAt: { type: Date },
    status: { type: String, enum: ["active", "paused"], default: "active" },
  },
  { timestamps: true }
);

PromoCodeSchema.index({ eventId: 1, code: 1 }, { unique: true });

export type VtixPromoCode = InferSchemaType<typeof PromoCodeSchema>;

const VtixPromoCodeModel = models.VtixPromoCode || model("VtixPromoCode", PromoCodeSchema);

export default VtixPromoCodeModel;
