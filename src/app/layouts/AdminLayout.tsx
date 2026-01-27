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
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/admin/cms">CMS</NavLink>
            </li>
            <li>
              <NavLink to="/admin/messages">Messages</NavLink>
            </li>
            <li>
              <NavLink to="/admin/media">Media</NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings">Settings</NavLink>
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
          <NavLink to="/">View site</NavLink>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
