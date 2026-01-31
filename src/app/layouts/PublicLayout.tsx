import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Menu, X, ArrowUp } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { Footer } from '../../components/common/Footer';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-30 blur-3xl animate-morph" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-30 blur-3xl animate-morph delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl floating-slow" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-15 blur-3xl animate-pulse-glow" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      {/* Premium Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 glass shadow-lg shadow-slate-200/50' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="group flex items-center gap-3 text-xl font-bold tracking-tight"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl">
              <span className="text-lg font-bold">{siteName.charAt(0)}</span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>
            <span className="hidden sm:block text-shimmer">{siteName}</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-indigo-600 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:left-4 group-hover:w-[calc(100%-32px)]" />
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `
                    relative px-4 py-2 text-sm font-medium transition-all duration-300 group animate-fade-in hover:-translate-y-0.5
                    ${isActive 
                      ? 'text-indigo-600' 
                      : 'text-slate-600 hover:text-indigo-600'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                        isActive 
                          ? 'left-4 w-[calc(100%-32px)]' 
                          : 'w-0 group-hover:left-4 group-hover:w-[calc(100%-32px)]'
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
              className="group flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 btn-animated"
            >
              <LayoutDashboard size={18} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>Admin</span>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-200 bg-white/80 text-slate-600 transition-all duration-300 hover:border-indigo-500 hover:text-indigo-600 hover:rotate-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} className="animate-spin-slow" /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="mx-6 mt-4 flex flex-col gap-2 rounded-2xl glass p-4 animate-slide-up">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `
                    rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:translate-x-2
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </NavLink>
              )
            ))}
            <NavLink
              to="/admin/login"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 btn-animated"
            >
              <LayoutDashboard size={18} className="animate-pulse" />
              <span>Admin Panel</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-32 pb-20">
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
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-12 animate-bounce-subtle ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="animate-bounce" />
      </button>
    </div>
  );
}
