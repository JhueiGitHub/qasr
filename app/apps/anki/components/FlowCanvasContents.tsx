// /root/app/apps/flow/components/FlowCanvasContents.tsx
import React, { useState, useRef } from "react";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import Live from "./Live";

const FlowCanvasContents = () => {
  const [viewportTransform, setViewportTransform] = useState<number[]>([
    1, 0, 0, 1, 0, 0,
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#010203]">
      {/* Background that STAYS FULLSCREEN */}
      <div className="fixed inset-0 w-full h-full">
        <ShootingStars className="absolute inset-0 w-full h-full" />
        <StarsBackground className="absolute inset-0 w-full h-full" />
      </div>

      {/* Canvas that actually pans */}
      <Live canvasRef={canvasRef} onTransform={setViewportTransform} />

      {/* Fixed UI that stays on screen */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-full w-full p-24 overflow-auto">
          <div className="grid grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {/* All your card components with pointer-events-auto */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6 pointer-events-auto">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center"
                  >
                    <span className="text-[#cccccc]/70 text-xs font-['Inter']">
                      Aa
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Typography Systems
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">15 files</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">
                    Updated 8 months ago
                  </span>
                </div>
              </div>
            </div>

            {/* Rest of your existing cards */}

            {/* Color System Card */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-[1.4] rounded-lg bg-black border border-white/[0.09]" />
                <div className="w-full aspect-[1.4] rounded-lg bg-[#292929] border border-white/[0.09]" />
                <div className="w-full aspect-[1.4] rounded-lg bg-[#4c4f69] border border-white/[0.09]" />
                <div className="w-full aspect-[1.4] rounded-lg bg-[#cccccc] border border-white/[0.09]" />
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Color Systems
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">8 palettes</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">Updated 2 days ago</span>
                </div>
              </div>
            </div>

            {/* Components Card */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex flex-col items-center justify-center p-2">
                  <div className="w-full h-6 rounded-md bg-[#4c4f69] mb-2" />
                  <div className="w-full h-6 rounded-md border border-white/[0.09]" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center p-2">
                  <div className="w-8 h-8 rounded-full bg-[#292929]" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex flex-col p-2 gap-2">
                  <div className="w-1/2 h-2 rounded-full bg-[#292929]" />
                  <div className="w-3/4 h-2 rounded-full bg-[#292929]" />
                  <div className="w-1/3 h-2 rounded-full bg-[#292929]" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-md border border-white/[0.09] flex items-center justify-center">
                    <span className="text-[#cccccc]/70 text-xs">+</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Component Library
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">24 components</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">Updated yesterday</span>
                </div>
              </div>
            </div>

            {/* Spacing System Card */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center"
                  >
                    <div
                      className={`w-${4 + i * 2} h-${4 + i * 2} rounded bg-[#292929]`}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Spacing & Grid
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">6 scales</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">Updated 3 days ago</span>
                </div>
              </div>
            </div>

            {/* Effects System Card */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-[#292929] shadow-lg" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-[#292929] blur-[1px]" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#292929] to-[#4c4f69]" />
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-[#292929] opacity-50" />
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Effects & Filters
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">12 effects</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">Updated 5 days ago</span>
                </div>
              </div>
            </div>

            {/* Assets Card */}
            <div className="bg-[#010203]/70 rounded-xl border border-white/[0.09] p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-8 h-8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#cccccc]/70"
                    >
                      <path
                        d="M12 6v12m-6-6h12"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-8 h-8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#cccccc]/70"
                    >
                      <path
                        d="M4 8h16M4 16h16"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-8 h-8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#cccccc]/70"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full aspect-[1.4] rounded-lg border border-white/[0.09] flex items-center justify-center">
                  <div className="w-8 h-8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#cccccc]/70"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-[#cccccc] text-sm font-semibold font-['Inter']">
                  Icon Library
                </h3>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-[#cccccc]/70">120 icons</span>
                  <span className="text-[#cccccc]/70 text-[6px]">•</span>
                  <span className="text-[#cccccc]/70">Updated today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowCanvasContents;
