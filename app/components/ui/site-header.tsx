'use client'

interface SiteHeaderProps {
  nameColor: string
  bioColor: string
  designerColor?: string
  linkColor: string
}

export function SiteHeader({ nameColor, bioColor, designerColor, linkColor }: SiteHeaderProps) {
  const dColor = designerColor ?? bioColor

  return (
    <div className="site-header-row">
      <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
        <p className="hub-name" style={{ color: nameColor }}>
          Douglas Abreu
        </p>
        <p className="hub-bio" style={{ color: bioColor, whiteSpace: 'pre-line' }}>
          Multidisciplinary{' '}
          <strong style={{ color: dColor, transition: 'color 0.5s ease' }}>Designer</strong>
          {' '}with 15+ years of experience{'\n'}across branding, 3D, print, and visual production.
        </p>
      </div>

      <nav className="site-header-nav" style={{ alignSelf: 'flex-end' }}>
        <a href="/about" className="hub-nav-link" style={{ color: linkColor }}>
          About
        </a>
        <a
          href="mailto:douglas@douglas-abreu.com"
          className="hub-nav-link"
          style={{ color: linkColor }}
        >
          douglas@douglas-abreu.com
        </a>
      </nav>
    </div>
  )
}
