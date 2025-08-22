import { navItems } from "../constants";
import { useState, useEffect } from "react";

const NavBarPage = ({ currentPage, onPageChange }) => {
  const [rotationOffset, setRotationOffset] = useState(0);

  const handleClick = (e, pageName) => {
    e.preventDefault();
    if (pageName !== currentPage) {
      onPageChange(pageName);
      
      // 페이지 변경 시 도르레 회전 애니메이션
      const currentIndex = navItems.findIndex(item => currentPage === item.href.replace('#', ''));
      const newIndex = navItems.findIndex(item => pageName === item.href.replace('#', ''));
      
      let direction = newIndex - currentIndex;
      if (direction > navItems.length / 2) {
        direction -= navItems.length;
      } else if (direction < -navItems.length / 2) {
        direction += navItems.length;
      }
      
      setRotationOffset(prev => prev + direction * 90); // 90도씩 회전
    }
  };

  // 페이지별 방향 매핑
  const getPageDirection = (pageName) => {
    const directions = {
      'home': 'up',
      'about': 'left', 
      'projects': 'down',
      'contact': 'right'
    };
    return directions[pageName] || 'right';
  };

  return (
    <>
      {/* 도르레 네비게이션 */}
      <div 
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-40"
      >
        <div className="relative w-40" style={{ marginRight: '-20px' }}>
          
          {/* 외부 회전 링 */}
          <div 
            className="absolute top-1/2 right-5 transform -translate-y-1/2 w-56 h-56 rounded-full border-2 border-dashed border-white/30 transition-all duration-1000 opacity-50 scale-100"
            style={{
              transform: `translateY(-50%) rotate(${rotationOffset}deg)`,
              transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s, transform 1s'
            }}
          ></div>

          {/* 중간 회전 링 */}
          <div 
            className="absolute top-1/2 right-5 transform -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-white/20 transition-all duration-1200 opacity-30"
            style={{
              transform: `translateY(-50%) rotate(${-rotationOffset * 0.7}deg)`,
              transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s'
            }}
          ></div>

          {/* 중앙 도르레 */}
          <div 
            className="absolute top-1/2 right-5 transform -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-all duration-700 scale-100 shadow-lg shadow-white/10"
            style={{
              transform: `translateY(-50%) rotate(${rotationOffset * 0.5}deg) scale(1)`,
              transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>

          {/* 중앙 파동 효과 (항상 표시) */}
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
            <div className="pulley-center-wave w-16 h-16 rounded-full border border-white/20"></div>
            <div className="pulley-center-wave-outer w-20 h-20 rounded-full border border-white/15"></div>
            <div className="pulley-center-wave-inner w-12 h-12 rounded-full border border-white/25"></div>
          </div>

          {/* 메뉴 아이템들 */}
          {(() => {
            const activeIndex = navItems.findIndex(item => currentPage === item.href.replace('#', ''));
            const allMenusWithRotation = navItems.map((item, index) => {
              const relativeIndex = (index - activeIndex + navItems.length) % navItems.length;
              const baseAngle = (relativeIndex * 360) / navItems.length - 180;
              const finalAngle = baseAngle + rotationOffset;
              
              const normalizedAngle = ((finalAngle % 360) + 360) % 360;
              const isInVisibleRange = (normalizedAngle >= 270 || normalizedAngle <= 90);
              
              if (!isInVisibleRange) return null;
              
              const distanceFromCenter = Math.abs((normalizedAngle > 180 ? normalizedAngle - 360 : normalizedAngle));
              const opacity = Math.max(0.3, 1 - distanceFromCenter / 90);
              const scale = Math.max(0.7, 1.1 - distanceFromCenter / 90);
              const isActive = index === activeIndex;
              
              return {
                ...item,
                index,
                angle: finalAngle,
                opacity: isActive ? 1 : opacity,
                scale: isActive ? 1.2 : scale,
                isActive,
                pageName: item.href.replace('#', '')
              };
            }).filter(Boolean);

            return allMenusWithRotation.map((menu, index) => {
              const radius = 90;
              const x = -Math.cos((menu.angle) * Math.PI / 180) * radius;
              const y = Math.sin((menu.angle) * Math.PI / 180) * radius;

              return (
                <div
                  key={`${menu.href}-${menu.index}`}
                  className="absolute top-1/2 right-5 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                  style={{
                    transform: `translateY(-50%) translate(${x}px, ${y}px) scale(${menu.scale})`,
                    opacity: menu.opacity,
                  }}
                >
                  {/* 연결선 */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-white/40 to-transparent"
                    style={{
                      transform: `translateY(-50%) rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left center'
                    }}
                  />

                  {/* 연결선 파동 효과 (항상 표시, 활성 메뉴는 더 강하게) */}
                  <div 
                    className={`absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r ${
                      menu.isActive ? 'from-white/30' : 'from-white/15'
                    } to-transparent connection-wave`}
                    style={{
                      transform: `translateY(-50%) rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left center'
                    }}
                  />
                  <div 
                    className={`absolute top-1/2 left-1/2 w-24 h-0.5 bg-gradient-to-r ${
                      menu.isActive ? 'from-white/20' : 'from-white/8'
                    } to-transparent connection-wave-outer`}
                    style={{
                      transform: `translateY(-50%) rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left center'
                    }}
                  />

                  {/* 메뉴 아이템 */}
                  <div 
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      menu.isActive 
                        ? 'bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/50 shadow-lg shadow-white/20' 
                        : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40'
                    }`}
                    onClick={(e) => handleClick(e, menu.pageName)}
                  >
                    <span className={`text-sm font-bold transition-colors duration-300 ${
                      menu.isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}>
                      {menu.name.charAt(0)}
                    </span>

                    {/* 활성 메뉴 표시 */}
                    {menu.isActive && (
                      <div className="absolute -inset-1 rounded-full border border-white/30 animate-ping"></div>
                    )}

                    {/* 메뉴 파동 효과 (항상 표시, 활성 메뉴는 더 강하게) */}
                    <div className={`absolute -inset-2 rounded-full border ${
                      menu.isActive ? 'border-white/25' : 'border-white/12'
                    } menu-wave`}></div>
                    <div className={`absolute -inset-4 rounded-full border ${
                      menu.isActive ? 'border-white/15' : 'border-white/8'
                    } menu-wave-outer`}></div>
                    <div className={`absolute -inset-1 rounded-full border ${
                      menu.isActive ? 'border-white/35' : 'border-white/15'
                    } menu-wave-inner`}></div>
                  </div>

                  {/* 방향 표시기 */}
                  {menu.isActive && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white/80 border border-white/20">
                        {getPageDirection(menu.pageName)}
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* 페이지 전환 표시기 */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">{currentPage}</span>
        </div>
      </div>
    </>
  );
};

export default NavBarPage;