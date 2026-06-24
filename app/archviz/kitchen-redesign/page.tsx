'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'

const BG          = '#f2f0eb'
const CONTENT     = '#ffffff'
const ACCENT      = '#6b6560'
const ACCENT_TEXT = '#f2f0eb'
const FG          = '#2a2820'
const MUTED       = '#8a8478'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/kitchen-redesign/${f}`

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
  { num: '2', label: 'Kitchen Projects' },
  { num: '4', label: 'Visualization Stages' },
  { num: '3', label: 'Tools in Pipeline' },
]

const TOOLS = ['SketchUp', 'V-Ray', 'Twinmotion']

export default function KitchenRedesignPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '140px' : '120px' }}>

      {/* Sticky header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: BG, borderBottom: `1px solid ${ACCENT}22` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={() => router.push('/archviz')}
            style={{ background: 'none', border: `1px solid ${ACCENT}44`, color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            ← Archviz
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SiteHeader nameColor={FG} bioColor={MUTED} designerColor={ACCENT} linkColor={MUTED} />
          </div>
        </div>
      </header>

      {/* 1. HERO */}
      <motion.section
        initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}
        style={{ background: `linear-gradient(140deg, ${BG} 0%, ${CONTENT} 100%)`, minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: isMobile ? '48px 16px 36px' : '72px 36px 36px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>
            Residential Visualization
          </p>
          <h1 style={{ fontSize: isMobile ? 'clamp(52px, 16vw, 88px)' : 'clamp(64px, 8vw, 130px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: FG, marginBottom: 20 }}>
            Kitchen<br />Redesign
          </h1>
          <p style={{ fontSize: isMobile ? 20 : 28, color: MUTED, fontWeight: 400, lineHeight: 1.5 }}>
            Two kitchens. Two briefs. Built from floor plans and photographs.
          </p>
        </div>
      </motion.section>

      {/* Hero image */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT, padding: isMobile ? '32px 16px' : '48px 36px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Img src={p('dining-hero.png')} alt="Kitchen dining room visualization" maxHeight={isMobile ? '280px' : '70vh'} />
        </div>
      </motion.div>

      {/* 2. BRIEF */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 16px' : '64px 36px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 64, alignItems: 'flex-start' }}>
          <div style={{ width: isMobile ? '100%' : '45%', flexShrink: 0 }}>
            <SectionLabel text="Project" />
            <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.85, color: MUTED }}>
              Two residential kitchen projects built from real site measurements and photographs. The first — a Provence-style renovation — focuses on new cabinetry and wall tile, iterated from SketchUp wireframe through V-Ray render to generative AI visualization. The second integrates kitchen, island, and dining room into a single open-plan environment rendered in Twinmotion.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Img src={p('dining-wide.png')} alt="Dining room wide view" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 3. CHALLENGE */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT, padding: isMobile ? '40px 16px' : '64px 36px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <Img src={p('provence-wireframe.png')} alt="Provence kitchen wireframe" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('provence-tile-wide.png')} alt="Provence kitchen tile" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
          <Caption text="From SketchUp wireframe to photorealistic render — the client sees the material decision before any tile is ordered." />
        </div>
      </motion.section>

      {/* 4. IMPACT */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
          <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0, background: ACCENT, padding: isMobile ? '36px 24px' : '56px 48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT_TEXT, opacity: 0.65, marginBottom: 20 }}>Why it matters</p>
            <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1.2, margin: 0 }}>
              See it before<br />you build it.
            </h2>
          </div>
          <div style={{ flex: 1, minWidth: 0, background: CONTENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img src={p('dining-room.png')} alt="Dining room render" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 5. DETAIL GRID */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: CONTENT, padding: isMobile ? '40px 16px' : '64px 36px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <SectionLabel text="Pipeline" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            <Img src={p('provence-tile-close.png')} alt="Provence tile close-up" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('provence-subway.png')} alt="Provence subway tile" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('provence-genai.png')} alt="Provence generative AI" maxHeight={isMobile ? '280px' : '480px'} />
            <Img src={p('dining-kitchen.png')} alt="Dining kitchen open plan" maxHeight={isMobile ? '280px' : '480px'} />
          </div>
        </div>
      </motion.section>

      {/* 6. STATS */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 16px 140px' : '56px 36px 120px' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
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
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '24px 16px' : '28px 36px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 0 }}>
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
