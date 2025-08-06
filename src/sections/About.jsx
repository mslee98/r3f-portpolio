import { useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from '../components/CopyEmailButton';
import { Frameworks } from "../components/FrameWorks";
import GridExperience from "../components/GridExperience";

const About = () => {
  const grid2Container = useRef();

  const grid1Ref = useRef();
  const grid2Ref = useRef();
  const grid3Ref = useRef();
  const grid4Ref = useRef();
  const grid5Ref = useRef();

  // 성능 최적화: threshold를 높여서 불필요한 재렌더링 방지
  const grid1InView = useInView(grid1Ref, { once: true, threshold: 0.5 });
  const grid2InView = useInView(grid2Ref, { once: true, threshold: 0.5 });
  const grid3InView = useInView(grid3Ref, { once: true, threshold: 0.5 });
  const grid4InView = useInView(grid4Ref, { once: true, threshold: 0.5 });
  const grid5InView = useInView(grid5Ref, { once: true, threshold: 0.5 });

  // 메모이제이션으로 불필요한 재렌더링 방지
  const grid1Animation = useMemo(() => ({
    initial: { opacity: 0, x: -100 },
    animate: grid1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 },
    transition: { duration: 0.6, ease: "easeOut" }
  }), [grid1InView]);

  const grid2Animation = useMemo(() => ({
    initial: { opacity: 0, y: 100, scale: 0.8 },
    animate: grid2InView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }
  }), [grid2InView]);

  const grid3Animation = useMemo(() => ({
    initial: { opacity: 0, x: 100 },
    animate: grid3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  }), [grid3InView]);

  const grid4Animation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: grid4InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
  }), [grid4InView]);

  const grid5Animation = useMemo(() => ({
    initial: { opacity: 0, y: -100 },
    animate: grid5InView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
  }), [grid5InView]);

  // hover 애니메이션 최적화
  const hoverAnimation = useMemo(() => ({
    whileHover: { y: -4 },
    whileTap: { y: -2 }
  }), []);

  return (
    <section className="c-space section-spacing font-moneygraphy" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <motion.div 
          ref={grid1Ref}
          className="flex items-end grid-default-color grid-1 cursor-pointer"
          {...grid1Animation}
          {...hoverAnimation}
        >
          <div className="absolute inset-0">
            {/* 성능 최적화: 조건부 렌더링 */}
            {grid1InView && <GridExperience />}
          </div>

          <div className="z-10 pointer-events-none select-none">
            <p className="headtext font-moneygraphy pointer-events-none select-none">아이디어가 현실이 되는 공간</p>
            <p className="subtext font-moneygraphy pointer-events-none select-none">
              사용자 경험을 최우선으로 생각하며, 기능과 디자인이 조화를 이루는 혁신적인 웹 솔루션을 만듭니다.  
              최신 기술과 깊은 경험을 바탕으로 빠르게 변화하는 디지털 세상 속에서 안정적이고 확장 가능한 소프트웨어를 개발하며,  
              아이디어가 현실이 되는 공간에서 상상을 구체화하고 사용자의 삶을 바꾸는 경험을 디자인합니다.  
              미래를 열어가는 기술력으로 더 나은 디지털 세상을 만들어 갑니다.
            </p>
          </div>

          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1f1e39]" />
        
        </motion.div>

        {/* Grid 2-1: 포트폴리오 */}
        <motion.div 
          ref={grid2Ref}
          className="grid-2 font-moneygraphy cursor-pointer" 
          {...grid2Animation}
          {...hoverAnimation}
        >
          <div className="grid grid-cols-3 gap-2 w-full h-[95%]">
            <motion.a
              href="https://github.com/mslee98.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
            >
                <motion.img 
                  src={'/assets/images/github-logo.png'} alt="portfolio" className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                />
              
              <h3 className="text-sm font-semibold text-white mb-1">Github</h3>
              <p className="text-xs text-gray-300 text-center">코드저장소 모음 확인하기</p>
            </motion.a>

            <motion.a
              href="https://mslee98pf.notion.site/?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-red-300 to-orange-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
            >         
                <motion.img 
                  src={'/assets/images/link.png'} alt="portfolio" className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                />
              <h3 className="text-sm font-semibold text-white mb-1">포트폴리오</h3>
              <p className="text-xs text-gray-300 text-center">포트폴리오 확인하기</p>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-rose-200 to-pink-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
            > 
                <motion.img 
                  src={'/assets/images/storybook.png'} alt="portfolio" className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                />
              <h3 className="text-sm font-semibold text-white mb-1">스토리북</h3>
              <p className="text-xs text-gray-300 text-center">스토리북 확인하기</p>
            </motion.a>
          </div>
        </motion.div>
        
        {/* Grid 3 */}
        <motion.div 
          ref={grid3Ref}
          className="grid-black-color grid-3 cursor-pointer"
          {...grid3Animation}
          {...hoverAnimation}
        >
          <div className="z-10 w-50%">
            <p className="headtext">Time Zone</p>
            <p className="subtext">대한민국 대전을 중심으로 활동하며, 전 세계 원격 협업이 가능합니다</p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            {/* 성능 최적화: 조건부 렌더링 */}
            {grid3InView && <Globe />}
          </figure>
        </motion.div>
        
        {/* Grid 4 */}
        <motion.div 
          ref={grid4Ref}
          className="grid-special-color grid-4 cursor-pointer"
          {...grid4Animation}
          {...hoverAnimation}
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </motion.div>
        
        {/* Grid 5 */}
        <motion.div 
          ref={grid5Ref}
          className="grid-default-color grid-5 cursor-pointer"
          {...grid5Animation}
          {...hoverAnimation}
        >
          <div className="z-10 w-[50%]">
            <p className="headText">기술 스택</p>
            <p className="subtext">
              안정적이고 확장 가능한 애플리케이션을 구축하기 위한 다양한 언어, 프레임워크, 도구들을 활용합니다
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            {/* 성능 최적화: 조건부 렌더링 */}
            {grid5InView && <Frameworks />}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;