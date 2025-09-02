import React from 'react';

const TechStackMarquee = () => {
  const techStacks = [
    { name: "React", logo: "/assets/images/logos/react.svg", color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", logo: "/assets/images/logos/nextjs.svg", color: "from-gray-800 to-gray-900" },
    { name: "TypeScript", logo: "/assets/images/logos/typescript.svg", color: "from-blue-500 to-blue-600" },
    { name: "TailwindCSS", logo: "/assets/images/logos/tailwindcss.svg", color: "from-cyan-400 to-blue-500" },
    { name: "Three.js", logo: "/assets/images/logos/threejs.svg", color: "from-gray-800 to-gray-900" },
    { name: "GSAP", logo: "/assets/images/logos/gsap.svg", color: "from-green-400 to-green-600" },
    { name: "Framer Motion", logo: "/assets/images/logos/framer.svg", color: "from-purple-500 to-pink-500" },
    { name: "Node.js", logo: "/assets/images/logos/nodejs.svg", color: "from-green-500 to-green-600" },
    { name: "NestJS", logo: "/assets/images/logos/nestjs.svg", color: "from-red-500 to-red-600" },
    { name: "MongoDB", logo: "/assets/images/logos/mongodb.svg", color: "from-green-500 to-green-700" },
    { name: "Docker", logo: "/assets/images/logos/docker.svg", color: "from-blue-500 to-blue-600" },
    { name: "Git", logo: "/assets/images/logos/git.svg", color: "from-orange-500 to-red-500" },
    { name: "Figma", logo: "/assets/images/logos/figma.svg", color: "from-purple-500 to-pink-500" },
    { name: "PostgreSQL", logo: "/assets/images/logos/postgresql.svg", color: "from-blue-600 to-blue-800" },
    { name: "Redis", logo: "/assets/images/logos/redis.svg", color: "from-red-500 to-red-700" },
    { name: "Kubernetes", logo: "/assets/images/logos/kubernetes.svg", color: "from-blue-500 to-blue-600" },
    { name: "AWS", logo: "/assets/images/logos/aws.svg", color: "from-orange-500 to-yellow-500" },
    { name: "GitHub", logo: "/assets/images/logos/github.svg", color: "from-gray-700 to-gray-900" },
    { name: "Notion", logo: "/assets/images/logos/notion.svg", color: "from-gray-500 to-gray-700" },
    { name: "Jira", logo: "/assets/images/logos/jira.svg", color: "from-blue-500 to-blue-700" },
    { name: "Slack", logo: "/assets/images/logos/slack.svg", color: "from-purple-500 to-purple-700" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black/20 backdrop-blur-sm rounded-2xl p-3 border border-cyan-400/20">
      {/* 2행 Marquee Container */}
      <div className="space-y-3">
        {/* 위쪽 행 - 좌측으로 이동 */}
        <div className="flex animate-marquee-left whitespace-nowrap">
          {/* First set of items */}
          {techStacks.map((tech, index) => (
            <div key={`top-first-${index}`} className="flex-shrink-0 mx-2">
              <div className="w-24 h-24 bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 flex flex-col items-center justify-center hover:border-cyan-400/50 hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-2`}>
                  {tech.logo.startsWith('/') ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-7 h-7 object-contain filter brightness-0 invert"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">{tech.logo}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white text-center">{tech.name}</span>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {techStacks.map((tech, index) => (
            <div key={`top-second-${index}`} className="flex-shrink-0 mx-2">
              <div className="w-24 h-24 bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 flex flex-col items-center justify-center hover:border-cyan-400/50 hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-2`}>
                  {tech.logo.startsWith('/') ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-7 h-7 object-contain filter brightness-0 invert"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">{tech.logo}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white text-center">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 아래쪽 행 - 우측으로 이동 */}
        <div className="flex animate-marquee-right whitespace-nowrap">
          {/* First set of items */}
          {techStacks.map((tech, index) => (
            <div key={`bottom-first-${index}`} className="flex-shrink-0 mx-2">
              <div className="w-24 h-24 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/20 flex flex-col items-center justify-center hover:border-blue-400/50 hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-2`}>
                  {tech.logo.startsWith('/') ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-7 h-7 object-contain filter brightness-0 invert"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">{tech.logo}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white text-center">{tech.name}</span>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {techStacks.map((tech, index) => (
            <div key={`bottom-second-${index}`} className="flex-shrink-0 mx-2">
              <div className="w-24 h-24 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/20 flex flex-col items-center justify-center hover:border-blue-400/50 hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-2`}>
                  {tech.logo.startsWith('/') ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-7 h-7 object-contain filter brightness-0 invert"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">{tech.logo}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white text-center">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TechStackMarquee; 