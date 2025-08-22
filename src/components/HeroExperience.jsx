import { Canvas, useThree, useFrame} from "@react-three/fiber";
import { PerspectiveCamera, useTexture, useGLTF, MeshReflectorMaterial, MapControls, OrbitControls, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
// import { LayerMaterial, Color, Fresnel, Depth } from 'lamina/vanilla'
// import { easing } from 'maath'

import * as THREE from 'three';

import Loader from './Loader';

import { gsap } from "gsap";

import {SpredingPoint} from '../components/SpreadingPoint';

const HeroExperience = ({hue, speed, brightness, selectedVideoType, setIsInteracting, loadingYn, setLoadingYn}) => {
    const buildingRef = useRef();
    const cameraRef = useRef();
    // const [isAnimating, setIsAnimating] = useState(false);

    // const [loadingYn, setLoadingYn] = useState(false);

    const { scene: buildingScene } = useGLTF('/assets/models/building.glb');
    // const texture = useTexture('/assets/images/norm_asphalt.webp');
    
    // 성능 최적화: 프레임 레이트 제한
    const lastFrameTime = useRef(0);
    const targetFPS = 30; // 60fps에서 30fps로 제한

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

    //로딩 종료 후 작업
   const handleLoaderFinish = () => {
      if (!cameraRef.current) return;

      const cam = cameraRef.current;

      setLoadingYn(true);
      // setIsAnimating(true); // 애니메이션 시작

      // GSAP를 사용한 애니메이션
      gsap.timeline()
        .to(cam.position, {
          x: 1.5,
          y: 6,
          z: 10,
          duration: 3,
          ease: "power2.inOut",
        })
        .to(cam.rotation, {
          x: -0.5404195002705842,
          y: 0.12792157459084388,
          z: 0.07639482055211705,
          duration: 3,
          ease: "power2.inOut",
        }, "<") // 같은 시간에 시작
        .call(() => {
          // setLoadingYn(false);
          // setIsAnimating(false); // 애니메이션 완료
        });
    };

    return (
      <>
        <Loader onFinish={handleLoaderFinish} />
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            alpha: false
          }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera 
              makeDefault
              position={[10, 15, 30]}
              fov={60}
              rotation={[-0.4636476090008061, -0.81998797739545942, 0.10867903971378187]}
              ref={cameraRef} 
            />
            <fog attach="fog" args={["#000000", 10, 25]} />
            
            <ambientLight intensity={0.01} />
            <directionalLight intensity={0.5} castShadow />

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
                    <ScreenTextMeshes screenGroup={screenGroup} hue={hue} speed={speed} brightness={brightness} selectedVideoType={selectedVideoType}/>
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

            <Html position={[3, 1.5, 3]} center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
              <SpredingPoint />
            </Html>

            <Html position={[-3.5, 5, 0]} center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
              <SpredingPoint />
            </Html>

            <Html position={[8, 2.5, -2.5]} center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
              <SpredingPoint />
            </Html>

            <Html position={[-4, 5, 5]} center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
              <SpredingPoint />
            </Html>

            <Html position={[-12, -3, 3]} center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
              <SpredingPoint />
            </Html>
          
            
            {/* 조건부 렌더링 제거하고 항상 렌더링 */}
            {loadingYn && <LimitedControls setIsInteracting={setIsInteracting}/>}


          </Suspense>
        </Canvas>
      </>
    )
}

/**
 * 카메라 바운더리 제한
 * @param {*} param0 
 * @returns 
 */
const LimitedControls = ({ bounds = 20, setIsInteracting }) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    if (!controls.current) return;

    const handleStart = () => {
      setIsInteracting(true);
    };

    controls.current.addEventListener('start', handleStart);

    return () => {
      controls.current?.removeEventListener('start', handleStart);
    };
  }, [setIsInteracting]);

  useFrame(() => {
    if (!controls.current) return;

    controls.current.update();

    // clamp camera position
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -bounds, bounds);
    // camera.position.y = THREE.MathUtils.clamp(camera.position.y, 2, 10);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -bounds, bounds);

    // clamp target as well
    const t = controls.current.target;
    t.x = THREE.MathUtils.clamp(t.x, -bounds, bounds);
    // t.y = THREE.MathUtils.clamp(t.y, 0, 5);
    t.z = THREE.MathUtils.clamp(t.z, -bounds, bounds);

    controls.current.update();
  });

  return (
    <MapControls
      ref={controls}
      enableRotate={false}
      enableZoom={false}
      enablePan={true}
      args={[camera, gl.domElement]}
    />
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
        roughness={1}            // 거울처럼
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

function useVideoTexture(src, speed = 1) {
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
    // 성능 최적화를 위한 추가 설정
    video.preload = 'metadata';
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    videoTexture.generateMipmaps = false;

    const handleLoaded = () => {
      // 사용자 상호작용 후 재생 시도
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // 재생 성공
          const clampedSpeed = Math.min(Math.max(speed, 0.25), 4);
          video.playbackRate = clampedSpeed;
          setTexture(videoTexture);
        }).catch(err => {
          console.warn('Video play failed:', err);
          // 자동 재생 실패 시 사용자 클릭 이벤트 대기
          const handleUserInteraction = () => {
            video.play().then(() => {
              const clampedSpeed = Math.min(Math.max(speed, 0.25), 4);
              video.playbackRate = clampedSpeed;
              setTexture(videoTexture);
            });
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        });
      }
    };

    const handleCanPlay = () => {
      handleLoaded();
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.pause();
      video.removeEventListener('canplay', handleCanPlay);
      video.src = '';
      video.load();
      videoTexture.dispose();
      setTexture(null);
    };
  }, [src, speed]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      const clampedSpeed = Math.min(Math.max(speed, 0.25), 4);
      videoRef.current.playbackRate = clampedSpeed;
    }
  }, [speed]);

  return texture;
}



function ScreenTextMeshes({ screenGroup, hue, speed, brightness, selectedVideoType}) {

  const videoSources = {
    'TYPE1': '/assets/videos/water_video.mp4',
    'TYPE2': '/assets/videos/square.mp4',
    'TYPE3': '/assets/videos/circle-particle.mp4',
  };

  const videoFile = videoSources[selectedVideoType] || '/assets/videos/water_video.mp4';

  const videoTexture = useVideoTexture(videoFile, speed);

  const meshData = useMemo(() => {
    return screenGroup.children
      .filter(child => child.isMesh)
      .map(child => ({
        uuid: child.uuid,
        geometry: child.geometry,
      }));
  }, [screenGroup]);

  if (!videoTexture) return null;

  return (
    <>
      {meshData.map(({ uuid, geometry }) => (
        <mesh key={uuid} geometry={geometry}>
          <HueMaterial texture={videoTexture} hue={hue} speed={speed} brightness={brightness}/>
        </mesh>
      ))}
    </>
  );
}

function HueMaterial({ texture, hue = 0, brightness=1}) {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHue: { value: hue },
    uBrightness: { value: brightness },
  }), [texture]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uHue.value = hue;
      materialRef.current.uniforms.uBrightness.value = brightness;
    }
  }, [texture, hue, brightness]);

  if (!texture) return null;

  // hue가 0이면 기본 material 사용
  if (hue === 0) {
    return (
      <meshBasicMaterial 
        map={texture}
        toneMapped={false}
      />
    );
  }

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
        uniform float uBrightness;
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
          tex.rgb *= uBrightness;
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