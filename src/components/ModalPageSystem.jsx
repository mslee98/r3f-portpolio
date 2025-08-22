import { useState, useEffect, useCallback } from 'react';
import Hero from '../sections/Hero';
import About2 from '../sections/About2';
// import Projects from '../sections/Projects'; // 주석처리
import ProjectsNew from '../sections/ProjectsNew';
import Contact from '../sections/Contact';

const ModalPageSystem = ({ currentPage, onPageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDirection, setModalDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevPage, setPrevPage] = useState('home'); // 이전 페이지 추적
  const [isFullPageMode, setIsFullPageMode] = useState(false); // 전체 페이지 모드


  // 페이지 간 전환 방향 결정 (이전 페이지 → 현재 페이지)
  const getModalDirection = (fromPage, toPage) => {
    // 홈에서 다른 페이지로
    if (fromPage === 'home') {
      const directions = {
        'about': 'left',    // 왼쪽에서 슬라이드
        'projects': 'bottom', // 아래에서 슬라이드  
        'contact': 'right'   // 오른쪽에서 슬라이드
      };
      return directions[toPage] || 'right';
    }
    
    // 다른 페이지에서 홈으로
    if (toPage === 'home') {
      return 'fade'; // 페이드 아웃
    }
    
    // 페이지 간 직접 전환
    const pageOrder = ['home', 'about', 'projects', 'contact'];
    const fromIndex = pageOrder.indexOf(fromPage);
    const toIndex = pageOrder.indexOf(toPage);
    
    if (toIndex > fromIndex) {
      // 다음 페이지로 - 오른쪽에서 슬라이드
      return 'right';
    } else {
      // 이전 페이지로 - 왼쪽에서 슬라이드
      return 'left';
    }
  };

  // 페이지별 컴포넌트 매핑
  const getPageComponent = (pageName) => {
    const components = {
      'about': About2,
      'projects': ProjectsNew, // Cards를 Projects로 변경
      'projects-new': ProjectsNew, // 새로운 카드 스타일 프로젝트
      'contact': Contact
    };
    return components[pageName];
  };

  useEffect(() => {
    console.log('Page transition:', prevPage, '→', currentPage);
    
    // 전체 페이지 모드 페이지들
    const fullPageModes = ['projects']; // projects-new를 projects로 변경
    const isCurrentFullPage = fullPageModes.includes(currentPage);
    const wasPrevFullPage = fullPageModes.includes(prevPage);
    
    if (currentPage === 'home') {
      // Home으로 돌아갈 때
      if (isFullPageMode) {
        setIsFullPageMode(false);
        setDisplayPage('home');
        setPrevPage(currentPage);
      } else if (isModalOpen) {
        setIsAnimating(false);
        setTimeout(() => {
          setIsModalOpen(false);
          setDisplayPage('home');
          setPrevPage(currentPage);
        }, 400);
      } else {
        setDisplayPage('home');
        setPrevPage(currentPage);
      }
    } else if (isCurrentFullPage) {
      // 전체 페이지 모드로 전환
      setIsFullPageMode(true);
      setDisplayPage(currentPage);
      if (isModalOpen) {
        setIsModalOpen(false);
        setIsAnimating(false);
      }
      setPrevPage(currentPage);
    } else {
      // 일반 모달 페이지로 전환
      if (isFullPageMode) {
        setIsFullPageMode(false);
      }
      
      const direction = getModalDirection(prevPage, currentPage);
      console.log('Modal direction:', direction);
      
      if (isModalOpen && prevPage !== 'home' && prevPage !== currentPage && !wasPrevFullPage) {
        // 페이지 간 직접 전환
        console.log('Direct page transition - smooth slide');
        setDisplayPage(currentPage);
        setModalDirection(direction);
        setIsAnimating(false);
        setTimeout(() => {
          setIsAnimating(true);
          setPrevPage(currentPage);
        }, 150);
      } else {
        // 홈에서 다른 페이지로 또는 첫 모달 열기
        setDisplayPage(currentPage);
        setModalDirection(direction);
        setIsModalOpen(true);
        setTimeout(() => {
          setIsAnimating(true);
          setPrevPage(currentPage);
        }, 50);
      }
    }
  }, [currentPage, isModalOpen, prevPage, isFullPageMode]);

  // 현재 모달에 표시될 컴포넌트 (상태 변경 시에만 업데이트)
  const [displayPage, setDisplayPage] = useState(currentPage);
  const CurrentModalComponent = getPageComponent(displayPage);

  // 모달 닫기 (Home으로 돌아가기)
  const handleCloseModal = useCallback(() => {
    onPageChange('home');
  }, [onPageChange]);

  // 키보드 ESC로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  // 방향별 CSS 클래스 생성
  const getModalClasses = () => {
    const baseClasses = `fixed inset-0 z-50 modal-backdrop transition-all duration-700 ease-out modal-${currentPage}`;
    
    if (!isAnimating) {
      // 진입 전 위치
      switch (modalDirection) {
        case 'left':
          return `${baseClasses} transform -translate-x-full`;
        case 'right':
          return `${baseClasses} transform translate-x-full`;
        case 'top':
          return `${baseClasses} transform -translate-y-full`;
        case 'bottom':
          return `${baseClasses} transform translate-y-full`;
        default:
          return `${baseClasses} transform translate-x-full`;
      }
    } else {
      // 활성 상태 (화면 중앙)
      return `${baseClasses} transform translate-x-0 translate-y-0 modal-shadow`;
    }
  };

  // 페이지별 연결선 효과
  const getConnectionLine = () => {
    if (!isModalOpen || !isAnimating) return null;
    
    switch (modalDirection) {
      case 'left':
        return (
          <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 z-[80]">
            <div className="connection-line bg-gradient-to-r from-blue-500/60 via-purple-500/80 to-pink-500/60 h-full"></div>
            <div className="absolute left-4 top-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2 connection-point"></div>
            <div className="absolute right-4 top-1/2 w-3 h-3 bg-pink-500 rounded-full transform -translate-y-1/2 connection-point"></div>
          </div>
        );
      case 'right':
        return (
          <div className="absolute top-1/2 right-0 w-full h-1 transform -translate-y-1/2 z-[80]">
            <div className="connection-line bg-gradient-to-l from-green-500/60 via-emerald-500/80 to-teal-500/60 h-full"></div>
            <div className="absolute left-4 top-1/2 w-3 h-3 bg-teal-500 rounded-full transform -translate-y-1/2 connection-point"></div>
            <div className="absolute right-4 top-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-y-1/2 connection-point"></div>
          </div>
        );
      case 'bottom':
        return (
          <div className="absolute bottom-0 left-1/2 w-1 h-full transform -translate-x-1/2 z-[80]">
            <div className="connection-line-vertical bg-gradient-to-t from-orange-500/60 via-yellow-500/80 to-red-500/60 w-full"></div>
            <div className="absolute top-4 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 connection-point"></div>
            <div className="absolute bottom-4 left-1/2 w-3 h-3 bg-orange-500 rounded-full transform -translate-x-1/2 connection-point"></div>
          </div>
        );
      case 'top':
        return (
          <div className="absolute top-0 left-1/2 w-1 h-full transform -translate-x-1/2 z-[80]">
            <div className="connection-line-vertical bg-gradient-to-b from-cyan-500/60 via-indigo-500/80 to-purple-500/60 w-full"></div>
            <div className="absolute top-4 left-1/2 w-3 h-3 bg-cyan-500 rounded-full transform -translate-x-1/2 connection-point"></div>
            <div className="absolute bottom-4 left-1/2 w-3 h-3 bg-purple-500 rounded-full transform -translate-x-1/2 connection-point"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 항상 렌더링되는 Hero 배경 */}
      <div className="absolute inset-0">
        <Hero />
      </div>

      {/* 전체 페이지 모드 */}
      {isFullPageMode && displayPage === 'projects' && (
        <ProjectsNew 
          isActive={isFullPageMode} 
          onClose={() => {
            console.log('ModalPageSystem: Projects onClose called');
            onPageChange('home');
          }}
        />
      )}

      {/* 페이지 연결선 효과 */}
      {getConnectionLine()}

      {/* 일반 모달 페이지들 */}
      {isModalOpen && CurrentModalComponent && !isFullPageMode && (
        <div className={getModalClasses()}>
          {/* 모달 닫기 버튼 */}
          <button
            onClick={handleCloseModal}
            className="absolute top-8 right-8 z-[90] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 group"
          >
            <svg 
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 배경 오버레이 */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
            onClick={handleCloseModal}
          ></div>

          {/* 페이지 컨텐츠 - X버튼 공간 제외, 스크롤 방지 */}
          <div className="relative z-10 w-full h-full overflow-hidden pt-20 pb-8 px-8">
            <div className="w-full h-full overflow-hidden">
              <CurrentModalComponent />
            </div>
          </div>

          {/* 모달 경계선 효과 */}
          <div className="absolute inset-0 modal-border rounded-lg pointer-events-none"></div>

                {/* 역동적인 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-particle-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
        </div>
      )}

      {/* 페이지 전환 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[90]">
        <div className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            currentPage === 'home' ? 'bg-white' : 'bg-white/30'
          }`}></div>
          <span className="text-white/80 text-sm">
            {currentPage === 'home' ? 'Home - Hero Main Page' : `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page`}
          </span>
          {currentPage !== 'home' && (
            <span className="text-white/60 text-xs">ESC to close</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPageSystem;