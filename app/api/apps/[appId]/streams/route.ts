// /app/api/apps/[appId]/streams/route.ts
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { appId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const streams = await db.stream.findMany({
      where: {
        profileId: profile.id,
        appId: params.appId,
      },
      include: {
        flows: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(streams);
  } catch (error) {
    console.log("[STREAMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
