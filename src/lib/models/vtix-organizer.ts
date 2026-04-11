import { Schema, model, models, type InferSchemaType } from "mongoose";

const OrganizerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    description: { type: String, default: "", trim: true },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

OrganizerSchema.index({ slug: 1 }, { unique: true, sparse: true });
OrganizerSchema.index({ createdBy: 1 });

export type VtixOrganizer = InferSchemaType<typeof OrganizerSchema>;

const VtixOrganizerModel = models.VtixOrganizer || model("VtixOrganizer", OrganizerSchema);

export default VtixOrganizerModel;
