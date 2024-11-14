import { useOthers } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";

const FlowEditor = () => {
  const others = useOthers();

  return (
    <div className="fixed top-4 right-20 text-[#cccccc]/70 text-xs">
      {others.length} other user{others.length === 1 ? "" : "s"} present
    </div>
  );
};

const FlowEditorWithProvider = ({ flowId }: { flowId: string }) => {
  return (
    <RoomProvider
      id={`flow-${flowId}`}
      initialPresence={{}}
      initialStorage={{
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <FlowEditor />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default FlowEditorWithProvider;
