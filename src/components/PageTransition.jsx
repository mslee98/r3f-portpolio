import { useState, useEffect } from 'react';

const PageTransition = ({ children, direction = 'right', isActive, pageName }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isActive) {
      // 작은 지연 후 애니메이션 시작
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isActive]);

  // 방향별 초기 위치와 애니메이션
  const getTransformClasses = () => {
    const baseClasses = `w-full h-screen transition-transform duration-700 ease-out page-${pageName}`;
    
    if (!isAnimating) {
      // 진입 전 위치
      switch (direction) {
        case 'left': return `${baseClasses} transform translate-x-full`;
        case 'right': return `${baseClasses} transform -translate-x-full`;
        case 'up': return `${baseClasses} transform translate-y-full`;
        case 'down': return `${baseClasses} transform -translate-y-full`;
        default: return `${baseClasses} transform translate-x-full`;
      }
    } else {
      // 진입 후 위치 (화면 중앙)
      return `${baseClasses} transform translate-x-0 translate-y-0`;
    }
  };

  return (
    <div className={getTransformClasses()}>
      {/* 페이지 오버레이 효과 */}
      <div className="page-overlay"></div>
      
      {/* 페이지 콘텐츠 */}
      <div className="w-full h-full overflow-auto relative z-10">
        {children}
      </div>
      
      {/* 전환 파티클 효과 */}
      {isAnimating && (
        <div className="transition-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="transition-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageTransition;