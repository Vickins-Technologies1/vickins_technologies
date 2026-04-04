import { NextResponse, type NextRequest } from "next/server";
import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import ChamaMemberModel from "@/lib/models/chama-member";
import ChamaRoundModel from "@/lib/models/chama-round";
import ChamaContributionModel from "@/lib/models/chama-contribution";
import {
  getSessionUser,
  getGroupMember,
  hasGroupRole,
  isSiteAdmin,
} from "@/lib/chama-access";
import ChamaGroupModel from "@/lib/models/chama-group";

type Params = { params: Promise<{ groupId: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { groupId } = await params;
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!Types.ObjectId.isValid(groupId)) {
      return NextResponse.json({ error: "Invalid group id." }, { status: 400 });
    }

    await connectMongoose();

    const isAdmin = isSiteAdmin(user);
    const member = await getGroupMember(groupId, user);
    if (!isAdmin && !member) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const members = await ChamaMemberModel.find({ groupId }).lean();
    const openRound = (await ChamaRoundModel.findOne({
      groupId,
      status: "open",
    }).lean()) as { _id?: unknown } | null;

    let contributionMap: Record<string, number> = {};
    if (openRound) {
      const contributions = await ChamaContributionModel.find({
        roundId: openRound._id,
      }).lean();
      contributionMap = contributions.reduce<Record<string, number>>((acc, item) => {
        acc[String(item.memberId)] = (acc[String(item.memberId)] || 0) + item.amount;
        return acc;
      }, {});
    }

    return NextResponse.json({
      members: members.map((item) => ({
        id: String(item._id),
        name: item.name,
        email: item.email,
        phone: item.phone,
        role: item.role,
        status: item.status,
        joinedAt: item.joinedAt,
        contributionTotal: contributionMap[String(item._id)] || 0,
      })),
      openRoundId: openRound ? String(openRound._id) : null,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to load members." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { groupId } = await params;
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!Types.ObjectId.isValid(groupId)) {
      return NextResponse.json({ error: "Invalid group id." }, { status: 400 });
    }

    await connectMongoose();

    const isAdmin = isSiteAdmin(user);
    const member = await getGroupMember(groupId, user);
    if (!isAdmin && !hasGroupRole(member, ["admin", "treasurer", "secretary"])) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const { name, email, phone, role } = body as Record<string, string>;

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Provide an email or phone number." },
        { status: 400 }
      );
    }

    const newMember = await ChamaMemberModel.create({
      groupId,
      name: name?.trim() || (email ? email.split("@")[0] : "Member"),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim(),
      role: role && ["admin", "treasurer", "secretary", "member"].includes(role)
        ? role
        : "member",
      status: "pending",
      invitedBy: user.id,
    });

    const activeCount = await ChamaMemberModel.countDocuments({
      groupId,
      status: { $ne: "rejected" },
    });
    await ChamaGroupModel.updateOne(
      { _id: groupId },
      { $set: { numberOfMembers: activeCount } }
    );

    return NextResponse.json({ memberId: String(newMember._id) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Unable to add member." }, { status: 500 });
  }
}
