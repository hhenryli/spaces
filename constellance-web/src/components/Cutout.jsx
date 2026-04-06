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

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  function handlePointerOver() {
    if (meshRef.current) {
      meshRef.current.position.y += 0.2;
    }
  }

  return (
    <group>
      <mesh 
        ref={shadowRef}
        position={[position[0] + 0.1, position[1] - 0.2, position[2] - 0.1]}
        rotation={rotation}
      >
        <planeGeometry args={[scale * aspect, scale]} />
        <meshBasicMaterial 
          map={texture}  // Changed from alphaMap
          color="#000000"  // Black for shadow
          transparent 
          opacity={0.3}
        />
      </mesh>

      <mesh
        ref={meshRef}
        position={[position[0] + 0.1, position[1] - 0.2, position[2] - 0.1]}
        rotation={rotation}
        onPointerOver={handlePointerOver}
      >
        <planeGeometry args={[scale * aspect , scale]} />
        <meshBasicMaterial 
          map={texture}
          alphaTest={0.01}
          color="#dae5ed"  
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>

  );
}