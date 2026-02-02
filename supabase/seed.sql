-- ============================================================================
-- PORTFOLIO CMS - SEED DATA
-- ============================================================================
-- 
-- Run this SQL in the Supabase SQL Editor AFTER creating the schema.
-- This inserts the existing CMS data from the mock JSON.
--
-- ============================================================================

-- Clear existing data (optional - uncomment if needed)
-- TRUNCATE cms_hero, cms_about, cms_contact, cms_resume_settings CASCADE;
-- TRUNCATE education, skills, services, resumes, projects, publications CASCADE;
-- TRUNCATE certifications, experience, blogs, testimonials, achievements CASCADE;
-- TRUNCATE tech_stack_categories, clients, contact_messages CASCADE;

-- ============================================================================
-- SINGLETONS
-- ============================================================================

-- Hero
DELETE FROM cms_hero;
INSERT INTO cms_hero (full_name, headline, subheadline, hero_image_url, cta_primary_label, cta_primary_href, cta_secondary_label, cta_secondary_href)
VALUES (
    'Mahedi Hasan Emon',
    'Hi, I''m Mahedi — Full-Stack Software Engineer & AI Researcher',
    'Django & React Developer | ML, NLP & Deep Learning Researcher | REST APIs Specialist',
    '',
    'View Portfolio',
    '/portfolio',
    'Contact',
    '/contact'
);

-- About
DELETE FROM cms_about;
INSERT INTO cms_about (full_name, tagline, title, bio, profile_image_url, current_job_role, research_interest, highlights)
VALUES (
    'Mahedi Hasan Emon',
    'Full-Stack Software Engineer | Django & React | ML, NLP & Deep Learning Researcher',
    'About Me',
    'I am a Computer Science and Engineering graduate from Daffodil International University (CGPA: 3.93/4.00) with a strong background in software engineering, machine learning, natural language processing, and deep learning. I specialize in building scalable, secure, and high-performance full-stack applications using Django and React. I design robust backend systems, RESTful APIs, and database-driven applications while ensuring clean architecture and performance optimization. My goal is to bridge software engineering and artificial intelligence to build intelligent, data-driven, and scalable real-world systems.',
    'https://placehold.co/320x320?text=MHE',
    'Full-Stack Software Engineer & AI Researcher',
    'Machine Learning, Natural Language Processing, Deep Learning, and AI-driven systems',
    '["BSc in Computer Science & Engineering (CGPA: 3.93/4.00)", "Django, React, REST APIs, PostgreSQL, MySQL", "Machine Learning, NLP, Deep Learning Research", "Published researcher at IDAA 2025 Conference"]'::jsonb
);

-- Contact
DELETE FROM cms_contact;
INSERT INTO cms_contact (page_intro_text, hire_me_label, email, phone, location, social_links)
VALUES (
    'Feel free to connect with me for collaboration, research opportunities, or development projects.',
    'Hire Me',
    'mahedi.emon62@gmail.com',
    '',
    'Dhaka, Bangladesh',
    '[{"url": "https://linkedin.com/in/mahediemon", "platform": "linkedin", "iconKey": "linkedin"}, {"url": "https://github.com/mahediemon", "platform": "github", "iconKey": "github"}]'::jsonb
);

-- Resume Settings
DELETE FROM cms_resume_settings;
INSERT INTO cms_resume_settings (active_resume_id)
VALUES (NULL); -- Will be updated after resumes are inserted

-- ============================================================================
-- EDUCATION
-- ============================================================================

INSERT INTO education (status, order_index, institution, degree, field, grade, activities, description, start_date, end_date)
VALUES 
(
    'published', 1,
    'Daffodil International University-DIU',
    'Bachelor of Science',
    'Computer Science and Engineering',
    'CGPA 3.93/4.00',
    'IEEE DIU Student Branch, HRDI Campus Ambassador, DIU-CPC',
    'Focused on software engineering, machine learning, natural language processing, and deep learning. Completed final year defense project CampusHat and published research at IDAA 2025.',
    '2022-05-01',
    '2026-04-01'
),
(
    'published', 2,
    'Dhaka City College',
    'Higher Secondary Certificate (HSC)',
    'Science',
    'GPA 5.00',
    'Mathematics, Physics',
    '',
    '2018-01-01',
    '2020-01-01'
);

-- ============================================================================
-- SKILLS
-- ============================================================================

