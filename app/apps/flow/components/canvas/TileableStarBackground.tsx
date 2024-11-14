// /root/app/apps/flow/components/canvas/TileableStarBackground.tsx
import { useEffect, useRef } from "react";
import { StarsBackground } from "../ui/stars-background";

interface TileableStarBackgroundProps {
  canvasSize: { width: number; height: number };
  viewportTransform: number[];
  tileSize: number;
}

const TileableStarBackground = ({
  canvasSize,
  viewportTransform,
  tileSize = 2000, // Default tile size
}: TileableStarBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate visible area based on viewport transform
    const scale = viewportTransform[0];
    const translateX = viewportTransform[4];
    const translateY = viewportTransform[5];

    // Calculate how many tiles we need in each direction
    const visibleWidth = window.innerWidth / scale;
    const visibleHeight = window.innerHeight / scale;

    const startTileX = Math.floor((-translateX - visibleWidth) / tileSize);
    const endTileX = Math.ceil((-translateX + visibleWidth * 2) / tileSize);
    const startTileY = Math.floor((-translateY - visibleHeight) / tileSize);
    const endTileY = Math.ceil((-translateY + visibleHeight * 2) / tileSize);

    // Update container size and transform
    containerRef.current.style.transform = `matrix(${viewportTransform.join(",")})`;
  }, [viewportTransform, tileSize, canvasSize]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
        transformOrigin: "0 0",
      }}
    >
      {/* Grid of StarsBackground components */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${tileSize}px)`,
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      >
        {Array.from({
          length:
            Math.ceil(canvasSize.width / tileSize) *
            Math.ceil(canvasSize.height / tileSize),
        }).map((_, i) => (
          <StarsBackground
            key={i}
            className="w-full h-full"
            starDensity={0.00015}
            allStarsTwinkle={true}
          />
        ))}
      </div>
    </div>
  );
};
