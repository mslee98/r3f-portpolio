import { useState, useEffect, useRef } from "react";
import ScrollCards from "../components/ScrollCards";
import GradientSpheres from "../components/GradientSpheres";

const Projects = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section 
      ref={sectionRef}
      className="c-space section-spacing relative" 
      id="projects"
    >
      {/* 헤더 - 최상위 z-index */}
      <div className="flex justify-between items-center relative z-[100] mb-6 mt-2 px-8">
        <h2 className="text-3xl md:text-4xl font-medium text-white tracking-wide">
          PROJECTS
        </h2>
        <button
          onClick={() => {
            console.log('Projects: Close button clicked');
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

      {/* 메인 컨텐츠 - ScrollCards 사용 */}
      <div className="w-full relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <ScrollCards isVisible={isVisible} onClose={onClose} />
        </div>
      </div>
    </section>
  );
};

export default Projects;