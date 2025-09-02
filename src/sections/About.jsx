import { useRef, useEffect, useState } from "react";
import TechStackMarquee from "../components/TechStackMarquee";

const About = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);

  // 자동 섹션 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 파티클 애니메이션
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 파티클 클래스
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.connectionDistance = 150;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        // 화면 경계 처리
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // 스크롤에 따른 추가 움직임
        this.x += Math.sin(this.pulse) * 0.5;
        this.y += Math.cos(this.pulse) * 0.3;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.5 + Math.sin(this.pulse) * 0.3);
        
        // 글로우 효과
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 128, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // 핵심 파티클
        ctx.fillStyle = 'rgba(0, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // 파티클 생성
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그라데이션
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, 'rgba(20, 22, 34, 0.1)');
      bgGradient.addColorStop(1, 'rgba(10, 10, 10, 0.1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 파티클 업데이트 및 그리기
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // 파티클 연결선 그리기
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < particles[i].connectionDistance) {
            const opacity = (1 - distance / particles[i].connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#0a0a0a] via-[#141622] to-[#0a0a0a] overflow-hidden">
      {/* 파티클 캔버스 배경 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      
      {/* 헤더 영역 - 간소화 */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 lg:px-6">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 tracking-tight">
            ABOUT ME
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-cyan-400/10 hover:bg-cyan-400/20 backdrop-blur-sm rounded-full border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm font-bold transition-all duration-300 hover:scale-110 hover:border-cyan-400/50"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 - 한 페이지에 모든 내용 표시 */}
      <div className="pt-40 px-8 lg:px-12 relative z-20 overflow-hidden h-full flex flex-col justify-start items-center max-h-screen">
        
        {/* 1. 나에 대한 소개 및 가치관 */}
        <section className="mb-6">
          <div className="max-w-6xl mx-auto">

            {/* 별자리 스타일 소개 - 공간 절약 */}
            <div className="relative mb-6">
              {/* 배경 별들 */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/80 rounded-full animate-pulse"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`large-${i}`}
                    className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${25 + Math.random() * 50}%`,
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
          </div>

                            {/* 메인 소개 텍스트 - 간소화 */}
              <div className="relative z-10 text-center space-y-4">
                <div className="max-w-2xl mx-auto">
                  <p className="text-xl text-white font-medium leading-relaxed mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      UI/UX를 통해 사용자들에게
                    </span>
                    <br />
                    <span className="text-white">
                      간단하고 직관적인 경험을 제공하는 것이 저의 목표입니다
                    </span>
            </p>
          </div>

                {/* 별자리 연결선 효과 - 간소화 */}
                <div className="flex justify-center items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 text-sm font-medium">Simple UX</span>
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400/40 to-blue-400/40"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-sm font-medium">Performance</span>
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-400 text-sm font-medium">Innovation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 포트폴리오 링크 위젯들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-hidden mb-12 mt-4">
              {/* GitHub */}
              <a
                href="https://github.com/mslee98"
              target="_blank"
              rel="noopener noreferrer"
                className="group relative p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src="/assets/images/logos/github.svg" 
                      alt="GitHub"
                      className="w-8 h-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">GitHub</h3>
                  <p className="text-gray-300 text-sm">코드 저장소 & 프로젝트</p>
                  <div className="mt-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    → 방문하기
                  </div>
                </div>
              </a>

              {/* Notion Portfolio */}
              <a
              href="https://mslee98.notion.site/d120fd679bb54c7ba1816df3f89ae2dc?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
              target="_blank"
              rel="noopener noreferrer"
                className="group relative p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Portfolio</h3>
                  <p className="text-gray-300 text-sm">상세 포트폴리오</p>
                  <div className="mt-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    → 방문하기
                  </div>
                </div>
              </a>

              {/* Tech Blog */}
              <a
                href="https://mslee98.notion.site/c2dd3d50669648a3add995d342c170b8?pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-purple-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src="/assets/images/logos/notion.svg" 
                      alt="Notion"
                      className="w-8 h-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Tech Blog</h3>
                  <p className="text-gray-300 text-sm">기술 블로그 & 학습</p>
                  <div className="mt-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    → 방문하기
                  </div>
          </div>
              </a>

              {/* Resume */}
              <a
                href="https://www.rallit.com/hub/resumes/144107/%EC%9D%B4%EB%AF%BC%EC%84%B1"
              target="_blank"
              rel="noopener noreferrer"
                className="group relative p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-green-400/20 hover:border-green-400/50 transition-all duration-300 "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-green-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src="/assets/images/logos/rallit.svg" 
                      alt="Rallit"
                      className="w-8 h-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Resume</h3>
                  <p className="text-gray-300 text-sm">이력서 & 경력</p>
                  <div className="mt-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    → 방문하기
                  </div>
          </div>
              </a>
                      </div>

            {/* 중간 텍스트 - 느낌 있게 */}
            <div className="mt-12 mb-8 text-center">
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-medium">
                    "코드 한 줄 한 줄이 사용자의 경험을 만들어간다"
                  </span>
                </p>
                <p className="text-sm text-gray-400 italic">
                  지속적인 학습과 도전을 통해 더 나은 웹 경험을 만들어가고 있습니다
                </p>
              </div>
            </div>
            
          </div>
        </section>


      </div>

      {/* 기술 스택 마키 - 전체 화면 너비로 배경 앞에 배치 */}
      <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="w-full">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mb-3">
              TECH STACK
            </h3>
            <p className="text-sm text-gray-300">
              사용하는 기술 스택들
            </p>
          </div>
          <TechStackMarquee />
        </div>
          </div>

      {/* 창의적인 배경 요소들 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 움직이는 그라데이션 원들 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* 움직이는 선들 */}
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>


    </div>
  );
};

export default About;