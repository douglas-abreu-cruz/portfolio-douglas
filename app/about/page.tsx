'use client'

import { useRouter } from 'next/navigation'
import { useBreakpoint } from '../hooks/use-breakpoint'

export default function AboutPage() {
  const router = useRouter()
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>

      {/* Back button */}
      <div style={{ padding: '28px 36px 0' }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#6b6560',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          ← Back
        </button>
      </div>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          width: '100%',
          maxWidth: '1100px',
          minHeight: '520px',
          overflow: 'hidden',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{
            backgroundImage: 'url(/images/about-me.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: '#ffffff',
            minHeight: isMobile ? '300px' : '400px',
          }} />

          <div style={{
            padding: 'clamp(24px, 5vw, 56px) clamp(20px, 4vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
            backgroundColor: '#ffffff',
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#111111',
              textTransform: 'uppercase',
            }}>
              Douglas<br />Abreu
            </div>

            <div style={{ width: '40px', height: '2px', backgroundColor: '#111111' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#444444', margin: 0 }}>
                I'm a multidisciplinary designer with over 15 years of experience across packaging, branding, 3D visualization, and spatial design — always working at the intersection of function and form.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#444444', margin: 0 }}>
                My career has taken me across industries, companies, and cultures, which shaped how I see design: as something that has to work in the real world, not just look good on a screen.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#444444', margin: 0 }}>
                Outside of work, I recharge on bike rides, slow afternoons with a good coffee, and trips with my family. That sense of curiosity and attention to detail carries into everything I make.
              </p>
            </div>

            <div style={{
              paddingTop: '16px',
              borderTop: '0.5px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111',
                margin: 0,
              }}>
                Based in Toronto · Fueled by craft, AI tools, and good espresso.
              </p>
              <p style={{ fontSize: '13px', color: '#6b6560', margin: 0 }}>
                Let's chat?{' '}
                <a
                  href="mailto:douglas@douglas-abreu.com"
                  style={{ color: '#111111', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #11111144' }}
                >
                  douglas@douglas-abreu.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
