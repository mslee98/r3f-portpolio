import { useRef, useEffect } from "react";
import CopyEmailButton from '../components/CopyEmailButton';

const About2 = () => {
  const containerRef = useRef();

  // 경량화된 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '50px 0px'
      }
    );

    const container = containerRef.current;
    if (container) {
      const gridItems = container.querySelectorAll('.grid-item');
      gridItems.forEach(item => observer.observe(item));
    }

    return () => {
      if (container) {
        const gridItems = container.querySelectorAll('.grid-item');
        gridItems.forEach(item => observer.unobserve(item));
      }
    };
  }, []);

  return (
    <section className="c-space py-8 font-moneygraphy" id="about" ref={containerRef}>
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        
        {/* Grid 1 - 메인 소개 (3D 컴포넌트 대신 CSS 애니메이션) */}
        <div className="flex items-end grid-default-color grid-1 cursor-pointer grid-item grid-slide-left">
          {/* CSS로만 만든 배경 효과 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20"></div>
            
            {/* 동적 그리드 패턴 */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i}
                    className="bg-white/10 rounded-sm hover:bg-white/30 transition-all duration-500"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animation: 'gridPulse 3s ease-in-out infinite'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* 떠다니는 파티클들 */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-12 left-8 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
          </div>

          <div className="z-10 pointer-events-none select-none">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-4 border border-white/20">
              <span className="mr-2">💡</span>
              Innovation
            </div>
            <p className="headtext font-moneygraphy pointer-events-none select-none">
              아이디어가 현실이 되는 공간
            </p>
            <p className="subtext font-moneygraphy pointer-events-none select-none">
              사용자 경험을 최우선으로 생각하며, 기능과 디자인이 조화를 이루는 혁신적인 웹 솔루션을 만듭니다.  
              최신 기술과 깊은 경험을 바탕으로 빠르게 변화하는 디지털 세상 속에서 안정적이고 확장 가능한 소프트웨어를 개발합니다.
            </p>
          </div>

          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1f1e39]" />
        </div>

        {/* Grid 2 - 포트폴리오 링크들 */}
        <div className="grid-2 font-moneygraphy cursor-pointer grid-item grid-slide-up">
          <div className="grid grid-cols-3 gap-2 w-full h-[95%]">
            <a
              href="https://github.com/mslee98.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🐙</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Github</h3>
              <p className="text-xs text-gray-300 text-center">코드저장소 모음</p>
            </a>

            <a
              href="https://mslee98pf.notion.site/?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-red-300 to-orange-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">포트폴리오</h3>
              <p className="text-xs text-gray-300 text-center">작업물 확인하기</p>
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-rose-200 to-pink-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">스토리북</h3>
              <p className="text-xs text-gray-300 text-center">컴포넌트 라이브러리</p>
            </a>
          </div>
        </div>
        
        {/* Grid 3 - Time Zone (CSS로만 만든 지구본) */}
        <div className="grid-black-color grid-3 cursor-pointer grid-item grid-slide-right">
          <div className="z-10 w-50%">
            <p className="headtext">Time Zone</p>
            <p className="subtext">대한민국 대전을 중심으로 활동하며, 전 세계 원격 협업이 가능합니다</p>
          </div>
          
          {/* CSS로만 만든 지구본 */}
          <figure className="absolute left-[30%] top-[10%]">
            <div className="relative w-24 h-24">
              {/* 지구본 */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 relative overflow-hidden shadow-2xl">
                {/* 대륙 표현 */}
                <div className="absolute top-2 left-3 w-4 h-6 bg-green-300 rounded-full opacity-70 transform rotate-12"></div>
                <div className="absolute bottom-3 right-2 w-3 h-4 bg-green-300 rounded-full opacity-60 transform -rotate-45"></div>
                <div className="absolute top-8 right-4 w-2 h-3 bg-green-300 rounded-full opacity-50"></div>
                
                {/* 빛 반사 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                
                {/* 회전 효과 */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
                </div>
              </div>
              
              {/* 궤도 */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-spin-slow"></div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-white/20 animate-spin-reverse"></div>
            </div>
          </figure>
        </div>

        {/* Grid 4 - Contact */}
        <div className="grid-special-color grid-4 cursor-pointer grid-item grid-scale-in">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl">✨</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            </div>
            
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>

        {/* Grid 5 - 기술 스택 (CSS로만 만든 기술 아이콘들) */}
        <div className="grid-default-color grid-5 cursor-pointer grid-item grid-slide-down">
          <div className="z-10 w-[50%]">
            <p className="headText">기술 스택</p>
            <p className="subtext">
              안정적이고 확장 가능한 애플리케이션을 구축하기 위한 다양한 언어, 프레임워크, 도구들을 활용합니다
            </p>
          </div>
          
          {/* CSS로만 만든 기술 스택 애니메이션 */}
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full left-[50%] md:scale-125">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* 중앙 허브 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl z-10">
                <span className="text-white text-sm font-bold">DEV</span>
              </div>
              
              {/* 기술 스택 아이콘들 (오비트 형태) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="tech-orbit-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">JS</span>
                  </div>
                </div>
                <div className="tech-orbit-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">TS</span>
                  </div>
                </div>
                <div className="tech-orbit-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">REACT</span>
                  </div>
                </div>
                <div className="tech-orbit-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">VUE</span>
                  </div>
                </div>
                <div className="tech-orbit-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">NEXT</span>
                  </div>
                </div>
              </div>
              
              {/* 연결선들 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="tech-connection-1"></div>
                <div className="tech-connection-2"></div>
                <div className="tech-connection-3"></div>
                <div className="tech-connection-4"></div>
                <div className="tech-connection-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;