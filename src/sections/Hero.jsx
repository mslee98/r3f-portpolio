import { useState, useEffect, useRef, useCallback } from 'react';
import HeroExperience from '../components/HeroExperience';
import { motion, AnimatePresence } from "framer-motion";

const Hero = ({ onLoadingComplete }) => {

    const [hue, setHue] = useState(0) // 원하는 초기값으로 변경
    const [speed, setSpeed] = useState(0.9) // 원본 영상 속도를 초기값으로 설정
    const [brightness, setBrightness] = useState(1);

    const [selectedVideoType, setSelectedVideoType] = useState('TYPE1');

    // 캔버스 맵 컨트롤 이동
    const [isInteracting, setIsInteracting] = useState(false);

    
    const [loadingYn, setLoadingYn] = useState(false);

    const [step, setStep] = useState(-1);

    // 슬라이더 핸들러 최적화
    const handleHueChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        setHue(value);
    }, []);

    const handleSpeedChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        setSpeed(value);
    }, []);

    const handleBrightnessChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        setBrightness(value);
    }, []);

    const handleVideoTypeChange = useCallback((type) => {
        setSelectedVideoType(type);
    }, []);

    useEffect(() => {
        if (loadingYn) {
          // 로딩 완료 시 타이핑 순차 시작
          setStep(0);
    
          const timers = [
            setTimeout(() => setStep(1), 1000), // 타이핑 끝나는 시간 맞춰서
            setTimeout(() => setStep(2), 3000),
          ];
    
          return () => timers.forEach(clearTimeout); // cleanup
        } else {
          // 로딩 중이면 다시 초기화 (선택사항)
          setStep(-1);
        }
      }, [loadingYn]);

    // 로딩 완료 핸들러
    const handleLoadingComplete = (loadingState) => {
        setLoadingYn(loadingState);
        if (loadingState && onLoadingComplete) {
            onLoadingComplete();
        }
    };

    return (
         <section
            id="home"
            className="w-screen h-dvh overflow-hidden relative text-white-50 bg-black md:p-0 px-5"
        >

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
                            <div className=" text-white ml-2 md:ml-10 md:mt-40 mt-20">
                                <p className="font md:text-2xl">👋 Hey, I&apos;m Here</p>
                                {step >= 0 && (
                                    <h1 className="animate-typing after:animate-blink font-bold text-4xl md:text-8xl overflow-hidden whitespace-nowrap border-r-4 border-r-white text-white">
                                        MINSUNG LEE
                                    </h1>
                                )}

                                {/* Step 1: FRONT AND UI/UX */}
                                {step >= 0.5 && (
                                    <h1 className="animate-typing after:animate-blink font-bold text-4xl md:text-8xl overflow-hidden whitespace-nowrap border-r-4 border-r-white text-white">
                                        FRONT AND UI/UX
                                    </h1>
                                )}

                                {/* Step 2: ENGINEER */}
                                {step >= 1 && (
                                <h1 className="animate-typing after:animate-blink font-bold text-4xl md:text-8xl overflow-hidden whitespace-nowrap border-r-4 border-r-white text-white">
                                    ENGINEER
                                </h1>
                                )}

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <footer className="absolute bottom-0 z-50 w-full px-6 py-4 bg-bg-black bg-opacity-100 text-white flex flex-wrap justify-between items-center gap-8">
                {/* 왼쪽: Visualization Types */}
                <div className="flex flex-col gap-2 min-w-[160px]">
                    <h3 className="text-sm tracking-widest text-center font-semibold mb-2">VISUALIZATION TYPES</h3>
                    <div className="flex gap-4">
                    {['TYPE1', 'TYPE2', 'TYPE3'].map((type, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleVideoTypeChange(type)}
                            className={`w-20 h-20 rounded-full border-2 text-xs transition-all duration-300 hover:scale-105 ${
                                selectedVideoType === type ? 'bg-white text-black border-white' : 'text-white border-white/50 hover:border-white'
                            } flex items-center justify-center font-semibold`}
                        >
                        {type}
                        </button>
                    ))}
                    </div>
                </div>

                {/* 가운데: 슬라이더들 */}
                <div className="flex flex-col flex-1 gap-3 items-center w-full mx-auto px-4">
                    <h4 className="text-xs text-center tracking-widest font-semibold">VISUALIZATION EDITORS</h4>
                    
                    
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
                                onChange={handleHueChange}
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
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent transition-all duration-150 hover:scale-110 hover:bg-white/10" />
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
                                onChange={handleSpeedChange}
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
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent transition-all duration-150 hover:scale-110 hover:bg-white/10" />
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
                                onChange={handleBrightnessChange}
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
                                <div className="w-8 h-8 border-2 border-white rounded-full bg-transparent transition-all duration-150 hover:scale-110 hover:bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: Default Angle 버튼 */}
                <div 
                    onClick={(e) => {
                        e.preventDefault();
                        const section = document.getElementById('about');
                        if (section) {
                            setIsInteracting(true)
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                    className="hidden flex-col items-center mr-10 md:gap-5 gap-1 min-w-[100px] md:flex cursor-pointer"
                >
                    <p className="md:text-white text-xs">살펴보기</p>
                    <img
                        src="/assets/images/arrowdown.svg"
                        alt="arrowdown"
                        className="size-7 animate-bounce"
                    />
                </div>
            </footer>
            
            <div className="w-full h-full absolute top-0 left-0">
                <HeroExperience 
                    hue={hue} 
                    speed={speed} 
                    brightness={brightness} 
                    selectedVideoType={selectedVideoType} 
                    setIsInteracting={setIsInteracting} 
                    loadingYn={loadingYn} 
                    setLoadingYn={handleLoadingComplete}
                    onLoadingComplete={onLoadingComplete}
                />
            </div>
        </section>
    )
}

export default Hero;