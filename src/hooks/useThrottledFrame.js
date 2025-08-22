import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const useThrottledFrame = (callback, fps = 30) => {
  const lastFrameTime = useRef(0);
  const targetFrameTime = 1000 / fps; // ms per frame

  useFrame((state, delta) => {
    const now = Date.now();
    
    if (now - lastFrameTime.current >= targetFrameTime) {
      callback(state, delta);
      lastFrameTime.current = now;
    }
  });
};

export default useThrottledFrame;