import { useState, useRef } from "react";
import { slides } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { 
  EffectCoverflow, 
  Navigation, 
  Pagination,
  Keyboard
} from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const currentProject = slides[activeIndex];

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="w-full relative flex-1 lg:h-[55vh] md:h-[45vh] h-[30vh] xl:h-[60vh] 2xl:h-[65vh]">
        {/* 그라데이션 오버레이 제거 */}
        {/* <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
        </div> */}
        
        <Swiper
          ref={swiperRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={0}
          loop={true}
          speed={400}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1.2,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          modules={[
            EffectCoverflow, 
            Navigation, 
            Pagination, 
            Keyboard
          ]}
          className="w-full h-full"
          onSlideChange={handleSlideChange}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.8,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            }
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={index}
              className="w-full max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] h-full"
            >
              <div className="w-full h-full relative group cursor-pointer transform transition-all duration-500">
                <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* 슬라이드 정보 */}
                  <div className="absolute w-full h-20 xl:h-24 2xl:h-28 bottom-0 left-0 bg-black/80 backdrop-blur-sm px-4 rounded-b-2xl border-t border-white/10">
                    <div className="w-full h-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-blue-400 font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm md:text-base xl:text-lg 2xl:text-xl text-white/90 font-medium truncate">
                          {slide.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 활성 슬라이드 표시 */}
                  {index === activeIndex && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2 rounded-full text-xs xl:text-sm 2xl:text-base font-medium shadow-lg animate-pulse">
                      Active
                    </div>
                  )}

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <div className="swiper-button-prev !hidden md:!flex !w-12 !h-12 xl:!w-16 xl:!h-16 2xl:!w-20 2xl:!h-20 !bg-gradient-to-r !from-blue-500 !to-purple-600 !rounded-full !text-white !shadow-lg hover:!shadow-xl transition-all duration-300 after:!text-lg xl:after:!text-xl 2xl:after:!text-2xl after:!font-bold" />
        <div className="swiper-button-next !hidden md:!flex !w-12 !h-12 xl:!w-16 xl:!h-16 2xl:!w-20 2xl:!h-20 !bg-gradient-to-r !from-blue-500 !to-purple-600 !rounded-full !text-white !shadow-lg hover:!shadow-xl transition-all duration-300 after:!text-lg xl:after:!text-xl 2xl:after:!text-2xl after:!font-bold" />
        
        {/* 커스텀 페이지네이션 */}
        <div className="swiper-pagination !bottom-2 md:!bottom-4 xl:!bottom-6 2xl:!bottom-8" />
      </div>

      {/* 프로젝트 설명 섹션 - 높이 조정 */}
      <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-10 px-4 md:px-0 flex-shrink-0">
        <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* 현재 프로젝트 정보 */}
          <div className="text-center mb-3 md:mb-4 xl:mb-6 2xl:mb-8">
            <div className="flex items-center justify-center gap-3 mb-2 md:mb-3 xl:mb-4 2xl:mb-5">
              <span className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-blue-400 font-bold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-white font-semibold">
                {currentProject?.title}
              </h3>
            </div>
            
            {/* 프로젝트 설명 */}
            <p className="text-white/80 text-xs md:text-sm xl:text-base 2xl:text-lg leading-relaxed max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
              {currentProject?.description}
            </p>
          </div>

          {/* 기술 스택 및 특징 - 높이 축소 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-4 2xl:gap-6 mt-4 md:mt-6 xl:mt-8 2xl:mt-10">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl p-3 xl:p-4 2xl:p-6 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-1 text-sm xl:text-base 2xl:text-lg">기술 스택</h4>
              <p className="text-white/70 text-xs xl:text-sm 2xl:text-base">
                {currentProject?.techStack}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-xl p-3 xl:p-4 2xl:p-6 border border-white/10">
              <h4 className="text-green-400 font-semibold mb-1 text-sm xl:text-base 2xl:text-lg">주요 기능</h4>
              <p className="text-white/70 text-xs xl:text-sm 2xl:text-base">
                {currentProject?.features}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-3 xl:p-4 2xl:p-6 border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-1 text-sm xl:text-base 2xl:text-lg">개발 기간</h4>
              <p className="text-white/70 text-xs xl:text-sm 2xl:text-base">
                {currentProject?.duration}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 스와이프 힌트 - 높이 축소 */}
      <div className="md:hidden flex items-center justify-center gap-2 text-white/60 text-xs mt-3">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Swipe to explore more projects</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

export default Carousel;