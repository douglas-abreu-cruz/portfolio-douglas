'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'
import { HeroTitle } from '../../components/ui/hero-title'

const BG          = '#f2f0eb'
const CONTENT     = '#ffffff'
const ACCENT      = '#6b6560'
const ACCENT_TEXT = '#f2f0eb'
const FG          = '#2a2820'
const MUTED       = '#8a8478'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/bathroom-katespade/${f}`

function Img({ src, alt, maxHeight = '480px' }: {
  src: string; alt: string; maxHeight?: string
}) {
  return (
    <div style={{ background: 'transparent' }}>
      <img
        src={src} alt={alt}
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight, objectFit: 'contain' }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

function Caption({ text }: { text: string }) {
  return <p style={{ marginTop: 12, fontSize: 14, letterSpacing: '0.04em', color: MUTED, textAlign: 'center', lineHeight: 1.6 }}>{text}</p>
}

function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>{text}</p>
}

const STATS = [
  { num: '5', label: 'Pattern Variants' },
  { num: '2', label: 'Room Environments' },
  { num: '1', label: 'Spatial System' },
]

const TOOLS = ['SketchUp', 'Photoshop']

export default function BathroomKateSpadePage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '140px' : '120px' }}>

      {/* Sticky header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: BG, borderBottom: `1px solid ${ACCENT}22` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0, paddingBottom: '0px' }}>
            <button onClick={() => router.push('/archviz')} style={{ background: 'none', border: `1px solid ${ACCENT}44`, color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← Archviz
            </button>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: `1px solid ${ACCENT}44`, color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
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

      {/* 1. HERO */}
      <motion.section
        initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}
        style={{ background: `linear-gradient(140deg, ${BG} 0%, ${CONTENT} 100%)`, minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0 }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', padding: isMobile ? '48px 16px 36px' : '72px 36px 36px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
            Surface Design &amp; Product Visualization
          </p>
          <HeroTitle style={{ fontSize: isMobile ? 'clamp(52px, 16vw, 88px)' : 'clamp(64px, 8vw, 130px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: FG, marginBottom: 20 }}>
            Bathroom<br />Kate Spade
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 20 : 28, color: MUTED, fontWeight: 400, lineHeight: 1.5 }}>
            The pattern is the project. The room is the stage.
          </p>
        </div>
      </motion.section>

      {/* Hero image */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 36px', boxSizing: 'border-box' }}>
          <Img src={p('hero.png')} alt="Kate Spade bathroom visualization" maxHeight={isMobile ? '280px' : '70vh'} />
        </div>
      </motion.div>

      {/* 2. BRIEF */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 64, alignItems: 'flex-start' }}>
          <div style={{ width: isMobile ? '100%' : '45%', flexShrink: 0 }}>
            <SectionLabel text="Project" />
            <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.85, color: MUTED }}>
              Interior visualization designed to present custom shower curtain textile patterns within a refined, neutral environment. Each design was developed in the visual language of Kate Spade — playful, graphic, and considered — then placed in a photorealistic 3D bathroom to show how the illustration performs at scale.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Img src={p('curtain-lemon.png')} alt="Lemon pattern curtain" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 3. CHALLENGE */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <Img src={p('curtain-lavender.png')} alt="Lavender pattern curtain" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('curtain-black.png')} alt="Black pattern curtain" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
          <Caption text="Each colorway required a room atmosphere that complements without competing — wall tone, fixture finish, and light are all calibrated around the pattern." />
        </div>
      </motion.section>

      {/* 4. IMPACT */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
          <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0, background: ACCENT, padding: isMobile ? '36px 16px' : '56px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT_TEXT, opacity: 0.65, marginBottom: 20 }}>Outcome</p>
            <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1.2, margin: 0 }}>
              5 pattern variants.<br />One spatial system.
            </h2>
          </div>
          <div style={{ flex: 1, minWidth: 0, background: CONTENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img src={p('curtain-banana.png')} alt="Banana pattern curtain" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 5. DETAIL GRID */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px', boxSizing: 'border-box' }}>
          <SectionLabel text="Full Series" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <Img src={p('hero.png')} alt="Bathroom overview" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('curtain-lemon.png')} alt="Lemon curtain" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('curtain-lavender.png')} alt="Lavender curtain" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('curtain-black.png')} alt="Black curtain" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 6. STATS */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0 140px' : '56px 0 120px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0 36px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {STATS.map(card => (
              <div key={card.label} style={{ background: CONTENT, padding: 28 }}>
                <p style={{ fontSize: 44, fontWeight: 500, color: FG, margin: '0 0 8px' }}>{card.num}</p>
                <p style={{ fontSize: 15, color: MUTED, letterSpacing: '0.05em', margin: 0 }}>{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Fixed footer */}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#e8e4dc', borderTop: '0.5px solid #6b656022' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '16px' : '28px 36px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{ fontSize: 13, letterSpacing: '0.08em', padding: '4px 12px', border: `1px solid ${ACCENT}44`, color: ACCENT }}>{tool}</span>
            ))}
          </div>
          <button onClick={() => router.push('/archviz')} style={{ background: 'none', border: 'none', padding: 0, color: ACCENT, cursor: 'pointer', fontSize: 16, letterSpacing: '0.04em' }}>
            ← Back to Archviz
          </button>
        </div>
      </footer>

    </div>
  )
}
