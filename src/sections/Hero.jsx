import { useState, useEffect, useRef } from 'react';

import HeroExperience from '../components/HeroExperience';
import GradientSpheres from '../components/GradientSpheres';

import { motion, AnimatePresence } from "framer-motion";

import { SpredingPoint } from '../components/SpreadingPoint';

const Hero = () => {

    const [hue, setHue] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [brightness, setBrightness] = useState(1);

    const [selectedVideoType, setSelectedVideoType] = useState('TYPE1');

    const [isInteracting, setIsInteracting] = useState(false);

    return (
         <section
            id="home"
            className="w-screen h-dvh overflow-hidden relative text-white-50 bg-black md:p-0 px-5"
        >
            <MouseFollower/>

            {/* {positions.map((pos, i) => (
                <div key={i} className="absolute" style={{ top: pos.top, left: pos.left }}>
                    <SpredingPoint delay={pos.delay}/>
                </div>
            ))} */}

            {/* <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20"></div>
            <GradientSpheres
                sphere1Class="gradient-sphere sphere-1"
                sphere2Class="gradient-sphere sphere-2"
            /> */}

            {/* <div className="hidden w-full h-full lg:flex justify-center items-center pointer-events-none">
                <div className="relative w-full h-full z-30">
                    <div className="text-white ml-10 md:mt-40 mt-20 ">
                        <p className="font md:text-2xl">
                        👋 Hey, I&apos;m Here
                        </p>
                        <h1 className="font-bold md:text-9xl text-5xl">MINSUNG LEE</h1>
                        <h1 className="font-bold md:text-9xl text-5xl">FRONT AND UI/UX</h1>
                    </div>
                </div>
            </div> */}

        

            <AnimatePresence mode="wait">
                {!isInteracting && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                            duration: 1,
                            ease: [0.4, 0, 0.2, 1], // 부드러운 ease-in-out
                        }}
                        className="absolute w-full h-full flex justify-center items-center pointer-events-none z-50"
                    >
                        <div className="relative w-full h-full z-30">
                            <div className="text-white ml-10 md:mt-40 mt-20">
                            <p className="font md:text-2xl">👋 Hey, I&apos;m Here</p>
                            <h1 className="font-bold md:text-9xl text-5xl">MINSUNG LEE</h1>
                            <h1 className="font-bold md:text-9xl text-5xl">FRONT AND UI/UX</h1>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <footer className="absolute bottom-0 z-50 w-full px-6 py-4 bg-bg-black bg-opacity-100 text-white flex flex-wrap justify-between items-center gap-8">
                {/* 왼쪽: Visualization Types */}
                <div className="flex flex-col gap-2 min-w-[160px]">
                    <h3 className="text-sm tracking-widest font-semibold">VISUALIZATION TYPES</h3>
                    <div className="flex gap-4">
                    {['TYPE1', 'TYPE2', 'TYPE3'].map((type, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedVideoType(type)}
                            className={`w-16 h-16 rounded-full border-2 text-xs ${
                                selectedVideoType === type ? 'bg-white text-black' : 'text-white'
                            } flex items-center justify-center font-semibold`}
                        >
                        {type}
                        </button>
                    ))}
                    </div>
                </div>

                {/* 가운데: 슬라이더들 */}
                <div className="flex flex-col flex-1 gap-3 items-center w-full mx-auto px-4">
                    <h4 className="text-xs tracking-widest font-semibold">VISUALIZATION EDITORS</h4>
                    
                    
                    <div className='w-full flex gap-8 md:gap-10'>
                        {/* HUE */}
                        <div className="w-full max-w-xl flex flex-col items-center">
                            <label className="text-xs mb-2">HUE</label>
                            <div className="relative w-full flex items-center" style={{ height: 32 }}>
                                {/* 실제 input은 숨김 */}
                                <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={hue}
                                onChange={(e) => setHue(parseFloat(e.target.value))}
                                className="absolute w-full opacity-0 h-8 cursor-pointer z-10"
                                style={{ top: 0, left: 0 }}
                                />
                                {/* 라인 */}
                                <div className="h-1 bg-white w-full rounded pointer-events-none" />
                                {/* 원 */}
                                <div className="absolute"
                                style={{
                                    left: `calc(${hue * 100}% - 16px)`, // 16px은 원의 반지름
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                                >
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent" />
                                </div>
                            </div>
                        </div>
                        
                        {/* SPEED */}
                        <div className="w-full max-w-xl flex flex-col items-center">
                            <label className="text-xs mb-2">SPEED</label>
                            <div className="relative w-full flex items-center" style={{ height: 32 }}>
                                {/* 실제 input은 숨김 */}
                                <input
                                type="range"
                                min={0.25}
                                max={4}
                                step={0.01}
                                value={speed}
                                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                className="absolute w-full opacity-0 h-8 cursor-pointer z-10"
                                style={{ top: 0, left: 0 }}
                                />
                                {/* 라인 */}
                                <div className="h-1 bg-white w-full rounded pointer-events-none" />
                                {/* 원 */}
                                <div className="absolute"
                                style={{
                                    left: `calc(${((speed - 0.25) / (4 - 0.25)) * 100}% - 16px)`, // min = 0.25 max = 4
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                                >
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent" />
                                </div>
                            </div>
                        </div>
                        
                        {/* DIMMER */}
                        <div className="w-full max-w-xl flex flex-col items-center">
                            <label className="text-xs mb-2">DIMMER</label>
                            <div className="relative w-full flex items-center" style={{ height: 32 }}>
                                {/* 실제 input은 숨김 */}
                                <input
                                type="range"
                                min={0}
                                max={2}
                                step={0.01}
                                value={brightness}
                                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                                className="absolute w-full opacity-0 h-8 cursor-pointer z-10"
                                style={{ top: 0, left: 0 }}
                                />
                                {/* 라인 */}
                                <div className="h-1 bg-white w-full rounded pointer-events-none" />
                                {/* 원 */}
                                <div className="absolute"
                                style={{
                                    left: `calc(${(brightness/2) * 100}% - 16px)`, // 16px은 원의 반지름
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                                >
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: Default Angle 버튼 */}
                    <div className="hidden flex-col items-center mr-10 md:gap-5 gap-1 min-w-[100px] md:flex">
                        <p className="md:text-white text-xs">살펴보기</p>
                        <img
                            src="/assets/images/arrowdown.svg"
                            alt="arrowdown"
                            className="size-7 animate-bounce"
                        />
                    </div>
                    {/* <button className="bg-white text-black font-bold rounded-full px-8 py-3">
                    DEFAULT ANGLE
                    </button> */}
            </footer>
            
            <div className="w-full h-full absolute top-0 left-0">
                <HeroExperience hue={hue} speed={speed} brightness={brightness} selectedVideoType={selectedVideoType} setIsInteracting={setIsInteracting}/>
            </div>
        </section>
    )
}

export default Hero;

const MouseFollower = () => {
  const followerRef = useRef();
  const posRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="relative pointer-events-none z-50 flex items-center justify-center rounded-full bg-transparent border border-white text-white select-none"
      style={{
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        transform: 'translate3d(0,0,0) translate(-50%, -50%)',
      }}
    >
      <div className="relative flex flex-col items-center">
        <div style={{ width: 0, height: 0 }}></div>
        <div className="opacity-100 text-xs select-none">DRAG</div>
            
        </div>
    </div>
  );
};