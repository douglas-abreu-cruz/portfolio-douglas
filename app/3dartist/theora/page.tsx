'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'
import { HeroTitle } from '../../components/ui/hero-title'

const BG          = '#363737'
const CONTENT     = '#1a1a1a'
const ACCENT      = '#d4a800'
const ACCENT_TEXT = '#111111'
const FG          = '#ffffff'
const MUTED       = '#aaaaaa'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/theora/${f}`

function Img({ src, alt, maxHeight = '480px', wrapStyle, imgStyle }: {
  src: string; alt: string; maxHeight?: string
  wrapStyle?: CSSProperties; imgStyle?: CSSProperties
}) {
  return (
    <div style={{ background: 'transparent', ...wrapStyle }}>
      <img
        src={src}
        alt={alt}
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain', ...imgStyle }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

function Video({ src, autoPlay = false, loop = false, muted = false, controls = true, maxHeight = '60vh', wrapStyle }: {
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  maxHeight?: string
  wrapStyle?: CSSProperties
}) {
  return (
    <div style={{ background: 'transparent', ...wrapStyle }}>
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain' }}
      />
    </div>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <p style={{ marginTop: 8, fontSize: 22, letterSpacing: '0.06em', color: ACCENT, textAlign: 'center' }}>{text}</p>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 20 }}>{text}</p>
  )
}

const STATS = [
  { num: '1',    label: 'Full CG model' },
  { num: '3',    label: 'Render passes' },
  { num: '100%', label: 'Procedural shading' },
]

const TOOLS = ['Maya', 'Substance Painter', 'V-Ray', 'Nuke']

export default function TheoraMotoPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '140px' : '120px' }}>

      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: BG,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0, paddingBottom: '0px' }}>
            <button onClick={() => router.push('/3dartist')} style={{ background: 'none', border: '1px solid rgba(212,168,0,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← 3D Artist
            </button>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: '1px solid rgba(212,168,0,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← Home
            </button>
          </div>
          {!isMobile && (
            <div style={{ flex: 1, minWidth: 0, paddingLeft: 24, paddingBottom: '0px' }}>
              <SiteHeader nameColor={FG} bioColor={MUTED} designerColor={ACCENT} linkColor={MUTED} />
            </div>
          )}
        </div>
      </header>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}
        style={{
          background: `linear-gradient(140deg, ${BG} 0%, ${CONTENT} 100%)`,
          minHeight: 480,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 0,
        }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: isMobile ? '48px 16px 36px' : '72px 36px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
            CG / 3D Art — 01
          </p>
          <HeroTitle style={{
            fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(88px, 14vw, 192px)',
            fontWeight: 700, letterSpacing: '-0.02em',
            lineHeight: 0.95, color: FG, marginBottom: 20,
          }}>
            THEORA Moto
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 32 : 40, color: MUTED, fontWeight: 400 }}>
            Full CG motorcycle model &amp; render pipeline
          </p>
        </div>
      </motion.section>

      {/* Hero image */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 36px', boxSizing: 'border-box' }}>
          <Img
            src={p('theora-hero.png')}
            alt="THEORA Motorcycle hero render"
            maxHeight="70vh"
            wrapStyle={{ width: '100%' }}
          />
        </div>
      </motion.div>

      {/* ── 2. WIREFRAME ──────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 48,
          alignItems: 'flex-start',
        }}>
          <div style={{ width: isMobile ? '100%' : '45%', flexShrink: 0 }}>
            <SectionLabel text="Wireframe & Modeling" />
            <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 480 }}>
              The model began as a precise wireframe study — every edge loop placed to support both detail shots and full demoreel compositions. Hard-surface techniques govern the chassis; soft-body continuity carries through the body panels.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Video
              src={p('theora-wireframe.mp4')}
              autoPlay loop muted
              controls={false}
              maxHeight="560px"
              wrapStyle={{ width: '100%' }}
            />
            <Caption text="Wireframe turntable" />
          </div>
        </div>
      </motion.section>

      {/* ── 3. DETAILS ────────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0', overflow: 'hidden' }}
      >
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '0 16px' : '0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'stretch',
        }}>
          {/* Left — ACCENT block */}
          <div style={{
            width: isMobile ? '100%' : '40%', flexShrink: 0,
            background: ACCENT,
            padding: isMobile ? '36px 16px' : '48px 36px',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <SectionLabel text="Surface Detail" />
            <h2 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1.15, marginBottom: 20 }}>
              Every surface tells the story of engineering
            </h2>
            <p style={{ fontSize: 24, lineHeight: 1.75, color: '#333333', margin: 0 }}>
              Procedural shading in Substance Painter drove the material definition, from brushed aluminum on the engine casing to hand-painted wear on the rubber and leather.
            </p>
          </div>
          {/* Right — image */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Img
              src={p('theora-details.png')}
              alt="THEORA surface detail render"
              maxHeight="560px"
              wrapStyle={{ height: isMobile ? 'auto' : '100%', width: '100%' }}
              imgStyle={{ height: isMobile ? 'auto' : '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── 4. COMPOSITION ────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <Video
            src={p('theora-composition.mp4')}
            autoPlay loop muted
            controls={false}
            maxHeight="70vh"
            wrapStyle={{ width: '100%' }}
          />
          <div style={{ marginTop: 32 }}>
            <SectionLabel text="Composition" />
            <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 680 }}>
              Final compositions were built in V-Ray with multi-pass rendering. Beauty, reflection, shadow, and ambient occlusion passes composited in Nuke for full control over the final image output.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── 5. DEMOREEL ───────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: '#111111' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: isMobile ? '48px 16px' : '72px 36px', boxSizing: 'border-box' }}>
          <SectionLabel text="Demoreel" />
          <Video
            src={p('theora-demoreel.mp4')}
            controls
            maxHeight="70vh"
            wrapStyle={{ width: '100%', maxWidth: 1100 }}
          />
          <Caption text="Full CG demoreel, THEORA Motorcycle" />
        </div>
      </motion.section>

      {/* ── 6. STAT CARDS ─────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px 140px' : '56px 36px 120px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {STATS.map(card => (
              <div key={card.num} style={{ background: CONTENT, padding: 28 }}>
                <p style={{ fontSize: 44, fontWeight: 500, color: ACCENT, margin: '0 0 8px' }}>{card.num}</p>
                <p style={{ fontSize: 22, color: MUTED, letterSpacing: '0.05em', margin: 0 }}>{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Fixed footer ──────────────────────────────────────────────── */}
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: CONTENT,
        borderTop: '0.5px solid rgba(212,168,0,0.2)',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '16px' : '28px 36px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 20 : 0,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{
                fontSize: isMobile ? 13 : 22, letterSpacing: '0.08em',
                padding: '4px 12px',
                border: '1px solid rgba(212,168,0,0.4)',
                color: ACCENT,
              }}>
                {tool}
              </span>
            ))}
          </div>
          <button
            onClick={() => router.push('/3dartist')}
            style={{
              background: 'none', border: 'none', padding: 0,
              color: ACCENT, cursor: 'pointer',
              fontSize: isMobile ? 14 : 26, letterSpacing: '0.04em',
            }}
          >
            ← Back to 3D Artist
          </button>
        </div>
      </footer>

    </div>
  )
}
