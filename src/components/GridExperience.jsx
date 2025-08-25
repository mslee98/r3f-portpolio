import { Canvas, useFrame} from "@react-three/fiber";
import { PerspectiveCamera, useTexture, useGLTF, MeshReflectorMaterial, MapControls, OrbitControls, Html, Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, N8AO } from '@react-three/postprocessing'
import { useState, useRef, useEffect, useMemo, Suspense, useReducer } from 'react';
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { easing } from 'maath';


const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.75 },
  { color: '#444', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true }
]

const GridExperience = () => {
    const [accent, click] = useReducer((state) => ++state % accents.length, 0)
    const [contextLost, setContextLost] = useState(false)
    const connectors = useMemo(() => shuffle(accent), [accent])

    // 에러 처리 추가
    if (!connectors) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#282b4b] to-[#1f1e39]">
                <p className="text-white/60 text-sm">Failed to load 3D scene</p>
            </div>
        );
    }

    // WebGL 컨텍스트 손실 처리
    if (contextLost) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#282b4b] to-[#1f1e39]">
                <div className="text-center">
                    <p className="text-white/60 text-sm mb-4">WebGL Context Lost</p>
                    <button 
                        onClick={() => setContextLost(false)}
                        className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Canvas 
            onClick={click} 
            shadows={true}
            dpr={1}
            gl={{ 
                antialias: true, 
                powerPreference: "default",
                stencil: true,
                depth: true,
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false
            }} 
            camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
            style={{ width: '100%', height: '100%' }}
            onContextLost={(event) => {
                console.log('WebGL Context Lost:', event);
                setContextLost(true);
            }}
            onContextRestored={() => {
                console.log('WebGL Context Restored');
                setContextLost(false);
            }}
        >
            <color attach="background" args={['#141622']} />
            <ambientLight intensity={0.4} />
            <Physics gravity={[0, 0, 0]} maxStabilizationIterations={1} maxSolverIterations={1}>
                <Pointer />
                {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
                <Connector position={[10, 10, 5]}>
                <Model>
                    <MeshTransmissionMaterial 
                        clearcoat={1} 
                        thickness={0.1} 
                        anisotropicBlur={0.05} 
                        chromaticAberration={0.05} 
                        samples={2} 
                        resolution={128} 
                    />
                </Model>
                </Connector>
            </Physics>
            <Environment resolution={64}>
                <group rotation={[-Math.PI / 3, 0, 1]}>
                <Lightformer form="circle" intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                </group>
            </Environment>
        </Canvas>
    )
}

export default GridExperience;

function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
    const api = useRef()
    const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
    useFrame((state, delta) => {
      if (api.current && state.clock.elapsedTime % 0.1 < delta) {
        api.current.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
      }
    })
    return (
      <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
        <CuboidCollider args={[0.38, 1.27, 0.38]} />
        <CuboidCollider args={[1.27, 0.38, 0.38]} />
        <CuboidCollider args={[0.38, 0.38, 1.27]} />
        {children ? children : <Model {...props} />}
        {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
      </RigidBody>
    )
  }
  
  function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
      ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
    })
    return (
      <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
        <BallCollider args={[1]} />
      </RigidBody>
    )
  }
  
  function Model({ children, color = 'white', roughness = 0, ...props }) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/assets/models/c-transformed.glb')
    useFrame((state, delta) => {
      easing.dampC(ref.current.material.color, color, 0.2, delta)
    })
    return (
      <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
        <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
        {children}
      </mesh>
    )
  }