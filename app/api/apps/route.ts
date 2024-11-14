// /app/api/apps/route.ts
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apps = await db.flow.findMany({
      where: {
        profileId: profile.id,
        type: "CONFIG",
      },
      include: {
        components: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(apps);
  } catch (error) {
    console.log("[APPS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
