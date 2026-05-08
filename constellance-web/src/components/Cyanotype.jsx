import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Cyanotype({ 
  imagePath, 
  position = [0, 0, 0], 
  scale = 1,
  rotation = [0, 0, 0]
}) {
  const meshRef = useRef();
  const texture = useTexture(imagePath);
  const aspect = texture.image.width / texture.image.height;
  const targetY = useRef(position[1]);

  useFrame((state) => {
    if (meshRef.current) {
      const floatOffset = Math.sin(state.clock.elapsedTime) * 0.1;
      const desiredY = targetY.current + floatOffset;
    }
  });

  function handlePointerOver() {
    targetY.current = position[1] + 0.2;
  }
  
  function handlePointerOut() {
    targetY.current = position[1];
  }

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[scale * aspect, scale]} />
      <meshBasicMaterial 
        alphaMap={texture}  // Uses image as transparency mask
        color="#FFFFFF"     // Solid cyanotype blue
        transparent 
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}