import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from '@react-three/drei'
import { useState, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import React from 'react';

const Switch = ({position, isPressed}) => {
    const { scene } = useGLTF('/assets/models/switch.glb');
    
    const switchRef = useRef();
    const [springState, setSpringState] = useState(0);
    const [currentSpringState, setCurrentSpringState] = useState(0);

    // 각 Switch마다 고유한 scene 복사본 생성
    const uniqueScene = useMemo(() => {
        return scene.clone(true);
    }, [scene]);

    const parts = useMemo(() => {
        const partsObj = {};
        
        uniqueScene.traverse((child) => {
            if (child.isMesh) {
                const childName = child.name.toLowerCase();
                
                if (childName.includes('stem') && !childName.includes('magnet')) {
                    partsObj.stem = child;
                } else if (childName.includes('stem_magnet')) {
                    partsObj.stem_magnet = child;
                } else if (childName.includes('upperhousing')) {
                    partsObj.upperhousing = child;
                } else if (childName.includes('spring')) {
                    partsObj.spring = child;
                } else if (childName.includes('housingbase')) {
                    partsObj.housingbase = child;
                } else if (childName.includes('lightrefractor')) {
                    partsObj.lightRefractor = child;
                }
            }
        });
        
        return partsObj;
    }, [uniqueScene]);

    const handleClick = () => {
        setSpringState(1);
        
        // 0.3초 후 키 상태 리셋
        setTimeout(() => {
            setSpringState(0);
        }, 300);
    };

    useEffect(() => {
        if (isPressed) {
          setSpringState(1);
          setTimeout(() => setSpringState(0), 300);
        }
      }, [isPressed]);

    // 부드러운 애니메이션을 위한 useFrame
    useFrame(() => {
        if (switchRef.current) {
            // springState를 부드럽게 보간
            setCurrentSpringState(prev => {
                const target = springState;
                const diff = target - prev;
                return prev + diff * 0.85;
            });

            // 스냅 포인트 계산 (기계식 스위치의 클릭감)
            const snapPoint = 0.6; // 스냅 포인트 (60% 지점)
            const snapEffect = currentSpringState > snapPoint ? 
                (currentSpringState - snapPoint) / (1 - snapPoint) : 0;

            Object.keys(parts).forEach(partName => {
                const part = parts[partName];
                
                if (part) {
                    switch(partName) {
                        case 'spring':
                            // 스프링은 압축되면서 에너지 저장
                            if (part.morphTargetDictionary && part.morphTargetDictionary.springState !== undefined) {
                                const morphIndex = part.morphTargetDictionary.springState;
                                // 스프링은 전체 압축 상태를 반영
                                part.morphTargetInfluences[morphIndex] = currentSpringState;
                            } else {
                                // morphTarget이 없으면 position과 scale로 시뮬레이션
                                const springCompression = THREE.MathUtils.lerp(1, 0.6, currentSpringState);
                                part.scale.y = springCompression;
                                part.position.y = THREE.MathUtils.lerp(0, -0.4, currentSpringState);
                            }
                            break;
                            
                        case 'stem':
                            // 스템은 스냅 포인트 이후 더 많이 움직임
                            if (part.morphTargetDictionary && part.morphTargetDictionary.springState !== undefined) {
                                const morphIndex = part.morphTargetDictionary.springState;
                                // 스냅 효과를 포함한 움직임
                                const stemMovement = currentSpringState + snapEffect * 0.3;
                                part.morphTargetInfluences[morphIndex] = Math.min(stemMovement, 1);
                            } else {
                                // 스냅 포인트 이후 더 많이 움직임
                                const stemY = currentSpringState < snapPoint ? 
                                    THREE.MathUtils.lerp(0, -0.3, currentSpringState / snapPoint) :
                                    THREE.MathUtils.lerp(-0.3, -0.8, snapEffect);
                                part.position.y = stemY;
                            }
                            break;
                            
                        case 'stem_magnet':
                            // 마그넷은 스템과 함께 움직이지만 약간 지연
                            if (part.morphTargetDictionary && part.morphTargetDictionary.springState !== undefined) {
                                const morphIndex = part.morphTargetDictionary.springState;
                                const magnetMovement = currentSpringState + snapEffect * 0.2;
                                part.morphTargetInfluences[morphIndex] = Math.min(magnetMovement, 1);
                            } else {
                                const magnetY = currentSpringState < snapPoint ? 
                                    THREE.MathUtils.lerp(0, -0.2, currentSpringState / snapPoint) :
                                    THREE.MathUtils.lerp(-0.2, -0.6, snapEffect);
                                part.position.y = magnetY;
                            }
                            break;

                    }
                }
            });

            // 전체 스위치에 미세한 회전 효과
            const rotationX = THREE.MathUtils.lerp(0, 0.02, currentSpringState);
            switchRef.current.rotation.x = rotationX;
        }
    });

    
    return (
        <group 
            ref={switchRef}
            position={position}
            onClick={handleClick}
            // onPointerOver={(e) => {
            //     document.body.style.cursor = 'pointer';
            // }}
            // onPointerOut={(e) => {
            //     document.body.style.cursor = 'auto';
            // }}
        >
            <primitive object={uniqueScene} />
            
            {/* 디버깅용 HTML 오버레이 */}
            {/* <Html position={[0, 1, 0]} center>
                <div 
                    className="text-white text-xs font-bold bg-black/50 px-1 py-0.5 rounded cursor-pointer select-none"
                    onClick={handleClick}
                    style={{ 
                        transform: `scale(${1 + currentSpringState * 0.3}) translateY(${-currentSpringState * 15}px)`,
                        transition: 'all 0.1s ease',
                        userSelect: 'none'
                    }}
                >
                    CLICK (State: {currentSpringState.toFixed(2)})
                </div>
            </Html> */}
        </group>
    )
}

export default Switch;