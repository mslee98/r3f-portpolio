import { useState, useEffect, useCallback } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
// import Projects from '../sections/Projects'; // 주석처리
import ProjectsNew from '../sections/ProjectsNew';
import Contact from '../sections/Contact';

const ModalPageSystem = ({ currentPage, onPageChange, onLoadingComplete }) => {
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
      'about': About,
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
    // 연결선 제거됨
    return null;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 항상 렌더링되는 Hero 배경 */}
      <div className="absolute inset-0">
        <Hero onLoadingComplete={onLoadingComplete} />
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


          {/* 모달 배경 오버레이 */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
            onClick={handleCloseModal}
          ></div>

          {/* 페이지 컨텐츠 - X버튼 공간 제외, 스크롤 방지 */}
          <div className="relative z-10 w-full h-full overflow-hidden">
            <div className="w-full h-full overflow-hidden">
              <CurrentModalComponent onClose={handleCloseModal} />
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

      {/* 페이지 전환 인디케이터 제거 - 깔끔한 UI를 위해 */}
    </div>
  );
};

export default ModalPageSystem;