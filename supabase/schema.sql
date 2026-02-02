-- ============================================================================
-- PORTFOLIO CMS - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- 
-- Run this SQL in the Supabase SQL Editor to create all required tables.
-- This schema matches the existing CMS data structure exactly.
--
-- Project URL: https://tgtsxotpwgxowntvqlwi.supabase.co
-- ============================================================================

-- Enable UUID extension (should be enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SINGLETONS - Single-record configuration tables
-- ============================================================================

-- CMS Hero Section
CREATE TABLE IF NOT EXISTS cms_hero (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    subheadline TEXT,
    hero_image_url TEXT,
    cta_primary_label TEXT,
    cta_primary_href TEXT,
    cta_secondary_label TEXT,
    cta_secondary_href TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMS About Section
CREATE TABLE IF NOT EXISTS cms_about (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    tagline TEXT,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    profile_image_url TEXT,
    current_job_role TEXT,
    research_interest TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMS Contact Section
CREATE TABLE IF NOT EXISTS cms_contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_intro_text TEXT,
    hire_me_label TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    social_links JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMS Resume Settings
CREATE TABLE IF NOT EXISTS cms_resume_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    active_resume_id UUID,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- COLLECTIONS - Multi-record content tables
-- ============================================================================

-- Education
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT NOT NULL,
    grade TEXT,
    activities TEXT,
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    name TEXT NOT NULL,
    level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resumes
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'active', 'inactive')),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    live_demo_url TEXT,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publications
CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    authors JSONB DEFAULT '[]'::jsonb,
    venue TEXT NOT NULL,
    publication_year TEXT NOT NULL,
    abstract TEXT,
    paper_url TEXT,
    pdf_url TEXT,
    cover_image_url TEXT,
    citation TEXT,
    publisher TEXT,
    published_date DATE,
    doi TEXT,
    external_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    certificate_title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    certificate_image_url TEXT,
    certificate_file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    company TEXT NOT NULL,
    job_role TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blogs
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    author TEXT,
    published_date DATE,
    read_time INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    author TEXT NOT NULL,
    quote TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    award_year TEXT NOT NULL,
    description TEXT NOT NULL,
    certificate_image_url TEXT,
    certificate_file_url TEXT,
    external_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech Stack Categories (with embedded tools)
CREATE TABLE IF NOT EXISTS tech_stack_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    category_name TEXT NOT NULL,
    tools JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER DEFAULT 0,
    name TEXT NOT NULL,
    industry TEXT,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    project_duration TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages (public can insert, admin can read/update)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    handled_by TEXT,
    handled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES for performance
-- ============================================================================

-- Singleton tables (single row, no special indexes needed)

-- Collection tables - status and order_index for common queries
CREATE INDEX IF NOT EXISTS idx_education_status ON education(status);
CREATE INDEX IF NOT EXISTS idx_education_order ON education(order_index);

CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);

CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);

CREATE INDEX IF NOT EXISTS idx_resumes_status ON resumes(status);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

CREATE INDEX IF NOT EXISTS idx_publications_status ON publications(status);
CREATE INDEX IF NOT EXISTS idx_publications_order ON publications(order_index);
CREATE INDEX IF NOT EXISTS idx_publications_slug ON publications(slug);

CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_index);

CREATE INDEX IF NOT EXISTS idx_experience_status ON experience(status);
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience(order_index);

CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_order ON blogs(order_index);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);

CREATE INDEX IF NOT EXISTS idx_achievements_status ON achievements(status);
CREATE INDEX IF NOT EXISTS idx_achievements_order ON achievements(order_index);

CREATE INDEX IF NOT EXISTS idx_tech_stack_categories_status ON tech_stack_categories(status);
CREATE INDEX IF NOT EXISTS idx_tech_stack_categories_order ON tech_stack_categories(order_index);

CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients(order_index);
CREATE INDEX IF NOT EXISTS idx_clients_featured ON clients(featured);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- ============================================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_cms_hero_updated_at BEFORE UPDATE ON cms_hero FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_about_updated_at BEFORE UPDATE ON cms_about FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_contact_updated_at BEFORE UPDATE ON cms_contact FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_resume_settings_updated_at BEFORE UPDATE ON cms_resume_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tech_stack_categories_updated_at BEFORE UPDATE ON tech_stack_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE cms_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_resume_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SINGLETON POLICIES (cms_hero, cms_about, cms_contact, cms_resume_settings)
-- Public: READ all (single row)
-- Admin: FULL CRUD
-- ============================================================================

