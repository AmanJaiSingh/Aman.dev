import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Use a very tight spring for buttery smooth tracking without lag
  const springConfig = { damping: 30, stiffness: 500, mass: 0.1 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

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

      {/* Main Single Cursor - Agency Style */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full flex items-center justify-center font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
        style={{
          x: x, y: y, 
          translateX: '-50%', translateY: '-50%',
          backgroundColor: isHovering ? 'transparent' : 'white',
          mixBlendMode: isHovering ? 'normal' : 'difference',
          border: isHovering ? '1px solid rgba(0, 240, 255, 0.5)' : 'none',
          backdropFilter: isHovering ? 'blur(4px)' : 'none'
        }}
        animate={{
          width: isHovering ? 70 : 16, 
          height: isHovering ? 70 : 16,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
      </motion.div>
    </>
  )
}
