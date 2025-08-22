import LightBentoGrid from "../components/LightBentoGrid";

const Showcase = () => {
  // 커스텀 경량 그리드 아이템들
  const showcaseItems = [
    {
      id: 'showcase1',
      className: 'light-grid-1 light-grid-gradient cursor-pointer grid-item-light slide-left',
      content: (
        <div className="relative h-full flex flex-col justify-end p-8">
          {/* 배경 장식 요소들 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-12 right-12 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-12 w-2 h-2 bg-white rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          </div>
          
          {/* 메인 콘텐츠 */}
          <div className="z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
              <span className="mr-2">🚀</span>
              Performance First
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
              초고속 웹 애플리케이션
            </h3>
            <p className="text-gray-200 leading-relaxed">
              최적화된 성능과 부드러운 사용자 경험을 제공하는 모던 웹 솔루션입니다. 
              경량화된 컴포넌트와 효율적인 렌더링으로 빠른 로딩 속도를 보장합니다.
            </p>
          </div>
          
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      )
    },
    {
      id: 'showcase2',
      className: 'light-grid-2 light-grid-blue cursor-pointer grid-item-light slide-up',
      content: (
        <div className="h-full p-5">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-white mb-2">Features</h4>
            </div>
            <div className="flex-1 space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-sm">📱</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Responsive</h5>
                    <p className="text-xs text-gray-400">모든 디바이스 지원</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-sm">🎨</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Modern UI</h5>
                    <p className="text-xs text-gray-400">세련된 디자인</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'showcase3',
      className: 'light-grid-3 light-grid-dark cursor-pointer grid-item-light slide-right',
      content: (
        <div className="relative h-full flex flex-col justify-center p-6">
          {/* CSS로만 만든 네트워크 애니메이션 */}
          <div className="absolute right-4 top-6">
            <div className="relative w-24 h-24">
              {/* 중앙 노드 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              
              {/* 외부 노드들 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              
              {/* 연결선들 */}
              <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gradient-to-r from-green-400 to-blue-400 transform -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gradient-to-r from-green-400 to-blue-400 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
            </div>
          </div>
          
          <div className="z-10">
            <h3 className="text-xl font-bold text-white mb-2">Connected</h3>
            <p className="text-gray-300 text-sm">
              실시간 데이터 동기화와 
              네트워크 최적화로 
              끊김없는 연결성 제공
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'showcase4',
      className: 'light-grid-4 light-grid-purple cursor-pointer grid-item-light scale-in',
      content: (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <div className="w-18 h-18 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 hover:rotate-3">
              <span className="text-3xl">💎</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">
            Premium Quality
          </h3>
          
          <p className="text-gray-300 text-sm mb-4">
            최고 품질의 코드와 디자인
          </p>
          
          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 rounded-xl font-medium text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-white/10">
            Explore More
          </button>
        </div>
      )
    },
    {
      id: 'showcase5',
      className: 'light-grid-5 light-grid-emerald cursor-pointer grid-item-light slide-down',
      content: (
        <div className="relative h-full flex items-center p-6">
          {/* CSS로만 만든 코딩 애니메이션 */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <div className="bg-gray-900 rounded-lg p-3 shadow-xl border border-gray-700 w-32">
              <div className="flex space-x-1 mb-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-blue-400 rounded w-3/4 animate-pulse"></div>
                <div className="h-1 bg-green-400 rounded w-1/2 animate-pulse delay-300"></div>
                <div className="h-1 bg-purple-400 rounded w-2/3 animate-pulse delay-500"></div>
                <div className="h-1 bg-yellow-400 rounded w-1/3 animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
          
          <div className="z-10 w-1/2">
            <h3 className="text-xl font-bold text-white mb-2">Clean Code</h3>
            <p className="text-gray-300 text-sm">
              유지보수가 쉽고 확장 가능한 
              깨끗한 코드 아키텍처로 
              안정적인 서비스 구축
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'showcase6',
      className: 'light-grid-6 light-grid-orange cursor-pointer grid-item-light slide-up',
      content: (
        <div className="h-full flex flex-col items-center justify-center p-6">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform duration-300">
              <span className="text-3xl">🔥</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-xs">⚡</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2">Hot Features</h3>
          <p className="text-gray-300 text-sm text-center">
            최신 트렌드를 반영한 
            혁신적인 기능들
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="c-space section-spacing" id="showcase">
      <LightBentoGrid 
        title="Performance Showcase" 
        subtitle="경량화된 벤토 그리드로 부드러운 스크롤 경험을 제공합니다"
        gridItems={showcaseItems}
      />
    </section>
  );
};

export default Showcase;