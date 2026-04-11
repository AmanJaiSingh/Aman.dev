import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    if (isTouchDevice) return

    const moveMouse = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const manageHover = (e) => {
      const target = e.target
      
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

  if (isTouchDevice) return null

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Container tracking raw mouse coords = ZERO lag */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorX, y: cursorY, 
          translateX: '-50%', translateY: '-50%',
        }}
      >
        {/* Core Dot (disappears on hover) */}
        <motion.div
          animate={{
            width: isHovering ? 0 : 8,
            height: isHovering ? 0 : 8,
            opacity: isHovering ? 0 : 1,
          }}
          className="bg-cyber-accent rounded-full absolute"
          style={{ boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff' }}
          transition={{ duration: 0.15 }}
        />
        
        {/* Catchy Outer Shape: Diamond transforms to Scope */}
        <motion.div
          className="absolute border border-cyber-accent"
          animate={{
            width: isHovering ? 50 : 20,
            height: isHovering ? 50 : 20,
            rotate: isHovering ? 90 : 45,
            borderRadius: isHovering ? '50%' : '4px',
            backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            boxShadow: isHovering ? '0 0 20px rgba(0, 240, 255, 0.4) inset, 0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        />
      </motion.div>
    </>
  )
}
