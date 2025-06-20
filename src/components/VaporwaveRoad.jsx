import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  Lightformer,
  useTexture,
  MeshTransmissionMaterial 
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Vignette, 
  N8AO,
  RGBShift 
} from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Vaporwave 색상 팔레트
const vaporwaveColors = {
  pink: '#ff006e',
  purple: '#8338ec',
  blue: '#3a86ff',
  cyan: '#06ffa5',
  yellow: '#ffbe0b'
};

const VaporwaveRoad = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 1.5]} 
      gl={{ antialias: false }} 
      camera={{ position: [0, 0.5, 2], fov: 75, near: 0.01, far: 20 }}
    >
      {/* 배경색 */}
      <color attach="background" args={['#0a0a0a']} />
      
      {/* 조명 */}
      <ambientLight intensity={0.1} />
      
      {/* 스포트라이트들 */}
      <SpotLight 
        position={[2, 3, 2]} 
        target={[-0.5, 0, 0.5]} 
        color={vaporwaveColors.pink}
        intensity={15}
      />
      <SpotLight 
        position={[-2, 3, 2]} 
        target={[0.5, 0, 0.5]} 
        color={vaporwaveColors.blue}
        intensity={15}
      />
      
      {/* 지형 */}
      <Road />
      
      {/* 환경 조명 */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer 
            form="circle" 
            intensity={2} 
            rotation-x={Math.PI / 2} 
            position={[0, 5, -9]} 
            scale={2} 
            color={vaporwaveColors.cyan}
          />
          <Lightformer 
            form="circle" 
            intensity={1} 
            rotation-y={Math.PI / 2} 
            position={[-5, 1, -1]} 
            scale={2} 
            color={vaporwaveColors.purple}
          />
          <Lightformer 
            form="circle" 
            intensity={1} 
            rotation-y={-Math.PI / 2} 
            position={[10, 1, 0]} 
            scale={8} 
            color={vaporwaveColors.yellow}
          />
        </group>
      </Environment>
      
      {/* 후처리 효과 */}
      <EffectComposer disableNormalPass multisampling={8}>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.6} 
          luminanceSmoothing={0.9} 
        />
        <Vignette 
          darkness={0.4} 
          offset={0.5} 
        />
        <RGBShift 
          offset={[0.002, 0.002]} 
        />
      </EffectComposer>
    </Canvas>
  );
};

// 스포트라이트 컴포넌트
const SpotLight = ({ position, target, color, intensity }) => {
  const lightRef = useRef();
  const targetRef = useRef();
  
  return (
    <group>
      <spotLight
        ref={lightRef}
        position={position}
        target={targetRef.current}
        color={color}
        intensity={intensity}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        distance={25}
        castShadow
      />
      <primitive object={new THREE.Object3D()} ref={targetRef} position={target} />
    </group>
  );
};

// 길 컴포넌트
const Road = () => {
  const roadRef = useRef();
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // 그리드 패턴 생성
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    // 수직선
    for (let x = 0; x <= 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    
    // 수평선
    for (let y = 0; y <= 512; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 20);
    
    return texture;
  }, []);
  
  // 무한 스크롤 애니메이션
  useFrame((state, delta) => {
    if (roadRef.current) {
      // 텍스처 오프셋을 변경하여 무한 스크롤 효과
      roadRef.current.material.map.offset.y += delta * 0.5;
    }
  });
  
  return (
    <mesh 
      ref={roadRef}
      rotation-x={-Math.PI * 0.5} 
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[4, 20, 32, 32]} />
      <meshStandardMaterial 
        map={gridTexture}
        metalness={0.8}
        roughness={0.2}
        color="#2a2a2a"
      />
    </mesh>
  );
};

// 카메라 컨트롤러
const CameraController = () => {
  const cameraRef = useRef();
  
  useFrame((state, delta) => {
    if (cameraRef.current) {
      // 카메라를 앞으로 이동시켜 무한 길 효과
      cameraRef.current.position.z -= delta * 0.5;
      
      // 카메라가 너무 멀리 가면 리셋
      if (cameraRef.current.position.z < -10) {
        cameraRef.current.position.z = 2;
      }
    }
  });
  
  return null;
};

export default VaporwaveRoad; 