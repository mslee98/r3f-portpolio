import TitleHeader from "../components/TitleHeader";
import Carousel from "../components/Carousel";
import GradientSpheres from "../components/GradientSpheres";

const Projects = () => {
  return (
    <section className="c-space section-spacing relative flex flex-col" id="projects">
      <h2 className="text-heading mb-4">Projects</h2>
      
      <div className="gradient-box w-full h-1/2 absolute bottom-0 left-0 z-5">
          <GradientSpheres
              sphere1Class="gradient-sphere sphere-1"
              sphere2Class="gradient-sphere sphere-2"
          />
      </div>

      <div className="w-full relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default Projects;