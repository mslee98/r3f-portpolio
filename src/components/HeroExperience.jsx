import { Canvas, useFrame, extend } from "@react-three/fiber";
import { PerspectiveCamera, RenderTexture, useTexture, useGLTF, MeshReflectorMaterial, MapControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Outline, Vignette } from '@react-three/postprocessing'
import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
// import { LayerMaterial, Color, Fresnel, Depth } from 'lamina/vanilla'
// import { easing } from 'maath'

import * as THREE from 'three';

import Loader from './Loader';

import { gsap } from "gsap";

const HeroExperience = ({hue}) => {
    const buildingRef = useRef();
    const cameraRef = useRef();

    const { scene: buildingScene } = useGLTF('/assets/models/building.glb');
    // const texture = useTexture('/assets/images/norm_asphalt.webp');

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
        // const buildingMesh = buildingScene.getObjectByName('buildings');
        
        buildingScene.traverse((child) => {



          if(child.name.indexOf('screen') > 0) return;

          if (child.isMesh) {
            // 기존에 추가된 edge가 있다면 제거
            if (child.userData.edgeLine) {
              child.remove(child.userData.edgeLine);
              child.userData.edgeLine.geometry.dispose();
              child.userData.edgeLine.material.dispose();
            }

            child.material = new THREE.MeshStandardMaterial({
              color: 0x333333, // 더 어두운 회색
              roughness: 0.8,
              metalness: 0.1,
            });

            // EdgesGeometry 생성
            const edgeGeometry = new THREE.EdgesGeometry(child.geometry, 1); // thresholdAngle=1(기본값)
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x555555, linewidth: 1 });
            const edgeLine = new THREE.LineSegments(edgeGeometry, edgeMaterial);

            // Mesh와 동일한 위치/회전/스케일로 맞추기
            edgeLine.position.copy(child.position);
            edgeLine.rotation.copy(child.rotation);
            edgeLine.scale.copy(child.scale);

            // Mesh에 외곽선 추가
            child.add(edgeLine);
            child.userData.edgeLine = edgeLine; // 나중에 제거할 수 있도록 저장
          }
        });

    }, [buildingScene]);

   const handleLoaderFinish = () => {
      if (!cameraRef.current) return;

      const cam = cameraRef.current;

      // 회전 목표값 (도착 후 적용)
      const endRot = {
        x: -0.706476090008061,
        y: 0.12998797739545942,
        z: 0.10867903971378187,
      };

      // 곡선 정의 (현위치 → 곡선 경유점 → 목표 위치)
      const curve = new THREE.CatmullRomCurve3([
        cam.position.clone(),
        new THREE.Vector3(12, 20, 20), // 곡선 감기용 중간 포인트
        new THREE.Vector3(1.5, 6, 10),   // 도착 지점
      ]);

      const temp = { t: 0 };

      // 이동 애니메이션
      gsap.to(temp, {
        t: 1,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
          const pos = curve.getPoint(temp.t);
          cam.position.set(pos.x, pos.y, pos.z);
        },
        onComplete: () => {
          // 이동 후, 회전 애니메이션
          const currentRot = {
            x: cam.rotation.x,
            y: cam.rotation.y,
            z: cam.rotation.z,
          };

          gsap.to(currentRot, {
            ...endRot,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              cam.rotation.set(currentRot.x, currentRot.y, currentRot.z);
            },
          });
        },
      });
    };

    return (
      <>
        <Loader onFinish={handleLoaderFinish} />
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera 
              makeDefault // CameraShake연결을 위해서 초기값 지정을 해야함
              // position={[3, 6, 12]} 
              position={[10, 15, 30]}
              fov={60}
              // rotation={[-0.4636476090008061, 0.21998797739545942, 0.10867903971378187]}
              rotation={[-0.4636476090008061, 0.21998797739545942, 0.10867903971378187]}
              ref={cameraRef} 
            />
            <fog attach="fog" args={["#000000", 10, 25]} />
            
            <ambientLight intensity={0.01} />
            <directionalLight intensity={1} castShadow />

            <primitive
              ref={buildingRef}
              object={buildingScene}
              position={[0, -5, 0]}
              scale={[0.1, 0.1, 0.1]}
            />
             
            {screenGroup && (
                <group
                    position={[0, -5, 0.01]}
                    rotation={[0, 0, 0]}
                    scale={[0.1, 0.1, 0.1]}
                >
                    <ScreenTextMeshes screenGroup={screenGroup} hue={hue}/>
                </group>
            )}

            <EffectComposer disableNormalPass>
              <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={0.5}
                intensity={3}
                // mipmapBlur //이 효과 있으니 너무 번짐
              />
              <Vignette eskil={false} offset={0.2} darkness={1.1} />
            </EffectComposer>


            <Floor/>

            {/* <MapControls 
              enableRotate={false}   // 회전 비활성화
              enableZoom={true}      // 줌 가능
              enablePan={true}       // 패닝(이동) 가능
              minDistance={5}
              maxDistance={15}
            /> */}

          </Suspense>
        </Canvas>
      </>
    )
}

const Floor = () => {
  const texture = useTexture('/assets/images/norm_asphalt.webp');

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        normalMap={texture}
        blur={[500, 500]}           // 더 강한 블러 처리 (더 부드러운 반사)
        resolution={2048}           // 고해상도 반사
        mixBlur={100}               // 반사 블러와 표면 간의 혼합 비율
        mixStrength={100}             // 반사 강도 높임
        roughness={1}            // 거의 매끄럽게 (거울처럼)
        depthScale={10}            // 반사 깊이 영향 조절
        minDepthThreshold={0.01}
        maxDepthThreshold={1.0}
        color="#1a1a1a"             // 어두운 회색으로 바닥 색상 조정
        metalness={0.2}             // 높은 금속성으로 반사 강화
        // depthScale={30}
        distortion={1}
      />
    </mesh>
  );
};