-- cms_hero
CREATE POLICY "Public read cms_hero" ON cms_hero FOR SELECT USING (true);
CREATE POLICY "Admin full access cms_hero" ON cms_hero FOR ALL USING (auth.role() = 'authenticated');

-- cms_about
CREATE POLICY "Public read cms_about" ON cms_about FOR SELECT USING (true);
CREATE POLICY "Admin full access cms_about" ON cms_about FOR ALL USING (auth.role() = 'authenticated');

-- cms_contact
CREATE POLICY "Public read cms_contact" ON cms_contact FOR SELECT USING (true);
CREATE POLICY "Admin full access cms_contact" ON cms_contact FOR ALL USING (auth.role() = 'authenticated');

-- cms_resume_settings
CREATE POLICY "Public read cms_resume_settings" ON cms_resume_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access cms_resume_settings" ON cms_resume_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- COLLECTION POLICIES (status-based visibility)
-- Public: READ only where status = 'published' (or 'active' for resumes)
-- Admin: FULL CRUD on all records
-- ============================================================================

-- education
CREATE POLICY "Public read published education" ON education FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access education" ON education FOR ALL USING (auth.role() = 'authenticated');

-- skills
CREATE POLICY "Public read published skills" ON skills FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- services
CREATE POLICY "Public read published services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- resumes (active status for public)
CREATE POLICY "Public read active resumes" ON resumes FOR SELECT USING (status IN ('published', 'active'));
CREATE POLICY "Admin full access resumes" ON resumes FOR ALL USING (auth.role() = 'authenticated');

-- projects
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- publications
CREATE POLICY "Public read published publications" ON publications FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access publications" ON publications FOR ALL USING (auth.role() = 'authenticated');

-- certifications
CREATE POLICY "Public read published certifications" ON certifications FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');

-- experience
CREATE POLICY "Public read published experience" ON experience FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access experience" ON experience FOR ALL USING (auth.role() = 'authenticated');

-- blogs
CREATE POLICY "Public read published blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');

-- testimonials
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- achievements
CREATE POLICY "Public read published achievements" ON achievements FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access achievements" ON achievements FOR ALL USING (auth.role() = 'authenticated');

-- tech_stack_categories
CREATE POLICY "Public read published tech_stack_categories" ON tech_stack_categories FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access tech_stack_categories" ON tech_stack_categories FOR ALL USING (auth.role() = 'authenticated');

-- clients
CREATE POLICY "Public read published clients" ON clients FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access clients" ON clients FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- CONTACT MESSAGES POLICIES
-- Public: INSERT only (can submit contact form)
-- Admin: FULL CRUD (can read, reply, archive)
-- ============================================================================

CREATE POLICY "Public can insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- INITIAL DATA - Insert default singleton records
-- ============================================================================

-- Insert default hero (if not exists)
INSERT INTO cms_hero (full_name, headline, subheadline, cta_primary_label, cta_primary_href, cta_secondary_label, cta_secondary_href)
SELECT 'Your Name', 'Welcome to My Portfolio', 'Full-Stack Developer', 'View Portfolio', '/portfolio', 'Contact', '/contact'
WHERE NOT EXISTS (SELECT 1 FROM cms_hero LIMIT 1);

-- Insert default about (if not exists)
INSERT INTO cms_about (full_name, title, bio, highlights)
SELECT 'Your Name', 'About Me', 'Your bio goes here...', '[]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM cms_about LIMIT 1);

-- Insert default contact (if not exists)
INSERT INTO cms_contact (email, social_links)
SELECT 'your@email.com', '[]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM cms_contact LIMIT 1);

-- Insert default resume settings (if not exists)
INSERT INTO cms_resume_settings (id)
SELECT uuid_generate_v4()
WHERE NOT EXISTS (SELECT 1 FROM cms_resume_settings LIMIT 1);

-- ============================================================================
-- VERIFICATION QUERIES (run after schema creation)
-- ============================================================================

-- Check all tables created
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Check RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;

-- Check policies
-- SELECT tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE schemaname = 'public';
