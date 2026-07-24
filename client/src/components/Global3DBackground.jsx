import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';

// A generic floating part that can look like an abstract mechanical component
function FloatingPart({ position, geometry, color, speed, isWireframe }) {
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
      <mesh position={position}>
        {geometry === 'torus' && <torusGeometry args={[1, 0.2, 16, 32]} />}
        {geometry === 'cylinder' && <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />}
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometry === 'cone' && <coneGeometry args={[0.5, 1.5, 32]} />}
        {geometry === 'gear' && <torusKnotGeometry args={[0.8, 0.2, 64, 12, 2, 3]} />}
        
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          wireframe={isWireframe} 
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to +1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Advanced mouse reaction system (parallax & rotation)
      // Lerp for smooth premium feel
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 2 * delta;
      groupRef.current.rotation.x += (-mouse.y * 0.3 - groupRef.current.rotation.x) * 2 * delta;
      groupRef.current.position.x += (mouse.x * 1.5 - groupRef.current.position.x) * 2 * delta;
      groupRef.current.position.y += (mouse.y * 1.5 - groupRef.current.position.y) * 2 * delta;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Mechanical Components */}
      {/* Rotors/Wheels */}
      <FloatingPart position={[-5, 3, -8]} geometry="torus" color="#171717" speed={1.5} isWireframe={false} />
      <FloatingPart position={[6, -2, -12]} geometry="torus" color="#00D2FF" speed={2} isWireframe={true} />
      
      {/* Pistons/Cylinders */}
      <FloatingPart position={[-7, -4, -10]} geometry="cylinder" color="#222222" speed={2.5} isWireframe={false} />
      <FloatingPart position={[8, 5, -15]} geometry="cylinder" color="#00FFEA" speed={1.2} isWireframe={true} />
      
      {/* Gears */}
      <FloatingPart position={[0, -6, -20]} geometry="gear" color="#A9B0B7" speed={1} isWireframe={false} />
      <FloatingPart position={[-10, 7, -18]} geometry="gear" color="#171717" speed={1.8} isWireframe={true} />
      
      {/* Other components */}
      <FloatingPart position={[12, -5, -25]} geometry="cone" color="#0B0B0B" speed={3} isWireframe={false} />
    </group>
  );
}

export default function Global3DBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ background: 'transparent' }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      {/* Diagnostic Cyan & Electric Blue accents */}
      <pointLight position={[-10, -10, -10]} intensity={200} color="#00D2FF" />
      <pointLight position={[10, -10, -10]} intensity={200} color="#00FFEA" />
      
      {/* Subtle particle background representing tech diagnostics */}
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1.5} />
      
      <Scene />
    </Canvas>
  );
}
