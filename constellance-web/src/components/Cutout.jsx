import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Cutout({ 
  imagePath, 
  position = [0, 0, 0], 
  scale = 1,
  rotation = [0, 0, 0]
}) {
  const meshRef = useRef();
  const shadowRef = useRef();
  const texture = useTexture(imagePath);
  const aspect = texture.image.width / texture.image.height;
  const targetY = useRef(position[1]);


  useFrame((state) => {
    if (meshRef.current) {
      const floatOffset = Math.sin(state.clock.elapsedTime) * 0.1;
      const desiredY = targetY.current + floatOffset;
      
      // Smooth transition (lerp)
      meshRef.current.position.y += (desiredY - meshRef.current.position.y) * 0.1;
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  function handlePointerOver() {
    targetY.current = position[1] + 0.2;
  }
  
  function handlePointerOut() {
    targetY.current = position[1];
  }

  return (
    <group>
      {/* Shadow */}
      <mesh 
        ref={shadowRef}
        position={[position[0] + 0.1, position[1] - 0.2, position[2] - 0.1]}
        rotation={rotation}
      >
        <planeGeometry args={[scale * aspect, scale]} />
        <meshBasicMaterial 
          map={texture}
          color="#000000"
          transparent 
          opacity={0.3}
        />
      </mesh>

      {/* Front side (your image) */}
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[scale * aspect, scale]} />
        <meshBasicMaterial 
          map={texture}
          alphaTest={0.01}
          color="#dae5ed"  
          transparent 
          opacity={0.8}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}