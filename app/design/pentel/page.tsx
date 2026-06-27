'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'
import { HeroTitle } from '../../components/ui/hero-title'

const BG     = '#6B2D8B'
const ACCENT = '#c49de0'
const MUTED  = '#e0c8f5'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/pentel/${f}`

const EYEBROW: CSSProperties = {
  fontSize: 22, fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: BG, marginBottom: 20,
}

function Img({ src, alt, maxHeight = '60vh', wrapStyle, imgStyle }: {
  src: string; alt: string; maxHeight?: string
  wrapStyle?: CSSProperties; imgStyle?: CSSProperties
}) {
  return (
    <div style={{ background: 'transparent', ...wrapStyle }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain', ...imgStyle }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
    </div>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <p style={{ marginTop: 8, fontSize: 22, letterSpacing: '0.06em', color: BG, textAlign: 'center' }}>{text}</p>
  )
}

const STATS = [
  { num: '11+',   label: 'Deliverable types' },
  { num: '2D+3D', label: 'Production scope' },
  { num: '100%',  label: 'In-house' },
]

const TOOLS = ['Adobe Suite', '3ds Max', 'CorelDraw']

export default function PentelPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()
  const sec = (extra?: CSSProperties): CSSProperties => ({
    background: '#ffffff',
    ...extra,
  })

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '160px' : '140px' }}>

      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: BG, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0, paddingBottom: '0px' }}>
            <button onClick={() => router.push('/design')} style={{ background: 'none', border: '1px solid rgba(196,157,224,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← Graphic Design
            </button>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: '1px solid rgba(196,157,224,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← Home
            </button>
          </div>
          {!isMobile && (
            <div style={{ flex: 1, minWidth: 0, paddingLeft: 24, paddingBottom: '0px' }}>
              <SiteHeader nameColor="#ffffff" bioColor={MUTED} designerColor={ACCENT} linkColor={MUTED} />
            </div>
          )}
        </div>
      </header>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}
        style={{ background: `linear-gradient(140deg, ${BG} 0%, #1e3fa8 100%)`, minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0 }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: isMobile ? '48px 16px 36px' : '72px 36px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
            In-house Design — 04
          </p>
          <HeroTitle style={{ fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(88px, 14vw, 192px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: '#ffffff', marginBottom: 20 }}>
            Pentel
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 32 : 40, color: MUTED, fontWeight: 400 }}>
            Full brand operation, Brazil
          </p>
        </div>
      </motion.section>

      {/* ── 2. THE BRIEF ──────────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: '#ffffff', overflow: 'visible' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px 40px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 0, alignItems: 'flex-start', overflow: 'visible' }}>
          <div style={{ width: isMobile ? '100%' : '60%', flexShrink: 0, paddingRight: isMobile ? 0 : 56, boxSizing: 'border-box' }}>
            <p style={EYEBROW}>The brief</p>
            <p style={{ fontSize: 28, lineHeight: 1.8, color: '#444', maxWidth: 520 }}>
              Full in-house brand operation for Pentel Brazil. Social content, presentations, catalogues, packaging and 3D renders, all developed internally without outside agencies.
            </p>
          </div>
          <div style={{ width: isMobile ? '100%' : '40%', marginTop: isMobile ? 0 : -100, position: 'relative', zIndex: 2 }}>
            <Img src={p('design-pentel-hero.jpg')} alt="Pentel" maxHeight="60vh" imgStyle={{ boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </motion.section>

      {/* ── 3. THE CHALLENGE ──────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: '#ffffff' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px 40px' : '0 36px 64px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Img src={p('design-pentel-packaging.jpg')} alt="Packaging" maxHeight="480px" wrapStyle={{ height: '480px', width: '100%' }} imgStyle={{ height: '100%' }} />
          <Img src={p('design-pentel-markers-display.png')} alt="Markers display" maxHeight="480px" wrapStyle={{ height: '480px', width: '100%' }} imgStyle={{ height: '100%' }} />
        </div>
      </motion.section>

      {/* ── 4. THE IMPACT ─────────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0 36px' }}>
          <p style={{ ...EYEBROW, color: ACCENT }}>The impact</p>
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontSize: 38, fontWeight: 500, color: '#ffffff', maxWidth: '80%', margin: 0, lineHeight: 1.3 }}>
                Every asset in-house
              </p>
              <Img src={p('design-pentel-hero.jpg')} alt="Pentel" maxHeight="380px" wrapStyle={{ height: '380px' }} imgStyle={{ height: '100%' }} />
              <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                Responsible for all printed and digital creations, 2D and 3D. All content developed internally without external agencies.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
              <div style={{ width: '40%', flexShrink: 0, padding: 28, boxSizing: 'border-box' }}>
                <p style={{ fontSize: 38, fontWeight: 500, color: '#ffffff', maxWidth: '70%', margin: '0 0 20px', lineHeight: 1.3 }}>
                  Every asset in-house
                </p>
                <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                  Responsible for all printed and digital creations, 2D and 3D. All content developed internally without external agencies.
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Img src={p('design-pentel-hero.jpg')} alt="Pentel" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%', boxShadow: '0 10px 36px rgba(0,0,0,0.22)' }} />
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ── 5. STAT CARDS ─────────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={sec()}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 36px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {STATS.map(card => (
              <div key={card.num} style={{ background: '#f0f0ee', padding: 24 }}>
                <p style={{ fontSize: 44, fontWeight: 500, color: '#1a3a6e', margin: '0 0 6px' }}>{card.num}</p>
                <p style={{ fontSize: 22, color: '#888', letterSpacing: '0.05em', margin: 0 }}>{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 6. TECHNICAL DETAIL ───────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={sec()}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '32px 16px 160px' : '48px 36px 140px', boxSizing: 'border-box' }}>
          <p style={EYEBROW}>Technical detail</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32 }}>
            <div>
              <Img src={p('design-pentel-box-display.jpg')} alt="Box to display" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%' }} />
              <Caption text="Box to display" />
            </div>
            <div>
              <Img src={p('design-pentel-display-3d.png')} alt="3D display concept" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%' }} />
              <Caption text="3D display concept" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32 }}>
            <div>
              <Img src={p('design-pentel-calendar.jpg')} alt="Seasonal calendar" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%' }} />
              <Caption text="Seasonal calendar" />
            </div>
            <div>
              <Img src={p('design-pentel-catalog.jpg')} alt="Product catalogue" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%' }} />
              <Caption text="Product catalogue" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 7. FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fafafa', borderTop: '0.5px solid #e8e8e8' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '16px' : '28px 36px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{ fontSize: isMobile ? 13 : 22, letterSpacing: '0.08em', padding: '4px 12px', border: '1px solid rgba(107,45,139,0.3)', color: BG }}>
                {tool}
              </span>
            ))}
          </div>
          <button onClick={() => router.push('/design')} style={{ background: 'none', border: 'none', padding: 0, color: BG, cursor: 'pointer', fontSize: isMobile ? 14 : 26, letterSpacing: '0.04em' }}>
            ← Back to Graphic Design
          </button>
        </div>
      </footer>

    </div>
  )
}
