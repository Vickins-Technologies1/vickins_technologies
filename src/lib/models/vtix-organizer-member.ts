import { Schema, model, models, type InferSchemaType } from "mongoose";

const OrganizerMemberSchema = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "VtixOrganizer", required: true },
    userId: { type: String },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["active", "pending", "rejected"],
      default: "pending",
    },
    invitedBy: { type: String },
    joinedAt: { type: Date },
  },
  { timestamps: true }
);

OrganizerMemberSchema.index({ organizerId: 1, userId: 1 });
OrganizerMemberSchema.index({ organizerId: 1, email: 1 });

export type VtixOrganizerMember = InferSchemaType<typeof OrganizerMemberSchema>;

const VtixOrganizerMemberModel =
  models.VtixOrganizerMember || model("VtixOrganizerMember", OrganizerMemberSchema);

export default VtixOrganizerMemberModel;
