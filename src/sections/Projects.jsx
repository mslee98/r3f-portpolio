import { useState, useEffect, useRef } from "react";
import TitleHeader from "../components/TitleHeader";
import SimpleProjectGrid from "../components/SimpleProjectGrid";
import GradientSpheres from "../components/GradientSpheres";

const Projects = () => {
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
      className="c-space py-8 relative flex flex-col" 
      id="projects"
    >
      <h2 className="text-heading mb-4">Projects</h2>
      
      <div className="gradient-box w-full h-1/2 absolute bottom-0 left-0 z-5">
          <GradientSpheres
              sphere1Class="gradient-sphere sphere-1"
              sphere2Class="gradient-sphere sphere-2"
          />
      </div>

      <div className="w-full relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {isVisible && <SimpleProjectGrid />}
        </div>
      </div>
    </section>
  );
};

export default Projects;