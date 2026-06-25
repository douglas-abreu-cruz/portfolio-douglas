'use client'

import { ProjectGallery, type Project, type GalleryTheme } from '../components/ui/project-gallery'
import { PageTransition } from '../components/ui/page-transition'

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'THEORA Concept Motorcycle',
    description: 'Full CG pipeline concept motorcycle',
    tools: ['Maya', 'V-Ray', 'Substance Painter', 'Nuke'],
    thumb: '/images/preview/theora.png',
    backThumb: '/images/preview/theora.png',
    href: '/3dartist/theora',
  },
  {
    num: '02',
    title: 'Butterfly Animation',
    description: 'Organic rigging and animation',
    tools: ['Maya', 'Substance Painter'],
    thumb: '/images/preview/butterfly.png',
    backThumb: '/images/preview/butterfly.png',
    href: '/3dartist/butterfly',
  },
  {
    num: '03',
    title: 'Props Modeling',
    description: 'Photorealistic 3D props',
    tools: ['Maya', 'Substance Painter'],
    thumb: '/images/preview/props.png',
    backThumb: '/images/preview/props.png',
    href: '/3dartist/props',
  },
  {
    num: '04',
    title: 'Sci-Fi Medical Robot',
    description: 'Hard surface concept',
    tools: ['Maya', 'ZBrush', 'Substance Painter'],
    thumb: '/images/preview/robot.png',
    backThumb: '/images/preview/robot.png',
    href: '/3dartist/robot',
  },
  {
    num: '05',
    title: 'Pentel Stationery 3D',
    description: 'Product renders for Pentel',
    tools: ['3ds Max', 'Photoshop'],
    thumb: '/images/preview/pentel3d.png',
    backThumb: '/images/preview/pentel3d.png',
    href: '/3dartist/pentel3d',
  },
  {
    num: '06',
    title: 'Environment Forest',
    description: 'Organic environment with procedural foliage',
    tools: ['Houdini', 'ZBrush', 'Substance Painter'],
    thumb: '/images/preview/environment.png',
    backThumb: '/images/preview/environment.png',
    href: '/3dartist/environment',
  },
]

const THEME: GalleryTheme = {
  pageBg: '#363737',
  cardFrontBg: '#1a1a1a',
  cardBackBg: '#141414',
  expandedBg: '#111111',
  fg: '#ffffff',
  accent: '#d4a800',
  accentFg: '#111111',
  accentColor: '#d4a800',
  cardFrontDuotone1: '#d4a800',
  cardFrontDuotone2: '#a07800',
  cardFrontDuotone2Opacity: 0.35,
  cardTabBg: '#2a2a2a',
  cardTabText: '#d4a800',
  headerNameColor: '#ffffff',
  headerBioColor: '#aaaaaa',
  headerDesignerColor: '#d4a800',
  headerLinkColor: '#aaaaaa',
}

export default function CGPage() {
  return (
    <PageTransition>
      <ProjectGallery
        pageTitle="3D Artist"
        projects={PROJECTS}
        theme={THEME}
      />
    </PageTransition>
  )
}
