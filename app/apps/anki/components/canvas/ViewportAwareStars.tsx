// /root/app/apps/flow/components/canvas/ViewportAwareStars.tsx
import React, { useEffect, useRef } from "react";

interface ViewportAwareStarsProps {
  viewportTransform: number[];
  canvasSize: { width: number; height: number };
}

export const ViewportAwareStars = ({
  viewportTransform,
  canvasSize,
}: ViewportAwareStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = viewportTransform[0];
  const translateX = viewportTransform[4];
  const translateY = viewportTransform[5];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate visible area
    const visibleArea = {
      x: -translateX / scale,
      y: -translateY / scale,
      width: window.innerWidth / scale,
      height: window.innerHeight / scale,
    };

    // Create stars only in and around visible area
    const buffer = 500; // Extra area to prevent pop-in
    const starDensity = 0.00015;
    const area =
      (visibleArea.width + buffer * 2) * (visibleArea.height + buffer * 2);
    const numStars = Math.floor(area * starDensity);

    const stars = Array.from({ length: numStars }, () => ({
      x:
        visibleArea.x -
        buffer +
        Math.random() * (visibleArea.width + buffer * 2),
      y:
        visibleArea.y -
        buffer +
        Math.random() * (visibleArea.height + buffer * 2),
      radius: Math.random() * 0.05 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.5 + 0.5,
    }));

    let animationFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Transform context to match canvas transform
      ctx.setTransform(scale, 0, 0, scale, translateX, translateY);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        star.opacity =
          0.5 +
          Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, [viewportTransform, canvasSize]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};
