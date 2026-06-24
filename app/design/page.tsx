'use client'

import { ProjectGallery, type Project, type GalleryTheme } from '../components/ui/project-gallery'

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'NutraChamps AI Advertising',
    description: 'AI-driven ad concept for Amazon and Instagram',
    tools: ['Photoshop', 'AI Tools', 'Canva'],
    thumb: '/images/preview/nutrachamps.png',
    backThumb: '/images/preview/nutrachamps.png',
    href: '/design/nutrachamps',
  },
  {
    num: '02',
    title: 'V.Action Branding',
    description: 'Winter tourism agency brand identity',
    tools: ['Illustrator', 'Canva'],
    thumb: '/images/preview/vaction.png',
    backThumb: '/images/preview/vaction.png',
    href: '/design/vaction',
  },
  {
    num: '03',
    title: 'Uai Pizza Rebranding',
    description: 'Brazilian pizzeria rebranding in Toronto',
    tools: ['Illustrator', 'Figma', 'Canva'],
    thumb: '/images/preview/uai.png',
    backThumb: '/images/preview/uai.png',
    href: '/design/uaipizza',
  },
  {
    num: '04',
    title: 'Pentel Brand Design',
    description: 'Full in-house design for Pentel Brazil',
    tools: ['Adobe Suite', '3ds Max', 'CorelDraw'],
    thumb: '/images/preview/pentel.png',
    backThumb: '/images/preview/pentel.png',
    href: '/design/pentel',
  },
  {
    num: '05',
    title: 'DSM Tortuga Packaging',
    description: 'Industrial packaging design system',
    tools: ['Illustrator', 'Photoshop', 'CorelDraw', '3ds Max'],
    thumb: '/images/preview/dsm.png',
    backThumb: '/images/preview/dsm.png',
    href: '/design/dsm',
  },
  {
    num: '06',
    title: 'Fraternity Without Borders',
    description: 'Social media design for non-profit',
    tools: ['Illustrator', 'Photoshop', 'Canva'],
    thumb: '/images/preview/fraternity.png',
    backThumb: '/images/preview/fraternity.png',
    href: '/design/fraternity',
  },
]

const THEME: GalleryTheme = {
  pageBg: '#305CDE',
  cardFrontBg: '#1e3fa8',
  cardBackBg: '#1a3a96',
  expandedBg: '#142d7a',
  fg: '#ffffff',
  accent: '#7a9ff0',
  accentFg: '#ffffff',
  accentColor: '#305CDE',
  cardFrontDuotone1: '#305CDE',
  cardFrontDuotone2: '#1e3fa8',
  cardFrontDuotone2Opacity: 0.4,
  cardTabBg: '#1e3fa8',
  cardTabText: '#ffffff',
  headerNameColor: '#ffffff',
  headerBioColor: '#b0c6f7',
  headerDesignerColor: '#7a9ff0',
  headerLinkColor: '#b0c6f7',
}

export default function DesignPage() {
  return (
    <ProjectGallery
      pageTitle="Graphic Design"
      projects={PROJECTS}
      theme={THEME}
    />
  )
}
