'use client'

import { ProjectGallery, type Project, type GalleryTheme } from '../components/ui/project-gallery'

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Bathroom Kate Spade',
    description: 'Interior visualization with Kate Spade pattern design',
    tools: ['SketchUp', 'Photoshop'],
    thumb: '/images/preview/bathroom-katespade.png',
    backThumb: '/images/preview/bathroom-katespade.png',
    href: '/archviz/bathroom-katespade',
  },
  {
    num: '02',
    title: 'Attic Loft',
    description: 'Loft transformation for work and relaxation',
    tools: ['SketchUp', 'V-Ray'],
    thumb: '/images/preview/attic.png',
    backThumb: '/images/preview/attic.png',
    href: '/archviz/attic',
  },
  {
    num: '03',
    title: 'Kitchen Redesign',
    description: 'Two kitchen projects from floor plans and photographs',
    tools: ['SketchUp', 'V-Ray', 'Twinmotion'],
    thumb: '/images/preview/kitchen-redesign.png',
    backThumb: '/images/preview/kitchen-redesign.png',
    href: '/archviz/kitchen-redesign',
  },
  {
    num: '04',
    title: 'Bathroom',
    description: 'Biophilic design and vanity renovation',
    tools: ['SketchUp', 'Photoshop'],
    thumb: '/images/preview/bathroom.png',
    backThumb: '/images/preview/bathroom.png',
    href: '/archviz/bathroom',
  },
  {
    num: '05',
    title: 'Restaurant',
    description: 'Restaurant from abandoned floor plan',
    tools: ['SketchUp', 'Twinmotion'],
    thumb: '/images/preview/restaurant.png',
    backThumb: '/images/preview/restaurant.png',
    href: '/archviz/restaurant',
  },
  {
    num: '06',
    title: 'Retail Design',
    description: 'Signage and environmental graphics for retail',
    tools: ['3ds Max', 'Photoshop', 'AutoCAD'],
    thumb: '/images/preview/retail.png',
    backThumb: '/images/preview/retail.png',
    href: '/archviz/retail',
  },
]

const THEME: GalleryTheme = {
  pageBg: '#f2f0eb',
  cardFrontBg: '#e8e4dc',
  cardBackBg: '#d4d0c8',
  expandedBg: '#f2f0eb',
  fg: '#2a2820',
  accent: '#6b6560',
  accentFg: '#f2f0eb',
  accentColor: '#6b6560',
  cardFrontDuotone1: '#3a3428',
  cardFrontDuotone2: '#8a7c6c',
  cardFrontDuotone2Opacity: 0.3,
  cardTabBg: '#6b6560',
  cardTabText: '#f2f0eb',
  headerNameColor: '#2a2820',
  headerBioColor: '#6b6560',
  headerDesignerColor: '#2a2820',
  headerLinkColor: '#6b6560',
}

export default function ArchvizPage() {
  return (
    <ProjectGallery
      pageTitle="Archviz"
      projects={PROJECTS}
      theme={THEME}
    />
  )
}
