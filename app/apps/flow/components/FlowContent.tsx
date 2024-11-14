import { useEffect, useState } from "react";
import { FlowHeader } from "./FlowHeader";
import { FlowGrid } from "./FlowGrid";
import { StreamView } from "./StreamView";
import { AppsGrid } from "./AppsGrid";
import { AppView } from "./AppView";
import { EditorView } from "./canvas/EditorView";

interface ViewState {
  type: "dashboard" | "stream" | "editor" | "apps" | "app";
  id?: string;
}

export const FlowContent = ({ currentView = "streams" }) => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "dashboard",
  });

  // Update view when sidebar selection changes
  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      type: currentView === "apps" ? "apps" : "dashboard",
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
          <AppsGrid
            onAppSelect={(appId) => setViewState({ type: "app", id: appId })}
          />
        </>
      )}

      {viewState.type === "app" && (
        <>
          <FlowHeader
            title={viewState.id || ""}
            subtitle="Configurations"
            onBack={() => setViewState({ type: "apps" })}
          />
          <AppView
            appId={viewState.id || ""}
            onStreamSelect={(streamId) =>
              setViewState({ type: "stream", id: streamId })
            }
          />
        </>
      )}

      {viewState.type === "stream" && (
        <>
          <FlowHeader
            title={viewState.id || ""}
            subtitle="Flows"
            onBack={() =>
              setViewState((prev) =>
                prev.type === "app"
                  ? { type: "app", id: prev.id }
                  : { type: "dashboard" }
              )
            }
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
