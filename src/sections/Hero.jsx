import { useState } from 'react';

import HeroExperience from '../components/HeroExperience';
import GradientSpheres from '../components/GradientSpheres';

const Hero = () => {

    const [hue, setHue] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [brightness, setBrightness] = useState(1)
    return (
         <section
            id="home"
            className="w-screen h-dvh overflow-hidden relative text-white-50 bg-black md:p-0 px-5"
        >
            {/* <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20"></div>
            <GradientSpheres
                sphere1Class="gradient-sphere sphere-1"
                sphere2Class="gradient-sphere sphere-2"
            /> */}

            {/* <div className="w-full h-full flex-center">
                <div className="relative w-full h-full z-30">
                    <div className="text-white ml-10 md:mt-40 mt-20 ">
                        <p className="font md:text-2xl">
                        👋 Hey, I&apos;m Here
                        </p>
                        <h1 className="font-bold md:text-9xl text-5xl">MINSUNG LEE</h1>
                        <h1 className="font-bold md:text-9xl text-5xl">FRONT AND UI/UX</h1>
                    </div>

                    <div className="absolute w-full z-30 bottom-34 right-0 text-white ">
                        <div className="flex justify-between items-end mx-10">
                            <div className="flex flex-col items-center md:gap-5 gap-1">
                                <p className="md:text-white text-xs">살펴보기</p>
                                <img
                                src="/assets/images/arrowdown.svg"
                                alt="arrowdown"
                                className="size-7 animate-bounce"
                                />
                            </div>
                            <div className="flex flex-col items-end">
                                <img src="/assets/images/shape.svg" alt="shape" />
                                <h1 className="font-bold md:text-9xl text-5xl">DEVELOPER</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <footer className="absolute bottom-0 z-50 w-full px-6 py-4 bg-bg-black bg-opacity-100 text-white flex flex-wrap justify-between items-center gap-8">
                {/* 왼쪽: Visualization Types */}
                <div className="flex flex-col gap-2 min-w-[160px]">
                    <h3 className="text-sm tracking-widest font-semibold">VISUALIZATION TYPES</h3>
                    <div className="flex gap-4">
                    {['TYPE 1', 'TYPE 2', 'TYPE 3'].map((type, idx) => (
                        <button
                            key={idx}
                            className={`w-16 h-16 rounded-full border-2 text-xs ${
                                idx === 0 ? 'bg-white text-black' : 'text-white'
                            } flex items-center justify-center font-semibold`}
                        >
                        {type}
                        </button>
                    ))}
                    </div>
                </div>

                {/* 가운데: 슬라이더들 */}
                <div className="flex flex-col flex-1 gap-3 items-center max-w-[960px] w-full mx-auto px-4">
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
                    <div className="flex flex-col items-center mr-10 md:gap-5 gap-1 min-w-[100px]">
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
                <HeroExperience hue={hue} speed={speed} brightness={brightness}/>
            </div>
        </section>
    )
}

export default Hero;