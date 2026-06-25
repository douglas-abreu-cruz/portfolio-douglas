'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { FlipCard } from './flip-card'
import { SiteHeader } from './site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'

export interface Project {
  num: string
  title: string
  description: string
  tools: string[]
  thumb?: string
  backThumb?: string
  images?: string[]
  href?: string
}

export interface GalleryTheme {
  pageBg: string
  cardFrontBg: string
  cardBackBg: string
  expandedBg: string
  fg: string
  accent: string
  accentFg: string
  accentColor?: string
  cardFrontDuotone1?: string
  cardFrontDuotone2?: string
  cardFrontDuotone2Opacity?: number
  cardBackDuotone1?: string
  cardBackDuotone2?: string
  cardBackFooterBg?: string
  cardBackFooterFg?: string
  cardTabBg?: string
  cardTabText?: string
  svgSrc?: string
  svgFilter?: string
  headerNameColor?: string
  headerBioColor?: string
  headerDesignerColor?: string
  headerLinkColor?: string
}

interface ProjectGalleryProps {
  pageTitle: string
  projects: Project[]
  theme: GalleryTheme
  directNav?: boolean
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const gridVariants = {
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit:  { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
}

const expandedVariants = {
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit:  { opacity: 0, y: 16, transition: { duration: 0.3, ease: EASE } },
}

function ExpandedProject({
  project,
  theme,
  onClose,
}: {
  project: Project
  theme: GalleryTheme
  onClose: () => void
}) {
  const [imgIdx, setImgIdx] = useState(0)
  const images = project.images ?? []
  const hasImages = images.length > 0
  const total = images.length

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: theme.expandedBg,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="expanded-header-padding"
        style={{ borderBottom: `1px solid ${theme.fg}15` }}
      >
        <div>
          <p style={{
            color: theme.fg, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.4,
          }}>
            {project.num}
          </p>
          <h2 style={{ color: theme.fg, fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            {project.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40,
            border: `1px solid ${theme.fg}30`,
            background: 'transparent', cursor: 'pointer', color: theme.fg,
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Image area */}
      <div style={{ position: 'relative', backgroundColor: `${theme.fg}08` }}>
        <div className="expanded-image-area">
          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIdx}
                src={images[imgIdx]}
                alt={`${project.title} ${imgIdx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </AnimatePresence>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              opacity: 0.25,
            }}>
              <div style={{
                width: 64, height: 64,
                border: `2px dashed ${theme.fg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.fg} strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <p style={{ color: theme.fg, fontSize: 12, letterSpacing: '0.1em' }}>
                Images coming soon
              </p>
            </div>
          )}

          {hasImages && total > 1 && (
            <>
              <button
                onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                disabled={imgIdx === 0}
                style={{
                  position: 'absolute', left: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40,
                  background: `${theme.expandedBg}cc`,
                  border: `1px solid ${theme.fg}20`,
                  cursor: imgIdx === 0 ? 'default' : 'pointer',
                  color: theme.fg,
                  opacity: imgIdx === 0 ? 0.3 : 1,
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setImgIdx(i => Math.min(total - 1, i + 1))}
                disabled={imgIdx === total - 1}
                style={{
                  position: 'absolute', right: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40,
                  background: `${theme.expandedBg}cc`,
                  border: `1px solid ${theme.fg}20`,
                  cursor: imgIdx === total - 1 ? 'default' : 'pointer',
                  color: theme.fg,
                  opacity: imgIdx === total - 1 ? 0.3 : 1,
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {hasImages && total > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '12px 0' }}>
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: i === imgIdx ? 20 : 6,
                  height: 6, border: 'none',
                  background: i === imgIdx ? theme.accent : `${theme.fg}30`,
                  cursor: 'pointer',
                  transition: 'width 0.2s ease, background 0.2s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="expanded-info-padding">
        <p style={{ color: theme.fg, fontSize: 14, lineHeight: 1.7, opacity: 0.8, maxWidth: 640 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tools.map(tool => (
            <span key={tool} style={{
              fontSize: 11, letterSpacing: '0.08em',
              padding: '4px 12px',
              border: `1px solid ${theme.accent}60`,
              color: theme.accent,
            }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectGallery({ pageTitle, projects, theme, directNav = false }: ProjectGalleryProps) {
  const { isMobile } = useBreakpoint()
  const router = useRouter()
  const [openId, setOpenId] = useState<number | null>(null)
  const openProject = openId !== null ? projects[openId] : null

  const nameColor     = theme.headerNameColor     ?? '#111111'
  const bioColor      = theme.headerBioColor      ?? '#6b6560'
  const designerColor = theme.headerDesignerColor ?? bioColor
  const linkColor     = theme.headerLinkColor     ?? '#555555'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.pageBg, position: 'relative' }}>

      {/* Solid bg overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: theme.pageBg }} />

      <header className="gallery-header">
        <div className="gallery-content-wide">
          <SiteHeader
            nameColor={nameColor}
            bioColor={bioColor}
            designerColor={designerColor}
            linkColor={linkColor}
          />
        </div>
      </header>

      <main className="gallery-main">
        <div className="gallery-content-wide">
          <h1 className="gallery-title" style={{ color: theme.fg }}>
            {pageTitle}
          </h1>

          <AnimatePresence mode="wait">
            {openProject === null ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={gridVariants.exit}
                className="gallery-grid"
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={project.num}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                      delay: i * 0.08,
                    }}
                    style={{ height: '280px', position: 'relative' }}
                  >
                    <FlipCard
                      num={project.num}
                      title={project.title}
                      description={project.description}
                      tools={project.tools}
                      thumb={project.thumb}
                      backThumb={project.backThumb}
                      href={project.href}
                      onOpen={() => project.href ? router.push(project.href) : setOpenId(i)}
                      frontBg={theme.cardFrontBg}
                      backBg={theme.cardBackBg}
                      fg={theme.fg}
                      accent={theme.accent}
                      accentFg={theme.accentFg}
                      accentColor={theme.accentColor ?? theme.accent}
                      frontDuotone1={theme.cardFrontDuotone1}
                      frontDuotone2={theme.cardFrontDuotone2}
                      frontDuotone2Opacity={theme.cardFrontDuotone2Opacity}
                      backDuotone1={theme.cardBackDuotone1}
                      backDuotone2={theme.cardBackDuotone2}
                      backFooterBg={theme.cardBackFooterBg}
                      backFooterFg={theme.cardBackFooterFg}
                      tabBg={theme.cardTabBg}
                      tabText={theme.cardTabText}
                      isMobile={isMobile}
                      directNav={directNav}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 16 }}
                animate={expandedVariants.enter}
                exit={expandedVariants.exit}
              >
                <ExpandedProject
                  project={openProject}
                  theme={theme}
                  onClose={() => setOpenId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
