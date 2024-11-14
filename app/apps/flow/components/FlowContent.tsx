import { useEffect, useState } from "react";
import { FlowHeader } from "./FlowHeader";
import { FlowGrid } from "./FlowGrid";
import { StreamView } from "./StreamView";
import { EditorView } from "./canvas/EditorView";

export const FlowContent = ({ currentView = "streams" }) => {
  const [viewState, setViewState] = useState<{
    type: "dashboard" | "stream" | "editor" | "apps";
    id?: string;
  }>({ type: "dashboard" });

  // Update view when sidebar selection changes
  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      type: currentView === "apps" ? "apps" : "dashboard"
    }));
  }, [currentView]);

  return (
    <div className="flex-1 min-w-0">
      {viewState.type === "dashboard" && (
        <>
          <FlowHeader title="Flow" subtitle="All Streams" onBack={null} />
          <FlowGrid
            onStreamSelect={(id) => setViewState({ type: "stream", id })}
          />
        </>
      )}

      {viewState.type === "apps" && (
        <>
          <FlowHeader title="Apps" subtitle="OS Configurations" onBack={null} />
          <FlowGrid
  onStreamSelect={(streamId) => setViewState({ type: "stream", id: streamId })}
/>
        </>
      )}

      {viewState.type === "stream" && (
        <>
          <FlowHeader
            title={viewState.id || ""}
            subtitle="Flows"
            onBack={() => setViewState({ type: "dashboard" })}
          />
          <StreamView
            streamId={viewState.id || ""}
            onFlowSelect={(flowId) =>
              setViewState({ type: "editor", id: flowId })
            }
          />
        </>
      )}

      {viewState.type === "editor" && (
        <EditorView
          flowId={viewState.id || ""}
          onClose={() => setViewState({ type: "stream", id: "os" })}
        />
      )}
    </div>
  );
};