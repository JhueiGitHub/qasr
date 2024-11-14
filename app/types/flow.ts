export type NodeType = "wallpaper" | "dockConfig" | "windowConfig";
export type NodeValueType = "color" | "image" | "video";

export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeData {
  type: NodeValueType;
  value: string;
  opacity?: number;
  config?: Record<string, any>;
}

export interface FlowNodeData {
  id: string;
  type: NodeType;
  position: NodePosition;
  data: NodeData;
  designSystemId: string; // For inheriting colors/fonts
  label: string;
}

export interface AppConfigFlow {
  id: string;
  name: string;
  type: "APP_CONFIG";
  appId: string;
  nodes: FlowNodeData[];
  designSystemId: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultNodes: FlowNodeData[];
}

export const APP_DEFINITIONS: Record<string, AppDefinition> = {
  orion: {
    id: "orion",
    name: "Orion",
    description: "System Configuration",
    icon: "/icons/orion.svg",
    defaultNodes: [
      {
        id: "wallpaper",
        type: "wallpaper",
        position: { x: 100, y: 100 },
        data: {
          type: "color",
          value: "#000000",
          opacity: 100,
        },
        designSystemId: "", // Set during creation
        label: "Wallpaper",
      },
      {
        id: "dock",
        type: "dockConfig",
        position: { x: 100, y: 300 },
        data: {
          type: "color",
          value: "Glass",
          opacity: 30,
          config: {
            icons: {},
          },
        },
        designSystemId: "",
        label: "Dock",
      },
    ],
  },
};
