import { navItems } from "../constants";
import { useState, useEffect } from "react";

const NavBar = ({ currentPage, onPageChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [prevPage, setPrevPage] = useState('home'); // 이전 페이지 추적

  const handleClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const pageName = href.replace('#', '');
    

    
    if (pageName !== currentPage && onPageChange) {
      // 페이지 변경 시 스크롤링 효과 트리거
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
      
      onPageChange(pageName);
    }
  };

  // 페이지 변경에 따른 회전 애니메이션
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => currentPage === item.href.replace('#', ''));
    const previousIndex = navItems.findIndex(item => prevPage === item.href.replace('#', ''));
    

    
    if (currentIndex !== -1 && previousIndex !== -1 && currentIndex !== previousIndex) {
      let direction = currentIndex - previousIndex;
      // Handle circular navigation for shortest path
      if (direction > navItems.length / 2) {
        direction -= navItems.length;
      } else if (direction < -navItems.length / 2) {
        direction += navItems.length;
      }
      

      setRotationOffset(prev => prev + direction * 60); // 60도씩 회전
    }
    setPrevPage(currentPage); // Update previous page for next change
  }, [currentPage, prevPage]);



  return (
    <>
      {/* 기존 상단 네비게이션 (모바일용) */}
      <div className="w-full flex-center fixed z-[100] top-0 left-0 md:hidden px-5">
        <div className="mx-5 my-5 flex items-center justify-between w-full">
          <span className="text-white font-semibold">Mslee PortFolio</span>
        </div>
      </div>

      {/* 도르레 스타일 네비게이션 (데스크톱용) - 화면에 맞게 조정 */}
      <div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[100] hidden md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-80 h-80">
          {/* 도르레 중앙 축 - 검은색 베이스에 흰색 라인 */}
          <div className={`absolute top-1/2 right-1/4 transform -translate-y-1/2 -translate-x-1/2 w-24 h-24 bg-black rounded-full border-4 border-white flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isScrolling || isHovered ? 'scale-110 shadow-white/30' : 'scale-100'
          }`}>
            {/* 빠르고 역동적인 파동 효과 */}
            <div className={`absolute w-36 h-36 border-2 border-white/40 rounded-full transition-all duration-200 ${
              isScrolling || isHovered ? 'animate-pingOuter opacity-70' : 'opacity-0'
            }`}></div>
            
            <div className={`absolute w-32 h-32 border-2 border-white/60 rounded-full transition-all duration-200 ${
              isScrolling || isHovered ? 'animate-pingInner opacity-80' : 'opacity-0'
            }`}></div>

            <div className={`absolute w-28 h-28 border-2 border-white/80 rounded-full transition-all duration-200 ${
              isScrolling || isHovered ? 'animate-pulse opacity-90' : 'opacity-0'
            }`}></div>

            {/* 중앙 흰색 점 */}
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-500 relative z-10 ${
              isScrolling || isHovered ? 'animate-pulse scale-125' : 'scale-100'
            }`}></div>
          </div>



          {/* 회전하는 반타원 메뉴 - 3개씩 표시 */}
          {(() => {
            // 현재 활성 섹션의 인덱스 찾기
            let activeIndex = navItems.findIndex(item => currentPage === item.href.replace('#', ''));
            
            // activeIndex가 -1인 경우 (currentPage가 navItems에 없는 경우) Home(0)으로 설정
            if (activeIndex === -1) {
              activeIndex = 0; // Home 인덱스
            }
            

            
            // 간단한 반원 배치 - 4개 메뉴를 균등하게
            const allMenusWithRotation = navItems.map((item, index) => {
              // 활성 메뉴를 중앙(0도)에 배치
              const relativeIndex = (index - activeIndex + navItems.length) % navItems.length;
              // -90도에서 90도까지 균등 분배 (180도 범위를 3등분)
              const angle = (relativeIndex - 1.5) * 60; // -90, -30, 30, 90 degrees
              const finalAngle = angle + rotationOffset;
              
              const isActive = index === activeIndex;
              
              // 활성 메뉴는 항상 최대 크기와 투명도
              const opacity = isActive ? 1 : 0.7;
              const scale = isActive ? 1.2 : 1.0;
              
              return {
                ...item,
                index,
                angle: finalAngle,
                opacity,
                scale,
                isActive
              };
            });

            return allMenusWithRotation.map((menu, index) => {
              const radius = 120; // 화면에 맞는 반지름
              // 중앙 축을 기준으로 배치
              const x = -Math.cos((menu.angle) * Math.PI / 180) * radius;
              const y = Math.sin((menu.angle) * Math.PI / 180) * radius;
              
              // Home에서는 모든 메뉴 표시, 다른 페이지에서는 호버 시 표시
              const shouldShowMenu = currentPage === 'home' || isHovered;
              const isHomeAndCenter = currentPage === 'home' && menu.isActive;

              return (
                <div
                  key={`${menu.href}-${menu.index}`}
                  className="absolute top-1/2 right-1/4 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(-50%) translateX(-50%) translate(${x}px, ${y}px) scale(${shouldShowMenu ? menu.scale : 0.3})`,
                    opacity: shouldShowMenu ? menu.opacity : 0,
                    pointerEvents: shouldShowMenu ? 'auto' : 'none',
                  }}
                >
                  {/* 흰색 연결선 - 메뉴가 보일 때만 표시 */}
                  {shouldShowMenu && (
                    <div 
                      className={`absolute w-24 h-1 bg-gradient-to-r transition-all duration-500 ${
                        menu.isActive 
                          ? 'from-white to-transparent opacity-90' 
                          : 'from-white/40 to-transparent opacity-40'
                      }`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translateY(-50%) translateX(-100%) rotate(${menu.angle}deg)`,
                      transformOrigin: 'right center',
                    }}
                    ></div>
                  )}

                  {/* 흰색 연결선 파동 효과 - 메뉴가 보이고 활성일 때만 */}
                  {shouldShowMenu && menu.isActive && (isScrolling || isHovered) && (
                    <>
                      <div 
                        className="absolute w-28 h-1 bg-gradient-to-r from-white/50 to-transparent animate-pingOuter"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translateY(-50%) translateX(-100%) rotate(${menu.angle}deg)`,
                          transformOrigin: 'right center',
                        }}
                      ></div>
                      <div 
                        className="absolute w-32 h-1 bg-gradient-to-r from-white/30 to-transparent animate-pingInner"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translateY(-50%) translateX(-100%) rotate(${menu.angle}deg)`,
                          transformOrigin: 'right center',
                        }}
                      ></div>
                    </>
                  )}

                  {/* 검은색 베이스 흰색 라인 메뉴 아이템 - 메뉴가 보일 때만 */}
                  {shouldShowMenu && (
                    <a
                      href={menu.href}
                      onClick={handleClick}
                      className={`relative flex items-center justify-center w-24 h-16 rounded-xl transition-all duration-500 ${
                        menu.isActive 
                          ? 'bg-black shadow-xl shadow-white/20' 
                          : 'bg-black/80 hover:bg-black/90'
                      } backdrop-blur-md border-2 transition-colors duration-500 ${
                        menu.isActive ? 'border-white' : 'border-white/30'
                      }`}
                    >
                    {/* 흰색 라인 메뉴 파동 효과 */}
                    {menu.isActive && (isScrolling || isHovered) && (
                      <>
                        <div className="absolute w-32 h-24 border-2 border-white/40 rounded-xl animate-pingOuter"></div>
                        <div className="absolute w-28 h-20 border-2 border-white/60 rounded-xl animate-pingInner"></div>
                        <div className="absolute w-24 h-16 border-2 border-white/80 rounded-xl animate-pulse"></div>
                      </>
                    )}

                    <span className={`text-sm font-semibold transition-all duration-500 relative z-10 ${
                      menu.isActive ? 'text-white' : 'text-white/60'
                    }`}>
                      {menu.name}
                    </span>

                    {/* 흰색 글로우 효과 */}
                    <div className={`absolute inset-0 rounded-xl bg-white/10 transition-opacity duration-500 ${
                      menu.isActive ? 'opacity-30' : 'opacity-0'
                    }`}></div>

                    {/* 흰색 활성 메뉴 표시 */}
                    {menu.isActive && (
                      <div className="absolute -right-1 -top-1">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <div className="absolute w-5 h-5 border-2 border-white/60 rounded-full animate-pingOuter"></div>
                          <div className="absolute w-4 h-4 border-2 border-white/80 rounded-full animate-pingInner"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                    </a>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </>
  );
};

export default NavBar;