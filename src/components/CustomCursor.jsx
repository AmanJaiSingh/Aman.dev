import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Fast spring for main dot (extremely snappy)
  const x0 = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const y0 = useSpring(cursorY, { damping: 25, stiffness: 700 })

  // Trailing ring (smooth and delayed)
  const xRing = useSpring(cursorX, { damping: 15, stiffness: 150, mass: 0.5 })
  const yRing = useSpring(cursorY, { damping: 15, stiffness: 150, mass: 0.5 })

  // Additional trailing dots for the "trail" effect
  const x1 = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.8 })
  const y1 = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.8 })
  
  const x2 = useSpring(cursorX, { damping: 30, stiffness: 150, mass: 1.2 })
  const y2 = useSpring(cursorY, { damping: 30, stiffness: 150, mass: 1.2 })

  useEffect(() => {
    if (isTouchDevice) return

    const moveMouse = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const manageHover = (e) => {
      const target = e.target
      
      // Attempt to determine if we are hovering a clickable element
      try {
        const isClickable = 
          target.tagName?.toLowerCase() === 'a' ||
          target.tagName?.toLowerCase() === 'button' ||
          target.closest?.('a') ||
          target.closest?.('button') ||
          window.getComputedStyle(target).cursor === 'pointer'

        setIsHovering(!!isClickable)
      } catch (err) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', manageHover)

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', manageHover)
    }
  }, [cursorX, cursorY, isTouchDevice])

  // Don't render on mobile/touch devices
  if (isTouchDevice) return null

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop */
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-cyber-accent mix-blend-screen"
        style={{
          x: x0, y: y0, 
          translateX: '-50%', translateY: '-50%',
          width: isHovering ? 4 : 8, height: isHovering ? 4 : 8,
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-screen"
        style={{
          x: xRing, y: yRing, 
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 36, 
          height: isHovering ? 60 : 36,
          backgroundColor: isHovering ? 'rgba(176, 38, 255, 0.15)' : 'transparent',
          border: isHovering ? '1px solid rgba(176, 38, 255, 0.9)' : '1px solid rgba(0, 240, 255, 0.4)',
        }}
        transition={{ type: 'tween', duration: 0.2 }}
      />

      {/* Trail Dot 1 (Purple) */}
      {!isHovering && (
        <motion.div
          className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full bg-cyber-purple mix-blend-screen opacity-60"
          style={{ x: x1, y: y1, translateX: '-50%', translateY: '-50%', width: 5, height: 5 }}
        />
      )}

      {/* Trail Dot 2 (Cyan) */}
      {!isHovering && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full bg-cyber-accent mix-blend-screen opacity-30"
          style={{ x: x2, y: y2, translateX: '-50%', translateY: '-50%', width: 3, height: 3 }}
        />
      )}
    </>
  )
}
