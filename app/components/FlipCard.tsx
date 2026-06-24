'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  title: string
  subtitle: string
  year: string
  description: string
  frontBg: string
  backBg: string
  fg: string
}

export default function FlipCard({ title, subtitle, year, description, frontBg, backBg, fg }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      style={{ perspective: 1200 }}
      className="h-72 cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        <div
          style={{ backfaceVisibility: 'hidden', backgroundColor: frontBg, position: 'absolute', inset: 0 }}
          className="flex flex-col justify-end p-6"
        >
          <span style={{ color: fg }} className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3">
            {year}
          </span>
          <h3 style={{ color: fg }} className="text-2xl font-medium leading-tight">
            {title}
          </h3>
          <p style={{ color: fg }} className="text-sm opacity-50 mt-1">
            {subtitle}
          </p>
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: backBg,
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
          }}
          className="flex flex-col justify-center p-6"
        >
          <p style={{ color: fg }} className="text-sm leading-relaxed opacity-80">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
