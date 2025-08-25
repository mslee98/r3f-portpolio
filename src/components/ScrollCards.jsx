import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollCards = ({ isVisible = true, onClose }) => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [dreamyOffset, setDreamyOffset] = useState(0);
  const [isAutoDreaming, setIsAutoDreaming] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const dreamAnimationRef = useRef(null);

  // 상세한 프로젝트 데이터 구조 - 실제 프로젝트 기반으로 재구성
  const projects = [
    {
      id: 1,
      title: "IoT 자율안전솔루션",
      shortDescription: "중대재해예방 관제 시스템",
      longDescription: "중대 재해법을 예방하기 위한 관제 시스템으로, 시스템 내에서 각종 서약서, 활선작업 모니터링이 가능하며 바이오 데이터를 통해 관리자에게 알림을 제공하는 대규모 프로젝트입니다. 국토지리정보원으로부터 GIS 데이터를 제공받아 GeoServer를 통해 내부망에서도 사용 가능한 로컬 GIS 서버를 구축했습니다.",
      image: "/assets/images/projects/Frame 3.png",
      detailImage: "/assets/images/projects/Frame 3.png",
      category: "IoT Platform",
      status: "모니터링",
      year: "2023",
      tech: ["WebGL", "Three.js", "Spring Boot", "Java", "PostgreSQL", "GeoServer", "Docker", "Jenkins"],
      features: ["실시간 모니터링", "바이오 데이터 분석", "알림 시스템", "GIS 서버 구축", "좌표계 변환"],
      challenges: "대용량 GIS 데이터 처리 및 실시간 모니터링 시스템 구축",
      solutions: "PostgreSQL을 통한 GIS 데이터 가공 및 Proj 라이브러리를 활용한 좌표계 변환, Docker Compose로 지도 서버 및 알림 서버 구축",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "IoT 모니터링 관제 시스템",
      shortDescription: "계룡시 IoT 무선통신 모니터링",
      longDescription: "계룡시에서 관리하는 CCTV, Gateway, Relay를 실시간으로 감지하기 위한 모니터링 시스템으로, 데이터 차트와 지도로 시각화하여 표현합니다. 각종 장비 등록, 수정, 삭제 관리 및 알림 가중치/임계치 설정을 통해 알림에 따른 문자 전송 내역을 관리합니다.",
      image: "/assets/images/projects/Frame 4.png",
      detailImage: "/assets/images/projects/Frame 4.png",
      category: "IoT Platform",
      status: "모니터링",
      year: "2023",
      tech: ["Leaflet.js", "Spring", "Java", "JSP", "Docker", "GitHub Actions"],
      features: ["실시간 모니터링", "장비 CRUD 관리", "알림 시스템", "문자 전송", "재전송 시스템"],
      challenges: "다양한 IoT 장비의 통합 모니터링 및 알림 시스템 구축",
      solutions: "Leaflet.js 기반 지도 시각화 및 Spring 기반 백엔드 시스템, Docker를 통한 안정적인 운영 환경 구축",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "태양광 시뮬레이션",
      shortDescription: "BIPV 건물형 태양광 시뮬레이션",
      longDescription: "디지털 트윈 사업으로 BIPV(건물형 태양광) 비용을 예측하고 시뮬레이션을 통해 설치할 수 있는 솔루션입니다. WebGL/Three.js를 활용한 디지털 트윈을 구현하여 태양 위치에 따른 건물에 음영이 태양광 패널에 미치는 영향을 정량적 수치로 정의했습니다.",
      image: "/assets/images/projects/Frame 5.png",
      detailImage: "/assets/images/projects/Frame 5.png",
      category: "Digital Twin",
      status: "PoC",
      year: "2023",
      tech: ["WebGL", "Three.js", "LSTM", "DEM", "법선 벡터", "Docker", "GitHub Actions"],
      features: ["3D 시뮬레이션", "태양 위치 분석", "음영 영향 계산", "날씨 예측", "열 반사율 계산"],
      challenges: "태양 위치에 따른 음영 영향 정량화 및 성능 최적화",
      solutions: "법선 벡터를 활용한 열 반사율 계산, LSTM 기반 날씨 분석, 파티클을 통한 성능 최적화 및 Displacement Map을 활용한 Terrain 표현",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "3D GIS",
      shortDescription: "웹 3차원 공간 GIS 시스템",
      longDescription: "GIS 데이터를 가공해서 웹 3차원 공간에 나타내는 것이 목적인 3D 지도 시스템입니다. OSM 타일 데이터를 정제하고 가공하여 512 수준의 타일 데이터를 만들고, 서버를 생성하여 3D 지도를 구축했습니다.",
      image: "/assets/images/projects/Frame 6.png",
      detailImage: "/assets/images/projects/Frame 6.png",
      category: "GIS Platform",
      status: "R&D",
      year: "2023",
      tech: ["Three.js", "OSM", "GeoJSON", "DEM", "osmtools", "Docker", "Jenkins"],
      features: ["3D 타일맵", "좌표계 변환", "GIS 데이터 가공", "지형 표현", "타일 데이터 요청"],
      challenges: "OSM 데이터 최신화 및 대용량 GIS 데이터 처리, 좌표계 정확한 매칭",
      solutions: "osmconvert로 BBOX 추출, Osmosis로 필터링, Mapsplit을 통한 타일 형식 분할, PBF를 GeoJSON으로 가공하여 3D 타일맵 구축",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "스포츠 커뮤니티",
      shortDescription: "Next.js 13 기반 커뮤니티 플랫폼",
      longDescription: "위젯형 디자인을 위한 피그마 기반 웹 디자인을 먼저 진행했으며, TypeORM을 통해 엔티티 객체를 생성하고 관리하는 커뮤니티 서비스입니다. 모던한 웹 기술을 활용하여 사용자 친화적인 인터페이스를 제공합니다.",
      image: "/assets/images/projects/Frame 1.png",
      detailImage: "/assets/images/projects/Frame 1.png",
      category: "Web Platform",
      status: "MVP",
      year: "2024",
      tech: ["Next.js 13", "TypeScript", "TypeORM", "Figma", "Docker", "GitHub Actions"],
      features: ["위젯형 디자인", "엔티티 관리", "커뮤니티 기능", "모던 웹 기술"],
      challenges: "위젯형 디자인을 위한 UI/UX 설계 및 TypeORM을 활용한 데이터 관리",
      solutions: "피그마를 활용한 상세한 디자인 시스템 구축 및 TypeORM을 통한 효율적인 엔티티 관리",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "모바일 커뮤니티",
      shortDescription: "Expo 기반 모바일 앱",
      longDescription: "Expo 52 버전 이하에서 React 18로 작성된 모바일 커뮤니티 앱으로, 피그마를 통해 디자인을 완성했습니다. 크로스 플랫폼 지원으로 iOS와 Android 모두에서 사용할 수 있습니다.",
      image: "/assets/images/projects/Frame 2.png",
      detailImage: "/assets/images/projects/Frame 2.png",
      category: "Mobile App",
      status: "R&D",
      year: "2024",
      tech: ["Expo", "React 18", "Figma", "크로스 플랫폼", "Docker", "GitHub Actions"],
      features: ["모바일 최적화", "커뮤니티 기능", "크로스 플랫폼", "피그마 디자인"],
      challenges: "Expo 버전 호환성 및 모바일 최적화, 크로스 플랫폼 호환성",
      solutions: "React 18 기반으로 안정적인 구조 설계 및 피그마를 통한 일관된 디자인 시스템 구축",
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  // 몽환적인 자동 애니메이션
  useEffect(() => {
    if (!isVisible || !isAutoDreaming) return;

    let startTime = Date.now();
    
    const dreamyAnimation = () => {
      const elapsed = (Date.now() - startTime) / 1000; // 초 단위
      
      // 현재 scrollY 값 확인 후 90% 이상일 때는 자동 애니메이션 중지
      setScrollY(currentScrollY => {
        if (currentScrollY >= 0.9) {
          // 90% 이상일 때는 현재 값 유지 (자동 애니메이션 없음)
          return currentScrollY;
        }
        
        // 복합적인 사인파로 자연스러운 움직임 생성 (90% 미만에서만)
        // 스크롤 중일 때는 더 부드럽고 느리게
        const primaryWave = Math.sin(elapsed * 0.2) * 0.6; // 주 파동 (더 느림)
        const secondaryWave = Math.sin(elapsed * 0.5) * 0.2; // 보조 파동 (더 느림)
        const tertiaryWave = Math.sin(elapsed * 0.8) * 0.05; // 미세 파동 (더 느림)
        
        // 0~0.9 범위로 정규화 (90% 이상으로는 자동으로 가지 않음)
        const combinedWave = (primaryWave + secondaryWave + tertiaryWave) / 2;
        const normalizedValue = ((combinedWave + 1) / 2) * 0.9; // -1~1을 0~0.9로 변환
        
        // 0-0.9 범위로 강제 제한
        return Math.max(0, Math.min(0.9, normalizedValue));
      });
      
      // 추가적인 몽환적 오프셋 (카드들의 미세한 떨림) - 스크롤 중일 때는 더 작게
      const dreamyX = Math.sin(elapsed * 1.5) * 3; // 더 작은 움직임
      const dreamyY = Math.cos(elapsed * 1.2) * 5; // 더 작은 움직임
      setDreamyOffset({ x: dreamyX, y: dreamyY });
      
      dreamAnimationRef.current = requestAnimationFrame(dreamyAnimation);
    };
    
    dreamAnimationRef.current = requestAnimationFrame(dreamyAnimation);
    
    return () => {
      if (dreamAnimationRef.current) {
        cancelAnimationFrame(dreamAnimationRef.current);
      }
    };
  }, [isVisible, isAutoDreaming]);

  // 휠 이벤트 핸들러 (수동 제어 시 자동 애니메이션 완전 차단)
  useEffect(() => {
    if (!isVisible) return;

    let scrollTimeout = null;
    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault(); // 기본 스크롤 방지
      
      // 스크롤 중임을 표시하고 자동 애니메이션 완전 차단
      isScrolling = true;
      setIsAutoDreaming(false);
      
      // 이전 타이머 클리어
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      const delta = e.deltaY > 0 ? 0.05 : -0.05; // 스크롤 방향에 따른 증감
      
      setScrollY(prev => {
        const newValue = Math.max(0, Math.min(1, prev + delta));
        return newValue;
      });
      
      // 스크롤 후 5초 동안 자동 애니메이션 비활성화 (더 긴 시간)
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        setIsAutoDreaming(true);
      }, 5000);
    };

    // 키보드 이벤트 핸들러 (화살표 키로도 제어 가능)
    const handleKeyDown = (e) => {
      let delta = 0;
      switch(e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          delta = 0.1;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          delta = -0.1;
          break;
        case 'Home':
          setScrollY(0);
          setIsAutoDreaming(false);
          // Home/End 후 5초 동안 자동 애니메이션 비활성화
          setTimeout(() => setIsAutoDreaming(true), 5000);
          return;
        case 'End':
          setScrollY(1);
          setIsAutoDreaming(false);
          // Home/End 후 5초 동안 자동 애니메이션 비활성화
          setTimeout(() => setIsAutoDreaming(true), 5000);
          return;
        case ' ': // 스페이스바로 자동/수동 토글
          setIsAutoDreaming(prev => !prev);
          return;
        default:
          return;
      }
      
      e.preventDefault();
      setIsAutoDreaming(false);
      setScrollY(prev => Math.max(0, Math.min(1, prev + delta)));
      // 키보드 입력 후 5초 동안 자동 애니메이션 비활성화
      setTimeout(() => setIsAutoDreaming(true), 5000);
    };

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      // 타이머 정리
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isVisible]);

  // 순차적 애니메이션 단계별 계산
  const getCardTransform = (index, progress) => {
    const totalCards = projects.length;
    const centerIndex = (totalCards - 1) / 2;
    
    // 5단계 애니메이션 구간 정의
    const stage2 = 0.2;  // 스택 형성 (20-40%)
    const stage3 = 0.4;  // 부채꼴 펼침 (40-60%)
    const stage4 = 0.6;  // 카드 뒤집기 (60-80%)
    const stage5 = 0.8;  // 최종 배치 (80-100%)
    
    let currentX = 0, currentY = 0, currentRotateZ = 0, rotateY = 0, scale = 1, opacity = 1;
    
    if (progress <= stage2) {
      // Stage 1-2: 단일 카드에서 스택으로 (모두 뒷면으로 시작)
      const stageProgress = progress / stage2;
      
      if (index === 0) {
        // 첫 번째 카드는 항상 보임 (뒷면)
        currentX = 0;
        currentY = 0;
        currentRotateZ = 0;
        scale = 1;
        opacity = 1;
      } else {
        // 나머지 카드들이 순차적으로 나타나며 스택 형성 (뒷면)
        const cardDelay = (index / totalCards) * 0.5;
        const cardProgress = Math.max(0, Math.min(1, (stageProgress - cardDelay) / (1 - cardDelay)));
        
        currentX = 0;
        currentY = index * -3 * cardProgress; // 스택처럼 쌓임
        currentRotateZ = index * 2 * cardProgress; // 약간의 회전
        scale = 0.3 + (0.7 * cardProgress);
        opacity = cardProgress;
      }
      rotateY = 180; // 모든 카드가 뒷면으로 시작
      
    } else if (progress <= stage3) {
      // Stage 2-3: 스택에서 부채꼴로 펼침 (여전히 뒷면)
      const stageProgress = (progress - stage2) / (stage3 - stage2);
      
      const stackX = 0;
      const stackY = index * -3;
      const stackRotateZ = index * 2;
      
      const fanX = (index - centerIndex) * 80 * stageProgress; // 부채꼴 X 위치 (6장이 화면 안에 들어오도록 조정)
      const fanY = stackY + Math.abs(index - centerIndex) * 20 * stageProgress; // 부채꼴 Y 위치 (6장에 맞게 적당한 깊이)
      const fanRotateZ = stackRotateZ + (index - centerIndex) * 8 * stageProgress; // 부채꼴 회전 (6장에 맞게 조정)
      
      currentX = stackX + (fanX - stackX) * stageProgress;
      currentY = stackY + (fanY - stackY) * stageProgress;
      currentRotateZ = stackRotateZ + (fanRotateZ - stackRotateZ) * stageProgress;
      scale = 1;
      opacity = 1;
      rotateY = 180; // 부채꼴 펼침 시에도 여전히 뒷면
      
    } else if (progress <= stage4) {
      // Stage 3-4: 부채꼴에서 카드 뒤집기 (뒷면 → 앞면)
      const stageProgress = (progress - stage3) / (stage4 - stage3);
      
      currentX = (index - centerIndex) * 80; // 6장이 화면 안에 들어오도록 조정
      currentY = index * -3 + Math.abs(index - centerIndex) * 20; // 6장에 맞게 적당한 깊이
      currentRotateZ = index * 2 + (index - centerIndex) * 8; // 6장에 맞게 조정
      
      // 순차적 뒤집기 (각 카드마다 다른 타이밍) - 뒷면(180도)에서 앞면(0도)으로
      const flipDelay = index * 0.2;
      const flipProgress = Math.max(0, Math.min(1, (stageProgress - flipDelay) / (1 - flipDelay)));
      rotateY = 180 - (flipProgress * 180); // 180도에서 0도로 (뒷면에서 앞면으로)
      
      scale = 1 + Math.sin(flipProgress * Math.PI) * 0.2; // 뒤집을 때 약간 커짐
      opacity = 1;
      
    } else {
      // Stage 4-5: 뒤집기에서 최종 일렬 배치 (앞면 완전 노출)
      const stageProgress = (progress - stage4) / (stage5 - stage4);
      
      const fanX = (index - centerIndex) * 100;
      const fanY = index * -3 + Math.abs(index - centerIndex) * 20;
      const fanRotateZ = index * 2 + (index - centerIndex) * 15;
      
      // 60% 이상에서는 카드 아래에 간격을 두어 버튼이 보이도록 조정
      if (progress >= 0.6) {
        const buttonStageProgress = (progress - 0.6) / 0.4; // 60%에서 100%까지의 진행도
        
        // 기존 애니메이션 유지하면서 Y 위치만 조정
        const finalX = (index - centerIndex) * 180; // 최종 X 위치 (6장이 화면 안에 들어오도록 조정 - 200에서 180으로 줄임)
        const finalY = Math.sin((index - centerIndex) * 0.3) * 30; // 최종 Y 위치 (곡선, 적당한 깊이)
        const finalRotateZ = (index - centerIndex) * 3; // 최종 회전 (6장에 맞게 조정)
        
        // 60% 이상에서만 Y 위치를 아래로 조정하여 버튼 공간 확보
        const buttonSpaceY = 80; // 버튼을 위한 여백
        const adjustedFinalY = finalY + buttonSpaceY * buttonStageProgress;
        
        currentX = fanX + (finalX - fanX) * stageProgress;
        currentY = fanY + (adjustedFinalY - fanY) * stageProgress;
        currentRotateZ = fanRotateZ + (finalRotateZ - fanRotateZ) * stageProgress;
      } else {
        // 60% 미만에서는 기존 로직 유지
        const finalX = (index - centerIndex) * 180; // 최종 X 위치 (6장이 화면 안에 들어오도록 조정 - 200에서 180으로 줄임)
        const finalY = Math.sin((index - centerIndex) * 0.3) * 30; // 최종 Y 위치 (곡선, 적당한 깊이)
        const finalRotateZ = (index - centerIndex) * 3; // 최종 회전 (6장에 맞게 조정)
        
        currentX = fanX + (finalX - fanX) * stageProgress;
        currentY = fanY + (finalY - fanY) * stageProgress;
        currentRotateZ = fanRotateZ + (finalRotateZ - fanRotateZ) * stageProgress;
      }
      
      rotateY = 0; // 앞면 완전 노출
      scale = 1; // 최종 상태에서는 원래 크기 유지 (확대 없음)
      opacity = 1;
    }
    
    // 몽환적 오프셋 적용
    const dreamyX = dreamyOffset.x || 0;
    const dreamyY = dreamyOffset.y || 0;
    
    // 각 카드마다 다른 몽환적 움직임 (인덱스 기반) - 90% 이상에서는 움직임 감소
    const dreamyIntensity = progress >= 0.9 ? 0.3 : 1; // 90% 이상에서는 움직임 70% 감소
    const cardDreamyX = dreamyX + Math.sin((Date.now() / 1000 + index) * 1.5) * 3 * dreamyIntensity;
    const cardDreamyY = dreamyY + Math.cos((Date.now() / 1000 + index) * 1.2) * 4 * dreamyIntensity;
    
    return {
      transform: `translate3d(${currentX + cardDreamyX}px, ${currentY + cardDreamyY}px, 0px) rotateZ(${currentRotateZ}deg) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: 40 + (totalCards - index) + Math.floor(progress * 20), // 더 명확한 동적 z-index
      filter: progress >= 0.9 ? 'none' : `blur(${Math.abs(Math.sin((Date.now() / 1000 + index) * 0.8)) * 0.3}px)`, // 90% 이상에서는 블러 제거
      rotateYValue: rotateY // 디버깅용 추가
    };
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 z-40 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${50 + (dreamyOffset.x || 0) * 2}% ${50 + (dreamyOffset.y || 0) * 2}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 51, 234, 0.1) 30%, 
            rgba(15, 23, 42, 0.95) 70%,
            rgba(0, 0, 0, 0.98) 100%),
          linear-gradient(135deg, 
            rgba(0, 0, 0, 0.95) 0%, 
            rgba(15, 23, 42, 0.9) 50%, 
            rgba(0, 0, 0, 0.95) 100%)
        `
      }}
    >
      {/* 닫기 버튼 */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300 hover:scale-110"
        >
          ✕
        </button>
      )}

      {/* 고정된 화면 - 스크롤 없음 */}
      <div className="w-full h-full relative">
        {/* 메인 헤더 - Lusion 스타일 큰 대제목 */}
        <div className="absolute top-0 left-0 right-0 text-center py-32 z-20">
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
            {scrollY <= 0.2 ? (
              <span className="flex items-center justify-center space-x-4">
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.05 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.05 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>E</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.08 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.08 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>X</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.11 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.11 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>P</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.14 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.14 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>L</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.17 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.17 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>O</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.20 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.20 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>R</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.23 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.23 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '3rem',
                  fontWeight: '600'
                }}>E</span>
              </span>
            ) : scrollY <= 0.4 ? (
              <span className="flex items-center justify-center space-x-4">
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.22 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.22 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>I</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.25 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.25 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>N</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.28 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.28 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>T</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.31 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.31 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>E</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.34 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.34 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>R</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.37 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.37 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>A</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.40 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.40 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>C</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.43 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.43 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>T</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.46 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.46 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>I</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.49 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.49 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>V</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.52 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.52 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>E</span>
              </span>
            ) : scrollY <= 0.6 ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.41 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.41 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>↓</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.43 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.43 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>S</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.45 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.45 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>c</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.47 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.47 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>r</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.49 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.49 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>o</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.51 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.51 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>l</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.53 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.53 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>l</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.53 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.53 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>D</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.55 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.55 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>o</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.57 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.57 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>w</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.59 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.59 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>n</span>
              </span>
            ) : scrollY <= 0.8 ? (
              <span className="flex items-center justify-center space-x-4">
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.62 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.62 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>F</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.65 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.65 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>r</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.68 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.68 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>o</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.71 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.71 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>n</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.74 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.74 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>t</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.77 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.77 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>e</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.80 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.80 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>n</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.83 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.83 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>d</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-4">
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.82 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.82 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>P</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.85 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.85 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>r</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.88 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.88 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>o</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.91 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.91 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>j</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.94 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.94 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>e</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 0.97 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 0.97 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>c</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 1.00 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 1.00 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>t</span>
                <span className="char" style={{ 
                  display: 'inline-block', 
                  opacity: scrollY >= 1.03 ? 1 : 0,
                  transform: `translate3d(${scrollY >= 1.03 ? 0 : -200}px, 0px, 0px)`,
                  transition: 'all 0.5s ease-out',
                  fontSize: '2.5rem',
                  fontWeight: '600'
                }}>s</span>
              </span>
            )}
          </h1>
          
          {/* 서브 타이틀 */}
          <div className="text-2xl md:text-3xl text-white/70 font-light tracking-wide">
            {scrollY <= 0.2 ? 'DISCOVER POTENTIAL' :
             scrollY <= 0.4 ? 'BUILD FOUNDATION' :
             scrollY <= 0.6 ? 'CREATE EXPERIENCE' :
             scrollY <= 0.8 ? 'DRIVE ENGAGEMENT' :
             'SHOWCASE EXCELLENCE'}
          </div>
        </div>

        {/* 미니멀한 광원 효과 - 세련되고 우아하게 */}
        <div className="absolute inset-0 z-1 overflow-hidden">
          {/* 중앙 광원 - 부드럽고 자연스럽게 */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
            style={{
              background: `
                radial-gradient(circle, 
                  rgba(255, 255, 255, 0.04) 0%, 
                  rgba(255, 255, 255, 0.02) 40%, 
                  rgba(255, 255, 255, 0.01) 70%, 
                  transparent 100%
                )
              `,
              filter: 'blur(60px)',
              transition: 'all 0.8s ease-out'
            }}
          />
          
          {/* 미묘한 반사광 - 회전 없이 부드럽게 */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
            style={{
              background: `
                radial-gradient(ellipse, 
                  rgba(255, 255, 255, 0.02) 0%, 
                  rgba(255, 255, 255, 0.015) 50%, 
                  transparent 100%
                )
              `,
              filter: 'blur(50px)',
              transition: 'all 1.2s ease-out'
            }}
          />
          
          {/* 은은한 스프레드 효과 - 미니멀하게 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${15 + (i * 8)}%`,
                opacity: 0.2 + (i * 0.05),
                transition: 'all 2s ease-out',
                transform: `translateY(${Math.sin((Date.now() / 3000 + i) * 0.3) * 10}px)`
              }}
            />
          ))}
        </div>

        {/* 카드 컨테이너 (화면 중앙 고정) */}
        <div 
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center perspective-1000 z-30"
        >
          {projects.map((project, index) => {
            const cardStyle = getCardTransform(index, scrollY);
            
            return (
              <div
                key={project.id}
                className="absolute w-64 h-80 cursor-pointer scroll-card card-stack-shadow"
                style={{
                  ...cardStyle,
                  pointerEvents: 'auto'
                }}
              >
                {/* 카드 하단 중앙에 고정된 자세히 보기 텍스트 - 60% 이상에서만 표시 */}
                {scrollY >= 0.6 && (
                  <motion.div 
                    className="absolute -bottom-20 inset-x-0 z-50 flex justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: index * 0.1 // 카드별로 순차적으로 나타남
                    }}
                  >
                    <div 
                      className="cursor-pointer group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300">
                        {/* 화살표 - 호버 시에만 나타남 */}
                        <motion.span 
                          className="text-white/60 font-medium"
                          initial={{ opacity: 0, x: -8, scale: 0.8 }}
                          whileHover={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          →
                        </motion.span>
                        {/* 텍스트 */}
                        <span className="font-medium text-sm whitespace-nowrap">자세히 보기</span>
                      </span>
                    </div>
                  </motion.div>
                )}
                {/* 조건부 렌더링으로 앞면/뒷면 전환 */}
                {cardStyle.rotateYValue > 90 ? (
                  
                                    /* 카드 뒷면 (card-back.png 이미지) */
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10">
                    <img 
                      src="/assets/images/card-back.png"
                      alt="Card Back"
                      className="w-full h-full object-cover pointer-events-none"
                      onError={(e) => {
                        console.error('Card back image failed to load:', e.target.src);
                        console.error('Error details:', e);
                        console.error('Trying alternative paths...');
                        
                        // 다른 경로들 시도
                        const altPaths = [
                          './assets/images/card-back.png',
                          '/public/assets/images/card-back.png',
                          `${process.env.PUBLIC_URL}/assets/images/card-back.png`
                        ];
                        
                        console.error('Alternative paths to try:', altPaths);
                        
                        // 이미지 로드 실패시 대체 배경 표시
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                      onLoad={(e) => {
                        console.log('Card back image loaded successfully!');
                        // 이미지 로드 성공시 대체 배경 숨김
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.style.display = 'none';
                      }}
                    />
                    
                    {/* 이미지 로드 실패 시 대체 배경 */}
                    <div className="card-back-fallback absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center pointer-events-none" style={{display: 'none'}}>
                      <div className="text-center pointer-events-none">
                        <div className="w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <span className="text-white font-bold text-3xl">?</span>
                        </div>
                        <p className="text-white/70 text-sm">Mystery Card #{index + 1}</p>
                        <p className="text-white/50 text-xs mt-2">Image Load Failed</p>
                      </div>
                    </div>
                    
                    {/* 카드 구분을 위한 미세한 표시 */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center pointer-events-none">
                      <span className="text-white/70 text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                ) : (
                  
                  /* 카드 앞면 */
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20">
                    {/* 프로젝트 이미지 배경 */}
                    <div className="absolute inset-0 pointer-events-none">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover pointer-events-none"
                        onError={(e) => {
                          console.error('Project image failed to load:', e.target.src);
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* 이미지 위에 그라데이션 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />
                    </div>
                    
                    {/* 프로젝트 정보 (이미지 위에 표시) */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white pointer-events-none">
                      {/* 카테고리 & 상태 */}
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Live' 
                            ? 'bg-green-500/30 text-green-300' 
                            : project.status === 'Development'
                            ? 'bg-yellow-500/30 text-yellow-300'
                            : 'bg-blue-500/30 text-blue-300' // Research 상태
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* 프로젝트 제목 */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>
                      
                      {/* 기술 스택 */}
                      <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/20 rounded-full text-white/90 text-xs font-medium backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                          ))}
                      </div>
                      
                      {/* 연도 */}
                      <div className="text-center">
                        <span className="text-white/60 text-xs font-medium">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                )}
              </div>
            );
          })}
        </div>

        {/* 상세 프로젝트 팝업 - 클릭 시 나타남 */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-black/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden pointer-events-auto">
              {/* 팝업 헤더 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={selectedProject.detailImage} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = selectedProject.image; // fallback
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* 헤더 정보 */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm text-white">
                      {selectedProject.category}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedProject.status === '모니터링' 
                        ? 'bg-green-500/30 text-green-300' 
                        : selectedProject.status === 'PoC'
                        ? 'bg-blue-500/30 text-blue-300'
                        : selectedProject.status === 'R&D'
                        ? 'bg-purple-500/30 text-purple-300'
                        : selectedProject.status === 'MVP'
                        ? 'bg-orange-500/30 text-orange-300'
                        : 'bg-gray-500/30 text-gray-300'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-white/80 text-lg">{selectedProject.shortDescription}</p>
                </div>
              </div>

              {/* 팝업 컨텐츠 */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 왼쪽 컬럼 */}
                  <div className="space-y-6">
                    {/* 상세 설명 */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">프로젝트 개요</h3>
                      <p className="text-white/80 leading-relaxed">{selectedProject.longDescription}</p>
                    </div>

                    {/* 주요 기능 */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">주요 기능</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 기술 스택 */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">기술 스택</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽 컬럼 */}
                  <div className="space-y-6">
                    {/* 도전 과제 & 해결책 */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">도전 과제</h3>
                      <p className="text-white/80 leading-relaxed mb-4">{selectedProject.challenges}</p>
                      <h4 className="text-lg font-medium text-white mb-2">해결 방법</h4>
                      <p className="text-white/80 leading-relaxed">{selectedProject.solutions}</p>
                    </div>

                    {/* 프로젝트 정보 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">연도</h4>
                        <p className="text-white/60">{selectedProject.year}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">상태</h4>
                        <p className="text-white/60">{selectedProject.status}</p>
                      </div>
                    </div>

                    {/* 링크 */}
                    <div className="flex space-x-4">
                                              <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          🚀 Live Demo
                        </a>
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-black/50 hover:bg-black/70 border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          📁 GitHub
                        </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300 hover:scale-110"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* 미묘한 모서리 광원 - 은은하고 세련되게 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {/* 좌상단 광원 - 미묘하게 */}
          <div 
            className="absolute left-0 top-0 w-80 h-80"
            style={{
              background: `
                radial-gradient(circle at 0% 0%, 
                  rgba(255, 255, 255, 0.015) 0%, 
                  transparent 80%
                )
              `,
              filter: 'blur(40px)',
              transition: 'all 3s ease-out'
            }}
          />
          
          {/* 우하단 광원 - 부드럽게 */}
          <div 
            className="absolute right-0 bottom-0 w-96 h-96"
            style={{
              background: `
                radial-gradient(circle at 100% 100%, 
                  rgba(255, 255, 255, 0.01) 0%, 
                  transparent 70%
                )
              `,
              filter: 'blur(50px)',
              transition: 'all 4s ease-out'
            }}
          />
          
          {/* 중앙 상단 광원 - 은은하게 */}
          <div 
            className="absolute left-1/2 top-0 transform -translate-x-1/2 w-64 h-64"
            style={{
              background: `
                radial-gradient(circle at 50% 0%, 
                  rgba(255, 255, 255, 0.012) 0%, 
                  transparent 85%
                )
              `,
              filter: 'blur(35px)',
              transition: 'all 2.5s ease-out'
            }}
          />
        </div>

        {/* 미니멀 스크롤 인디케이터 - 프로젝트 스타일에 맞춤 */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center space-y-3">
            {/* 메인 진행률 바 - 어두운 배경에 흰색 엣지 */}
            <div className="relative">
              {/* 배경 링 */}
              <div className="w-48 h-1 bg-black/80 rounded-full border border-white/30 overflow-hidden">
                {/* 진행률 채우기 - 스프레드 효과 */}
                <div 
                  className="h-full bg-white transition-all duration-300 ease-out relative"
                  style={{ 
                    width: `${scrollY * 100}%`,
                    boxShadow: scrollY <= 0.6 ? '0 0 25px rgba(255, 255, 255, 0.5)' : '0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {/* 스프레드 효과 - 진행률 끝에 빛나는 점 */}
                  <div 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                    style={{
                      boxShadow: scrollY <= 0.6 ? 
                        '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.6)' : 
                        '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)',
                      animation: scrollY <= 0.6 ? 'pulse 1s ease-in-out infinite' : 'pulse 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
              
              {/* 단계 표시 - 미니멀한 도트들 */}
              <div className="flex justify-between w-48 mt-2 px-1">
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((stage, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      scrollY >= stage 
                        ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                        : scrollY <= 0.6 && stage === 0.6
                        ? 'bg-white/40 shadow-[0_0_6px_rgba(255,255,255,0.4)]' // Scroll down 단계 강조
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* 현재 단계 텍스트 - FE 개발자 전문성 반영 */}
            <div className="text-center">
              <div className="text-white/90 text-sm font-light tracking-wide">
                {scrollY <= 0.2 ? 'step 1' :
                 scrollY <= 0.4 ? 'step 3' :
                 scrollY <= 0.6 ? (
                   <span className="text-white font-medium">↓ Scroll Down</span>
                 ) :
                 scrollY <= 0.8 ? 'step 4' :
                 'end'}
              </div>
            </div>
            
            {/* 자동/수동 모드 표시 - 미니멀하게 */}
            <div className={`px-3 py-1.5 rounded-full text-white/80 text-xs text-center transition-all duration-500 backdrop-blur-sm ${
              isAutoDreaming 
                ? 'bg-white/10 border border-white/30' 
                : 'bg-white/5 border border-white/20'
            }`}>
              {isAutoDreaming ? '✨ Auto' : '🎮 Manual'}
            </div>
            
            {/* 조작 가이드 - 단계별로 다르게 표시 */}
            <div className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white/60 text-xs text-center border border-white/10">
              {scrollY <= 0.6 ? (
                <span className="text-white/80 font-medium">↓ Keep scrolling</span>
              ) : (
                'Scroll | Arrows | Space'
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollCards;