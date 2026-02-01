import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Menu, X, ArrowUp } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { Footer } from '../../components/common/Footer';
import { AuroraMesh } from '../../components/common/AuroraMesh';

export function PublicLayout() {
  const { data } = useCms();
  const location = useLocation();
  const siteName = data.singletons.about?.fullName ?? data.singletons.hero?.fullName ?? 'Portfolio';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent, targetPath: string) => {
    if (location.pathname === targetPath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/#skills', label: 'Skills', isAnchor: true },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0B1320' }}>
      {/* Animated Particle Network Background */}
      <AuroraMesh variant="dark" />

      {/* Premium Header - Cinematic Design */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#0B1320]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo and Name Container */}
          <div className="flex items-center min-w-[210px]">
            <NavLink 
              to="/" 
              onClick={(e) => handleNavClick(e, '/')}
              className="group flex items-center gap-3 text-xl font-bold tracking-tight"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#C77DFF] text-[#0B1320] shadow-lg shadow-[#C77DFF]/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[#C77DFF]/50">
                <span className="text-lg font-bold">{siteName.charAt(0)}</span>
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </div>
              <span className="sm:block text-white font-semibold overflow-hidden whitespace-nowrap inline-block max-w-0 animate-typewriter-fixed" style={{verticalAlign:'bottom'}}>{siteName}</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="relative px-4 py-2 text-sm font-medium text-[#C9D1D9] transition-all duration-300 hover:text-white group animate-fade-in rounded-lg hover:bg-white/[0.06]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 rounded-lg bg-[#C77DFF]/0 transition-all duration-300 group-hover:bg-[#C77DFF]/[0.08] group-hover:shadow-[inset_0_0_12px_rgba(199,125,255,0.15)]" />
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={({ isActive }) => `
                    relative px-4 py-2 text-sm font-medium transition-all duration-300 group animate-fade-in rounded-lg
                    ${isActive 
                      ? 'text-white bg-white/[0.08]' 
                      : 'text-[#C9D1D9] hover:text-white hover:bg-white/[0.06]'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#C77DFF]/[0.12] shadow-[inset_0_0_12px_rgba(199,125,255,0.2)]' 
                          : 'bg-[#C77DFF]/0 group-hover:bg-[#C77DFF]/[0.08] group-hover:shadow-[inset_0_0_12px_rgba(199,125,255,0.15)]'
                      }`} />
                    </>
                  )}
                </NavLink>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="/admin/login"
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#C77DFF]/50 hover:bg-[#C77DFF]/10 hover:shadow-lg hover:shadow-[#C77DFF]/10 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <LayoutDashboard size={18} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-[#C77DFF]" />
              <span>Admin</span>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-transparent text-white transition-all duration-300 hover:border-[#C77DFF]/50 hover:bg-[#C77DFF]/10 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="mx-4 sm:mx-6 mt-4 flex flex-col gap-1 rounded-2xl bg-[#0B1320]/95 backdrop-blur-xl border border-white/10 p-4 animate-slide-up">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="relative rounded-xl px-4 py-3 text-sm font-medium text-[#C9D1D9] transition-all duration-300 hover:text-white group overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 rounded-xl bg-[#C77DFF]/0 transition-all duration-300 group-hover:bg-[#C77DFF]/[0.1]" />
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={({ isActive }) => `
                    relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group overflow-hidden
                    ${isActive 
                      ? 'bg-[#C77DFF]/[0.15] text-white' 
                      : 'text-[#C9D1D9] hover:text-white'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {!isActive && <span className="absolute inset-0 rounded-xl bg-[#C77DFF]/0 transition-all duration-300 group-hover:bg-[#C77DFF]/[0.1]" />}
                    </>
                  )}
                </NavLink>
              )
            ))}
            <NavLink
              to="/admin/login"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#C77DFF] px-4 py-3 text-sm font-medium text-[#0B1320] transition-all duration-300 hover:shadow-lg hover:shadow-[#C77DFF]/30"
            >
              <LayoutDashboard size={18} />
              <span>Admin Panel</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative w-full pt-32 pb-20">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#C77DFF] text-[#0B1320] shadow-lg shadow-[#C77DFF]/30 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-[#C77DFF]/50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
