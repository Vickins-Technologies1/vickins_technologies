import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  mergeDevProjects,
  mergeGraphicCollection,
  type DevProject,
  type GraphicCollection,
} from "@/lib/portfolio-collection";

const COLLECTION = "admin_portfolio";
const GRAPHIC_KEY = "graphic_collection";
const DEV_KEY = "dev_projects";

export const dynamic = "force-dynamic";

type GraphicDoc = {
  key: string;
  collection: GraphicCollection;
  updatedAt: Date;
};

type DevProjectsDoc = {
  key: string;
  projects: DevProject[];
  updatedAt: Date;
};

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<GraphicDoc | DevProjectsDoc>(COLLECTION);
    const graphicDoc = await collection.findOne({ key: GRAPHIC_KEY });
    const devDoc = await collection.findOne({ key: DEV_KEY });
    const mergedCollection = mergeGraphicCollection(
      (graphicDoc as GraphicDoc | null)?.collection ?? null
    );
    const mergedDevProjects = mergeDevProjects((devDoc as DevProjectsDoc | null)?.projects ?? null);

    return NextResponse.json({ collection: mergedCollection, devProjects: mergedDevProjects });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load portfolio collection." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const incomingCollection = body?.collection as GraphicCollection | undefined;
  const incomingDevProjects = body?.devProjects as DevProject[] | undefined;

  if (!incomingCollection && !incomingDevProjects) {
    return NextResponse.json(
      { error: "Invalid portfolio payload." },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection<GraphicDoc | DevProjectsDoc>(COLLECTION);

    if (incomingCollection) {
      const merged = mergeGraphicCollection(incomingCollection);
      await collection.updateOne(
        { key: GRAPHIC_KEY },
        { $set: { collection: merged, updatedAt: new Date() } },
        { upsert: true }
      );
    }

    if (incomingDevProjects) {
      const mergedDevProjects = mergeDevProjects(incomingDevProjects);
      await collection.updateOne(
        { key: DEV_KEY },
        { $set: { projects: mergedDevProjects, updatedAt: new Date() } },
        { upsert: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save portfolio collection." },
      { status: 500 }
    );
  }
}
