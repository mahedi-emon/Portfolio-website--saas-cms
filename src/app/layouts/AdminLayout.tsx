import {
  BadgeCheck,
  BookOpen,
  FolderKanban,
  GraduationCap,
  Home,
  Layers,
  LayoutDashboard,
  MessageSquare,
  PenLine,
  Settings,
  SquareStack,
  Users,
  FileText,
  PanelBottom,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const { role } = useAuth();

  const mockAuthSnippet =
    "localStorage.setItem('portfolio.mockAuth', '{\"isAuthenticated\":true,\"role\":\"admin\"}')";

  const baseLink =
    'flex items-center gap-2 rounded px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900';
  const activeLink = 'bg-slate-200 text-slate-900';

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Admin Panel</div>
            <div className="text-xs text-slate-500">Role: {role ?? 'none'}</div>
          </div>
        </div>

        <nav className="h-[calc(100%-4rem)] overflow-y-auto px-3 py-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Content</div>
          <ul className="mt-3 space-y-1">
            <li>
              <NavLink to="/admin/dashboard" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/hero" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <Home className="h-4 w-4" /> Hero
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/about" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <Users className="h-4 w-4" /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/education" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <GraduationCap className="h-4 w-4" /> Education
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/skills" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <Layers className="h-4 w-4" /> Skills / Tech Stack
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/portfolio" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <FolderKanban className="h-4 w-4" /> Portfolio
              </NavLink>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <NavLink to="/admin/cms/projects" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                    <SquareStack className="h-4 w-4" /> Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/cms/publications"
                    className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
                  >
                    <BookOpen className="h-4 w-4" /> Publications
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/cms/achievements"
                    className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
                  >
                    <BadgeCheck className="h-4 w-4" /> Achievements
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/admin/cms/services" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <PenLine className="h-4 w-4" /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/blogs" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <FileText className="h-4 w-4" /> Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/cms/testimonials"
                className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
              >
                <MessageSquare className="h-4 w-4" /> Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/clients" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <Users className="h-4 w-4" /> Clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/resume" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <FileText className="h-4 w-4" /> Resume
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/footer" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <PanelBottom className="h-4 w-4" /> Footer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/cms/site-settings"
                className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
              >
                <Settings className="h-4 w-4" /> Site Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/messages" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
                <MessageSquare className="h-4 w-4" /> Contact Messages
              </NavLink>
            </li>
          </ul>

          <div className="mt-6 rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <div className="font-semibold text-slate-700">Mock Auth</div>
            <div className="mt-1">To enable admin in dev console:</div>
            <code className="mt-2 block whitespace-pre-wrap break-words text-[11px] text-slate-700">
              {mockAuthSnippet}
            </code>
          </div>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="text-sm font-semibold text-slate-900">Admin Dashboard</div>
          <NavLink
            to="/"
            className="inline-flex items-center rounded border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            Go to public site
          </NavLink>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
