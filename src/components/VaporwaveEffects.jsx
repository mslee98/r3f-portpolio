import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

// 사이드 라인 효과
const SideLines = () => {
  const linesRef = useRef();
  
  useFrame((state, delta) => {
    if (linesRef.current) {
      linesRef.current.position.z += delta * 2;
      if (linesRef.current.position.z > 5) {
        linesRef.current.position.z = -15;
      }
    }
  });
  
  return (
    <group ref={linesRef}>
      {/* 왼쪽 라인 */}
      <mesh position={[-2, 0.01, 0]}>
        <boxGeometry args={[0.1, 0.02, 20]} />
        <meshStandardMaterial color="#ff006e" emissive="#ff006e" emissiveIntensity={0.5} />
      </mesh>
      
      {/* 오른쪽 라인 */}
      <mesh position={[2, 0.01, 0]}>
        <boxGeometry args={[0.1, 0.02, 20]} />
        <meshStandardMaterial color="#06ffa5" emissive="#06ffa5" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// 플로팅 오브젝트들
const FloatingObjects = () => {
  const objectsRef = useRef();
  
  useFrame((state, delta) => {
    if (objectsRef.current) {
      objectsRef.current.children.forEach((child, index) => {
        child.rotation.y += delta * (0.5 + index * 0.2);
        child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
      });
    }
  });
  
  return (
    <group ref={objectsRef}>
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            Math.random() * 3 + 1,
            -Math.random() * 20
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color={Object.values(vaporwaveColors)[i % 5]}
            emissive={Object.values(vaporwaveColors)[i % 5]}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export { SideLines, FloatingObjects }; 