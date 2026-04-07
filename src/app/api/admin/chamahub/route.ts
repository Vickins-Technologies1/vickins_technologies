import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import ChamaGroupModel from "@/lib/models/chama-group";
import ChamaMemberModel from "@/lib/models/chama-member";
import ChamaRoundModel from "@/lib/models/chama-round";
import ChamaContributionModel from "@/lib/models/chama-contribution";

export async function GET() {
  try {
    await connectMongoose();

    const [totalGroups, activeGroups, totalMembers, activeMembers, openRounds] =
      await Promise.all([
        ChamaGroupModel.countDocuments(),
        ChamaGroupModel.countDocuments({ status: "active" }),
        ChamaMemberModel.countDocuments({ status: { $ne: "rejected" } }),
        ChamaMemberModel.countDocuments({ status: "active" }),
        ChamaRoundModel.countDocuments({ status: "open" }),
      ]);

    const now = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(now.getDate() + 7);

    const upcomingPayouts = await ChamaRoundModel.countDocuments({
      status: "open",
      dueDate: { $gte: now, $lte: inSevenDays },
    });

    const contributionStats = await ChamaContributionModel.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    const contributionTotals = contributionStats[0] ?? { totalAmount: 0, totalCount: 0 };

    const groups = await ChamaGroupModel.find().sort({ createdAt: -1 }).lean();
    const members = await ChamaMemberModel.find({ status: { $ne: "rejected" } }).lean();
    const openRoundList = await ChamaRoundModel.find({ status: "open" }).lean();

    const contributionsByGroup = await ChamaContributionModel.aggregate([
      {
        $group: {
          _id: "$groupId",
          totalAmount: { $sum: "$amount" },
          totalCount: { $sum: 1 },
          lastPaidAt: { $max: "$paidAt" },
        },
      },
    ]);

    const contributionMap = contributionsByGroup.reduce<Record<string, (typeof contributionsByGroup)[number]>>(
      (acc, item) => {
        acc[String(item._id)] = item;
        return acc;
      },
      {}
    );

    const membersByGroup = members.reduce<Record<string, typeof members>>((acc, member) => {
      const key = String(member.groupId);
      if (!acc[key]) acc[key] = [];
      acc[key].push(member);
      return acc;
    }, {});

    const openRoundMap = openRoundList.reduce<Record<string, typeof openRoundList[number]>>(
      (acc, round) => {
        acc[String(round.groupId)] = round;
        return acc;
      },
      {}
    );

    const groupRows = groups.map((group) => {
      const groupId = String(group._id);
      const groupMembers = membersByGroup[groupId] ?? [];
      const activeCount = groupMembers.filter((member) => member.status === "active").length;
      const openRound = openRoundMap[groupId];
      const contributionSummary = contributionMap[groupId];

      return {
        id: groupId,
        name: group.name,
        frequency: group.frequency,
        contributionAmount: group.contributionAmount,
        currency: group.currency,
        status: group.status,
        createdAt: group.createdAt,
        createdBy: group.createdBy,
        membersCount: groupMembers.length,
        activeMembers: activeCount,
        openRound: openRound
          ? {
              roundNumber: openRound.roundNumber,
              dueDate: openRound.dueDate,
              potAmount: openRound.potAmount,
            }
          : null,
        totalCollected: contributionSummary?.totalAmount ?? 0,
        contributionsCount: contributionSummary?.totalCount ?? 0,
        lastContributionAt: contributionSummary?.lastPaidAt ?? null,
      };
    });

    return NextResponse.json({
      metrics: {
        totalGroups,
        activeGroups,
        totalMembers,
        activeMembers,
        openRounds,
        upcomingPayouts,
        totalCollected: contributionTotals.totalAmount,
        totalContributions: contributionTotals.totalCount,
      },
      groups: groupRows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load ChamaHub analytics." },
      { status: 500 }
    );
  }
}
