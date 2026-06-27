'use client'

import { useEffect, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '../../components/ui/site-header'
import { useBreakpoint } from '../../hooks/use-breakpoint'
import { HeroTitle } from '../../components/ui/hero-title'

const BG     = '#305CDE'
const ACCENT = '#7a9ff0'
const MUTED  = '#b0c6f7'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const VP = { once: true, margin: '-100px' } as const
const FV = { duration: 0.6 }

const p = (f: string) => `/images/nutrachamps/${f}`

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
  { num: '2',    label: 'Platforms targeted' },
  { num: 'AI',   label: 'Generation workflow' },
  { num: '100%', label: 'In-house production' },
]

const TOOLS = ['Photoshop', 'AI Tools', 'Canva']

const FEED_IMAGES = [
  { src: p('design-nutrachamps-concept.png'), likes: '9,311', caption: 'Power your performance. Strength. Energy. Every Day. 💪 #NutraChamps #Creatine' },
  { src: p('design-nutrachamps-concept-2.png'), likes: '7,842', caption: 'Maximize Intensity — Raspberry flavor now available 🍇 #Fitness #Creatine' },
  { src: p('design-nutrachamps-concept-3.png'), likes: '6,519', caption: 'Daily Power. Strength Support. Maximize Intensity 💜 #NutraChamps' },
  { src: p('design-nutrachamps-hero.png'), likes: '8,103', caption: 'Blackberry Creatine Gummies. Amazon #1 bestseller 🛒 #Performance' },
  { src: p('design-nutrachamps-product.png'), likes: '5,274', caption: 'Green Apple flavor — Delicious. Effective. Every Day. 🍏 #NutraChamps' },
]

