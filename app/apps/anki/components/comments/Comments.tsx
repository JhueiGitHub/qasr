"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { CommentsOverlay } from "@an/components/comments/CommentsOverlay";

export const Comments = () => (
  <ClientSideSuspense fallback={null}>
    {() => <CommentsOverlay />}
  </ClientSideSuspense>
);
