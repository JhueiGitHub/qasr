// /root/app/apps/flow/components/canvas/GlobalShootingStars.tsx
import { useEffect, useRef, useState } from 'react';
import { ShootingStars } from '../ui/shooting-stars';

interface GlobalShootingStarsProps {
  viewportTransform: number[];
  canvasSize: { width: number; height: number };
}

const GlobalShootingStars = ({ viewportTransform, canvasSize }: GlobalShootingStarsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `matrix(${viewportTransform.join(',')})`;
  }, [viewportTransform]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0" 
      style={{ 
        width: canvasSize.width,
        height: canvasSize.height,
        transformOrigin: '0 0'
      }}
    >
      <ShootingStars 
        className="w-full h-full"
        minSpeed={10}
        maxSpeed={30}
        minDelay={1200}
        maxDelay={4200}
      />
    </div>
  );
};