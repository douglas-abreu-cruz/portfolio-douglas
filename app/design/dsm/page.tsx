'use client'

import type { CSSProperties } from 'react'
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

const dsm = (f: string) => `/images/dsm/${f}`

const EYEBROW: CSSProperties = {
  fontSize: 22, fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: BG, marginBottom: 20,
}

/*
 * IMAGE DISPLAY PATTERN: object-fit contain, neutral background wrapper,
 * max-height constraint, never crop. Reuse this exact pattern for the other
 * 5 project pages (nutrachamps, vaction, uaipizza, pentel, fraternity) when
 * they are rebuilt with the same storytelling layout.
 */
function Img({ src, alt, maxHeight = '60vh', wrapStyle, imgStyle }: {
  src: string
  alt: string
  maxHeight?: string
  wrapStyle?: CSSProperties
  imgStyle?: CSSProperties
}) {
  return (
    <div style={{ background: 'transparent', ...wrapStyle }}>
      <img
        src={src}
        alt={alt}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxHeight,
          objectFit: 'contain',
          ...imgStyle,
        }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <p style={{ marginTop: 8, fontSize: 22, letterSpacing: '0.06em', color: BG, textAlign: 'center' }}>
      {text}
    </p>
  )
}

export default function DsmPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()
  const sec = (extra?: CSSProperties): CSSProperties => ({
    background: '#ffffff',
    padding: isMobile ? '40px 16px' : '64px 36px',
    ...extra,
  })

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', paddingBottom: isMobile ? '160px' : '140px' }}>

      {/* ── Sticky header ─────────────────────────────────────────────── */}
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
              border: '1px solid rgba(176,198,247,0.3)',
              color: MUTED, cursor: 'pointer',
              padding: '5px 12px',
              fontSize: 22, letterSpacing: '0.06em',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}
          >
            ← Graphic Design
          </button>
          {!isMobile && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <SiteHeader
                nameColor="#ffffff"
                bioColor={MUTED}
                designerColor={ACCENT}
                linkColor={MUTED}
              />
            </div>
          )}
        </div>
      </header>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        style={{
          background: `linear-gradient(140deg, ${BG} 0%, #1e3fa8 100%)`,
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: isMobile ? '48px 16px 36px' : '72px 36px 36px',
        }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          <p style={{
            fontSize: 22, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: ACCENT, marginBottom: 16,
          }}>
            Packaging Design — 05
          </p>
          <HeroTitle style={{
            fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(88px, 14vw, 192px)',
            fontWeight: 700, letterSpacing: '-0.02em',
            lineHeight: 0.95, color: '#ffffff', marginBottom: 20,
          }}>
            DSM
          </HeroTitle>
          <p style={{ fontSize: isMobile ? 32 : 40, color: MUTED, fontWeight: 400 }}>
            Tortuga product line
          </p>
        </div>
      </motion.section>

      {/* ── 2. THE BRIEF ──────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={VP} transition={FV}
        style={{ background: '#ffffff', overflow: 'visible' }}
      >
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '40px 16px' : '64px 36px 40px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 0,
          alignItems: 'flex-start',
          overflow: 'visible',
        }}>
          {/* Left 60% */}
          <div style={{
            width: isMobile ? '100%' : '60%',
            flexShrink: 0,
            paddingRight: isMobile ? 0 : 56,
            boxSizing: 'border-box',
          }}>
            <p style={EYEBROW}>The brief</p>
            <p style={{ fontSize: 28, lineHeight: 1.8, color: '#444', maxWidth: 520 }}>
              What started as a simple information update became a full packaging
              department. The Tortuga brand&apos;s acquisition by a Dutch group
              brought a complex new visual identity guide — and every package
              needed to adapt to it while preserving 60 years of brand recognition.
            </p>
          </div>

          {/* Right 40% — image pulls up into hero */}
          <div style={{
            width: isMobile ? '100%' : '40%',
            marginTop: isMobile ? 0 : -100,
            position: 'relative',
            zIndex: 2,
          }}>
            <Img
              src={dsm('design-dsm-hero.png')}
              alt="Fosbovi packaging"
              maxHeight="60vh"
              imgStyle={{ boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── 3. THE CHALLENGE ──────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={VP} transition={FV}
        style={{ background: '#ffffff' }}
      >
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: isMobile ? '0 16px 40px' : '0 36px 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
          <Img
            src={dsm('design-dsm-identity.png')}
            alt="Tortuga + DSM identity integration"
            maxHeight="480px"
            wrapStyle={{ height: '480px', width: '100%' }}
            imgStyle={{ height: '100%' }}
          />
          <div>
            <Img
              src={dsm('design-dsm-system.png')}
              alt="Full product line system"
              maxHeight="480px"
              wrapStyle={{ height: '480px', width: '100%' }}
              imgStyle={{ height: '100%' }}
            />
            <Caption text="Full product line system" />
          </div>
        </div>
      </motion.section>

      {/* ── 4. THE IMPACT ─────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={VP} transition={FV}
        style={{ background: BG, padding: isMobile ? '40px 0' : '64px 0' }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px' : '0 36px' }}>
          <p style={{ ...EYEBROW, color: ACCENT }}>The impact</p>

          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{
                fontSize: 38, fontWeight: 500, color: '#ffffff',
                maxWidth: '80%', margin: 0, lineHeight: 1.3,
              }}>
                1.5M packages every month
              </p>
              <Img
                src={dsm('design-dsm-production.png')}
                alt="Packaging in production"
                maxHeight="380px"
                wrapStyle={{ height: '380px' }}
                imgStyle={{ height: '100%' }}
              />
              <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                The redesign reached 1.5 million packages per month, carrying
                a full marketing shift. Sustainability initiatives and customer
                trust guided the transition from a solid legacy identity into
                a new visual language under the parent company logo.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
              {/* Left: text block ~40% */}
              <div style={{ width: '40%', flexShrink: 0, padding: 28, boxSizing: 'border-box' }}>
                <p style={{
                  fontSize: 38, fontWeight: 500, color: '#ffffff',
                  maxWidth: '70%', margin: '0 0 20px', lineHeight: 1.3,
                }}>
                  1.5M packages every month
                </p>
                <p style={{ fontSize: 28, lineHeight: 1.7, color: MUTED, margin: 0 }}>
                  The redesign reached 1.5 million packages per month, carrying
                  a full marketing shift. Sustainability initiatives and customer
                  trust guided the transition from a solid legacy identity into
                  a new visual language under the parent company logo.
                </p>
              </div>
              {/* Right: image ~55%, pushed to right edge */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Img
                  src={dsm('design-dsm-production.png')}
                  alt="Packaging in production"
                  maxHeight="480px"
                  wrapStyle={{ height: '480px' }}
                  imgStyle={{ height: '100%', boxShadow: '0 10px 36px rgba(0,0,0,0.22)' }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ── 5. THE SYSTEM — stat cards ───────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={VP} transition={FV}
        style={sec({ padding: isMobile ? '32px 16px' : '48px 36px' })}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 16,
          }}>
            {[
              { num: '1.5M', label: 'Packages per month' },
              { num: '60+',  label: 'Years of brand legacy' },
              { num: '100%', label: 'Print + digital realigned' },
            ].map(card => (
              <div key={card.num} style={{ background: '#f0f0ee', padding: 24 }}>
                <p style={{ fontSize: 44, fontWeight: 500, color: '#1a3a6e', margin: '0 0 6px' }}>
                  {card.num}
                </p>
                <p style={{ fontSize: 22, color: '#888', letterSpacing: '0.05em', margin: 0 }}>
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 6. TECHNICAL DETAIL ───────────────────────────────────────── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={VP} transition={FV}
        style={sec({ padding: isMobile ? '32px 16px 160px' : '48px 36px 140px' })}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <p style={EYEBROW}>Technical detail</p>
          {/* Row 1 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 32,
            marginBottom: isMobile ? 24 : 32,
          }}>
            <div>
              <Img
                src={dsm('design-dsm-mockup3d-02.png')}
                alt="3D Mockup"
                maxHeight="480px"
                wrapStyle={{ height: '480px' }}
                imgStyle={{ height: '100%' }}
              />
              <Caption text="3D Mockup" />
            </div>
            <div>
              <Img
                src={dsm('design-dsm-mockup3d-01.png')}
                alt="3D packaging validation"
                maxHeight="480px"
                wrapStyle={{ height: '480px' }}
                imgStyle={{ height: '100%' }}
              />
              <Caption text="3D packaging validation" />
            </div>
          </div>
          {/* Row 2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 32,
          }}>
            <div>
              <Img
                src={dsm('design-dsm-dieline.png')}
                alt="Technical dieline"
                maxHeight="480px"
                wrapStyle={{ height: '480px' }}
                imgStyle={{ height: '100%' }}
              />
              <Caption text="Technical dieline" />
            </div>
            <div>
              <Img
                src={dsm('design-dsm-palette-guide.png')}
                alt="Pantone color guide"
                maxHeight="480px"
                wrapStyle={{ height: '480px' }}
                imgStyle={{ height: '100%' }}
              />
              <Caption text="Pantone color guide" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 7. FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#fafafa',
        borderTop: '0.5px solid #e8e8e8',
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
            {['Illustrator', 'Photoshop', 'CorelDraw', '3ds Max'].map(tool => (
              <span key={tool} style={{
                fontSize: isMobile ? 13 : 22, letterSpacing: '0.08em',
                padding: '4px 12px',
                border: '1px solid rgba(48,92,222,0.3)',
                color: BG,
              }}>
                {tool}
              </span>
            ))}
          </div>
          <button
            onClick={() => router.push('/design')}
            style={{
              background: 'none', border: 'none', padding: 0,
              color: BG, cursor: 'pointer',
              fontSize: isMobile ? 14 : 26, letterSpacing: '0.04em',
            }}
          >
            ← Back to Graphic Design
          </button>
        </div>
      </footer>

    </div>
  )
}
