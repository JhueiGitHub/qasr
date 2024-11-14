// /app/apps/flow/components/AppsGrid.tsx
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { FlowApp } from "../types/app";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

interface AppsGridProps {
  onAppSelect: (appId: string) => void;
}

export const AppsGrid = ({ onAppSelect }: AppsGridProps) => {
  const { data: apps = [], isLoading } = useQuery<FlowApp[]>({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await axios.get("/api/apps");
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="p-8 text-[#cccccc]/70">Loading apps...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-1 min-w-0 px-[33px] py-5">
        <div className="flex flex-wrap gap-8">
          {apps.map((app) => (
            <Card
              key={app.id}
              onClick={() => onAppSelect(app.id)}
              className="w-[291px] h-[247px] flex-shrink-0 border border-white/[0.09] rounded-[15px] bg-transparent transition-all hover:border-white/20 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <img src={app.icon} alt={app.name} className="w-16 h-16" />
                </div>

                <div className="pl-px space-y-2.5">
                  <h3 className="text-sm font-semibold text-[#cccccc]">
                    {app.name}
                  </h3>
                  <div className="flex items-center gap-[3px] text-[11px] text-[#cccccc]/70">
                    <span>
                      {app.description || `${app.name} Configuration`}
                    </span>
                    <span className="text-[6px]">•</span>
                    <span>
                      Updated {new Date(app.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </QueryClientProvider>
  );
};
