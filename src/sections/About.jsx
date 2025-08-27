import { useRef, useEffect, useState } from "react";

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
    <div className="w-full h-full relative bg-gradient-to-br from-[#0a0a0a] via-[#141622] to-[#0a0a0a] overflow-y-auto">
      {/* 파티클 캔버스 배경 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      
      {/* 헤더 영역 */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 tracking-tight">
            ABOUT ME
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-cyan-400/10 hover:bg-cyan-400/20 backdrop-blur-sm rounded-full border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-lg font-bold transition-all duration-300 hover:scale-110 hover:border-cyan-400/50"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="pt-24 px-6 lg:px-8 relative z-20">
        
        {/* 1. 나에 대한 소개 및 가치관 */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto">
            {/* 메인 타이틀 */}
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400">
                  MINSUNG LEE
                </span>
                <span className="block text-white">FRONT-END &</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                  UI/UX ENGINEER
                </span>
              </h1>
            </div>

            {/* 별자리 스타일 소개 */}
            <div className="relative mb-16">
              {/* 배경 별들 */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
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
                {[...Array(8)].map((_, i) => (
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

              {/* 메인 소개 텍스트 */}
              <div className="relative z-10 text-center space-y-6">
                <div className="max-w-4xl mx-auto">
                  <p className="text-2xl text-white font-medium leading-relaxed mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      UI/UX를 통해 사용자들에게
                    </span>
                    <br />
                    <span className="text-white">
                      간단하고 직관적인 경험을 제공하는 것이 저의 목표입니다
                    </span>
                  </p>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    성능적인 관점에서 개선하기 위해 다양한 도구와 기술을 탐험하며,
                    <br />
                    <span className="text-cyan-400/80">사용자 경험의 핵심</span>을 찾아가는 여정을 계속하고 있습니다
                  </p>
                </div>

                {/* 별자리 연결선 효과 */}
                <div className="flex justify-center items-center gap-8 mt-12">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 text-sm font-medium">Simple UX</span>
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400/40 to-blue-400/40"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-sm font-medium">Performance</span>
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-400 text-sm font-medium">Innovation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 가치관 카드들 - 별자리 테마 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative text-center p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* 별자리 배경 효과 */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-6 left-1/3 w-0.5 h-0.5 bg-cyan-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-cyan-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                {/* 상단 장식선 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
                
                {/* 좌측 장식선 */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-40"></div>
                
                {/* 우측 장식선 */}
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-40"></div>
                
                <div className="relative z-10">
                  {/* 메인 아이콘 영역 */}
                  <div className="relative mb-8">
                    {/* 외부 링 */}
                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-cyan-400/30 flex items-center justify-center relative">
                      {/* 내부 링 */}
                      <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center relative">
                        {/* 중앙 아이콘 */}
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                          {/* 내부 그라데이션 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/80 to-blue-500/80 rounded-full"></div>
                          
                          {/* 텍스트 콘텐츠 */}
                          <div className="relative z-10 text-center">
                            <div className="text-cyan-400 text-xs font-bold tracking-wider mb-1 opacity-90">UX</div>
                            <div className="text-white text-lg font-black">01</div>
                          </div>
                          
                          {/* 글로우 효과 */}
                          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
                        </div>
                        
                        {/* 회전하는 점들 */}
                        <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* 외부 회전 점들 */}
                      <div className="absolute inset-0 animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 하단 장식선 */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">사용자 중심 사고</h3>
                  <p className="text-gray-300 leading-relaxed">
                    복잡함을 단순함으로, 어려움을 쉽게 만들어 사용자에게 직관적인 경험을 제공합니다.
                  </p>
                </div>
              </div>

              <div className="group relative text-center p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* 별자리 배경 효과 */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-6 left-1/3 w-0.5 h-0.5 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
                  <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
                </div>

                {/* 상단 장식선 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>
                
                {/* 좌측 장식선 */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40"></div>
                
                {/* 우측 장식선 */}
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40"></div>
                
                <div className="relative z-10">
                  {/* 메인 아이콘 영역 */}
                  <div className="relative mb-8">
                    {/* 외부 링 */}
                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-blue-400/30 flex items-center justify-center relative">
                      {/* 내부 링 */}
                      <div className="w-20 h-20 rounded-full border-2 border-blue-400/50 flex items-center justify-center relative">
                        {/* 중앙 아이콘 */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden">
                          {/* 내부 그라데이션 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-full"></div>
                          
                          {/* 텍스트 콘텐츠 */}
                          <div className="relative z-10 text-center">
                            <div className="text-blue-400 text-xs font-bold tracking-wider mb-1 opacity-90">PERF</div>
                            <div className="text-white text-lg font-black">02</div>
                          </div>
                          
                          {/* 글로우 효과 */}
                          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
                        </div>
                        
                        {/* 회전하는 점들 */}
                        <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* 외부 회전 점들 */}
                      <div className="absolute inset-0 animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 하단 장식선 */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">성능 최적화</h3>
                  <p className="text-gray-300 leading-relaxed">
                    다양한 도구와 기술을 활용하여 빠르고 부드러운 사용자 경험을 구현합니다.
                  </p>
                </div>
              </div>

              <div className="group relative text-center p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* 별자리 배경 효과 */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-6 left-1/3 w-0.5 h-0.5 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
                  <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>

                {/* 상단 장식선 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
                
                {/* 좌측 장식선 */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"></div>
                
                {/* 우측 장식선 */}
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"></div>
                
                <div className="relative z-10">
                  {/* 메인 아이콘 영역 */}
                  <div className="relative mb-8">
                    {/* 외부 링 */}
                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-purple-400/30 flex items-center justify-center relative">
                      {/* 내부 링 */}
                      <div className="w-20 h-20 rounded-full border-2 border-purple-400/50 flex items-center justify-center relative">
                        {/* 중앙 아이콘 */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative overflow-hidden">
                          {/* 내부 그라데이션 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-full"></div>
                          
                          {/* 텍스트 콘텐츠 */}
                          <div className="relative z-10 text-center">
                            <div className="text-purple-400 text-xs font-bold tracking-wider mb-1 opacity-90">DEV</div>
                            <div className="text-white text-lg font-black">03</div>
                          </div>
                          
                          {/* 글로우 효과 */}
                          <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
                        </div>
                        
                        {/* 회전하는 점들 */}
                        <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* 외부 회전 점들 */}
                      <div className="absolute inset-0 animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 하단 장식선 */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">끊임없는 탐험</h3>
                  <p className="text-gray-300 leading-relaxed">
                    새로운 기술과 방법론을 탐험하며 사용자 경험의 새로운 가능성을 찾아갑니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 기술 스택 섹션 */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mb-6">
                TECH STACK
              </h2>
              <p className="text-xl text-gray-300">
                다양한 기술들을 체계적으로 정리했습니다
              </p>
            </div>

            {/* 기술 스택 카테고리 네비게이션 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['프론트엔드', '백엔드', '데이터베이스', '데브옵스', '협업툴', '언어'].map((category, index) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-400/30' 
                      : 'bg-black/30 text-gray-300 border border-gray-600 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-black/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 기술 스택 설명 */}
            <div className="text-center mb-16">
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                각 카테고리별로 사용하는 기술들을 정리했습니다.
                <br />
                지속적으로 새로운 기술을 학습하고 적용하고 있습니다.
              </p>
            </div>

            {/* 기술 스택 미니멀 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* 프론트엔드 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-cyan-400">Frontend</h3>
                  </div>
                  <div className="space-y-2">
                    {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 백엔드 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-blue-400">Backend</h3>
                  </div>
                  <div className="space-y-2">
                    {['Spring Boot', 'Node.js', 'Express', 'REST API', 'GraphQL', 'JWT'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 데이터베이스 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-purple-400">Database</h3>
                  </div>
                  <div className="space-y-2">
                    {['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'Prisma'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 데브옵스 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-green-400/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-green-400">DevOps</h3>
                  </div>
                  <div className="space-y-2">
                    {['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'AWS', 'Terraform'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 협업툴 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-orange-400/20 hover:border-orange-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-orange-400">Collaboration</h3>
                  </div>
                  <div className="space-y-2">
                    {['Git', 'GitHub', 'Notion', 'Jira', 'Figma', 'Slack'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-orange-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 언어 */}
              <div className="group relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-pink-400/20 hover:border-pink-400/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-pink-400">Languages</h3>
                  </div>
                  <div className="space-y-2">
                    {['JavaScript', 'TypeScript', 'Java', 'Python', 'HTML/CSS', 'C++'].map((tech, index) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full"></div>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 링크 및 정보 섹션 */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6">
                PORTFOLIO & LINKS
              </h2>
              <p className="text-xl text-gray-300">
                더 자세한 정보와 프로젝트를 확인해보세요
              </p>
            </div>

            {/* 링크 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* GitHub */}
              <a
                href="https://github.com/mslee98"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">🐙</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">GitHub</h3>
                  <p className="text-gray-300 text-sm">코드 저장소 & 프로젝트</p>
                  <div className="mt-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    → 방문하기
                  </div>
                </div>
              </a>

              {/* Notion Portfolio */}
              <a
                href="https://mslee98pf.notion.site/?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📄</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Portfolio</h3>
                  <p className="text-gray-300 text-sm">상세 포트폴리오</p>
                  <div className="mt-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    → 방문하기
                  </div>
                </div>
              </a>

              {/* Resume */}
              <a
                href="https://mslee98pf.notion.site/?v=a65cd98d4a0e4c9c85214eb0acb17eb1&pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-purple-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Resume</h3>
                  <p className="text-gray-300 text-sm">이력서 & 경력</p>
                  <div className="mt-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    → 방문하기
                  </div>
                </div>
              </a>

              {/* Tech Blog */}
              <a
                href="#"
                className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-green-400/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl"></div>
                {/* 뭉퉁한 선 효과 */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-green-400/40 to-transparent rounded-full blur-sm"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Tech Blog</h3>
                  <p className="text-gray-300 text-sm">기술 블로그 & 학습</p>
                  <div className="mt-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    → 방문하기
                  </div>
                </div>
              </a>
            </div>

            {/* 추가 정보 */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-cyan-400/20">
                <span className="text-cyan-400">💼</span>
                <span className="text-gray-300">더 많은 정보가 필요하시다면 언제든 연락주세요</span>
                <span className="text-cyan-400">📧</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 스크롤 가이드 */}
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
        <div className="text-center">
          <div className="text-cyan-400/60 text-sm mb-2 animate-pulse">SCROLL TO EXPLORE</div>
          <div className="w-6 h-6 border-2 border-cyan-400/40 rounded-full mx-auto relative">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;