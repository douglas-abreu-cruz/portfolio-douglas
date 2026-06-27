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
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, width: '100%' }}>
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
          <p className="hub-name" style={{ color: nameColor }}>
            Douglas Abreu
          </p>
          <p className="hub-bio" style={{ color: bioColor }}>
            Multidisciplinary{' '}
            <strong style={{ color: dColor, transition: 'color 0.5s ease' }}>Designer</strong>
            {' '}with 15+ years of experience<br />across branding, 3D, print, and visual production.
          </p>
        </div>
        <nav className="site-header-nav-desktop" style={{
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          flexShrink: 0,
          paddingBottom: '2px',
        }}>
          <a href="/about" className="hub-nav-link" style={{ color: linkColor }}>About</a>
          <a href="mailto:douglas@douglas-abreu.com" className="hub-nav-link" style={{ color: linkColor }}>
            douglas@douglas-abreu.com
          </a>
        </nav>
      </div>
      <nav className="site-header-nav-mobile" style={{ display: 'none', gap: 16, marginTop: 8 }}>
        <a href="/about" className="hub-nav-link" style={{ color: linkColor }}>About</a>
        <a href="mailto:douglas@douglas-abreu.com" className="hub-nav-link" style={{ color: linkColor }}>
          douglas@douglas-abreu.com
        </a>
      </nav>
    </div>
  )
}
