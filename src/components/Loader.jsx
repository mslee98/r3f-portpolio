
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
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            loaderRef.current.style.display = "none";
            onFinish?.();
          },
        });
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