INSERT INTO skills (status, order_index, name, level)
VALUES 
('published', 1, 'Django', 5),
('published', 2, 'React.js', 5),
('published', 3, 'REST APIs', 5),
('published', 4, 'Python', 5),
('published', 5, 'Deep Learning', 4),
('published', 6, 'Machine Learning', 4),
('published', 7, 'Natural Language Processing (NLP)', 4),
('published', 8, 'PostgreSQL', 4),
('published', 9, 'MySQL', 4),
('published', 10, 'JavaScript', 4),
('published', 11, 'Tailwind CSS', 4),
('published', 12, 'Bi-LSTM', 4),
('published', 13, 'Bangla-BERT', 4),
('published', 14, 'Git', 4),
('published', 15, 'Docker', 3),
('published', 16, 'Node.js', 3),
('published', 17, 'HTMX', 4),
('published', 18, 'Streamlit', 3);

-- ============================================================================
-- SERVICES
-- ============================================================================

INSERT INTO services (status, order_index, title, summary)
VALUES 
('published', 1, 'Full-Stack Web Development', 'Building scalable, secure, and high-performance web applications using Django and React with clean architecture.'),
('published', 2, 'REST API Development', 'Designing robust backend systems, RESTful APIs, and database-driven applications with performance optimization.'),
('published', 3, 'AI & Machine Learning Solutions', 'Developing AI-driven systems with expertise in Machine Learning, NLP, and Deep Learning.'),
('published', 4, 'Database Design & Management', 'PostgreSQL, MySQL, SQL Server database design, optimization, and management.');

-- ============================================================================
-- RESUMES
-- ============================================================================

INSERT INTO resumes (status, title, file_url, uploaded_at)
VALUES (
    'active',
    'Mahedi Hasan Emon - Resume',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    '2026-01-05'
);

-- Update resume settings with the new resume ID
UPDATE cms_resume_settings SET active_resume_id = (SELECT id FROM resumes WHERE status = 'active' LIMIT 1);

-- ============================================================================
-- PROJECTS
-- ============================================================================

INSERT INTO projects (status, order_index, slug, title, summary, description, cover_image_url, gallery_images, github_url, live_demo_url, tech_stack, featured)
VALUES 
(
    'published', 1,
    'campushat-marketplace',
    'CampusHat – A Campus-Based Online Marketplace',
    'Final-Year Defense Project designed to solve real-life campus commerce problems.',
    'CampusHat is my Final-Year Defense Project, designed to solve real-life campus commerce problems by providing a secure, scalable, and organized digital marketplace for university students. Built with Django backend and React frontend with comprehensive features for campus e-commerce.',
    'https://placehold.co/800x500?text=CampusHat',
    '[]'::jsonb,
    '',
    '',
    '["Django", "React.js", "PostgreSQL", "REST APIs", "Tailwind CSS"]'::jsonb,
    true
),
(
    'published', 2,
    'bangla-document-classification',
    'Hybrid Ensemble Bangla Document Classification System',
    'Research-driven AI system combining Bangla-BERT and Bi-LSTM models for NLP.',
    'Django-Based Bangla Document Classification Using Deep Learning is a research-driven AI system developed to classify Bangla news articles using a hybrid ensemble of Bangla-BERT and Bi-LSTM models. This project was presented at IDAA 2025 International Conference.',
    'https://placehold.co/800x500?text=Bangla+NLP',
    '[]'::jsonb,
    '',
    '',
    '["Django", "Deep Learning", "Bangla-BERT", "Bi-LSTM", "NLP"]'::jsonb,
    true
);

-- ============================================================================
-- PUBLICATIONS
-- ============================================================================

INSERT INTO publications (status, order_index, slug, title, authors, venue, publication_year, abstract, paper_url, pdf_url, cover_image_url, citation, publisher, published_date, doi, external_url)
VALUES (
    'published', 1,
    'bangla-document-classification-bert-bilstm',
    'Enhancing Bangla Document Classification Using a Hybrid Ensemble of Bangla-BERT and Bi-LSTM Models',
    '["Mahedi Hasan Emon"]'::jsonb,
    'International Conference on Intelligent Data Analysis and Applications (IDAA 2025)',
    '2025',
    'This paper proposes a hybrid ensemble approach combining Bangla-BERT and Bi-LSTM models for Bangla document classification, achieving high accuracy and improved generalization. The work was accepted and presented at the IDAA 2025 conference at Daffodil International University.',
    '',
    '',
    'https://placehold.co/800x500?text=IDAA+2025',
    'Emon, M. H. (2025). Enhancing Bangla Document Classification Using a Hybrid Ensemble of Bangla-BERT and Bi-LSTM Models. IDAA 2025.',
    '',
    NULL,
    '',
    ''
);

-- ============================================================================
-- CERTIFICATIONS
-- ============================================================================

