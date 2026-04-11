import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Main dot exactly tracks the cursor to eliminate perceived lag
  const x0 = cursorX
  const y0 = cursorY

  // Trailing ring (smooth and delayed)
  const xRing = useSpring(cursorX, { damping: 20, stiffness: 100, mass: 0.3 })
  const yRing = useSpring(cursorY, { damping: 20, stiffness: 100, mass: 0.3 })

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
          width: isHovering ? 60 : 40, 
          height: isHovering ? 60 : 40,
          backgroundColor: isHovering ? 'rgba(176, 38, 255, 0.15)' : 'transparent',
          border: isHovering ? '1px solid rgba(176, 38, 255, 0.9)' : '1px solid rgba(0, 240, 255, 0.3)',
        }}
        transition={{ type: 'tween', duration: 0.2 }}
      />
    </>
  )
}
