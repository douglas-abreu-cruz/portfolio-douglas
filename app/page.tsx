'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SiteHeader } from './components/ui/site-header'
import { useBreakpoint } from './hooks/use-breakpoint'

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
    pageBg: '#305CDE',
    cardBg: '#1e3fa8',
    border: '#305CDE',
    titleColor: '#ffffff',
    descColor: '#7a9ff0',
    cellBg: '#888888',
    cellText: '#ffffff',
    cellBorder: '#305CDE22',
    headerName: '#ffffff',
    headerBio: '#b0c6f7',
    headerDesigner: '#7a9ff0',
    headerNav: '#b0c6f7',
    duotone1: '#305CDE',
    duotone2: '#1e3fa8',
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
    href: '/cg',
    label: '3D Artist',
    desc: 'Modeling, shading\n& full CG pipeline',
    pageBg: '#363737',
    cardBg: '#1a1a1a',
    border: '#d4a800',
    titleColor: '#d4a800',
    descColor: '#666666',
    cellBg: '#222222',
    cellText: '#d4a800',
    cellBorder: '#d4a80022',
    headerName: '#ffffff',
    headerBio: '#aaaaaa',
    headerDesigner: '#d4a800',
    headerNav: '#aaaaaa',
    duotone1: '#d4a800',
    duotone2: '#a07800',
    duotone2Opacity: 0.35,
    projects: [
      { name: 'THEORA',          thumb: '/images/preview/theora.png' },
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
    '/cg/theora',
    '/cg/butterfly',
    '/cg/props',
    '/cg/robot',
    '/cg/pentel3d',
    '/cg/environment',
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
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const current = activeArea ? areas.find(a => a.key === activeArea) ?? null : null

  const pageBg         = current ? current.pageBg         : '#ffffff'
  const headerName     = current ? current.headerName     : '#1a1a1a'
  const headerBio      = current ? current.headerBio      : '#6b6560'
  const headerDesigner = current ? current.headerDesigner : '#6b6560'
  const headerNav      = current ? current.headerNav      : '#6b6560'

  return (
    <>
      {/* Page background */}
      <motion.div
        animate={{ backgroundColor: pageBg }}
        transition={{ duration: 0.6 }}
        style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      />

      {/* Content — centered, max 1440px on wide screens */}
      <div className="hub-outer">
        <div className="hub-inner">

          {/* Header */}
          <div style={{ flexShrink: 0 }}>
            <SiteHeader
              nameColor={headerName}
              bioColor={headerBio}
              designerColor={headerDesigner}
              linkColor={headerNav}
            />
          </div>

          {/* 3×3 Grid */}
          <div
            className="hub-grid"
            onMouseLeave={() => setActiveArea(null)}
          >
            {/* Row 1 — Area Cards */}
            {areas.map(area => {
              const isActive = activeArea === area.key
              return (
                <div
                  key={area.key}
                  className="area-card-cell"
                  onMouseEnter={() => { if (!isMobile) setActiveArea(area.key) }}
                  onClick={() => { if (!isMobile) window.open(area.href, '_blank') }}
                  onTouchStart={() => setActiveArea(area.key)}
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
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      gap: 5,
                      boxSizing: 'border-box',
                      position: 'relative',
                    }}
                  >
                    <motion.h2
                      className="card-title"
                      animate={{ color: isActive ? area.titleColor : '#111111' }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'relative', zIndex: 2 }}
                    >
                      {area.label}
                    </motion.h2>
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
                  </motion.div>
                </div>
              )
            })}

            {/* Rows 2–3 — Project Cells */}
            {Array.from({ length: 6 }).map((_, i) => {
              const project = current?.projects[i]
              const projectName = project?.name ?? ''
              const thumb = project?.thumb
              const isHovered = hoveredCell === i
              const route = current && projectRoutes[current.key]?.[i]
              const tabBg = current?.key === 'design' ? '#1e3fa8'
                          : current?.key === 'cg' ? '#2a2a2a'
                          : current?.key === 'archviz' ? '#6b6560'
                          : '#333333'
              const tabText = current?.key === 'design' ? '#ffffff'
                            : current?.key === 'cg' ? '#d4a800'
                            : current?.key === 'archviz' ? '#f2f0eb'
                            : '#ffffff'
              return (
                <motion.div
                  key={`cell-${i}`}
                  className="project-cell-item"
                  animate={{ opacity: activeArea ? 0.6 : 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => route && window.open(route, '_blank')}
                  onTouchEnd={e => { e.preventDefault(); route && window.open(route, '_blank') }}
                  onMouseEnter={() => setHoveredCell(i)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    backgroundColor: current?.cellBg || 'transparent',
                    backgroundImage: thumb ? `url(${thumb})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: current ? `1px solid ${current.cellBorder}` : '1px solid transparent',
                    cursor: 'crosshair',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
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
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 4,
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 12px 7px',
                    borderRadius: 0,
                    backgroundColor: tabBg,
                  }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      color: isHovered ? '#ffffff' : tabText,
                      textShadow: isHovered
                        ? (current?.key === 'cg'
                            ? '0 0 8px #d4a800, 0 0 16px #d4a800aa'
                            : '0 0 8px #90bde0, 0 0 16px #305CDEaa')
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
        </div>
      </div>
    </>
  )
}
