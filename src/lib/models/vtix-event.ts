import { Schema, model, models, type InferSchemaType } from "mongoose";

const EventSchema = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "VtixOrganizer", required: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, trim: true },
    venueName: { type: String, trim: true },
    venueAddress: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    mapEmbedUrl: { type: String, trim: true },
    coverImageUrl: { type: String, trim: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    currency: { type: String, default: "KES" },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

EventSchema.index({ organizerId: 1, createdAt: -1 });
EventSchema.index({ slug: 1 }, { unique: true });

export type VtixEvent = InferSchemaType<typeof EventSchema>;

const VtixEventModel = models.VtixEvent || model("VtixEvent", EventSchema);

export default VtixEventModel;
