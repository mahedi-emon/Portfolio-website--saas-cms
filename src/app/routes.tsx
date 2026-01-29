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
import { ProjectDetailPage } from '../pages/Projects/ProjectDetailPage';
import { AdminLoginPage } from '../admin/pages/Login/AdminLoginPage';
import { AuthCallbackPage } from '../admin/pages/AuthCallback/AuthCallbackPage';
import { DashboardHomePage } from '../admin/pages/Dashboard/DashboardHomePage';
import { ContactMessagesPage } from '../admin/pages/messages/ContactMessagesPage';
import { ContactMessageDetailPage } from '../admin/pages/messages/ContactMessageDetailPage';
import { AdminPortfolioPage } from '../admin/pages/Portfolio/AdminPortfolioPage';
import { ResumeLibraryPage } from '../admin/pages/resume/ResumeLibraryPage';
import { CmsSectionEditor } from '../admin/pages/cms/CmsSectionEditor';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
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
        <Route path="cms/hero" element={<CmsSectionEditor sectionKey="hero" />} />
        <Route path="cms/about" element={<CmsSectionEditor sectionKey="about" />} />
        <Route path="cms/contact" element={<CmsSectionEditor sectionKey="contact" />} />
        <Route path="cms/education" element={<CmsSectionEditor sectionKey="education" />} />
        <Route path="cms/core-skills" element={<CmsSectionEditor sectionKey="skills" />} />
        <Route path="cms/experience" element={<CmsSectionEditor sectionKey="experience" />} />
        <Route path="cms/certifications" element={<CmsSectionEditor sectionKey="certifications" />} />
        <Route path="cms/skills" element={<CmsSectionEditor sectionKey="techStackCategories" />} />
        <Route path="cms/services" element={<CmsSectionEditor sectionKey="services" />} />
        <Route path="cms/blogs" element={<CmsSectionEditor sectionKey="blogs" />} />
        <Route path="cms/testimonials" element={<CmsSectionEditor sectionKey="testimonials" />} />
        <Route path="cms/clients" element={<CmsSectionEditor sectionKey="clients" />} />
        <Route path="cms/resume" element={<ResumeLibraryPage />} />
        <Route path="cms/projects" element={<CmsSectionEditor sectionKey="projects" />} />
        <Route path="cms/publications" element={<CmsSectionEditor sectionKey="publications" />} />
        <Route path="cms/achievements" element={<CmsSectionEditor sectionKey="achievements" />} />
        <Route path="portfolio" element={<AdminPortfolioPage />} />
        <Route path="messages" element={<ContactMessagesPage />} />
        <Route path="messages/:id" element={<ContactMessageDetailPage />} />
      </Route>

      {/* Not found */}
      <Route path="*" element={null} />
    </Routes>
  );
}
