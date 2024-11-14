// /app/apps/flow/components/AppView.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { FlowStream } from "../types/app";

interface AppViewProps {
  appId: string;
  onStreamSelect: (streamId: string) => void;
}

export const AppView = ({ appId, onStreamSelect }: AppViewProps) => {
  const { data: streams = [], isLoading } = useQuery<FlowStream[]>({
    queryKey: ["streams", appId],
    queryFn: async () => {
      const response = await axios.get(`/api/apps/${appId}/streams`);
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="p-8 text-[#cccccc]/70">Loading streams...</div>;
  }

  return (
    <div className="flex-1 min-w-0 px-[33px] py-5">
      <div className="flex flex-wrap gap-8">
        {streams.map((stream) => (
          <Card
            key={stream.id}
            onClick={() => onStreamSelect(stream.id)}
            className="w-[291px] h-[247px] flex-shrink-0 border border-white/[0.09] rounded-[15px] bg-transparent transition-all hover:border-white/20 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stream.flows.slice(0, 4).map((flow, i) => (
                  <div
                    key={flow.id}
                    className="w-[115px] h-16 rounded-[9px] border border-white/[0.09] flex items-center justify-center"
                  >
                    <span className="text-[#cccccc]/70 text-xs">
                      {flow.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pl-px space-y-2.5">
                <h3 className="text-sm font-semibold text-[#cccccc]">
                  {stream.name}
                </h3>
                <div className="flex items-center gap-[3px] text-[11px] text-[#cccccc]/70">
                  <span>{stream.flows.length} flows</span>
                  <span className="text-[6px]">•</span>
                  <span>
                    Updated {new Date(stream.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};