import { useRef, useEffect, useState, memo } from "react";
import { Globe } from "./Globe";
import { Frameworks } from "./FrameWorks";
import GridExperience from "./GridExperience";

// 메모이제이션된 컴포넌트들
const MemoizedGlobe = memo(Globe);
const MemoizedFrameworks = memo(Frameworks);
const MemoizedGridExperience = memo(GridExperience);

const BentoGrid = ({ 
  title = "Bento Grid", 
  subtitle = "Beautiful grid layout",
  gridItems = []
}) => {
  const grid1Ref = useRef();
  const grid2Ref = useRef();
  const grid3Ref = useRef();
  const grid4Ref = useRef();
  const grid5Ref = useRef();
  const grid6Ref = useRef();

  // 단일 Intersection Observer로 최적화
  const [visibleGrids, setVisibleGrids] = useState(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const gridId = entry.target.dataset.gridId;
          if (entry.isIntersecting) {
            setVisibleGrids(prev => new Set([...prev, gridId]));
            // CSS 클래스 추가로 애니메이션 트리거
            entry.target.classList.add('animate-in');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    );

    const grids = [grid1Ref, grid2Ref, grid3Ref, grid4Ref, grid5Ref, grid6Ref];
    grids.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.gridId = `grid${index + 1}`;
        observer.observe(ref.current);
      }
    });

    return () => {
      grids.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // 기본 그리드 아이템들
  const defaultGridItems = [
    {
      id: 'grid1',
      ref: grid1Ref,
      className: 'grid-default-color grid-1 cursor-pointer grid-item grid-slide-left',
      content: (
        <>
          <div className="absolute inset-0">
            <MemoizedGridExperience />
          </div>
          <div className="z-10 pointer-events-none select-none">
            <p className="headtext font-moneygraphy pointer-events-none select-none">
              혁신적인 솔루션
            </p>
            <p className="subtext font-moneygraphy pointer-events-none select-none">
              최신 기술과 창의적인 아이디어를 결합하여 사용자 중심의 디지털 경험을 만듭니다.
              효율적이고 직관적인 인터페이스로 복잡한 문제를 간단하게 해결합니다.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1f1e39]" />
        </>
      )
    },
    {
      id: 'grid2',
      ref: grid2Ref,
      className: 'grid-2 font-moneygraphy cursor-pointer grid-item grid-slide-up',
      content: (
        <div className="grid grid-cols-2 gap-2 w-full h-[95%]">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-300 to-teal-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Performance</h3>
            <p className="text-xs text-gray-300 text-center">최적화된 성능</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-violet-300 to-purple-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Quality</h3>
            <p className="text-xs text-gray-300 text-center">높은 품질</p>
          </div>
        </div>
      )
    },
    {
      id: 'grid3',
      ref: grid3Ref,
      className: 'grid-black-color grid-3 cursor-pointer grid-item grid-slide-right',
      content: (
        <>
          <div className="z-10 w-50%">
            <p className="headtext">Global Reach</p>
            <p className="subtext">
              전 세계 어디서나 협업 가능한 원격 개발 환경을 제공합니다
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <MemoizedGlobe/>
          </figure>
        </>
      )
    },
    {
      id: 'grid4',
      ref: grid4Ref,
      className: 'grid-special-color grid-4 cursor-pointer grid-item grid-scale-in',
      content: (
        <div className="flex flex-col items-center justify-center gap-4 size-full">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <p className="text-center headtext">
            Ready to Create Something Amazing?
          </p>
          <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors duration-300">
            Get Started
          </button>
        </div>
      )
    },
    {
      id: 'grid5',
      ref: grid5Ref,
      className: 'grid-default-color grid-5 cursor-pointer grid-item grid-slide-down',
      content: (
        <>
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              모던 기술 스택으로 안정적이고 확장 가능한 애플리케이션을 구축합니다
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full left-[50%] md:scale-125">
            <MemoizedFrameworks />
          </div>
        </>
      )
    },
    {
      id: 'grid6',
      ref: grid6Ref,
      className: 'grid-2 font-moneygraphy cursor-pointer grid-item grid-slide-up',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Mission</h3>
          <p className="text-sm text-gray-300 text-center">
            사용자 경험을 최우선으로 하는 혁신적인 솔루션 개발
          </p>
        </div>
      )
    }
  ];

  // 커스텀 그리드 아이템이 있으면 사용, 없으면 기본값 사용
  const finalGridItems = gridItems.length > 0 ? gridItems : defaultGridItems;

  return (
    <div className="w-full font-moneygraphy">
      {title && (
        <div className="mb-8">
          <h2 className="text-heading">{title}</h2>
          {subtitle && <p className="text-subheading mt-2">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem]">
        {finalGridItems.map((item) => (
          <div 
            key={item.id}
            ref={item.ref}
            className={item.className}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;