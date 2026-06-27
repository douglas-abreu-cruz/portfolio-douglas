'use client'

import { ProjectGallery, type Project, type GalleryTheme } from '../components/ui/project-gallery'
import { PageTransition } from '../components/ui/page-transition'

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
  pageBg: '#6B2D8B',
  cardFrontBg: '#4a1d6b',
  cardBackBg: '#1a3a96',
  expandedBg: '#142d7a',
  fg: '#ffffff',
  accent: '#c49de0',
  accentFg: '#ffffff',
  accentColor: '#6B2D8B',
  cardFrontDuotone1: '#6B2D8B',
  cardFrontDuotone2: '#4a1d6b',
  cardFrontDuotone2Opacity: 0.4,
  cardTabBg: '#4a1d6b',
  cardTabText: '#ffffff',
  headerNameColor: '#ffffff',
  headerBioColor: '#e0c8f5',
  headerDesignerColor: '#c49de0',
  headerLinkColor: '#e0c8f5',
}

export default function DesignPage() {
  return (
    <PageTransition>
      <ProjectGallery
        pageTitle="Graphic Design"
        projects={PROJECTS}
        theme={THEME}
      />
    </PageTransition>
  )
}
