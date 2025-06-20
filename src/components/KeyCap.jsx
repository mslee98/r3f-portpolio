import { useGLTF, useTexture } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import keyboardData from '../keyboardData.json';

const KeyCap = ({ keyName, keyData }) => {
  const { capModel, position } = keyData;
  const { scene } = useGLTF('/assets/models/Keycaps.glb');

  console.log(keyName, capModel, position);

  const mesh = useMemo(() => {
    let found = null;
    scene.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase() === capModel.toLowerCase()) {
        found = child.clone();
      }
    });
    return found;
  }, [scene, capModel]);

  if (!mesh) return null;

  return <primitive object={mesh} position={[position.x, position.y, position.z]} />;
};

export default KeyCap;