function InstagramFeed() {
  return (
    <div style={{ position: 'relative', width: 260, margin: '0 auto' }}>
      <div style={{
        background: '#1a1a1a',
        borderRadius: 44,
        padding: 12,
        border: '1px solid #333',
      }}>
        <div style={{ background: '#000', borderRadius: 34, overflow: 'hidden' }}>

          {/* Status bar */}
          <div style={{ background: '#000', padding: '10px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: '-apple-system,sans-serif' }}>9:41</span>
            <div style={{ width: 88, height: 26, background: '#000', borderRadius: 20, border: '2px solid #1a1a1a' }} />
            <span style={{ color: '#fff', fontSize: 10, fontFamily: '-apple-system,sans-serif' }}>●●●</span>
          </div>

          {/* IG Header */}
          <div style={{ background: '#000', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid #222' }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: '-apple-system,sans-serif' }}>nutrachamps ▾</span>
            <div style={{ display: 'flex', gap: 14, color: '#fff', fontSize: 18 }}>＋ ☰</div>
          </div>

          {/* Profile */}
          <div style={{ background: '#000', padding: '10px 12px 6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', padding: 2, flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#305CDE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: '-apple-system,sans-serif', border: '2px solid #000' }}>NC</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[['24','posts'],['12.4k','followers'],['186','following']].map(([n,l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: '-apple-system,sans-serif' }}>{n}</div>
                    <div style={{ color: '#888', fontSize: 9, fontFamily: '-apple-system,sans-serif' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ color: '#fff', fontSize: 10, fontWeight: 600, fontFamily: '-apple-system,sans-serif', marginBottom: 2 }}>NutraChamps®</div>
            <div style={{ color: '#aaa', fontSize: 9, fontFamily: '-apple-system,sans-serif', lineHeight: 1.4, marginBottom: 8 }}>Fuel your performance 💪{'\n'}Creatine Gummies · Amazon #1</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {['Follow','Message'].map(t => (
                <button key={t} style={{ flex: 1, background: '#222', border: 'none', borderRadius: 6, color: '#fff', fontSize: 9, fontWeight: 600, padding: '4px 0', fontFamily: '-apple-system,sans-serif' }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Feed scroll area */}
          <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
            <div id="nc-feed-track" style={{ display: 'flex', flexDirection: 'column' }}>
              {[...FEED_IMAGES, ...FEED_IMAGES].map((img, i) => (
                <div key={i} style={{ flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#000' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#305CDE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 7, fontWeight: 700, fontFamily: '-apple-system,sans-serif' }}>NC</div>
                    <span style={{ color: '#fff', fontSize: 9, fontWeight: 600, fontFamily: '-apple-system,sans-serif' }}>nutrachamps</span>
                    <span style={{ color: '#fff', fontSize: 14, marginLeft: 'auto' }}>···</span>
                  </div>
                  <img src={img.src} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  <div style={{ background: '#000', padding: '6px 10px 2px', display: 'flex', gap: 10, fontSize: 16, color: '#fff' }}>♡ ○ ✈ <span style={{ marginLeft: 'auto' }}>⊡</span></div>
                  <div style={{ background: '#000', padding: '0 10px 2px', color: '#fff', fontSize: 9, fontWeight: 600, fontFamily: '-apple-system,sans-serif' }}>{img.likes} likes</div>
                  <div style={{ background: '#000', padding: '0 10px 8px', color: '#aaa', fontSize: 9, fontFamily: '-apple-system,sans-serif', lineHeight: 1.4 }}><span style={{ color: '#fff', fontWeight: 600 }}>nutrachamps</span> {img.caption}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ background: '#000', borderTop: '0.5px solid #222', padding: '8px 20px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 20, color: '#fff' }}>
            ⌂ ⊕ △ ▷ ●
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NutraChampsPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()
  const sec = (extra?: CSSProperties): CSSProperties => ({
    background: '#ffffff',
    ...extra,
  })

  useEffect(() => {
    const track = document.getElementById('nc-feed-track')
    if (!track) return
    let pos = 0
    let rafId: number
    function animate() {
      pos += 0.5
      const totalH = track!.scrollHeight / 2
      if (pos >= totalH) pos = 0
      track!.style.transform = `translateY(-${pos}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '160px' : '140px' }}>

      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: BG, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '14px 16px' : '14px 36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0, paddingBottom: '0px' }}>
            <button onClick={() => router.push('/design')} style={{ background: 'none', border: '1px solid rgba(176,198,247,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
              ← Graphic Design
            </button>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: '1px solid rgba(176,198,247,0.3)', color: MUTED, cursor: 'pointer', padding: '5px 12px', fontSize: 13, letterSpacing: '0.06em', whiteSpace: 'nowrap', borderRadius: 0, fontFamily: 'inherit', fontWeight: 600 }}>
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
            AI Advertising — 01
          </p>
          <HeroTitle style={{ fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(88px, 14vw, 192px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: '#ffffff', marginBottom: 20 }}>
            NutraChamps
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 32 : 40, color: MUTED, fontWeight: 400 }}>
            Creatine Gummies
          </p>
        </div>
      </motion.section>

      {/* ── 2. THE BRIEF ──────────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: '#ffffff', overflow: 'visible' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 36px 40px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 48, alignItems: 'center' }}>
          <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0 }}>
            <InstagramFeed />
          </div>
          <div style={{ flex: 1 }}>
            <p style={EYEBROW}>The brief</p>
            <p style={{ fontSize: 28, lineHeight: 1.8, color: '#444', maxWidth: 520 }}>
              An AI-driven advertising concept for NutraChamps Creatine Gummies, optimized for Amazon and Instagram. AI image generation combined with traditional art direction to produce a visual strong on product focus.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── 3. THE CHALLENGE ──────────────────────────────────────────── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} transition={FV}
        style={{ background: '#ffffff' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px 40px' : '0 36px 64px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Img src={p('design-nutrachamps-concept-2.png')} alt="Raspberry campaign" maxHeight="600px" wrapStyle={{ width: '100%', overflow: 'hidden' }} imgStyle={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', boxShadow: 'none' }} />
          <Img src={p('design-nutrachamps-concept-3.png')} alt="Grape campaign" maxHeight="600px" wrapStyle={{ width: '100%', overflow: 'hidden' }} imgStyle={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', boxShadow: 'none' }} />
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
                Amazon and Instagram ready
              </p>
              <Img src={p('design-nutrachamps-hero.png')} alt="NutraChamps" maxHeight="380px" wrapStyle={{ height: '380px' }} imgStyle={{ height: '100%' }} />
              <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                Produced a promotional visual optimized for two platforms at once. AI prompting, concept creation and layout design guided every decision from brief to final output.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
              <div style={{ width: '40%', flexShrink: 0, padding: 28, boxSizing: 'border-box' }}>
                <p style={{ fontSize: 38, fontWeight: 500, color: '#ffffff', maxWidth: '70%', margin: '0 0 20px', lineHeight: 1.3 }}>
                  Amazon and Instagram ready
                </p>
                <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                  Produced a promotional visual optimized for two platforms at once. AI prompting, concept creation and layout design guided every decision from brief to final output.
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Img src={p('design-nutrachamps-hero.png')} alt="NutraChamps" maxHeight="480px" wrapStyle={{ height: '480px' }} imgStyle={{ height: '100%' }} />
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

      {/* ── 7. FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fafafa', borderTop: '0.5px solid #e8e8e8' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '16px' : '28px 36px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{ fontSize: isMobile ? 13 : 22, letterSpacing: '0.08em', padding: '4px 12px', border: '1px solid rgba(48,92,222,0.3)', color: BG }}>
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
