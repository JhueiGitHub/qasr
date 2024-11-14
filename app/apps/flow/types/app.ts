import { Flow } from "@prisma/client";

// /app/apps/flow/types/app.ts
export interface FlowApp {
  id: string;
  name: string;
  description?: string;
  icon: string;
  type: "CORE" | "CONFIG";
  streams?: FlowStream[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FlowStream {
  id: string;
  name: string;
  description?: string;
  flows: Flow[];
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}
