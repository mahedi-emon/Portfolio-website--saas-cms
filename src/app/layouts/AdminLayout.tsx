import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const { role } = useAuth();

  const mockAuthSnippet =
    "localStorage.setItem('portfolio.mockAuth', '{\"isAuthenticated\":true,\"role\":\"admin\"}')";

  return (
    <div>
      <aside>
        <div>Admin</div>
        <div>Role: {role ?? 'none'}</div>

        <nav>
          <ul>
            <li>
              <NavLink to="/admin/cms/hero">Hero</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/education">Education</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/skills">Skills / Tech Stack</NavLink>
            </li>
            <li>
              <NavLink to="/admin/portfolio">Portfolio</NavLink>
              <ul>
                <li>
                  <NavLink to="/admin/cms/projects">Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/cms/publications">Publications</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/cms/achievements">Achievements</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/admin/cms/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/blogs">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/testimonials">Testimonials</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/clients">Clients</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/resume">Resume</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/footer">Footer</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms/site-settings">Site Settings</NavLink>
            </li>
            <li>
              <NavLink to="/admin/messages">Contact Messages</NavLink>
            </li>
          </ul>
        </nav>

        <div>
          <p>Auth is mocked for now.</p>
          <p>To enable admin in dev console:</p>
          <code>{mockAuthSnippet}</code>
        </div>
      </aside>

      <div>
        <header>
          <div>Dashboard</div>
          <NavLink to="/" className="inline-flex items-center rounded border px-3 py-1 text-sm">
            Go to public site
          </NavLink>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
