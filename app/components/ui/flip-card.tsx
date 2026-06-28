'use client'

import { useState } from 'react'

export interface FlipCardProps {
  num: string
  title: string
  description: string
  tools: string[]
  thumb?: string
  backThumb?: string
  href?: string
  onOpen: () => void
  frontBg: string
  backBg: string
  fg: string
  accent: string
  accentFg: string
  accentColor?: string
  frontDuotone1?: string
  frontDuotone2?: string
  frontDuotone2Opacity?: number
  backDuotone1?: string
  backDuotone2?: string
  backFooterBg?: string
  backFooterFg?: string
  tabBg?: string
  tabText?: string
  isMobile?: boolean
  directNav?: boolean
}

export function FlipCard({
  title,
  tools,
  thumb,
  onOpen,
  frontBg,
  frontDuotone1 = '#6B2D8B',
  frontDuotone2 = '#4a1d6b',
  frontDuotone2Opacity = 0.4,
  tabBg = '#4a1d6b',
  tabText = '#ffffff',
}: FlipCardProps) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100%',
        cursor: 'none', overflow: 'hidden',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onClick={() => onOpen()}
    >
      {/* Imagem de fundo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: thumb ? `url(${thumb})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: frontBg,
      }} />

      {/* Duotone layer 1 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: frontDuotone1,
        mixBlendMode: 'color',
        opacity: hovered ? 0 : 0.85,
        pointerEvents: 'none',
        transition: 'opacity 0.25s ease',
      }} />

      {/* Duotone layer 2 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: frontDuotone2,
        mixBlendMode: 'multiply',
        opacity: hovered ? 0 : frontDuotone2Opacity,
        pointerEvents: 'none',
        transition: 'opacity 0.25s ease',
      }} />

      {/* Tab — nome centralizado */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '4px 10px',
          backgroundColor: `${tabBg}B3`,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: tabText,
          }}>
            {title}
          </span>
        </div>
      </div>

      {/* Tools — inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <button
          onClick={e => { e.stopPropagation(); onOpen() }}
          style={{
            flexShrink: 0,
            background: 'transparent',
            color: tabText,
            border: `1px solid ${tabText}66`,
            padding: '8px 20px',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
            cursor: 'pointer',
            borderRadius: 0,
            opacity: 1,
            pointerEvents: 'auto',
          }}
        >
          Open →
        </button>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 4, justifyContent: 'flex-end',
        }}>
          {tools.map(tool => (
            <span key={tool} style={{
              fontSize: 9, letterSpacing: '0.08em',
              padding: '2px 6px',
              border: `1px solid ${tabText}66`,
              color: tabText,
              backgroundColor: tabBg,
              borderRadius: 0,
            }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Cursor OPEN → seguindo o mouse */}
      {hovered && (
        <div style={{
          position: 'absolute',
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
          color: tabText,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textShadow: `0 0 12px ${tabText}88`,
        }}>
          OPEN →
        </div>
      )}
    </div>
  )
}
