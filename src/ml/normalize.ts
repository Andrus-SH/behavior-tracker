import type { MouseData } from '../components/MouseTracker';

export const normalize = (data: MouseData[]) => {
  const speeds = data.map(d => d.speed);
  const max = Math.max(...speeds);
  return data.map(d => [d.speed / (max || 1)]);
};