INSERT INTO certifications (status, order_index, certificate_title, issuer, issue_date, expiry_date, credential_id, credential_url, certificate_image_url, certificate_file_url)
VALUES 
(
    'published', 1,
    'Full Stack Web Development with Django 5, TailwindCSS, HTMX',
    'Udemy',
    '2026-01-01',
    NULL,
    'UC-50223aa5-feb0-48bd-a797-3cb7a6d98d6f',
    '',
    'https://placehold.co/640x420?text=Django+Certificate',
    ''
),
(
    'published', 2,
    'The Complete Full-Stack Web Development Bootcamp',
    'Udemy',
    '2025-10-01',
    NULL,
    'UC-9b977845-1f85-4d6c-902a-3de7d8cc5ce2',
    '',
    'https://placehold.co/640x420?text=Fullstack+Certificate',
    ''
),
(
    'published', 3,
    'Database Systems Training (MySQL, Oracle, SQL Server)',
    'Bangladesh Computer Council (BCC) – ICT Division, Bangladesh',
    '2025-04-01',
    NULL,
    'EDGE-DSTS-106-2384-00023',
    '',
    'https://placehold.co/640x420?text=Database+Certificate',
    ''
);

-- ============================================================================
-- EXPERIENCE
-- ============================================================================

INSERT INTO experience (status, order_index, company, job_role, start_date, end_date, description)
VALUES 
(
    'published', 1,
    'Daffodil International University-DIU',
    'AI Researcher (Machine Learning, NLP, Deep Learning)',
    '2025-02-01',
    '2025-12-01',
    'Conducted research on Bangla document classification using hybrid deep learning and ensemble models. Developed a hybrid ensemble framework combining Bangla-BERT and Bi-LSTM architectures. Performed data preprocessing, model training, evaluation, and performance optimization for NLP tasks. Published and presented research at IDAA 2025 International Conference.'
),
(
    'published', 2,
    'Human Resource Development Institute-HRDI',
    'Campus Ambassador',
    '2023-09-01',
    '2026-01-01',
    'Served as Campus Ambassador at Daffodil International University, promoting professional development opportunities and connecting students with career resources.'
),
(
    'published', 3,
    'IEEE DIU Student Branch',
    'Executive Member',
    '2023-08-01',
    '2026-01-01',
    'Active executive member contributing to technical events, workshops, and student engagement activities at Daffodil International University.'
),
(
    'published', 4,
    'Daffodil International University-DIU',
    'Student Associate',
    '2024-03-01',
    '2024-12-01',
    'Worked as a Student Associate at creative International of Daffodil International University (YKSG-01), supporting various university initiatives and student services.'
);

-- ============================================================================
-- BLOGS
-- ============================================================================

INSERT INTO blogs (status, order_index, title, slug, excerpt, content, cover_image_url, author, published_date, read_time, tags)
VALUES (
    'draft', 1,
    'Coming Soon',
    'coming-soon',
    'Blog posts are on the way.',
    '<p>Stay tuned for upcoming articles.</p>',
    'https://placehold.co/800x400?text=Coming+Soon',
    'Mahedi Hasan Emon',
    '2026-02-01',
    3,
    '["Updates"]'::jsonb
);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================

INSERT INTO testimonials (status, order_index, author, quote)
VALUES 
(
    'published', 1,
    'Md Abdullah Al Maruf',
    'I have worked closely with Mahedi Hasan Emon at DIU-CPC, IEEE DIU Student Branch, and HRDI, and it has been an amazing experience. He is dedicated, collaborative, and truly a real-life problem solver. Working with him has always been a valuable and positive experience.'
),
(
    'published', 2,
    'Munawar Mesbah Shraban',
    'I had the pleasure of working with Mahedi Hasan Emon as a Student Associate at Yunus Khan Scholar Garden-1, DIU. He is dedicated, cooperative, and always supportive. Working with him was truly enriching, and I believe he will be a valuable asset in any team or organization.'
);

-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (status, order_index, title, issuer, award_year, description, certificate_image_url, certificate_file_url, external_link)
VALUES (
    'published', 1,
    'Certificate of Appreciation – IDAA 2025 International Conference',
    'International Conference on Intelligent Data Analysis and Applications',
    '2025',
    'Presented and published research at the International Conference on Intelligent Data Analysis and Applications (IDAA 2025) at Daffodil International University. The work focused on Bangla document classification using AI & NLP.',
    '',
    '',
    ''
);

-- ============================================================================
-- TECH STACK CATEGORIES
-- ============================================================================

