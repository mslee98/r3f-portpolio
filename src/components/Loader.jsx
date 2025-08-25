
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
// import Projects from "../sections/Projects"; // 주석처리

const MIN_DISPLAY_TIME = 1.5; // 최소 1.5초 보이게

const Loader = ({onFinish}) => {
  const { progress } = useProgress();
  const loaderRef = useRef(null);
  const [startTime] = useState(() => Date.now()); // 로딩 시작 시간 저장
  const hasAnimated = useRef(false);

  console.log("Loader render");

  useEffect(() => {
    if (progress === 100 && !hasAnimated.current) {
      hasAnimated.current = true;

      const elapsed = (Date.now() - startTime) / 1000; // 초 단위 경과 시간
      const delay = Math.max(MIN_DISPLAY_TIME - elapsed, 0);

      gsap.delayedCall(delay, () => {
        // 전환 시작 클래스 추가
        loaderRef.current.classList.add('transitioning');
        
        // 로딩바를 도르레 메뉴 위치로 이동하는 스프레드 애니메이션
        gsap.timeline()
          .to(loaderRef.current, {
            // 도르레 메뉴 위치로 이동 (우측 상단)
            x: "calc(100vw - 200px)", // 우측에서 200px
            y: "calc(50vh - 160px)",  // 상단에서 160px (도르레 중앙)
            scale: 0.15, // 도르레 메뉴 크기로 축소 (더 작게)
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to(loaderRef.current, {
            // 스프레드 효과 - 도르레 메뉴 형태로 변형
            borderRadius: "50%",
            width: "96px", // 도르레 중앙 축 크기
            height: "96px",
            duration: 1.0,
            ease: "power2.out",
          }, "-=0.6") // 이전 애니메이션과 겹치게
          .to(loaderRef.current, {
            // 최종 페이드아웃
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
              loaderRef.current.style.display = "none";
              onFinish?.();
            },
          }, "-=0.3");
      });
    }
  }, [progress, onFinish]);

  return (
    <div
      ref={loaderRef}
      className="loader-screen bg-black w-screen h-dvh fixed top-0 left-0 z-[100]"
    >
      <div className="flex justify-center items-center w-full h-full">
        <img src="/assets/images/loader.gif" alt="loader" />
      </div>
      <div className="text-white-50 font-bold text-7xl leading-none gradient-title absolute bottom-10 right-10">
        {/* {Math.floor(progress)}% */}
      </div>
    </div>
  );
};

export default Loader;
