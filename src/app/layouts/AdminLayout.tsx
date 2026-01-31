import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Home,
  Layers,
  LayoutDashboard,
  MessageSquare,
  PenLine,
  SquareStack,
  Users,
  FileText,
  Mail,
  ChevronDown,
  LogOut,
  Search,
  Menu,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCms } from '../../hooks/useCms';

export function AdminLayout() {
  const { role, refresh } = useAuth();
  const { data } = useCms();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const mockAuthSnippet =
    "localStorage.setItem('portfolio.mockAuth', '{\"isAuthenticated\":true,\"role\":\"admin\"}')";

  const baseLink =
    'flex items-center gap-2 rounded px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800';
  const activeLink = 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white';
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
  const mainOffset = isCollapsed ? 'ml-20' : 'ml-64';

  const collectionRoutes: Record<string, string> = {
    projects: '/admin/cms/projects',
    blogs: '/admin/cms/blogs',
    publications: '/admin/cms/publications',
    achievements: '/admin/cms/achievements',
    services: '/admin/cms/services',
    education: '/admin/cms/education',
    testimonials: '/admin/cms/testimonials',
    clients: '/admin/cms/clients',
    techStackCategories: '/admin/cms/skills',
    contactMessages: '/admin/messages',
    resumes: '/admin/cms/resume',
  };

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [] as Array<{ id: string; label: string; collection: string; href: string }>;

    const getLabel = (item: Record<string, unknown>) =>
      String(
        item.title ??
          item.name ??
          item.subject ??
          item.slug ??
          item.company ??
          item.role ??
          item.institution ??
          item.categoryName ??
          item.certificateTitle ??
          item.issuer ??
          item.id
      );

    const results: Array<{ id: string; label: string; collection: string; href: string }> = [];
    Object.entries(data.collections).forEach(([collectionKey, items]) => {
      const route = collectionRoutes[collectionKey];
      if (!route) return;
      items.forEach((item) => {
        const itemRecord = item as Record<string, unknown>;
        const haystack = JSON.stringify(itemRecord).toLowerCase();
        if (!haystack.includes(query)) return;
        results.push({
          id: String(itemRecord.id ?? `${collectionKey}-${results.length}`),
          label: getLabel(itemRecord),
          collection: collectionKey,
          href: route,
        });
      });
    });

    return results.slice(0, 8);
  }, [data.collections, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <aside className={`fixed left-0 top-0 h-full ${sidebarWidth} border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`}>
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
            <div className={isCollapsed ? 'hidden' : ''}>
              <div className="text-sm font-semibold">Admin Panel</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Role: {role ?? 'none'}</div>
            </div>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <nav className="h-[calc(100%-4rem)] overflow-y-auto px-3 py-4">
            {!isCollapsed && (
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Content</div>
            )}
            <ul className="mt-3 space-y-1">
              <li>
                <NavLink to="/admin/dashboard" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  {!isCollapsed && <span>Dashboard</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/hero" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Home className="h-4 w-4" />
                  {!isCollapsed && <span>Hero</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/about" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Users className="h-4 w-4" />
                  {!isCollapsed && <span>About</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/contact" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Mail className="h-4 w-4" />
                  {!isCollapsed && <span>Contact</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/education" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <GraduationCap className="h-4 w-4" />
                  {!isCollapsed && <span>Education</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/core-skills" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Layers className="h-4 w-4" />
                  {!isCollapsed && <span>Core Skills</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/experience" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Briefcase className="h-4 w-4" />
                  {!isCollapsed && <span>Experience</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/certifications" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <BadgeCheck className="h-4 w-4" />
                  {!isCollapsed && <span>Certifications</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/skills" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Layers className="h-4 w-4" />
                  {!isCollapsed && <span>Skills</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/portfolio" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <FolderKanban className="h-4 w-4" />
                  {!isCollapsed && <span>Portfolio</span>}
                </NavLink>
                {!isCollapsed && (
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
                )}
              </li>
              <li>
                <NavLink to="/admin/cms/services" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <PenLine className="h-4 w-4" />
                  {!isCollapsed && <span>Services</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/blogs" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <FileText className="h-4 w-4" />
                  {!isCollapsed && <span>Blogs</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/cms/testimonials"
                  className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <MessageSquare className="h-4 w-4" />
                  {!isCollapsed && <span>Testimonials</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/cms/clients" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <Users className="h-4 w-4" />
                  {!isCollapsed && <span>Clients</span>}
                </NavLink>
              </li>
            </ul>

            {!isCollapsed && (
              <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">System</div>
            )}
            <ul className="mt-3 space-y-1">
              <li>
                <NavLink to="/admin/cms/resume" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <FileText className="h-4 w-4" />
                  {!isCollapsed && <span>Resume</span>}
                </NavLink>
              </li>
            </ul>

            {!isCollapsed && (
              <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Communication</div>
            )}
            <ul className="mt-3 space-y-1">
              <li>
                <NavLink to="/admin/messages" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <MessageSquare className="h-4 w-4" />
                  {!isCollapsed && <span>Contact Messages</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <div className={mainOffset}>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-64 rounded border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Search content"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 150)}
                />
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute left-0 top-full mt-2 w-full rounded border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <ul className="max-h-60 overflow-auto py-2">
                      {searchResults.map((result) => (
                        <li key={`${result.collection}-${result.id}`}>
                          <NavLink
                            to={result.href}
                            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <div className="text-xs uppercase text-slate-400">{result.collection}</div>
                            <div>{result.label}</div>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {data.singletons.about?.profileImageUrl ? (
                    <img
                      src={data.singletons.about.profileImageUrl}
                      alt="Admin avatar"
                      className="h-7 w-7 rounded-full border object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border text-xs">AD</div>
                  )}
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {role ?? 'guest'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={() => {
                        navigate('/');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Home className="h-4 w-4" /> Home
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={() => {
                        localStorage.removeItem('portfolio.mockAuth');
                        refresh();
                        navigate('/admin/login');
                      }}
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </div>
    </div>
  );
}
