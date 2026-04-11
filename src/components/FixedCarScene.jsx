import { useRef, useEffect, useCallback } from 'react'

/**
 * 2D top-down car on a straight road on the right edge.
 * Dragging the car up/down scrolls the page.
 * Scrolling the page moves the car up/down.
 */
export default function FixedCarScene() {
  const trackRef  = useRef(null)  // the thin road strip
  const carRef    = useRef(null)  // the car div
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)

  /* ── helper: map scroll progress (0→1) to car Y inside track ── */
  const scrollToCarY = useCallback(() => {
    const track = trackRef.current
    const car   = carRef.current
    if (!track || !car) return
    const trackH = track.clientHeight
    const carH   = car.offsetHeight
    const maxY   = trackH - carH
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight
    const progress  = scrollMax > 0 ? window.scrollY / scrollMax : 0
    // Use translate3d for GPU acceleration and prevent layout thrashing
    car.style.transform = `translate3d(-50%, ${progress * maxY}px, 0)`
  }, [])

  /* ── sync car position when user scrolls ── */
  useEffect(() => {
    window.addEventListener('scroll', scrollToCarY, { passive: true })
    scrollToCarY() // initial position
    return () => window.removeEventListener('scroll', scrollToCarY)
  }, [scrollToCarY])

  /* ── pointer-drag → scroll the page ── */
  const onPointerDown = useCallback((e) => {
    isDragging.current    = true
    dragStartY.current    = e.clientY
    dragStartScroll.current = window.scrollY
    e.currentTarget.setPointerCapture(e.pointerId)
    e.preventDefault()
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const track = trackRef.current
    const car   = carRef.current
    if (!track || !car) return

    const dy        = e.clientY - dragStartY.current
    const trackH    = track.clientHeight
    const carH      = car.offsetHeight
    const maxY      = trackH - carH
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight

    // ratio of px dragged to available track
    const scrollDelta = (dy / maxY) * scrollMax
    window.scrollTo({ top: dragStartScroll.current + scrollDelta, behavior: 'instant' })
  }, [])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <div
      id="car-scene-fixed"
      style={{
        position:   'fixed',
        right:      0,
        top:        0,
        width:      '72px',
        height:     '100vh',
        zIndex:     50,
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        // subtle tinted background for the panel
        background: 'linear-gradient(180deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.95) 100%)',
        borderLeft: '1px solid rgba(0,240,255,0.08)',
      }}
    >
      {/* Road track */}
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          width:    '28px',
          height:   '100%',
          margin:   '0 auto',
          display:  'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Road surface */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: '#0a0a14',
          borderRadius: '2px',
          border:     '1px solid rgba(0,240,255,0.12)',
          boxShadow:  'inset 0 0 20px rgba(0,0,0,0.6)',
        }} />

        {/* Left neon edge */}
        <div style={{
          position:   'absolute',
          left:       '3px',
          top:        0,
          bottom:     0,
          width:      '2px',
          background: 'linear-gradient(180deg, transparent, #00f0ff 20%, #00f0ff 80%, transparent)',
          opacity:    0.6,
          boxShadow:  '0 0 6px #00f0ff',
        }} />
        {/* Right neon edge */}
        <div style={{
          position:   'absolute',
          right:      '3px',
          top:        0,
          bottom:     0,
          width:      '2px',
          background: 'linear-gradient(180deg, transparent, #00f0ff 20%, #00f0ff 80%, transparent)',
          opacity:    0.6,
          boxShadow:  '0 0 6px #00f0ff',
        }} />

        {/* Animated dashed center lines */}
        <div style={{
          position:  'absolute',
          left:      '50%',
          top:       0,
          bottom:    0,
          width:     '2px',
          transform: 'translateX(-50%)',
          overflow:  'hidden',
        }}>
          <DashLine />
        </div>

        {/* ── The draggable Car ── */}
        <div
          ref={carRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            position:    'absolute',
            left:        '50%',
            top:         0,
            transform:   'translate3d(-50%, 0, 0)',
            width:       '18px',
            height:      '34px',
            cursor:      'grab',
            pointerEvents: 'all',
            userSelect:  'none',
            touchAction: 'none',
            zIndex:      10,
            filter:      'drop-shadow(0 0 6px #00f0ff)',
            transition:  'filter 0.2s ease',
          }}
          title="Drag to scroll"
        >
          <CarTopView />
        </div>
      </div>

      {/* Scroll label */}
      <div style={{
        position:   'absolute',
        bottom:     '12px',
        fontSize:   '7px',
        fontFamily: 'Fira Code, monospace',
        color:      'rgba(0,240,255,0.4)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        writingMode: 'vertical-rl',
        pointerEvents: 'none',
      }}>
        drag
      </div>
    </div>
  )
}

/* ── Animated dashed center line ── */
function DashLine() {
  return (
    <div style={{
      position: 'absolute',
      top:      0,
      left:     0,
      right:    0,
      bottom:   0,
      animation: 'dashScroll 1.4s linear infinite',
    }}>
      <style>{`
        @keyframes dashScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }
      `}</style>
      <div style={{
        width:           '100%',
        height:          '200%',
        backgroundImage: 'repeating-linear-gradient(180deg, #ffd700 0px, #ffd700 8px, transparent 8px, transparent 20px)',
        opacity:         0.5,
        animation:       'dashScroll 1.4s linear infinite',
        backgroundSize:  '2px 20px',
      }} />
    </div>
  )
}

/* ── Top-down 2D car SVG ── */
function CarTopView() {
  return (
    <svg
      width="18"
      height="34"
      viewBox="0 0 18 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Car body */}
      <rect x="2" y="3" width="14" height="28" rx="3" fill="#1a0533" />
      {/* Windshields */}
      <rect x="4" y="5"  width="10" height="7" rx="1.5" fill="#00f0ff" opacity="0.5" />
      <rect x="4" y="22" width="10" height="7" rx="1.5" fill="#ff003c" opacity="0.5" />
      {/* Cabin top */}
      <rect x="5" y="12" width="8" height="10" rx="1" fill="#0d0120" />
      {/* Front headlights */}
      <circle cx="4"  cy="5"  r="2" fill="#00f0ff" opacity="0.9" />
      <circle cx="14" cy="5"  r="2" fill="#00f0ff" opacity="0.9" />
      {/* Rear lights */}
      <circle cx="4"  cy="29" r="2" fill="#ff003c" opacity="0.9" />
      <circle cx="14" cy="29" r="2" fill="#ff003c" opacity="0.9" />
      {/* Neon underglow strip */}
      <rect x="1" y="15" width="2"  height="4" rx="1" fill="#b026ff" opacity="0.8" />
      <rect x="15" y="15" width="2" height="4" rx="1" fill="#b026ff" opacity="0.8" />
      {/* Wheels */}
      <rect x="0"  y="7"  width="4" height="6" rx="1" fill="#222" />
      <rect x="14" y="7"  width="4" height="6" rx="1" fill="#222" />
      <rect x="0"  y="21" width="4" height="6" rx="1" fill="#222" />
      <rect x="14" y="21" width="4" height="6" rx="1" fill="#222" />
    </svg>
  )
}
