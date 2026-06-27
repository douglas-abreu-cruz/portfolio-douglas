'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'
import { HeroTitle } from '../../components/ui/hero-title'

const BG          = '#363737'
const CONTENT     = '#1a1a1a'
const ACCENT      = '#E86100'
const ACCENT_TEXT = '#111111'
const FG          = '#ffffff'
const MUTED       = '#aaaaaa'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/environment/${f}`

function ZoomableMedia({ src, alt, type = 'image' as 'image' | 'video', maxHeight = '520px', wrapStyle, imgStyle }: {
  src: string; alt: string; type?: 'image' | 'video'
  maxHeight?: string; wrapStyle?: CSSProperties; imgStyle?: CSSProperties
}) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomed(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  return (
    <>
      <div
        style={{ position: 'relative', cursor: 'zoom-in', display: 'block', width: '100%', ...wrapStyle }}
        onClick={() => setZoomed(true)}
      >
        {type === 'image' ? (
          <img
            src={src} alt={alt}
            style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain', ...imgStyle }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <video
            src={src} autoPlay loop muted playsInline
            style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain', ...imgStyle }}
          />
        )}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, background: 'rgba(0,0,0,0.55)', padding: 6, lineHeight: 0, pointerEvents: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="white" strokeWidth="1.5"/>
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="5" y1="7.5" x2="10" y2="7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7.5" y1="5" x2="7.5" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      {zoomed && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setZoomed(false)}
        >
          {type === 'image' ? (
            <img src={src} alt={alt} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
          ) : (
            <video src={src} autoPlay loop muted controls playsInline style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
          )}
          <button onClick={() => setZoomed(false)} style={{ position: 'fixed', top: 20, right: 24, zIndex: 101, background: 'none', border: 'none', color: 'white', fontSize: 36, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
      )}
    </>
  )
}

function Caption({ text }: { text: string }) {
  return <p style={{ marginTop: 8, fontSize: 22, letterSpacing: '0.06em', color: ACCENT, textAlign: 'center' }}>{text}</p>
}

function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 20 }}>{text}</p>
}

const STATS = [
  { num: '3',     label: 'Environments' },
  { num: '7',     label: 'Software tools' },
  { num: 'Multi', label: 'Pipeline' },
]

const TOOLS = ['ZBrush', 'Maya', 'Substance Painter', 'Mari', 'Houdini', 'V-Ray', 'SketchUp']

export default function EnvironmentPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '140px' : '120px' }}>

      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: BG, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0, paddingBottom: '0px' }}>
            <button onClick={() => router.push('/3dartist')} style={{ background: 'none', border: '1px solid rgba(232,97,0,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← 3D Artist
            </button>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: '1px solid rgba(232,97,0,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
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
        style={{ background: `linear-gradient(140deg, ${BG} 0%, ${CONTENT} 100%)`, minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0 }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: isMobile ? '48px 16px 36px' : '72px 36px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
            Environment — 06
          </p>
          <HeroTitle style={{ fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(88px, 14vw, 192px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: FG, marginBottom: 20 }}>
            Environment
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 32 : 40, color: MUTED, fontWeight: 400 }}>
            Three worlds, three pipelines
          </p>
        </div>
      </motion.section>

      {/* ── Hero image ────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT, padding: 0, margin: 0, width: '100%' }}
      >
        <ZoomableMedia
          src={p('environment-pantano-aerial.png')}
          alt="Pantano swamp aerial"
          type="image"
          maxHeight="520px"
          wrapStyle={{ padding: 0, margin: 0, background: 'transparent' }}
        />
      </motion.div>

      {/* ── 2. BRIEF ──────────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 720 }}>
            Three distinct environment studies, each built with a different pipeline and goal. A procedural swamp, a barn interior and two residential spaces.
          </p>
        </div>
      </motion.section>

      {/* ════════════ BLOCK 1 — PANTANO ════════════════════════════════ */}

      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>
            01 Swamp
          </p>
          <h2 style={{ fontSize: isMobile ? 48 : 72, fontWeight: 700, color: FG, lineHeight: 0.95, marginBottom: 28 }}>
            Swamp
          </h2>
          <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 720 }}>
            A fully procedural swamp environment built in Houdini. Every organic element generated and controlled through node-based workflows. Models sculpted in ZBrush and Maya, textured in Substance and Mari.
          </p>
        </div>
      </motion.section>

      {/* Pantano — impact ACCENT LEFT */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
          <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0, background: ACCENT, padding: isMobile ? '36px 16px' : '48px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SectionLabel text="Procedural" />
            <h2 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1.15, margin: 0 }}>
              Procedural.<br />Every element.
            </h2>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ZoomableMedia
              src={p('environment-pantano-aerial.png')}
              alt="Pantano aerial view"
              type="image"
              maxHeight="480px"
              wrapStyle={{ background: 'transparent', overflow: 'hidden' }}
            />
          </div>
        </div>
      </motion.section>

      {/* Pantano — 2 images */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <div>
              <ZoomableMedia
                src={p('environment-pantano-bridge.png')}
                alt="Pantano bridge"
                type="image"
                maxHeight="480px"
                wrapStyle={{ background: 'transparent' }}
              />
              <Caption text="Bridge" />
            </div>
            <div>
              <ZoomableMedia
                src={p('environment-pantano-path.png')}
                alt="Pantano stone path"
                type="image"
                maxHeight="480px"
                wrapStyle={{ background: 'transparent' }}
              />
              <Caption text="Stone path" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════ BLOCK 2 — BARN ════════════════════════════════════ */}

      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>
            02 Interior
          </p>
          <h2 style={{ fontSize: isMobile ? 48 : 72, fontWeight: 700, color: FG, lineHeight: 0.95, marginBottom: 28 }}>
            Barn
          </h2>
          <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 720 }}>
            A single interior study. A barn built and lit in Maya. Simple geometry, complex light. The challenge was making aged wood and dust feel real without overcomplicating the scene.
          </p>
        </div>
      </motion.section>

      {/* Barn — impact ACCENT RIGHT */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT, padding: isMobile ? '40px 0' : '64px 0', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ZoomableMedia
              src={p('environment-barn.jpg')}
              alt="Barn interior"
              type="image"
              maxHeight="480px"
              wrapStyle={{ background: 'transparent', overflow: 'hidden' }}
            />
          </div>
          <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0, background: ACCENT, padding: isMobile ? '36px 16px' : '48px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SectionLabel text="Lighting" />
            <h2 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1.15, margin: 0 }}>
              Simple geometry.<br />Complex light.
            </h2>
          </div>
        </div>
      </motion.section>

      {/* ════════════ BLOCK 3 — INTERIOR ═══════════════════════════════ */}

      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>
            03 Residential
          </p>
          <h2 style={{ fontSize: isMobile ? 48 : 72, fontWeight: 700, color: FG, lineHeight: 0.95, marginBottom: 28 }}>
            Interior
          </h2>
          <p style={{ fontSize: 28, lineHeight: 1.8, color: MUTED, maxWidth: 720 }}>
            Two residential spaces modeled in SketchUp and rendered in V-Ray. Clean geometry, natural light and material accuracy as the focus.
          </p>
        </div>
      </motion.section>

      {/* Interior — 2 images */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <div>
              <ZoomableMedia
                src={p('environment-interior-atrium.png')}
                alt="Interior atrium"
                type="image"
                maxHeight="480px"
                wrapStyle={{ background: 'transparent' }}
              />
              <Caption text="Atrium" />
            </div>
            <div>
              <ZoomableMedia
                src={p('environment-interior-bathroom.png')}
                alt="Interior bathroom"
                type="image"
                maxHeight="480px"
                wrapStyle={{ background: 'transparent' }}
              />
              <Caption text="Bathroom" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── STAT CARDS ────────────────────────────────────────────────── */}
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
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: CONTENT, borderTop: '0.5px solid rgba(232,97,0,0.2)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '16px' : '28px 36px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{ fontSize: isMobile ? 13 : 22, letterSpacing: '0.08em', padding: '4px 12px', border: '1px solid rgba(232,97,0,0.4)', color: ACCENT }}>{tool}</span>
            ))}
          </div>
          <button onClick={() => router.push('/3dartist')} style={{ background: 'none', border: 'none', padding: 0, color: ACCENT, cursor: 'pointer', fontSize: isMobile ? 14 : 26, letterSpacing: '0.04em' }}>
            ← Back to 3D Artist
          </button>
        </div>
      </footer>

    </div>
  )
}
