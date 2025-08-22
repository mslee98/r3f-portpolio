import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCards = ({ isVisible = true, onClose, onAnimationComplete }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  // isVisible 변경 로그
  useEffect(() => {
    console.log('ProjectCards: isVisible changed to', isVisible);
  }, [isVisible]);

  // 프로젝트 데이터 - 이미지에서 영감을 받은 카드 스타일
  const projects = [
    {
      id: 1,
      title: "STRATEGY",
      subtitle: "Experience Strategy",
      icon: "S",
      category: "STRATEGY",
      skills: [
        "Experience Strategy",
        "Technology Strategy", 
        "Creative Direction",
        "Discovery",
        "Research"
      ],
      description: "사용자 경험 전략 수립 및 기술 로드맵 설계",
      color: "from-blue-600 to-purple-700",
      bgPattern: "geometric"
    },
    {
      id: 2,
      title: "CREATIVE",
      subtitle: "Art Direction",
      icon: "C",
      category: "CREATIVE", 
      skills: [
        "Art Direction",
        "UX/UI Design",
        "Motion Design",
        "Game Design",
        "Illustration"
      ],
      description: "창의적 디자인 솔루션 및 브랜드 아이덴티티",
      color: "from-purple-600 to-pink-700",
      bgPattern: "organic"
    },
    {
      id: 3,
      title: "TECH",
      subtitle: "WebGL Development",
      icon: "T",
      category: "TECH",
      skills: [
        "WebGL Development",
        "Web Development", 
        "Unity/Unreal",
        "Interactive Installations",
        "VR/AR"
      ],
      description: "최신 웹 기술과 3D 인터랙티브 경험 구현",
      color: "from-cyan-600 to-blue-700",
      bgPattern: "tech"
    },
    {
      id: 4,
      title: "PRODUCTION",
      subtitle: "Procedural Modeling",
      icon: "P", 
      category: "PRODUCTION",
      skills: [
        "Procedural Modeling",
        "3D Asset Creation",
        "3D Asset Optimization", 
        "Animation",
        "3D Pipeline"
      ],
      description: "3D 에셋 제작 및 최적화된 파이프라인 구축",
      color: "from-emerald-600 to-teal-700",
      bgPattern: "abstract"
    }
  ];

  // 페이지 전체 애니메이션 variants
  const pageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: -20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateX: 10,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // 카드 배치 애니메이션 variants - 카드 덱에서 펼쳐지는 효과
  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: (index) => ({ 
      opacity: 0,
      scale: 0.1,
      rotateZ: index * 15,
      y: 200,
      x: 0
    }),
    visible: (index) => ({ 
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        delay: index * 0.2,
        duration: 1.5
      }
    }),
    hover: {
      y: -20,
      scale: 1.05,
      rotateZ: 2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: (index) => ({
      opacity: 0,
      scale: 0.1,
      rotateZ: (projects.length - index - 1) * 15,
      y: -200,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  // 배경 패턴 생성
  const getBackgroundPattern = (pattern) => {
    switch(pattern) {
      case 'geometric':
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,10 10,20 0,10" fill="white" opacity="0.3"/>
                  <circle cx="10" cy="10" r="2" fill="white" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#geometric)" />
            </svg>
          </div>
        );
      case 'organic':
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="organic" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M12.5,5 Q20,12.5 12.5,20 Q5,12.5 12.5,5" fill="white" opacity="0.4"/>
                  <circle cx="12.5" cy="12.5" r="1" fill="white" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#organic)" />
            </svg>
          </div>
        );
      case 'tech':
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="tech" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="5" height="5" fill="white" opacity="0.3"/>
                  <line x1="0" y1="7.5" x2="15" y2="7.5" stroke="white" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="white" strokeWidth="0.5" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#tech)" />
            </svg>
          </div>
        );
      case 'abstract':
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="abstract" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M15,0 L30,15 L15,30 L0,15 Z" fill="white" opacity="0.2"/>
                  <circle cx="15" cy="15" r="3" fill="white" opacity="0.5"/>
                  <path d="M15,8 Q22,15 15,22 Q8,15 15,8" fill="white" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#abstract)" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => {
      console.log('AnimatePresence exit complete');
      if (onAnimationComplete) onAnimationComplete();
    }}>
      {isVisible && (
        <motion.div 
          key="project-cards-page"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 z-40 overflow-hidden"
        >
          {/* 닫기 버튼 */}
          {onClose && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                console.log('Close button clicked');
                // ProjectsNew에서 isVisible을 false로 설정하도록 함
                if (onClose) onClose();
              }}
              className="fixed top-8 right-8 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300 hover:scale-110"
            >
              ✕
            </motion.button>
          )}

          <div className="w-full h-full overflow-y-auto py-20 px-8">
            <div className="max-w-7xl mx-auto">
              {/* 헤더 */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-center mb-16"
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                  PROJECT
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    SHOWCASE
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  전략부터 실행까지, 창의적이고 기술적인 솔루션을 통해 혁신적인 경험을 만들어갑니다.
                </p>
              </motion.div>

              {/* 카드 그리드 - 카드 덱 펼쳐지기 효과 */}
                                        <motion.div
                            ref={containerRef}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000 relative min-h-[500px]"
                          >
                {/* 카드 덱 시작점 표시 (개발용, 나중에 제거 가능) */}
                <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"></div>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(project.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onClick={() => setSelectedCard(project)}
                    className="relative cursor-pointer transform-gpu card-deck-shadow"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      zIndex: index + 10,
                      willChange: 'transform, opacity'
                    }}
                  >
              {/* 카드 메인 */}
              <div className={`
                relative w-full h-96 rounded-2xl overflow-hidden
                bg-gradient-to-br ${project.color}
                border-2 border-white/20 backdrop-blur-sm
                shadow-2xl hover:shadow-blue-500/25
                transition-all duration-500
                ${hoveredCard === project.id ? 'shadow-2xl shadow-blue-500/40' : ''}
              `}>
                {/* 배경 패턴 */}
                {getBackgroundPattern(project.bgPattern)}
                
                {/* 글로우 효과 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* 카드 내용 */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* 상단 - 아이콘과 카테고리 */}
                  <div className="flex justify-between items-start">
                    <div className="text-white/80 text-sm font-medium tracking-wider">
                      {project.category}
                    </div>
                    <motion.div
                      animate={{ 
                        rotate: hoveredCard === project.id ? 360 : 0,
                        scale: hoveredCard === project.id ? 1.2 : 1
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                    >
                      <span className="text-white font-bold text-xl">{project.icon}</span>
                    </motion.div>
                  </div>

                  {/* 중앙 - 메인 아이콘 */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredCard === project.id ? 1.1 : 1,
                        rotateY: hoveredCard === project.id ? 10 : 0
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <span className="text-white font-bold text-4xl">{project.icon}</span>
                    </motion.div>
                  </div>

                  {/* 하단 - 제목과 설명 */}
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {project.subtitle}
                    </p>
                    
                    {/* 스킬 미리보기 */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.skills.slice(0, 2).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/60 border border-white/20">
                          +{project.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 호버 시 글로우 효과 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"
                />
              </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 상세 모달 */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                  relative max-w-2xl w-full bg-gradient-to-br ${selectedCard.color} 
                  rounded-3xl p-8 border-2 border-white/20 backdrop-blur-sm
                  shadow-2xl
                `}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 배경 패턴 */}
                {getBackgroundPattern(selectedCard.bgPattern)}
                
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>

                {/* 모달 내용 */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{selectedCard.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-3xl">{selectedCard.title}</h2>
                      <p className="text-white/80 text-lg">{selectedCard.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-white/90 text-lg mb-8 leading-relaxed">
                    {selectedCard.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-xl">핵심 역량</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCard.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                        >
                          <div className="w-2 h-2 rounded-full bg-white/60" />
                          <span className="text-white/90">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectCards;