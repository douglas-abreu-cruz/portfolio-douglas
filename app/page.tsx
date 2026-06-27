'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { SiteHeader } from './components/ui/site-header'
import { useBreakpoint } from './hooks/use-breakpoint'
import { PageTransition } from './components/ui/page-transition'
import { GalleryCarousel } from './components/ui/gallery-carousel'

// ── Data ───────────────────────────────────────────────────────────────────

interface Project { name: string; thumb?: string }

interface Area {
  key: string
  href: string
  label: string
  desc: string
  pageBg: string
  cardBg: string
  border: string
  titleColor: string
  descColor: string
  cellBg: string
  cellText: string
  cellBorder: string
  headerName: string
  headerBio: string
  headerDesigner: string
  headerNav: string
  duotone1: string
  duotone2: string
  duotone2Opacity: number
  projects: Project[]
}

const areas: Area[] = [
  {
    key: 'design',
    href: '/design',
    label: 'Graphic Design',
    desc: 'Branding, packaging,\nadvertising & visual communication',
    pageBg: '#6B2D8B',
    cardBg: '#4a1d6b',
    border: '#6B2D8B',
    titleColor: '#ffffff',
    descColor: '#c49de0',
    cellBg: '#888888',
    cellText: '#ffffff',
    cellBorder: '#6B2D8B22',
    headerName: '#ffffff',
    headerBio: '#e0c8f5',
    headerDesigner: '#c49de0',
    headerNav: '#e0c8f5',
    duotone1: '#6B2D8B',
    duotone2: '#4a1d6b',
    duotone2Opacity: 0.4,
    projects: [
      { name: 'NutraChamps AI', thumb: '/images/preview/nutrachamps.png' },
      { name: 'V.Action Brand', thumb: '/images/preview/vaction.png' },
      { name: 'Uai Pizza',      thumb: '/images/preview/uai.png' },
      { name: 'Pentel Design',  thumb: '/images/preview/pentel.png' },
      { name: 'DSM Packaging',  thumb: '/images/preview/dsm.png' },
      { name: 'Fraternity NGO', thumb: '/images/preview/fraternity.png' },
    ],
  },
  {
    key: 'cg',
    href: '/3dartist',
    label: '3D Artist',
    desc: 'Modeling, shading\n& full CG pipeline',
    pageBg: '#363737',
    cardBg: '#1a1a1a',
    border: '#E86100',
    titleColor: '#E86100',
    descColor: '#666666',
    cellBg: '#222222',
    cellText: '#E86100',
    cellBorder: '#E8610022',
    headerName: '#ffffff',
    headerBio: '#aaaaaa',
    headerDesigner: '#E86100',
    headerNav: '#aaaaaa',
    duotone1: '#E86100',
    duotone2: '#a07800',
    duotone2Opacity: 0.35,
    projects: [
      { name: 'THEORA Moto-Pod', thumb: '/images/preview/theora.png' },
      { name: 'Butterfly Anim', thumb: '/images/preview/butterfly.png' },
      { name: 'Props Model',    thumb: '/images/preview/props.png' },
      { name: 'Sci-Fi Robot',   thumb: '/images/preview/robot.png' },
      { name: 'Pentel 3D',      thumb: '/images/preview/pentel3d.png' },
      { name: 'Environment',    thumb: '/images/preview/environment.png' },
    ],
  },
  {
    key: 'archviz',
    href: '/archviz',
    label: 'Archviz',
    desc: 'Architectural visualization,\ninterior & retail',
    pageBg: '#f2f0eb',
    cardBg: '#e8e4dc',
    border: '#6b6560',
    titleColor: '#2a2820',
    descColor: '#8a8478',
    cellBg: '#d4d0c8',
    cellText: '#4a4540',
    cellBorder: '#6b656022',
    headerName: '#2a2820',
    headerBio: '#6b6560',
    headerDesigner: '#2a2820',
    headerNav: '#6b6560',
    duotone1: '#3a3428',
    duotone2: '#8a7c6c',
    duotone2Opacity: 0.3,
    projects: [
      { name: 'Bathroom KS',      thumb: '/images/preview/bathroom-katespade.png' },
      { name: 'Attic Loft',       thumb: '/images/preview/attic.png' },
      { name: 'Kitchen Redesign', thumb: '/images/preview/kitchen-redesign.png' },
      { name: 'Bathroom',         thumb: '/images/preview/bathroom.png' },
      { name: 'Restaurant',       thumb: '/images/preview/restaurant.png' },
      { name: 'Retail Design',    thumb: '/images/preview/retail.png' },
    ],
  },
]

const projectRoutes: Record<string, string[]> = {
  design: [
    '/design/nutrachamps',
    '/design/vaction',
    '/design/uaipizza',
    '/design/pentel',
    '/design/dsm',
    '/design/fraternity',
  ],
  cg: [
    '/3dartist/theora',
    '/3dartist/butterfly',
    '/3dartist/props',
    '/3dartist/robot',
    '/3dartist/pentel3d',
    '/3dartist/environment',
  ],
  archviz: [
    '/archviz/bathroom-katespade',
    '/archviz/attic',
    '/archviz/kitchen-redesign',
    '/archviz/bathroom',
    '/archviz/restaurant',
    '/archviz/retail',
  ],
}

// ── Home ───────────────────────────────────────────────────────────────────

export default function Home() {
  const { isMobile } = useBreakpoint()
  const router = useRouter()
  const pathname = usePathname()
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastTouchAreaRef = useRef<string | null>(null)
  const isTouchRef = useRef(false)

  const current = activeArea ? areas.find(a => a.key === activeArea) ?? null : null

  const pageBg         = current ? current.pageBg         : '#ffffff'
  const headerName     = current ? current.headerName     : '#1a1a1a'
  const headerBio      = current ? current.headerBio      : '#6b6560'
  const headerDesigner = current ? current.headerDesigner : '#6b6560'
  const headerNav      = current ? current.headerNav      : '#6b6560'

  return (
    <PageTransition>
      {/* Page background */}
      <motion.div
        animate={{ backgroundColor: pageBg }}
        transition={{ duration: 0.6 }}
        style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      />

      {/* Content — centered, max 1440px on wide screens */}
      <div className="hub-outer" style={{ overflowX: 'hidden', width: '100%' }}>
        <div className="hub-inner">

          {/* Header */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <SiteHeader
              nameColor={headerName}
              bioColor={headerBio}
              designerColor={headerDesigner}
              linkColor={headerNav}
            />
          </div>

          {/* 9-cell grid — Row 1: area cards, Rows 2-3: preview cells */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 2,
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
            onMouseLeave={() => { if (!isMobile) setActiveArea(null) }}
          >
            {/* Row 1 — 3 cards */}
            {areas.map(area => {
              const isActive = activeArea === area.key
              return (
                <div
                  key={area.key}
                  className="area-card-cell"
                  onMouseEnter={() => { if (!isMobile) setActiveArea(area.key) }}
                  onTouchStart={() => {
                    isTouchRef.current = true
                    if (lastTouchAreaRef.current === area.key) {
                      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
                      router.push(area.href)
                      lastTouchAreaRef.current = null
                    } else {
                      lastTouchAreaRef.current = area.key
                      setActiveArea(area.key)
                      setHoveredCell(null)
                      touchTimerRef.current = setTimeout(() => {
                        lastTouchAreaRef.current = null
                      }, 2000)
                    }
                  }}
                  onClick={() => {
                    if (isTouchRef.current) {
                      isTouchRef.current = false
                      return
                    }
                    router.push(area.href)
                  }}
                >
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? area.cardBg : '#ffffff',
                      borderColor: isActive ? area.border : '#e8e8e8',
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: '1px solid',
                      padding: '16px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: isMobile ? 'center' : 'flex-end',
                      alignItems: isMobile ? 'center' : 'flex-start',
                      textAlign: isMobile ? 'center' : 'left',
                      gap: 5,
                      boxSizing: 'border-box',
                      position: 'relative',
                    }}
                  >
                    <motion.h2
                      className="card-title"
                      animate={{ color: isActive ? area.titleColor : '#111111' }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'relative', zIndex: 2, textAlign: isMobile ? 'center' : 'left' }}
                    >
                      {area.label}
                    </motion.h2>
                    {!isMobile && (
                      <>
                        <motion.p
                          className="card-desc"
                          animate={{ color: isActive ? area.descColor : '#a8a398' }}
                          transition={{ duration: 0.4 }}
                          style={{ whiteSpace: 'pre-line', position: 'relative', zIndex: 2 }}
                        >
                          {area.desc}
                        </motion.p>
                        <motion.p
                          className="card-explore"
                          animate={{ color: isActive ? area.border : '#c8c4bc' }}
                          transition={{ duration: 0.4 }}
                          style={{ position: 'relative', zIndex: 2 }}
                        >
                          Explore →
                        </motion.p>
                      </>
                    )}
                  </motion.div>
                </div>
              )
            })}

            {/* Rows 2-3 — 6 preview cells */}
            {Array.from({ length: 6 }).map((_, i) => {
              const project = current?.projects[i]
              const projectName = project?.name ?? ''
              const thumb = project?.thumb
              const isHovered = hoveredCell === i
              const route = current && projectRoutes[current.key]?.[i]
              const tabBg = current?.key === 'design' ? '#4a1d6b'
                          : current?.key === 'cg' ? '#2a2a2a'
                          : current?.key === 'archviz' ? '#6b6560'
                          : '#333333'
              const tabText = current?.key === 'design' ? '#ffffff'
                            : current?.key === 'cg' ? '#E86100'
                            : current?.key === 'archviz' ? '#f2f0eb'
                            : '#ffffff'
              return (
                <motion.div
                  key={`cell-${i}`}
                  className="project-cell-item"
                  animate={{
                    opacity: activeArea ? 0.6 : 0,
                    height: activeArea ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => route && router.push(route)}
                  onTouchEnd={e => { e.preventDefault(); if (current) router.push(current.href) }}
                  onMouseEnter={() => setHoveredCell(i)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    backgroundColor: current?.cellBg || 'transparent',
                    backgroundImage: thumb ? `url(${thumb})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: current ? `1px solid ${current.cellBorder}` : '1px solid transparent',
                    cursor: 'crosshair',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: activeArea ? undefined : 0,
                  }}
                >
                  {thumb && (
                    <>
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: current?.duotone1 || '#000000',
                        mixBlendMode: 'color',
                        opacity: isHovered ? 0 : 0.85,
                        pointerEvents: 'none',
                        transition: 'opacity 0.25s ease',
                      }} />
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 2,
                        background: current?.duotone2 || '#000000',
                        mixBlendMode: 'multiply',
                        opacity: isHovered ? 0 : (current?.duotone2Opacity ?? 0.4),
                        pointerEvents: 'none',
                        transition: 'opacity 0.25s ease',
                      }} />
                    </>
                  )}
                  <div style={{
                    position: 'absolute', top: 0, right: 0, zIndex: 4,
                    display: 'inline-flex', alignItems: 'center',
                    padding: '5px 12px 7px',
                    backgroundColor: tabBg,
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      color: isHovered ? '#ffffff' : tabText,
                      textShadow: isHovered
                        ? (current?.key === 'cg'
                            ? '0 0 8px #E86100, 0 0 16px #E86100aa'
                            : '0 0 8px #90bde0, 0 0 16px #6B2D8Baa')
                        : 'none',
                      transition: 'text-shadow 0.3s ease, color 0.3s ease',
                    }}>
                      {projectName}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Carousel — some quando activeArea no desktop, desce no mobile */}
          <div
            className="gallery-carousel"
            style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              opacity: !isMobile && activeArea ? 0 : 1,
              height: !isMobile && activeArea ? 0 : 'auto',
              overflow: 'hidden',
              transition: 'opacity 0.4s ease',
              pointerEvents: !isMobile && activeArea ? 'none' : 'auto',
            }}
          >
            <GalleryCarousel />
          </div>


          <div className="mobile-area-nav">
            {areas.map(area => (
              <a
                key={area.key}
                href={area.href}
                className="mobile-area-btn"
              >
                <div>
                  <div className="mobile-area-btn-label" style={{ color: area.border }}>
                    {area.label}
                  </div>
                  <div className="mobile-area-btn-desc">
                    {area.desc}
                  </div>
                </div>
                <span style={{ color: area.border, fontSize: 20 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {activeArea && pathname === '/' && (
        <button
          onClick={() => { setActiveArea(null); setHoveredCell(null); }}
          style={{
            position: 'fixed',
            top: 16,
            right: 28,
            zIndex: 100,
            background: 'none',
            border: `1px solid ${headerNav}44`,
            padding: '5px 12px',
            cursor: 'pointer',
            color: headerNav,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.06em',
            fontFamily: 'inherit',
            borderRadius: 0,
          }}
        >
          ← Home
        </button>
      )}
    </PageTransition>
  )
}