function useVideoTexture(src) {
  const [texture, setTexture] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    const handleLoaded = () => {
      video.play().catch(err => {
        console.warn('Video play failed:', err);
      });
      setTexture(videoTexture);
    };

    video.addEventListener('loadeddata', handleLoaded);

    return () => {
      video.pause();
      video.removeEventListener('loadeddata', handleLoaded);
      video.src = '';
      videoTexture.dispose();
    };
  }, [src]);

  return texture;
}

function ScreenTextMeshes({ screenGroup, hue }) {
  const videoFile = '/assets/videos/water_video.mp4'; // 모든 스크린에 동일 비디오 사용

  const meshData = useMemo(() => {
    return screenGroup.children
      .filter(child => child.isMesh)
      .map(child => ({
        uuid: child.uuid,
        geometry: child.geometry,
      }));
  }, [screenGroup]);

  const videoTexture = useVideoTexture(videoFile);

  if (!videoTexture) return null;

  return (
    <>
      {meshData.map(({ uuid, geometry }) => (
        <mesh key={uuid} geometry={geometry}>
          <HueMaterial texture={videoTexture} hue={hue} />
          {/* <meshBasicMaterial
            toneMapped={false}
            map={videoTexture}
          /> */}
        </mesh>
      ))}
    </>
  );
}

function HueMaterial({ texture, hue = 0 }) {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHue: { value: hue },
  }), [texture]); // hue는 포함하지 않음

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uHue.value = hue;
    }
  }, [hue]);

  if (!texture) return null;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform sampler2D uTexture;
        uniform float uHue;
        varying vec2 vUv;

        vec3 hueShift(vec3 color, float hue) {
          const mat3 rgb2yiq = mat3(
            0.299, 0.587, 0.114,
            0.596, -0.274, -0.322,
            0.211, -0.523, 0.312
          );
          const mat3 yiq2rgb = mat3(
            1.0, 0.956, 0.621,
            1.0, -0.272, -0.647,
            1.0, -1.106, 1.703
          );
          vec3 yiq = rgb2yiq * color;
          float angle = hue * 6.28318530718;
          float cosA = cos(angle);
          float sinA = sin(angle);
          mat3 hueRotation = mat3(
            1.0, 0.0, 0.0,
            0.0, cosA, -sinA,
            0.0, sinA, cosA
          );
          yiq = hueRotation * yiq;
          return clamp(yiq2rgb * yiq, 0.0, 1.0);
        }

        void main() {
          vec4 tex = texture2D(uTexture, vUv);
          tex.rgb = hueShift(tex.rgb, uHue);
          gl_FragColor = tex;
        }
      `}
      uniforms={uniforms}
      transparent
      toneMapped={false}
    />
  );
}

// function MovingText({ text, color }) {
//   const textRef = useRef();

//   useFrame(({ clock }) => {
//     if (textRef.current) {
//       const speed = 1;
//       const range = 16;
//       const t = (clock.getElapsedTime() * speed) % range;
//       textRef.current.position.x = -range / 2 + t;
//     }
//   });

//   return (
//     <Text
//       ref={textRef}
//       font="/assets/fonts/Moneygraphy-Rounded.ttf"
//       fontSize={4}
//       color={color}
//       position={[0, 0, 0]}
//       rotation={[Math.PI, 0, 0]}
//       anchorX="center"
//       anchorY="middle"
//     >
//       {text}
//     </Text>
//   );
// }

// function ScreenTextMeshes({ screenGroup }) {
//   const messages = ['안녕하세요', '개발자', '이민성입니다', 'UI/UX'];
//   const bgColors = ['#00ffff', '#32ff7e', '#fff9e6', '#fffa65', '#ff90f0', '#ffd1b2'];

//   const textColors = ['#1a1a2e', '#2e2c4d', '#3d2c8d', '#2f195f', '#4d3c77'];

//   const meshData = useMemo(() => {
//     return screenGroup.children
//       .filter(child => child.isMesh)
//       .map(child => {
//         const randomMessage = messages[Math.floor(Math.random() * messages.length)];
//         const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
//         const randomTextColor = textColors[Math.floor(Math.random() * textColors.length)];

//         return {
//           uuid: child.uuid,
//           geometry: child.geometry,
//           message: randomMessage,
//           bgColor: randomBgColor,
//           textColor: randomTextColor
//         };
//       });
//   }, [screenGroup]);

//   return (
//     <>
//       {meshData.map(({ uuid, geometry, message, bgColor, textColor }) => (
//         <mesh key={uuid} geometry={geometry}>
//           <meshBasicMaterial toneMapped={false}>
//             <RenderTexture
//               attach="map"
//               width={128}
//               height={128}
//               anisotropy={8}
//               flipY={false}
//             >
//               <PerspectiveCamera
//                 makeDefault
//                 manual
//                 aspect={1}
//                 position={[0, 0, 10]}
//               />
//               <color attach="background" args={[bgColor]} />
//               <ambientLight intensity={0.5} />
//               <MovingText text={message} color={textColor} />
//             </RenderTexture>
//           </meshBasicMaterial>
//         </mesh>
//       ))}
//     </>
//   );
// }

export default HeroExperience;