import { useRef, useEffect } from "react";
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

  const grid1InView = useInView(grid1Ref, { once: true, threshold: 0.3 });
  const grid2InView = useInView(grid2Ref, { once: true, threshold: 0.3 });
  const grid3InView = useInView(grid3Ref, { once: true, threshold: 0.3 });
  const grid4InView = useInView(grid4Ref, { once: true, threshold: 0.3 });
  const grid5InView = useInView(grid5Ref, { once: true, threshold: 0.3 });

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <motion.div 
          ref={grid1Ref}
          className="flex items-end grid-default-color grid-1"
          initial={{ opacity: 0, x: -100 }}
          animate={grid1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0">
            <GridExperience />
          </div>

          {/* <img 
            src={'/assets/images/coding-pov.png'}
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            /> */}
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
        {/* Grid 2 - 3개 카드로 분할 */}
        <motion.div 
          ref={grid2Ref}
          className="grid-2" 
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={grid2InView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="grid grid-cols-3 gap-2 w-full h-full">
            <motion.a
              href="https://github.com/mslee98.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              
            >
              
                <motion.img 
                  src={'/assets/images/github-logo.png'} alt="portfolio" className="w-48 h-48"
                  whileHover={{ scale: 1.2, y: -5 }}
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
                  src={'/assets/images/link.png'} alt="portfolio" className="w-48 h-48"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                />
                {/* <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg> */}
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
                  src={'/assets/images/storybook.png'} alt="portfolio" className="w-48 h-48"
                  whileHover={{ scale: 1.2, y: -5 }}
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
          className="grid-black-color grid-3"
          initial={{ opacity: 0, x: 100 }}
          animate={grid3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="z-10 w-50%">
            <p className="headtext">Time Zone</p>
            <p className="subtext">대한민국 대전을 중심으로 활동하며, 전 세계 원격 협업이 가능합니다</p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe/>
          </figure>
        </motion.div>
        {/* Grid 4 */}
        <motion.div 
          ref={grid4Ref}
          className="grid-special-color grid-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={grid4InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
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
          className="grid-default-color grid-5"
          initial={{ opacity: 0, y: -100 }}
          animate={grid5InView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <div className="z-10 w-[50%]">
            <p className="headText">기술 스택</p>
            <p className="subtext">
              안정적이고 확장 가능한 애플리케이션을 구축하기 위한 다양한 언어, 프레임워크, 도구들을 활용합니다
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;