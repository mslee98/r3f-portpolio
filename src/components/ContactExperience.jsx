import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  useTexture,
  OrbitControls,
  SpotLight
} from '@react-three/drei';
import { 
  EffectComposer, 
  ChromaticAberration 
} from '@react-three/postprocessing';
import { useRef } from 'react';
import * as THREE from 'three';

const ContactExperience = ({btnClicked}) => {
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

      <Ground btnClicked={btnClicked}/>
      
      <CameraRig />

      <EffectComposer >
        <ChromaticAberration 
          offset={btnClicked ? [0.3, 0.3] : [0.01, 0.01]} 
          radialModulation={true}
          modulationOffset={0.5}
          modulationScale={0.5}
        />
      </EffectComposer>

    </Canvas>
  );
};

const CameraRig = () => {
  const groupRef = useRef();
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

const Ground = ({btnClicked}) => {
  const plane1Ref = useRef();
  const plane2Ref = useRef();
  const speedRef = useRef(0.15); // 기본 속도
  const targetSpeedRef = useRef(0.15); // 목표 속도
  const isAcceleratingRef = useRef(false); // 가속 중인지 확인

  const gridTexture = useTexture('/assets/images/grid-6.png');
  const displacementTexture = useTexture('/assets/images/displacement-7.png');
  const metalTexture = useTexture('/assets/images/metalness-2.png');

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    
    // 버튼이 클릭되면 목표 속도를 높게 설정
    if (btnClicked && !isAcceleratingRef.current) {
      targetSpeedRef.current = 0.8; // 목표 속도를 더 낮게 설정
      isAcceleratingRef.current = true;
    } else if (!btnClicked && isAcceleratingRef.current) {
      targetSpeedRef.current = 0.15; // 기본 속도로 복원
      isAcceleratingRef.current = false;
    }
    
    // 부드러운 가속도/감속도 효과
    const accelerationFactor = 0.008; // 가속도 계수를 더 낮게 설정 (더 부드러움)
    speedRef.current += (targetSpeedRef.current - speedRef.current) * accelerationFactor;
    
    // 첫 번째 그라운드: z=0에서 시작해서 z=2까지 이동
    plane1Ref.current.position.z = (elapsedTime * speedRef.current) % 2;
    
    // 두 번째 그라운드: z=-2에서 시작해서 z=0까지 이동
    plane2Ref.current.position.z = ((elapsedTime * speedRef.current) % 2) - 2;
  });

  return (
    <>
      {/* 첫 번째 그라운드 */}
      <mesh 
        ref={plane1Ref}
        position={[0, 0, 0]} 
        rotation-x={-Math.PI * 0.5} 
      >
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

      {/* 두 번째 그라운드 */}
      <mesh 
        ref={plane2Ref}
        position={[0, 0, -2]} 
        rotation-x={-Math.PI * 0.5} 
      >
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