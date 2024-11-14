// /root/app/apps/flow/components/canvas/ViewportAwareShootingStars.tsx
import { useEffect, useRef } from "react";

interface ViewportAwareShootingStarsProps {
  viewportTransform: number[];
}

export const ViewportAwareShootingStars = ({
  viewportTransform,
}: ViewportAwareShootingStarsProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const scale = viewportTransform[0];
  const translateX = viewportTransform[4];
  const translateY = viewportTransform[5];

  useEffect(() => {
    const getRandomStartPoint = () => {
      const visibleArea = {
        x: -translateX / scale,
        y: -translateY / scale,
        width: window.innerWidth / scale,
        height: window.innerHeight / scale,
      };

      const side = Math.floor(Math.random() * 4);
      const offset = Math.random() * visibleArea.width;

      switch (side) {
        case 0:
          return { x: visibleArea.x + offset, y: visibleArea.y, angle: 45 };
        case 1:
          return {
            x: visibleArea.x + visibleArea.width,
            y: visibleArea.y + offset,
            angle: 135,
          };
        case 2:
          return {
            x: visibleArea.x + offset,
            y: visibleArea.y + visibleArea.height,
            angle: 225,
          };
        case 3:
          return { x: visibleArea.x, y: visibleArea.y + offset, angle: 315 };
        default:
          return { x: visibleArea.x, y: visibleArea.y, angle: 45 };
      }
    };

    // Rest of shooting star logic, but using viewport-aware coordinates
    // ... (existing shooting star animation logic)
  }, [viewportTransform]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: `matrix(${viewportTransform.join(",")})`,
        transformOrigin: "0 0",
      }}
    />
  );
};
