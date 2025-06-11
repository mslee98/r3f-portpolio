import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RenderTexture, Text, useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { useState, useRef, useEffect, useMemo } from 'react';

import { LayerMaterial, Color, Fresnel } from 'lamina/vanilla'

const HeroExperience = () => {
    const buildingRef = useRef();
    const cameraRef = useRef();

    const { scene: buildingScene } = useGLTF('/assets/models/building.glb');

    const [screenGroup, setScreenGroup] = useState();

    const screenGroupMemo = useMemo(() => {
      const screen = buildingScene.getObjectByName("screen");
      return screen?.clone(true);
    }, [buildingScene]);

    useEffect(() => {

        // model에서 Screen 객체만 가져와서 카피
        const screenGroup = screenGroupMemo;
        if (screenGroup) {
        const cloned = screenGroup.clone(true); // true로 깊은 복사 (자식 포함)
        setScreenGroup(cloned);
        }

        // traverse 보다 getObjectByName() 으로 찾는게 더 효과적
        const buildingMesh = buildingScene.getObjectByName('buildings');
        
          // if (buildingMesh?.isMesh) {
          //   buildingMesh.material.color.set('#424040');
          // }
        if (buildingMesh?.isMesh) {
          // 기존 material 정리
          if (buildingMesh.material?.dispose) buildingMesh.material.dispose()

          // LayerMaterial로 교체
          buildingMesh.material = new LayerMaterial({
            lighting: 'standard',
            layers: [
              new Color({ color: '#000000', alpha: 1 }), // 순수 검정색 기본 색상
              new Fresnel({
                color: '#111111', // 매우 미묘한 어두운 회색 실루엣
                alpha: 1.0, // 완전히 불투명하게
                intensity: 0.1, // 매우 낮은 강도
                power: 50.0, // 매우 얇고 날카로운 윤곽선
                bias: 0.99, // 가장자리에 매우 밀착
                mode: 'add',
              }),
            ],
          })
        }

    }, [buildingScene]);


    return (
        <Canvas>
            <PerspectiveCamera 
              makeDefault // CameraShake연결을 위해서 초기값 지정을 해야함
              position={[3, 6, 12]} 
              rotation={[-0.4636476090008061, 0.21998797739545942, 0.10867903971378187]}
              ref={cameraRef} 
            />
            
            <ambientLight intensity={0.01} />
            {/* <directionalLight position={[5, 10, 5]} intensity={3} color={'#ffffff'} /> */}

            <primitive
              ref={buildingRef}
              object={buildingScene}
              position={[0, -5, 0]}
              scale={[0.1, 0.1, 0.1]}
            />
             
            {screenGroup && (
                <group
                    position={[0, -5, 0]}
                    rotation={[0, 0, 0]}
                    scale={[0.1, 0.1, 0.1]}
                >
                    <ScreenTextMeshes screenGroup={screenGroup} />
                </group>
            )}

            <EffectComposer disableNormalPass>
              <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={0.5}
                intensity={3}
                mipmapBlur
              />
              {/* <DepthOfField
                target={[0, -3, 0]} // 전광판 위치
                focalLength={0.5}
                bokehScale={15}
                height={400}
              /> */}
            </EffectComposer>


            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={100}
                roughness={10}
                depthScale={3}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={1}
              />
            </mesh>
        </Canvas>
    )
}

function MovingText({ text, color }) {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      const speed = 1;
      const range = 16;
      const t = (clock.getElapsedTime() * speed) % range;
      textRef.current.position.x = -range / 2 + t;
    }
  });

  return (
    <Text
      ref={textRef}
      font="/assets/fonts/Moneygraphy-Rounded.ttf"
      fontSize={4}
      color={color}
      position={[0, 0, 0]}
      rotation={[Math.PI, 0, 0]}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

function ScreenTextMeshes({ screenGroup }) {
  const messages = ['안녕하세요', '개발자', '이민성입니다', 'UI/UX'];
  const bgColors = ['#00ffff', '#32ff7e', '#fff9e6', '#fffa65', '#ff90f0', '#ffd1b2'];

  const textColors = ['#1a1a2e', '#2e2c4d', '#3d2c8d', '#2f195f', '#4d3c77'];

  const meshData = useMemo(() => {
    return screenGroup.children
      .filter(child => child.isMesh)
      .map(child => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        const randomTextColor = textColors[Math.floor(Math.random() * textColors.length)];

        return {
          uuid: child.uuid,
          geometry: child.geometry,
          message: randomMessage,
          bgColor: randomBgColor,
          textColor: randomTextColor
        };
      });
  }, [screenGroup]);

  return (
    <>
      {meshData.map(({ uuid, geometry, message, bgColor, textColor }) => (
        <mesh key={uuid} geometry={geometry}>
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture
              attach="map"
              width={128}
              height={128}
              anisotropy={8}
              flipY={false}
            >
              <PerspectiveCamera
                makeDefault
                manual
                aspect={1}
                position={[0, 0, 10]}
              />
              <color attach="background" args={[bgColor]} />
              <ambientLight intensity={0.5} />
              <MovingText text={message} color={textColor} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
}

export default HeroExperience;