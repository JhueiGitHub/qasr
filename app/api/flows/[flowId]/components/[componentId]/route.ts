import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
  req: Request,
  { params }: { params: { flowId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { components } = await req.json();

    const updatedFlow = await db.flow.update({
      where: {
        id: params.flowId,
        profileId: profile.id,
      },
      data: {
        components: {
          deleteMany: {},
          createMany: {
            data: components,
          },
        },
      },
      include: {
        components: true,
      },
    });

    return NextResponse.json(updatedFlow);
  } catch (error) {
    console.error("[FLOW_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
