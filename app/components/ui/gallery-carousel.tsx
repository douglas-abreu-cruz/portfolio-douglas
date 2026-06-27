'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ITEMS = [
  { src: '/images/gallery/theora-hero-gallery.png', href: '/3dartist/theora' },
  { src: '/images/gallery/design-nutrachamps-instagram-gallery.png', href: '/design/nutrachamps' },
  { src: '/images/gallery/curtain-banana-gallery.png', href: '/archviz/bathroom-katespade' },
  { src: '/images/gallery/design-dsm-hero-gallery.png', href: '/design/dsm' },
  { src: '/images/gallery/props-cheese-3d-gallery.png', href: '/3dartist/props' },
  { src: '/images/gallery/design-fraternity-hero-gallery.png', href: '/design/fraternity' },
  { src: '/images/gallery/robot-front-gallery.png', href: '/3dartist/robot' },
  { src: '/images/gallery/design-uaipizza-box-gallery.png', href: '/design/uaipizza' },
  { src: '/images/gallery/provence-subway-close-gallery.png', href: '/archviz/restaurant' },
]

const INFINITE_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS]
const ITEM_HEIGHT = 352
const ITEM_GAP = 8
const AUTO_SPEED = 0.4

export function GalleryCarousel() {
  const router = useRouter()
  const wrapRef = useRef<HTMLDivElement>(null)
  const wrapRef2 = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackRef2 = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const state = useRef({
    x: 0, startX: 0, velX: 0, lastX: 0,
    isDragging: false, rafId: 0, autoRafId: 0, didDrag: false,
    initialized: false,
  })
  const state2 = useRef({
    x: 0, initialized: false, autoRafId: 0,
    isDragging: false, didDrag: false, startX: 0, lastX: 0, velX: 0,
  })

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    const s = state.current

    const sectionWidth = () => track.scrollWidth / 3

    const clampInfinite = (v: number) => {
      const sw = sectionWidth()
      if (v > -sw) return v - sw
      if (v < -(sw * 2)) return v + sw
      return v
    }

    if (!s.initialized) {
      s.x = -sectionWidth()
      track.style.transform = `translateX(${s.x}px)`
      s.initialized = true
    }

    function autoPlay() {
      if (s.isDragging) { s.autoRafId = requestAnimationFrame(autoPlay); return }
      s.x = s.x - AUTO_SPEED
      s.x = clampInfinite(s.x)
      track.style.transform = `translateX(${s.x}px)`
      s.autoRafId = requestAnimationFrame(autoPlay)
    }

    function autoPlay2() {
      const track2 = trackRef2.current
      if (!track2) return
      const s2 = state2.current
      if (s2.isDragging) { s2.autoRafId = requestAnimationFrame(autoPlay2); return }
      const sw = track2.scrollWidth / 3
      if (!s2.initialized) {
        s2.x = -sw
        track2.style.transform = `translateX(${s2.x}px)`
        s2.initialized = true
      }
      s2.x = s2.x + AUTO_SPEED
      if (s2.x > -sw + sw) s2.x = s2.x - sw
      track2.style.transform = `translateX(${s2.x}px)`
      s2.autoRafId = requestAnimationFrame(autoPlay2)
    }

    function momentum() {
      if (Math.abs(s.velX) < 0.5) { autoPlay(); return }
      s.velX *= 0.95
      s.x = s.x + s.velX
      s.x = clampInfinite(s.x)
      track.style.transform = `translateX(${s.x}px)`
      s.rafId = requestAnimationFrame(momentum)
    }

    // — Linha 1 drag —
    const onMouseDown = (e: MouseEvent) => {
      s.isDragging = true; s.didDrag = false
      s.startX = e.clientX - s.x; s.lastX = e.clientX; s.velX = 0
      cancelAnimationFrame(s.rafId)
      cancelAnimationFrame(s.autoRafId)
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!s.isDragging) return
      if (Math.abs(e.clientX - s.lastX) > 3) s.didDrag = true
      s.velX = e.clientX - s.lastX; s.lastX = e.clientX
      s.x = e.clientX - s.startX
      s.x = clampInfinite(s.x)
      track.style.transform = `translateX(${s.x}px)`
    }
    const onMouseUp = () => { if (!s.isDragging) return; s.isDragging = false; momentum() }

    const onTouchStart = (e: TouchEvent) => {
      s.isDragging = true; s.didDrag = false
      s.startX = e.touches[0].clientX - s.x; s.lastX = e.touches[0].clientX; s.velX = 0
      cancelAnimationFrame(s.rafId)
      cancelAnimationFrame(s.autoRafId)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!s.isDragging) return
      s.didDrag = true
      s.velX = e.touches[0].clientX - s.lastX; s.lastX = e.touches[0].clientX
      s.x = e.touches[0].clientX - s.startX
      s.x = clampInfinite(s.x)
      track.style.transform = `translateX(${s.x}px)`
    }
    const onTouchEnd = () => { s.isDragging = false; momentum() }

    // — Linha 2 drag —
    const onMouseDown2 = (e: MouseEvent) => {
      state2.current.isDragging = true
      state2.current.didDrag = false
      state2.current.startX = e.clientX - state2.current.x
      state2.current.lastX = e.clientX
      state2.current.velX = 0
      cancelAnimationFrame(state2.current.autoRafId)
    }
    const onMouseMove2 = (e: MouseEvent) => {
      if (!state2.current.isDragging) return
      if (Math.abs(e.clientX - state2.current.lastX) > 3) state2.current.didDrag = true
      state2.current.velX = e.clientX - state2.current.lastX
      state2.current.lastX = e.clientX
      state2.current.x = state2.current.x + state2.current.velX
      const sw = trackRef2.current!.scrollWidth / 3
      if (state2.current.x > -sw + sw) state2.current.x = state2.current.x - sw
      if (state2.current.x < -sw * 2) state2.current.x = state2.current.x + sw
      trackRef2.current!.style.transform = `translateX(${state2.current.x}px)`
    }
    const onMouseUp2 = () => {
      if (!state2.current.isDragging) return
      state2.current.isDragging = false
      autoPlay2()
    }

    const onTouchStart2 = (e: TouchEvent) => {
      state2.current.isDragging = true
      state2.current.didDrag = false
      state2.current.startX = e.touches[0].clientX - state2.current.x
      state2.current.lastX = e.touches[0].clientX
      state2.current.velX = 0
      cancelAnimationFrame(state2.current.autoRafId)
    }
    const onTouchMove2 = (e: TouchEvent) => {
      if (!state2.current.isDragging) return
      state2.current.didDrag = true
      state2.current.velX = e.touches[0].clientX - state2.current.lastX
      state2.current.lastX = e.touches[0].clientX
      state2.current.x = state2.current.x + state2.current.velX
      const sw = trackRef2.current!.scrollWidth / 3
      if (state2.current.x > -sw + sw) state2.current.x = state2.current.x - sw
      if (state2.current.x < -sw * 2) state2.current.x = state2.current.x + sw
      trackRef2.current!.style.transform = `translateX(${state2.current.x}px)`
    }
    const onTouchEnd2 = () => {
      state2.current.isDragging = false
      autoPlay2()
    }

    wrap.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    wrap.addEventListener('touchstart', onTouchStart, { passive: true })
    wrap.addEventListener('touchmove', onTouchMove, { passive: true })
    wrap.addEventListener('touchend', onTouchEnd)

    const wrap2 = wrapRef2.current
    if (wrap2) {
      wrap2.addEventListener('mousedown', onMouseDown2)
      window.addEventListener('mousemove', onMouseMove2)
      window.addEventListener('mouseup', onMouseUp2)
      wrap2.addEventListener('touchstart', onTouchStart2, { passive: true })
      wrap2.addEventListener('touchmove', onTouchMove2, { passive: true })
      wrap2.addEventListener('touchend', onTouchEnd2)
    }

    s.autoRafId = requestAnimationFrame(autoPlay)
    state2.current.autoRafId = requestAnimationFrame(autoPlay2)

    return () => {
      wrap.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      wrap.removeEventListener('touchstart', onTouchStart)
      wrap.removeEventListener('touchmove', onTouchMove)
      wrap.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(s.rafId)
      cancelAnimationFrame(s.autoRafId)
      cancelAnimationFrame(state2.current.autoRafId)
      if (wrap2) {
        wrap2.removeEventListener('mousedown', onMouseDown2)
        window.removeEventListener('mousemove', onMouseMove2)
        window.removeEventListener('mouseup', onMouseUp2)
        wrap2.removeEventListener('touchstart', onTouchStart2)
        wrap2.removeEventListener('touchmove', onTouchMove2)
        wrap2.removeEventListener('touchend', onTouchEnd2)
      }
    }
  }, [])

  const handleClick = (href: string) => {
    if (!state.current.didDrag) router.push(href)
  }

  return (
    <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>

      {/* Fade esquerda */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to right, var(--fade-color, #ffffff), transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />

      {/* Fade direita */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to left, var(--fade-color, #ffffff), transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />

      {/* Linha 1 — rola para esquerda */}
      <div
        ref={wrapRef}
        style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none', paddingTop: 16, marginBottom: 8 }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: ITEM_GAP,
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {INFINITE_ITEMS.map((item, i) => {
            const isHovered = i === hoveredIndex
            const itemHeight = typeof window !== 'undefined' && window.innerWidth <= 767 ? ITEM_HEIGHT / 2 : ITEM_HEIGHT
            return (
              <div
                key={i}
                onClick={() => handleClick(item.href)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  flexShrink: 0,
                  height: itemHeight,
                  cursor: isHovered ? 'pointer' : 'grab',
                  transition: 'filter 0.3s ease, opacity 0.3s ease',
                  filter: isHovered ? 'none' : 'grayscale(100%)',
                  opacity: isHovered ? 1 : 0.55,
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  style={{
                    height: '100%',
                    width: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Linha 2 — só no mobile, rola para direita */}
      <div
        ref={wrapRef2}
        className="carousel-row-2"
        style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none', paddingBottom: 16 }}
      >
        <div
          ref={trackRef2}
          style={{
            display: 'flex',
            gap: ITEM_GAP,
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {[...INFINITE_ITEMS].reverse().map((item, i) => {
            const isHovered = i + 100 === hoveredIndex
            const itemHeight = typeof window !== 'undefined' && window.innerWidth <= 767 ? ITEM_HEIGHT / 2 : ITEM_HEIGHT
            return (
              <div
                key={i}
                onClick={() => handleClick(item.href)}
                onMouseEnter={() => setHoveredIndex(i + 100)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  flexShrink: 0,
                  height: itemHeight,
                  cursor: isHovered ? 'pointer' : 'grab',
                  transition: 'filter 0.3s ease, opacity 0.3s ease',
                  filter: isHovered ? 'none' : 'grayscale(100%)',
                  opacity: isHovered ? 1 : 0.55,
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  style={{
                    height: '100%',
                    width: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
