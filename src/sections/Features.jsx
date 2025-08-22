import BentoGrid from "../components/BentoGrid";
import { Globe } from "../components/Globe";
import { Frameworks } from "../components/FrameWorks";
import GridExperience from "../components/GridExperience";

const Features = () => {
  // 커스텀 그리드 아이템 예제
  const customGridItems = [
    {
      id: 'custom1',
      className: 'grid-special-color grid-1 cursor-pointer grid-item grid-slide-left',
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">🌟</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Features</h3>
          <p className="text-sm text-gray-200">
            이것은 커스텀 벤토 그리드 컴포넌트의 예제입니다.
          </p>
        </div>
      )
    },
    {
      id: 'custom2',
      className: 'grid-black-color grid-2 cursor-pointer grid-item grid-slide-up',
      content: (
        <div className="grid grid-cols-2 gap-2 w-full h-[95%]">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-300 to-blue-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-lg">⚡</span>
            </div>
            <h4 className="text-xs font-semibold text-white mb-1">Fast</h4>
            <p className="text-[10px] text-gray-300 text-center">빠른 성능</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-300 to-orange-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-lg">🛡️</span>
            </div>
            <h4 className="text-xs font-semibold text-white mb-1">Secure</h4>
            <p className="text-[10px] text-gray-300 text-center">보안성</p>
          </div>
        </div>
      )
    },
    {
      id: 'custom3',
      className: 'grid-default-color grid-3 cursor-pointer grid-item grid-slide-right',
      content: (
        <>
          <div className="z-10 w-50%">
            <p className="headtext">Innovation</p>
            <p className="subtext">
              혁신적인 기술로 미래를 준비합니다
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </>
      )
    },
    {
      id: 'custom4',
      className: 'grid-black-color grid-4 cursor-pointer grid-item grid-scale-in',
      content: (
        <div className="flex flex-col items-center justify-center gap-4 size-full">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">🚀</span>
          </div>
          <p className="text-center headtext">
            Launch Your Project
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold text-white transition-all duration-300">
            Start Now
          </button>
        </div>
      )
    },
    {
      id: 'custom5',
      className: 'grid-special-color grid-5 cursor-pointer grid-item grid-slide-down',
      content: (
        <>
          <div className="z-10 w-[50%]">
            <p className="headText">Skills</p>
            <p className="subtext">
              다양한 기술 스택을 활용한 전문적인 개발 역량
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full left-[50%] md:scale-125">
            <Frameworks />
          </div>
        </>
      )
    },
    {
      id: 'custom6',
      className: 'grid-default-color grid-2 cursor-pointer grid-item grid-slide-up',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
            <span className="text-3xl relative z-10">💡</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ideas</h3>
          <p className="text-sm text-gray-300 text-center">
            창의적인 아이디어로 문제를 해결합니다
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="c-space section-spacing" id="features">
      {/* 기본 벤토 그리드 */}
      <BentoGrid 
        title="Features" 
        subtitle="다양한 기능과 특징들을 소개합니다"
      />
      
      {/* 구분선 */}
      <div className="my-16 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* 커스텀 벤토 그리드 */}
      <BentoGrid 
        title="Custom Layout" 
        subtitle="원하는 대로 커스터마이징 가능한 벤토 그리드"
        gridItems={customGridItems}
      />
    </section>
  );
};

export default Features;