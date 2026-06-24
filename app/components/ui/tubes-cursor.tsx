'use client'

import { useEffect, useRef } from 'react'

interface TubesCursorProps {
  colors?: string[]
  lightColors?: string[]
  bgColor?: string
}

// new Function prevents Turbopack/webpack from transforming the import() call
// into their own chunk-loader. The browser's native import() handles CDN ESM URLs.
const cdnImport = new Function('u', 'return import(u)') as (url: string) => Promise<any>

const CDN_URL = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'

function hexToRGB(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
}

function rgbToHex(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b
}

export default function TubesCursor({ colors, lightColors, bgColor = '#ffffff' }: TubesCursorProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const appRef      = useRef<any>(null)
  const bgColorRef  = useRef<string>(bgColor)
  const rafRef      = useRef<number>(0)

  useEffect(() => {
    let cancelled = false

    const initTimer = setTimeout(() => {
      cdnImport(CDN_URL)
        .then((module) => {
          if (cancelled) return
          const init = module.default ?? module
          if (!canvasRef.current || typeof init !== 'function') {
            console.error('[TubesCursor] module.default is not a function', module)
            return
          }
          const app = init(canvasRef.current, {
            renderer: { alpha: true, antialias: true },
            tubes: {
              colors: colors || ['#4a4a4a', '#666666', '#888888'],
              radius: 0.6,
              lights: {
                intensity: 200,
                colors: lightColors || ['#4a4a4a', '#666666', '#888888', '#ffffff'],
              },
            },
          })
          try {
            if (app?.renderer?.setClearColor) {
              app.renderer.setClearColor(0x000000, 0)
            }
          } catch {}
          appRef.current = app
        })
        .catch((err) => console.error('[TubesCursor] CDN load failed:', err))
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(initTimer)
      cancelAnimationFrame(rafRef.current)
      if (appRef.current?.dispose) appRef.current.dispose()
      appRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!appRef.current) return
    try {
      appRef.current.tubes.setColors(colors)
      appRef.current.tubes.setLightsColors(lightColors)
    } catch {
      // app may not be fully initialized yet
    }
  }, [colors, lightColors])

  // Smoothly animate canvas background color when pageBg changes (600ms eased, matches motion.div)
  useEffect(() => {
    const from = bgColorRef.current
    const to   = bgColor
    bgColorRef.current = bgColor

    if (from === to) return

    const [fr, fg, fb] = hexToRGB(from)
    const [tr, tg, tb] = hexToRGB(to)
    const duration = 600
    const start = performance.now()

    cancelAnimationFrame(rafRef.current)

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // cubic ease-in-out
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const r = Math.round(fr + (tr - fr) * e)
      const g = Math.round(fg + (tg - fg) * e)
      const b = Math.round(fb + (tb - fb) * e)
      try {
        appRef.current?.renderer?.setClearColor(rgbToHex(r, g, b), 0)
      } catch {}
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [bgColor])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: 'transparent',
      pointerEvents: 'none',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          background: 'transparent',
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