INSERT INTO tech_stack_categories (status, order_index, category_name, tools)
VALUES 
(
    'published', 1,
    'Backend Development',
    '[{"id": "tool-1", "name": "Django", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-2", "name": "REST APIs", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-3", "name": "Python", "logoUrl": "", "proficiencyLevel": 95}, {"id": "tool-4", "name": "Node.js", "logoUrl": "", "proficiencyLevel": 70}]'::jsonb
),
(
    'published', 2,
    'Frontend Development',
    '[{"id": "tool-5", "name": "React.js", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-6", "name": "JavaScript", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-7", "name": "Tailwind CSS", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-8", "name": "HTMX", "logoUrl": "", "proficiencyLevel": 80}, {"id": "tool-9", "name": "HTML", "logoUrl": "", "proficiencyLevel": 95}, {"id": "tool-10", "name": "CSS", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-11", "name": "Bootstrap", "logoUrl": "", "proficiencyLevel": 85}]'::jsonb
),
(
    'published', 3,
    'AI & Machine Learning',
    '[{"id": "tool-12", "name": "Deep Learning", "logoUrl": "", "proficiencyLevel": 80}, {"id": "tool-13", "name": "Machine Learning", "logoUrl": "", "proficiencyLevel": 80}, {"id": "tool-14", "name": "Natural Language Processing (NLP)", "logoUrl": "", "proficiencyLevel": 80}, {"id": "tool-15", "name": "Bi-LSTM", "logoUrl": "", "proficiencyLevel": 75}, {"id": "tool-16", "name": "Bangla-BERT", "logoUrl": "", "proficiencyLevel": 75}, {"id": "tool-17", "name": "BERT (Language Model)", "logoUrl": "", "proficiencyLevel": 75}, {"id": "tool-18", "name": "Streamlit", "logoUrl": "", "proficiencyLevel": 70}, {"id": "tool-19", "name": "Explainable AI (XAI / SHAP)", "logoUrl": "", "proficiencyLevel": 65}]'::jsonb
),
(
    'published', 4,
    'Databases',
    '[{"id": "tool-20", "name": "PostgreSQL", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-21", "name": "MySQL", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-22", "name": "Microsoft SQL Server", "logoUrl": "", "proficiencyLevel": 75}, {"id": "tool-23", "name": "Oracle Database", "logoUrl": "", "proficiencyLevel": 70}, {"id": "tool-24", "name": "Database Design", "logoUrl": "", "proficiencyLevel": 80}]'::jsonb
),
(
    'published', 5,
    'Tools & DevOps',
    '[{"id": "tool-25", "name": "Git", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-26", "name": "Docker", "logoUrl": "", "proficiencyLevel": 70}, {"id": "tool-27", "name": "Postman", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-28", "name": "VS Code", "logoUrl": "", "proficiencyLevel": 90}]'::jsonb
),
(
    'published', 6,
    'Research & Other Skills',
    '[{"id": "tool-29", "name": "Research Skills", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-30", "name": "Agile Software Development", "logoUrl": "", "proficiencyLevel": 80}, {"id": "tool-31", "name": "REST API Development", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-32", "name": "Full-Stack Development", "logoUrl": "", "proficiencyLevel": 85}, {"id": "tool-33", "name": "Web Development", "logoUrl": "", "proficiencyLevel": 90}, {"id": "tool-34", "name": "Cybersecurity", "logoUrl": "", "proficiencyLevel": 60}, {"id": "tool-35", "name": "Artificial Intelligence (AI)", "logoUrl": "", "proficiencyLevel": 75}]'::jsonb
);

-- ============================================================================
-- CLIENTS (placeholder)
-- ============================================================================

INSERT INTO clients (status, order_index, name, industry, logo_url, website_url, description, project_duration, featured)
VALUES (
    'draft', 0,
    'Example Client',
    '',
    '',
    '',
    '',
    '',
    false
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Count records in each table
SELECT 'cms_hero' as table_name, COUNT(*) as count FROM cms_hero
UNION ALL SELECT 'cms_about', COUNT(*) FROM cms_about
UNION ALL SELECT 'cms_contact', COUNT(*) FROM cms_contact
UNION ALL SELECT 'cms_resume_settings', COUNT(*) FROM cms_resume_settings
UNION ALL SELECT 'education', COUNT(*) FROM education
UNION ALL SELECT 'skills', COUNT(*) FROM skills
UNION ALL SELECT 'services', COUNT(*) FROM services
UNION ALL SELECT 'resumes', COUNT(*) FROM resumes
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'publications', COUNT(*) FROM publications
UNION ALL SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL SELECT 'experience', COUNT(*) FROM experience
UNION ALL SELECT 'blogs', COUNT(*) FROM blogs
UNION ALL SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL SELECT 'achievements', COUNT(*) FROM achievements
UNION ALL SELECT 'tech_stack_categories', COUNT(*) FROM tech_stack_categories
UNION ALL SELECT 'clients', COUNT(*) FROM clients
ORDER BY table_name;
