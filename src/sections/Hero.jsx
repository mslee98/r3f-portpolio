
import HeroExperience from '../components/HeroExperience';
import GradientSpheres from '../components/GradientSpheres';

const Hero = () => {
    return (
         <section
            id="home"
            className="w-screen h-dvh overflow-hidden relative text-white-50 bg-black md:p-0 px-5"
        >

            <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20"></div>
            <GradientSpheres
                sphere1Class="gradient-sphere sphere-1"
                sphere2Class="gradient-sphere sphere-2"
            />

            <div className="w-full h-full flex-center">
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
            </div>
            
            <div className="w-full h-full absolute top-0 left-0">
                <HeroExperience />
            </div>
        </section>
    )
}

export default Hero;