import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  Lightformer,
  useTexture,
  MeshTransmissionMaterial,
  OrbitControls
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Vignette, 
  N8AO,
  ChromaticAberration 
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

const ContactExperience = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 1.5]} 
      gl={{ antialias: false }} 
      camera={{ position: [0, 2, 6], fov: 45, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 10, 1]} intensity={1} />

      <Grid />

      <OrbitControls />
    </Canvas>
  );
};

const Grid = () => {
  return (
    <mesh position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[1, 2, 24, 24]} />
      <meshStandardMaterial color="#ffffff" wireframe={true} />
    </mesh>
  )
}



export default ContactExperience;