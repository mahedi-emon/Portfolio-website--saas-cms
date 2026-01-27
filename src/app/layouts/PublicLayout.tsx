import { NavLink, Outlet } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: 'none',
  padding: '6px 10px',
  borderRadius: 8,
  color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
});

export function PublicLayout() {
  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backdropFilter: 'blur(8px)',
          background: 'rgba(10, 10, 10, 0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          <div style={{ color: 'white', fontWeight: 700 }}>Portfolio</div>
          <nav style={{ display: 'flex', gap: 6 }}>
            <NavLink to="/" end style={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/about" style={linkStyle}>
              About
            </NavLink>
            <NavLink to="/projects" style={linkStyle}>
              Projects
            </NavLink>
            <NavLink to="/publications" style={linkStyle}>
              Publications
            </NavLink>
            <NavLink to="/blog" style={linkStyle}>
              Blog
            </NavLink>
            <NavLink to="/services" style={linkStyle}>
              Services
            </NavLink>
            <NavLink to="/contact" style={linkStyle}>
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Outlet />
      </main>

      <footer
        style={{
          marginTop: 40,
          padding: 16,
          borderTop: '1px solid rgba(0,0,0,0.08)',
          color: 'rgba(0,0,0,0.6)',
          textAlign: 'center',
        }}
      >
        <small>Footer placeholder</small>
      </footer>
    </div>
  );
}
