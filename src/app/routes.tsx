import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminOnlyRoute } from './guards/AdminOnlyRoute';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { HomePage } from '../pages/Home/HomePage';
import { AboutPage } from '../pages/About/AboutPage';
import { PortfolioPage } from '../pages/Portfolio/PortfolioPage';
import { BlogListPage } from '../pages/Blog/BlogListPage';
import { BlogPostPage } from '../pages/Blog/BlogPostPage';
import { ServicesPage } from '../pages/Services/ServicesPage';
import { ContactPage } from '../pages/Contact/ContactPage';
import { AdminLoginPage } from '../admin/pages/Login/AdminLoginPage';
import { AuthCallbackPage } from '../admin/pages/AuthCallback/AuthCallbackPage';
import { DashboardHomePage } from '../admin/pages/Dashboard/DashboardHomePage';
import { CmsIndexPage } from '../admin/pages/cms/CmsIndexPage';
import { CmsSectionPage } from '../admin/pages/cms/CmsSectionPage';
import { ContactMessagesPage } from '../admin/pages/messages/ContactMessagesPage';
import { ContactMessageDetailPage } from '../admin/pages/messages/ContactMessageDetailPage';
import { MediaLibraryPage } from '../admin/pages/media/MediaLibraryPage';
import { AdminSettingsPage } from '../admin/pages/settings/AdminSettingsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin (no Supabase yet; guarded by mock auth context) */}
      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route path="admin/auth/callback" element={<AuthCallbackPage />} />

      <Route path="admin" element={<Navigate to="/admin/login" replace />} />

      <Route
        path="admin"
        element={
          <ProtectedRoute redirectTo="/admin/login">
            <AdminOnlyRoute>
              <AdminLayout />
            </AdminOnlyRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardHomePage />} />
        <Route path="cms" element={<CmsIndexPage />} />
        <Route path="cms/:sectionKey" element={<CmsSectionPage />} />
        <Route path="messages" element={<ContactMessagesPage />} />
        <Route path="messages/:id" element={<ContactMessageDetailPage />} />
        <Route path="media" element={<MediaLibraryPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Not found */}
      <Route path="*" element={null} />
    </Routes>
  );
}
