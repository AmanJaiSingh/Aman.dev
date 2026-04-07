import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleLayer({ count, color, size, speedX, speedY, radius }) {
  const ref = useRef()
  
  const { positions, texture } = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = radius * (0.6 + Math.random() * 0.6)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    
    // Create a circular gradient texture for a glowing orb effect
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(canvas)
    
    return { positions: arr, texture: tex }
  }, [count, radius])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * speedX
    ref.current.rotation.y -= delta * speedY
    // Add a slight bobbing effect based on time
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speedX * 2) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        map={texture}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

function Particles() {
  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      {/* Plentiful distinct cyan particles */}
      <ParticleLayer count={400} color="#00f0ff" size={0.03} speedX={0.04} speedY={0.03} radius={2.0} />
      {/* Larger glowing purple orbs */}
      <ParticleLayer count={150} color="#b026ff" size={0.07} speedX={0.02} speedY={0.05} radius={1.8} />
      {/* Very large bright blue/white glowing focus elements */}
      <ParticleLayer count={40} color="#40ffff" size={0.15} speedX={0.015} speedY={0.02} radius={1.5} />
    </group>
  )
}

export default function CyberBackground() {
  return (
    <div className="absolute inset-0 z-0" style={{ background: '#07070d' }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
        <Particles />
      </Canvas>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #07070d 100%)',
        }}
      />
    </div>
  )
}
