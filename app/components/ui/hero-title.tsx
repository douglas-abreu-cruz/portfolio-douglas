'use client'

import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface HeroTitleProps {
  children: React.ReactNode
  style?: CSSProperties
}

export function HeroTitle({ children, style }: HeroTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      style={style}
    >
      {children}
    </motion.h1>
  )
}
