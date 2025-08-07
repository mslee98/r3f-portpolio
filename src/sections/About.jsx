import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "../components/Globe";
import CopyEmailButton from '../components/CopyEmailButton';
import { Frameworks } from "../components/FrameWorks";
import GridExperience from "../components/GridExperience";

const About = () => {
  const aboutSectionRef = useRef();

  // 하나의 useInView로 통합 - threshold를 낮춰서 더 일찍 트리거
  const isAboutSectionInView = useInView(aboutSectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "0px 0px -100px 0px"
  });

  // 애니메이션 설정을 한 번에 정의하여 재렌더링 최소화
  const animations = useMemo(() => ({
    grid1: {
      initial: { opacity: 0, x: -30 },
      animate: isAboutSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    grid2: {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: isAboutSectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 },
      transition: { duration: 0.4, ease: "easeOut", delay: 0.1 }
    },
    grid3: {
      initial: { opacity: 0, x: 30 },
      animate: isAboutSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 },
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 }
    },
    grid4: {
      initial: { opacity: 0, scale: 0.9 },
      animate: isAboutSectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
      transition: { duration: 0.4, ease: "easeOut", delay: 0.3 }
    },
    grid5: {
      initial: { opacity: 0, y: -30 },
      animate: isAboutSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 },
      transition: { duration: 0.4, ease: "easeOut", delay: 0.4 }
    }
  }), [isAboutSectionInView]);

  // hover 애니메이션 최적화
  const hoverAnimation = useMemo(() => ({
    whileHover: { y: -1 },
    whileTap: { y: 0 }
  }), []);

  return (
    <section className="c-space section-spacing font-moneygraphy" id="about" ref={aboutSectionRef}>
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 - GridExperience는 항상 렌더링 */}
        <motion.div 
          className="flex items-end grid-default-color grid-1 cursor-pointer"
          {...animations.grid1}
          {...hoverAnimation}
        >
          <div className="absolute inset-0">
            <GridExperience />
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
          className="grid-2 font-moneygraphy cursor-pointer" 
          {...animations.grid2}
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
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.99 }}
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
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.99 }}
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
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                />
              <h3 className="text-sm font-semibold text-white mb-1">스토리북</h3>
              <p className="text-xs text-gray-300 text-center">스토리북 확인하기</p>
            </motion.a>
          </div>
        </motion.div>
        
        {/* Grid 3 - Globe은 useInView로 관리 */}
        <motion.div 
          className="grid-black-color grid-3 cursor-pointer relative"
          {...animations.grid3}
          {...hoverAnimation}
        >
          <div className="z-10 w-1/2">
            <p className="headtext">서울/경인/대전/세종</p>
            <p className="subtext">대한민국 대전을 중심으로 활동하며, 전 세계 원격 협업이 가능합니다</p>
          </div>
          <figure className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full flex items-center justify-center">
            <Globe />
          </figure>
        </motion.div>
        
        {/* Grid 4 */}
        <motion.div 
          className="grid-special-color grid-4 cursor-pointer"
          {...animations.grid4}
          {...hoverAnimation}
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </motion.div>
        
        {/* Grid 5 - Frameworks은 useInView로 관리 */}
        <motion.div 
          className="grid-default-color grid-5 cursor-pointer"
          {...animations.grid5}
          {...hoverAnimation}
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