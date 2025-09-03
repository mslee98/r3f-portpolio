import { useRef, useEffect, useState, memo, lazy, Suspense } from "react";
import Card from "../components/Card";
import CopyEmailButton from '../components/CopyEmailButton';
import GradientSpheres from '../components/GradientSpheres';

// 3D 컴포넌트들을 lazy 로딩으로 변경
const Globe = lazy(() => import("../components/Globe").then(module => ({ default: module.Globe })));
const Frameworks = lazy(() => import("../components/FrameWorks").then(module => ({ default: module.Frameworks })));
const GridExperience = lazy(() => import("../components/GridExperience"));

// 3D 컴포넌트 로딩 플레이스홀더
const Component3DLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

const About = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const grid1Ref = useRef();
  const grid2Ref = useRef();
  const grid3Ref = useRef();
  const grid4Ref = useRef();
  const grid5Ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // IntersectionObserver로 애니메이션 트리거만 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const gridId = entry.target.dataset.gridId;
          if (entry.isIntersecting) {
            // CSS 클래스 추가로 애니메이션 트리거 (상태 업데이트 제거)
            entry.target.classList.add('animate-in');
            // 한 번 관찰되면 더 이상 관찰하지 않음
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '50px 0px'
      }
    );

    const grids = [grid1Ref, grid2Ref, grid3Ref, grid4Ref, grid5Ref];
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



  return (
    <section 
      ref={sectionRef}
      className="c-space section-spacing relative" 
      id="about"
    >
      {/* 헤더 - 최상위 z-index */}
      <div className="flex justify-between items-center relative z-[100] mb-6 mt-2 px-8">
        <h2 className="text-3xl md:text-4xl font-medium text-white tracking-wide">
          ABOUT ME
        </h2>
        <button
          onClick={() => {
            console.log('About: Close button clicked');
            if (onClose) onClose();
          }}
          className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center text-white text-sm font-bold transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{ zIndex: 100 }}
        >
          ✕
        </button>
      </div>
      
      {/* 배경 그라데이션 */}
      <div className="gradient-box w-full h-1/2 absolute bottom-0 left-0 z-0">
          <GradientSpheres
              sphere1Class="gradient-sphere sphere-1"
              sphere2Class="gradient-sphere sphere-2"
          />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="w-full relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[15rem]">
        {/* Grid 1 */}
        <div 
          ref={grid1Ref}
          className="flex items-end grid-default-color grid-1 cursor-pointer grid-item grid-slide-left"
        >
          <div className="absolute inset-0">
            <Suspense fallback={<Component3DLoader />}>
              <GridExperience key="grid-experience" />
            </Suspense>
          </div>

          {/* <img 
            src={'/assets/images/coding-pov.png'}
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            /> */}
          <div className="z-10 pointer-events-none select-none relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1f1e39]/80 to-transparent rounded-lg"></div>
            <div className="relative z-10 p-4">
              <p className="headtext font-moneygraphy pointer-events-none select-none text-white">아이디어가 현실이 되는 공간</p>
              <p className="subtext font-moneygraphy pointer-events-none select-none text-white/90">
                사용자 경험을 최우선으로 생각하며, 기능과 디자인이 조화를 이루는 혁신적인 웹 솔루션을 만듭니다.  
                최신 기술과 깊은 경험을 바탕으로 빠르게 변화하는 디지털 세상 속에서 안정적이고 확장 가능한 소프트웨어를 개발하며,  
                아이디어가 현실이 되는 공간에서 상상을 구체화하고 사용자의 삶을 바꾸는 경험을 디자인합니다.  
                미래를 열어가는 기술력으로 더 나은 디지털 세상을 만들어 갑니다.
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1f1e39]" />
        
        </div>

        {/* Grid 2-1: 포트폴리오 */}
        {/* Grid 2 - 3개 카드로 분할 */}
        <div 
          ref={grid2Ref}
          className="grid-2 font-moneygraphy cursor-pointer grid-item grid-slide-up" 
        >
          <div className="grid grid-cols-3 gap-2 w-full h-[95%]">
            <a
              href="https://github.com/mslee98.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            >
                <img 
                  src={'/assets/images/github-logo.png'} alt="portfolio" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 card-image"
                />
              
              <h3 className="text-sm font-semibold text-white mb-1">Github</h3>
              <p className="text-xs text-gray-300 text-center">코드저장소 모음 확인하기</p>
            </a>

            <a
              href="https://mslee98pf.notion.site/?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-red-300 to-orange-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            >         
                <img 
                  src={'/assets/images/link.png'} alt="portfolio" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 card-image"
                />
              <h3 className="text-sm font-semibold text-white mb-1">포트폴리오</h3>
              <p className="text-xs text-gray-300 text-center">포트폴리오 확인하기</p>
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-rose-200 to-pink-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer card-hover"
            > 
                <img 
                  src={'/assets/images/storybook.png'} alt="portfolio" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 card-image"
                />
              <h3 className="text-sm font-semibold text-white mb-1">스토리북</h3>
              <p className="text-xs text-gray-300 text-center">스토리북 확인하기</p>
            </a>
          </div>
        </div>
        
        {/* Grid 3 */}
        <div 
          ref={grid3Ref}
          className="grid-black-color grid-3 cursor-pointer grid-item grid-slide-right flex items-center justify-between p-4"
        >
          <div className="z-10 w-[45%]">
            <p className="headtext font-moneygraphy text-white mb-2">Time Zone</p>
            <p className="subtext font-moneygraphy text-white/90 leading-relaxed">
              대한민국 대전을 중심으로 활동하며, 전 세계 원격 협업이 가능합니다
            </p>
          </div>
          <figure className="w-[50%] h-full flex items-center justify-center">
            <Suspense fallback={<Component3DLoader />}>
              <Globe />
            </Suspense>
          </figure>
        </div>
        {/* Grid 4 */}
        <div 
          ref={grid4Ref}
          className="grid-special-color grid-4 cursor-pointer grid-item grid-scale-in"
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div 
          ref={grid5Ref}
          className="grid-default-color grid-5 cursor-pointer grid-item grid-slide-down"
        >
          <div className="z-10 w-[50%]">
            <p className="headText">기술 스택</p>
            <p className="subtext">
              안정적이고 확장 가능한 애플리케이션을 구축하기 위한 다양한 언어, 프레임워크, 도구들을 활용합니다
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full left-[50%] md:scale-125">
            <Suspense fallback={<Component3DLoader />}>
              <Frameworks />
            </Suspense>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;