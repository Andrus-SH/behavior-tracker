import { useEffect, useRef, useState } from 'react';

export type MouseData = {
  dx: number;
  dy: number;
  dt: number;
  speed: number;
};

export const useMouseTracker = () => {
  const [data, setData] = useState<MouseData[]>([]);
  const lastRef = useRef({ x: 0, y: 0, t: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      const dt = now - lastRef.current.t;

      if (dt > 0) {
        const speed = Math.sqrt(dx ** 2 + dy ** 2) / (dt / 1000); // px/s
        setData(prev => [...prev.slice(-19), { dx, dy, dt, speed }]);
      }

      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return data;
};