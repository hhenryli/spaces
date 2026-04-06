import { useState } from 'react'
import * as THREE from "three"
import { Canvas } from '@react-three/fiber'
import Cutout from './components/Cutout'
import crumplepaper from './assets/crumplepaper.jpg'
import graphpaper from './assets/graphpaper.jpg'
import vintagepaper from './assets/vintage.jpg'
import halftone from './assets/halftone.jpg'
import './App.css'

function App() {

  return (
    <>
      <img src={halftone} className='halftone'></img>
      <img src={vintagepaper} className='vintagepaper'></img>
      <img src={crumplepaper} className='crumplepaper'></img>


      <div className="app-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="canvas" >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />

          <Cutout 
            imagePath="/cutouts/cutout1.png"
            position={[-4, 2, 0]}
            scale={2}
            rotation={[0, 0, -0.1]}
          />

          <Cutout 
            imagePath="/cutouts/cutout2.png"
            position={[0, 0, 0]}
            scale={3}
            rotation={[0, 0, 0]}
          />

          <Cutout 
            imagePath="/cutouts/cutout3.png"
            position={[5, -2, 0]}
            scale={4}
            rotation={[0, 0, 3]}
          />

          <Cutout 
            imagePath="/cutouts/cutout4.png"
            position={[-7, -3, 0]}
            scale={3}
            rotation={[0, 0, 0]}
          />
        </Canvas>
      </div>
    </>
  )
}

export default App
