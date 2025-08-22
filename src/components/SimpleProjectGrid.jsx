import { useState } from "react";
import { slides } from "../constants";

const SimpleProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {slides.map((project, index) => (
          <div
            key={project.id}
            className={`project-grid-item relative group cursor-pointer rounded-xl overflow-hidden ${
              selectedProject === index 
                ? 'ring-2 ring-blue-500 scale-105' 
                : ''
            }`}
            onClick={() => setSelectedProject(index)}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
                </div>
              </div>

              {/* 선택된 프로젝트 표시 */}
              {selectedProject === index && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 프로젝트 상세 정보 */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl text-blue-400 font-bold">
            {String(selectedProject + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl text-white font-semibold">
            {slides[selectedProject]?.title}
          </h3>
        </div>
        
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          {slides[selectedProject]?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2 text-sm">기술 스택</h4>
            <p className="text-white/70 text-xs">
              {slides[selectedProject]?.techStack}
            </p>
          </div>
          
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="text-green-400 font-semibold mb-2 text-sm">주요 기능</h4>
            <p className="text-white/70 text-xs">
              {slides[selectedProject]?.features}
            </p>
          </div>
          
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-2 text-sm">개발 기간</h4>
            <p className="text-white/70 text-xs">
              {slides[selectedProject]?.duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProjectGrid;