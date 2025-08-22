import { useRef, useEffect, useState } from "react";

const LightBentoGrid = ({ 
  title = "Light Bento Grid", 
  subtitle = "Performance optimized grid layout",
  gridItems = []
}) => {
  const [visibleGrids, setVisibleGrids] = useState(new Set());
  const containerRef = useRef();

  // 기본 경량 그리드 아이템들 (3D 컴포넌트 없음)
  const defaultGridItems = [
    {
      id: 'light1',
      className: 'light-grid-1 light-grid-purple cursor-pointer grid-item-light slide-left',
      content: (
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-1000"></div>
          </div>
          
          <div className="z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4">
              💜 Premium
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              혁신적인 디자인
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              사용자 중심의 직관적인 인터페이스로 최고의 경험을 제공합니다. 
              모던한 디자인과 뛰어난 성능을 겸비한 솔루션입니다.
            </p>
          </div>
          
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
        </div>
      )
    },
    {
      id: 'light2',
      className: 'light-grid-2 light-grid-blue cursor-pointer grid-item-light slide-up',
      content: (
        <div className="h-full p-4">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Fast</h4>
              <p className="text-xs text-gray-400 text-center">최적화된 성능</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">🛡️</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Secure</h4>
              <p className="text-xs text-gray-400 text-center">안전한 보안</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'light3',
      className: 'light-grid-3 light-grid-dark cursor-pointer grid-item-light slide-right',
      content: (
        <div className="relative h-full flex flex-col justify-center p-6">
          {/* CSS로만 만든 지구본 효과 */}
          <div className="absolute right-4 top-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 relative overflow-hidden earth-rotation">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
              <div className="absolute top-2 left-2 w-2 h-2 bg-green-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-green-300 rounded-full opacity-40"></div>
            </div>
          </div>
          
          <div className="z-10">
            <h3 className="text-xl font-bold text-white mb-2">Global Ready</h3>
            <p className="text-gray-300 text-sm">
              전 세계 어디서나 접근 가능한 
              확장성 있는 솔루션
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'light4',
      className: 'light-grid-4 light-grid-gradient cursor-pointer grid-item-light scale-in',
      content: (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-110">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-20 animate-pulse"></div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">
            Ready to Start?
          </h3>
          
          <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-medium text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25">
            Get Started
          </button>
        </div>
      )
    },
    {
      id: 'light5',
      className: 'light-grid-5 light-grid-orange cursor-pointer grid-item-light slide-down',
      content: (
        <div className="relative h-full flex items-center p-6">
          {/* CSS로만 만든 기술 스택 아이콘들 */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg floating-1">
                  JS
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg floating-2">
                  TS
                </div>
              </div>
              <div className="flex space-x-3 ml-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg floating-3">
                  VUE
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg floating-1">
                  REACT
                </div>
              </div>
            </div>
          </div>
          
          <div className="z-10 w-1/2">
            <h3 className="text-xl font-bold text-white mb-2">Tech Stack</h3>
            <p className="text-gray-300 text-sm">
              최신 기술로 구축하는 
              안정적이고 확장 가능한 
              애플리케이션
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'light6',
      className: 'light-grid-6 light-grid-emerald cursor-pointer grid-item-light slide-up',
      content: (
        <div className="h-full flex flex-col items-center justify-center p-6">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs">✓</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2">Mission</h3>
          <p className="text-gray-300 text-sm text-center">
            사용자 경험 최우선으로 하는 
            혁신적인 디지털 솔루션
          </p>
        </div>
      )
    }
  ];

  // IntersectionObserver 설정 (단순화)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px 0px'
      }
    );

    const container = containerRef.current;
    if (container) {
      const gridItems = container.querySelectorAll('.grid-item-light');
      gridItems.forEach(item => observer.observe(item));
    }

    return () => {
      if (container) {
        const gridItems = container.querySelectorAll('.grid-item-light');
        gridItems.forEach(item => observer.unobserve(item));
      }
    };
  }, []);

  const finalGridItems = gridItems.length > 0 ? gridItems : defaultGridItems;

  return (
    <div className="w-full font-moneygraphy" ref={containerRef}>
      {title && (
        <div className="mb-8">
          <h2 className="text-heading">{title}</h2>
          {subtitle && <p className="text-subheading mt-2">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] light-bento-container">
        {finalGridItems.map((item) => (
          <div 
            key={item.id}
            className={item.className}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightBentoGrid;