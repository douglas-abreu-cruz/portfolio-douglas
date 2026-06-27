'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from './site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'

export interface ProjectImage {
  src: string
  caption: string
}

export interface DesignProjectPageProps {
  num: string
  eyebrow: string
  title: string
  subtitle: string
  intro: string
  images: ProjectImage[]
  tools: string[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const VP = { once: true, margin: '-100px' } as const

const BG        = '#6B2D8B'
const ACCENT    = '#c49de0'
const MUTED     = '#e0c8f5'
const BODY      = '#dce8ff'

export function DesignProjectPage({
  num, eyebrow, title, subtitle, intro, images, tools,
}: DesignProjectPageProps) {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', color: '#ffffff' }}>

      {/* Sticky header with back button */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: BG,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '14px 16px' : '14px 36px',
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <button
            onClick={() => router.push('/design')}
            style={{
              background: 'none',
              border: '1px solid rgba(196,157,224,0.3)',
              color: MUTED, cursor: 'pointer',
              padding: '5px 12px',
              fontSize: 11, letterSpacing: '0.06em',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}
          >
            ← Graphic Design
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SiteHeader
              nameColor="#ffffff"
              bioColor={MUTED}
              designerColor={ACCENT}
              linkColor={MUTED}
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '48px 16px 40px' : '80px 36px 64px',
          minHeight: isMobile ? '50vh' : '72vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}
      >
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: ACCENT, marginBottom: 18,
        }}>
          {eyebrow} &mdash; {num}
        </p>
        <h1 style={{
          fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(48px, 6.5vw, 88px)',
          fontWeight: 700, letterSpacing: '-0.02em',
          lineHeight: 0.95, marginBottom: 24,
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: isMobile ? 'clamp(14px, 3.5vw, 18px)' : 'clamp(16px, 1.8vw, 22px)',
          color: MUTED, fontWeight: 400,
        }}>
          {subtitle}
        </p>
      </motion.section>

      {/* Divider */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0 36px' }}>
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
      </div>

      {/* Intro paragraph */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '40px 16px 48px' : '56px 36px 72px',
        }}
      >
        <p style={{
          maxWidth: 640,
          fontSize: 'clamp(14px, 1.3vw, 17px)',
          lineHeight: 1.7, color: BODY,
        }}>
          {intro}
        </p>
      </motion.section>

      {/* Image sections — alternating full / offset layout */}
      {images.map((img, i) => {
        const isOffset = !isMobile && i % 2 === 1
        return (
          <motion.section
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            transition={{ duration: 0.6 }}
            style={{
              maxWidth: 1440, margin: '0 auto',
              padding: isMobile ? '0 16px 48px' : '0 36px 64px',
            }}
          >
            {isOffset ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 32, alignItems: 'start' }}>
                <div style={{
                  backgroundColor: 'var(--color-background-secondary, #f0f0f0)',
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{ width: '100%', height: 'auto', maxHeight: '70vh', display: 'block', objectFit: 'contain' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <p style={{
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  color: ACCENT, letterSpacing: '0.05em', lineHeight: 1.6,
                  paddingTop: 6,
                }}>
                  {img.caption}
                </p>
              </div>
            ) : (
              <div>
                <div style={{
                  backgroundColor: 'var(--color-background-secondary, #f0f0f0)',
                  maxWidth: '100%',
                  maxHeight: isMobile ? '50vh' : '70vh',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{ width: '100%', height: 'auto', maxHeight: isMobile ? '50vh' : '70vh', display: 'block', objectFit: 'contain' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <p style={{
                  marginTop: 12,
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  color: ACCENT, letterSpacing: '0.05em',
                }}>
                  {img.caption}
                </p>
              </div>
            )}
          </motion.section>
        )
      })}

      {/* Tools */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '8px 16px 72px' : '8px 36px 96px',
        }}
      >
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 32 }} />
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: ACCENT, marginBottom: 16,
        }}>
          Tools
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tools.map(tool => (
            <span key={tool} style={{
              fontSize: 11, letterSpacing: '0.08em',
              padding: '4px 12px',
              border: '1px solid rgba(122,159,240,0.4)',
              color: ACCENT,
            }}>
              {tool}
            </span>
          ))}
        </div>
      </motion.section>

    </div>
  )
}
