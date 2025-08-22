import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const updateStats = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
        
        // 메모리 사용량 (Chrome에서만 지원)
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      
      animationId = requestAnimationFrame(updateStats);
    };

    animationId = requestAnimationFrame(updateStats);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // 개발 환경에서만 표시
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>FPS: {fps}</div>
      {memory > 0 && <div>Memory: {memory}MB</div>}
    </div>
  );
};

export default PerformanceMonitor;