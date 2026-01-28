import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { Footer } from '../../components/common/Footer';

export function PublicLayout() {
  const { data } = useCms();
  const siteName = data.singletons.siteSettings?.siteName ?? 'Portfolio';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="text-base font-semibold">
            {siteName}
          </NavLink>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              About
            </NavLink>
            <a href="/#skills" className="hover:underline">
              Skills
            </a>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              Portfolio
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              Services
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
              Contact
            </NavLink>
            <NavLink
              to="/admin/login"
              className="rounded border p-1 text-xs hover:bg-slate-100"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <LayoutDashboard size={16} />
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
