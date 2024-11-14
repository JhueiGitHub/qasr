import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  // Use Prisma transaction to ensure all operations complete together
  const newProfile = await db.$transaction(async (tx) => {
    // Profile creation stays the same...
    const profile = await tx.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    // Design system creation stays the same...
    const designSystem = await tx.designSystem.create({
      data: {
        name: "Zenith",
        profileId: profile.id,
        colorTokens: {
          createMany: {
            data: [
              { name: "Underlying BG", value: "#292929", opacity: 81 },
              { name: "Overlaying BG", value: "#010203", opacity: 69 },
              { name: "Brd", value: "#292929", opacity: 81 },
              { name: "Black", value: "#000000", opacity: 100 },
              { name: "Glass", value: "#000000", opacity: 30 },
              { name: "White", value: "#CCCCCC", opacity: 69 },
              { name: "Lilac Accent", value: "#7B6CBD", opacity: 100 },
              { name: "Teal Accent", value: "#003431", opacity: 100 },
              { name: "Text Primary (Hd)", value: "#ABC4C3", opacity: 100 },
              { name: "Text Secondary (Bd)", value: "#748393", opacity: 100 },
            ],
          },
        },
        typographyTokens: {
          createMany: {
            data: [
              { name: "Text Primary", fontFamily: "Arial" },
              { name: "Text Secondary", fontFamily: "Inter" },
            ],
          },
        },
      },
    });

    // Stream creation stays the same...
    const stream = await tx.stream.create({
      data: {
        name: "Core",
        description: "Core design system stream",
        type: "CORE",
        profileId: profile.id,
      },
    });

    // Modified flow creation to include design system tokens as components
    await tx.flow.create({
      data: {
        name: "Zenith",
        description: "Core design system flow",
        type: "CORE",
        profileId: profile.id,
        streamId: stream.id,
        designSystemId: designSystem.id,
        components: {
          create: [
            // Map color tokens to components
            {
              name: "Underlying BG",
              type: "COLOR",
              value: "#292929",
              opacity: 81,
            },
            {
              name: "Overlaying BG",
              type: "COLOR",
              value: "#010203",
              opacity: 69,
            },
            { name: "Brd", type: "COLOR", value: "#292929", opacity: 81 },
            { name: "Black", type: "COLOR", value: "#000000", opacity: 100 },
            { name: "Glass", type: "COLOR", value: "#000000", opacity: 30 },
            { name: "White", type: "COLOR", value: "#CCCCCC", opacity: 69 },
            {
              name: "Lilac Accent",
              type: "COLOR",
              value: "#7B6CBD",
              opacity: 100,
            },
            {
              name: "Teal Accent",
              type: "COLOR",
              value: "#003431",
              opacity: 100,
            },
            {
              name: "Text Primary (Hd)",
              type: "COLOR",
              value: "#ABC4C3",
              opacity: 100,
            },
            {
              name: "Text Secondary (Bd)",
              type: "COLOR",
              value: "#748393",
              opacity: 100,
            },
            // Map typography tokens to components
            {
              name: "Text Primary",
              type: "TYPOGRAPHY",
              value: null,
              fontFamily: "Arial",
            },
            {
              name: "Text Secondary",
              type: "TYPOGRAPHY",
              value: null,
              fontFamily: "Inter",
            },
            // Keep the original media components
            { name: "Wallpaper", type: "VIDEO", value: null },
            { name: "Dock Icons", type: "IMAGE", value: null },
            { name: "Font Primary", type: "FONT", value: null },
            { name: "Font Secondary", type: "FONT", value: null },
          ],
        },
      },
    });

    // Root folder creation stays the same...
    const rootFolder = await tx.folder.create({
      data: {
        name: "Root",
        isRoot: true,
        profileId: profile.id,
      },
    });

    // Welcome file creation stays the same...
    await tx.file.create({
      data: {
        name: "Welcome.txt",
        type: "text/plain",
        size: 23,
        content: "Welcome to StellarOS!",
        folderId: rootFolder.id,
        profileId: profile.id,
      },
    });

    return profile;
  });

  return newProfile;
};
