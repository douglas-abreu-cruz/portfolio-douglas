import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Douglas Abreu',
  description: 'Multidisciplinary Designer — Graphic Design, 3D Artist, Archviz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
