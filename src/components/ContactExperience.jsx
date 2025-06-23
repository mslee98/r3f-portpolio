import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  useTexture,
  OrbitControls,
  SpotLight,
  Html
} from '@react-three/drei';
import { 
  EffectComposer, 
  ChromaticAberration,
  Vignette
} from '@react-three/postprocessing';
import { useRef } from 'react';
import * as THREE from 'three';

const ContactExperience = ({btnClicked, handleClick}) => {
  return (
    <Canvas 
      camera={{ position: [0, 0.6, 1], fov: 75, near: 0.01, far: 40 }}
      fog={new THREE.Fog('#000000', 1, 2.5)}
    >

      <directionalLight position={[1, 10, 1]} intensity={2} color="#ffffff"/>

      {/* Right Spotlight aiming to the left */}
      <SpotLight
        color="#d53c3d"
        intensity={25}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        position={[0.5, 0.75, 2.2]}
        target-position={[-0.25, 0.25, 0.25]}
      />

      {/* Left Spotlight aiming to the right */}
      <SpotLight
        color="#d53c3d"
        intensity={25}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        position={[-0.5, 0.75, 2.2]}
        target-position={[0.25, 0.25, 0.25]}
      />

      <HtmlText btnClicked={btnClicked} handleClick={handleClick}/>

      <Ground btnClicked={btnClicked}/>
      
      <CameraRig />

  
      <EffectComposer >
        <ChromaticAberration 
          offset={btnClicked ? [0.3, 0.3] : [0.01, 0.01]} 
          radialModulation={true}
          modulationOffset={0.5}
          modulationScale={0.5}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

    </Canvas>
  );
};

const HtmlText = ({btnClicked, handleClick}) => {
  const htmlRef = useRef();
  const speedRef = useRef(0);

  useFrame((state) => {
    if (htmlRef.current) {
      if (btnClicked) {
        // 버튼 클릭 시 커지면서 사라지는 효과
        speedRef.current += 0.1;
        const progress = Math.min(1, speedRef.current); // 0~1 사이의 진행도
        
        // scale 효과 (1에서 2까지 커짐)
        const scale = 1 + progress;
        htmlRef.current.style.transform = `scale(${scale})`;
        
        // 페이드 아웃 효과
        const opacity = Math.max(0, 1 - progress);
        htmlRef.current.style.opacity = opacity;
      } else {
        // 버튼 해제 시 원래 크기로 복원
        speedRef.current *= 0.95;
        const progress = Math.max(0, speedRef.current);
        
        // scale 복원
        const scale = 1 + progress;
        htmlRef.current.style.transform = `scale(${scale})`;
        
        // 페이드 인 효과
        const opacity = Math.min(1, 1 - progress);
        htmlRef.current.style.opacity = opacity;
        
        if (progress < 0.01) {
          speedRef.current = 0;
        }
      }
    }
  });

  return (
    <Html position={[0, 0, 0]} center>
      <div ref={htmlRef} className="text-center w-full max-w-4xl whitespace-nowrap">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 whitespace-nowrap">
            Contact Me
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            사용자 경험을 최우선으로 하는 UI/UX 엔지니어링으로<br/>
            더 나은 디지털 경험을 만들어가고 싶습니다
        </p>

        <div className="flex justify-center mt-6">
            <button 
                onClick={handleClick}
                className="group relative overflow-hidden bg-gradient-to-r from-[#b5404a] to-[#d95949] text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 border border-red-400/20"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d95949] to-[#b5404a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="/assets/images/send.png" alt="email" className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-semibold relative z-10 tracking-wide">Contact</span>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
        </div>
        
    </div>
    </Html>
  )
}

const CameraRig = () => {
  const { camera } = useThree();
  
  // 현재 카메라 위치를 추적하기 위한 ref
  const currentPosition = useRef({ x: 0, y: 0.06, z: 1 });

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    
    // 마우스 위치를 -1에서 1 사이의 값으로 정규화
    const targetMouseX = (state.mouse.x * 0.5) * 0.1;
    const targetMouseY = (state.mouse.y * 0.5) * 0.05;
    
    // 카메라 리그의 기본 위치
    const basePosition = [0, 0.06, 1];
    
    // 부드러운 움직임을 위한 사인/코사인 함수 사용
    const xOffset = Math.sin(elapsedTime * 0.5) * 0.05;
    const yOffset = Math.sin(elapsedTime * 0.3) * 0.025;
    const zOffset = Math.cos(elapsedTime * 0.2) * 0.025;
    
    // 목표 위치 계산
    const targetX = basePosition[0] + xOffset + targetMouseX;
    const targetY = basePosition[1] + yOffset - targetMouseY;
    const targetZ = basePosition[2] + zOffset;
    
    // lerp 보간을 사용하여 부드러운 움직임 구현
    const lerpFactor = 0.05; // 보간 계수 (0.01 ~ 0.1 사이가 적당)
    
    currentPosition.current.x += (targetX - currentPosition.current.x) * lerpFactor;
    currentPosition.current.y += (targetY - currentPosition.current.y) * lerpFactor;
    currentPosition.current.z += (targetZ - currentPosition.current.z) * lerpFactor;
    
    // 카메라 위치 업데이트
    camera.position.x = currentPosition.current.x;
    camera.position.y = currentPosition.current.y;
    camera.position.z = currentPosition.current.z;
    
    // 카메라가 항상 중앙을 바라보도록 설정
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Ground = ({ btnClicked }) => {
  const plane1Ref = useRef();
  const plane2Ref = useRef();
  const speedRef = useRef(0.15);

  const { camera } = useThree();

  const gridTexture = useTexture('/assets/images/grid-6.png');
  const displacementTexture = useTexture('/assets/images/displacement-7.png');
  const metalTexture = useTexture('/assets/images/metalness-2.png');

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // 지수 가속/감속
    if (btnClicked) {
      speedRef.current *= 1.05;
      if (speedRef.current > 5) speedRef.current = 5;
    } else {
      speedRef.current *= 0.95;
      if (speedRef.current < 0.15) speedRef.current = 0.15;
    }

    // 빨려드는 효과: 카메라 앞으로 이동
    camera.position.z -= speedRef.current * 0.1;
    camera.updateProjectionMatrix();

    // 바닥의 위치 이동 (loop 효과)
    const zMove = (elapsedTime * speedRef.current) % 2;
    plane1Ref.current.position.z = zMove;
    plane2Ref.current.position.z = zMove - 2;

    // 바닥 점점 커지는 효과 (왜곡 느낌)
    const scale = 1 + elapsedTime * 0.15;
    plane1Ref.current.scale.setScalar(scale);
    plane2Ref.current.scale.setScalar(scale);
  });

  return (
    <>
      {/* 바닥 1 */}
      <mesh ref={plane1Ref} position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[1, 2, 24, 24]} />
        <meshStandardMaterial 
          color="white"
          map={gridTexture}
          displacementMap={displacementTexture}
          displacementScale={0.4}
          metalnessMap={metalTexture}
          metalness={0.96}
          roughness={0.5}
        />
      </mesh>

      {/* 바닥 2 */}
      <mesh ref={plane2Ref} position={[0, 0, -2]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[1, 2, 24, 24]} />
        <meshStandardMaterial 
          color="white"
          map={gridTexture}
          displacementMap={displacementTexture}
          displacementScale={0.4}
          metalnessMap={metalTexture}
          metalness={0.96}
          roughness={0.5}
        />
      </mesh>
    </>
  );
};

export default ContactExperience;