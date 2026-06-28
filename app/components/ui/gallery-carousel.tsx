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
const ITEM_GAP = 24
const AUTO_SPEED = 0.4

export function GalleryCarousel() {
  const router = useRouter()
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const state = useRef({
    x: 0, startX: 0, velX: 0, lastX: 0,
    isDragging: false, rafId: 0, autoRafId: 0, didDrag: false,
    initialized: false,
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767)
    const handler = () => setIsMobile(window.innerWidth <= 767)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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
      const track = trackRef.current
      if (!track) { s.autoRafId = requestAnimationFrame(autoPlay); return }
      if (s.isDragging) { s.autoRafId = requestAnimationFrame(autoPlay); return }
      s.x = s.x - AUTO_SPEED
      const sw = track.scrollWidth / 3
      if (s.x < -sw * 2) s.x = s.x + sw
      track.style.transform = `translateX(${s.x}px)`
      s.autoRafId = requestAnimationFrame(autoPlay)
    }

    function momentum() {
      const track = trackRef.current
      if (!track) return
      if (Math.abs(s.velX) < 0.5) { autoPlay(); return }
      s.velX *= 0.95
      s.x = s.x + s.velX
      s.x = clampInfinite(s.x)
      track.style.transform = `translateX(${s.x}px)`
      s.rafId = requestAnimationFrame(momentum)
    }

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

    wrap.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    wrap.addEventListener('touchstart', onTouchStart, { passive: true })
    wrap.addEventListener('touchmove', onTouchMove, { passive: true })
    wrap.addEventListener('touchend', onTouchEnd)

    s.autoRafId = requestAnimationFrame(autoPlay)

    return () => {
      wrap.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      wrap.removeEventListener('touchstart', onTouchStart)
      wrap.removeEventListener('touchmove', onTouchMove)
      wrap.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(s.rafId)
      cancelAnimationFrame(s.autoRafId)
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

      {/* Linha única */}
      <div
        ref={wrapRef}
        style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none', paddingTop: 16, paddingBottom: 16 }}
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
            const itemHeight = isMobile ? Math.round(282 * 0.7) : 282
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
    </div>
  )
}
