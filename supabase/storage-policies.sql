-- ============================================================================
-- PORTFOLIO CMS - SUPABASE STORAGE SETUP
-- ============================================================================
-- 
-- Run this SQL in the Supabase SQL Editor AFTER creating the buckets manually.
-- The buckets must first be created in the Supabase Dashboard under Storage.
--
-- MANUAL STEPS FIRST:
-- 1. Go to Supabase Dashboard → Storage
-- 2. Create these buckets (all as PUBLIC):
--    - images
--    - resumes  
--    - documents
--    - gallery
-- 3. Then run this SQL to set up the storage policies
--
-- ============================================================================

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- IMAGES BUCKET - Public read, Admin write
-- Used for: hero images, profile images, cover images, certificate images, logos

-- Anyone can view images
CREATE POLICY "Public read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Only authenticated users can upload images
CREATE POLICY "Admin upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Only authenticated users can update images
CREATE POLICY "Admin update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Only authenticated users can delete images
CREATE POLICY "Admin delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');


-- RESUMES BUCKET - Public read, Admin write
-- Used for: resume PDF files

-- Anyone can view resumes
CREATE POLICY "Public read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Only authenticated users can upload resumes
CREATE POLICY "Admin upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Only authenticated users can update resumes
CREATE POLICY "Admin update resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Only authenticated users can delete resumes
CREATE POLICY "Admin delete resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');


-- DOCUMENTS BUCKET - Public read, Admin write
-- Used for: certificate files, publication PDFs, other documents

-- Anyone can view documents
CREATE POLICY "Public read documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Only authenticated users can upload documents
CREATE POLICY "Admin upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Only authenticated users can update documents
CREATE POLICY "Admin update documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Only authenticated users can delete documents
CREATE POLICY "Admin delete documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');


-- GALLERY BUCKET - Public read, Admin write
-- Used for: project gallery images

-- Anyone can view gallery
CREATE POLICY "Public read gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Only authenticated users can upload to gallery
CREATE POLICY "Admin upload gallery"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Only authenticated users can update gallery
CREATE POLICY "Admin update gallery"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Only authenticated users can delete from gallery
CREATE POLICY "Admin delete gallery"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- ============================================================================
-- HELPER FUNCTION: Get public URL for a storage file
-- ============================================================================

-- This function is useful for constructing public URLs in queries
CREATE OR REPLACE FUNCTION get_storage_public_url(bucket TEXT, file_path TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN 'https://tgtsxotpwgxowntvqlwi.supabase.co/storage/v1/object/public/' || bucket || '/' || file_path;
END;
$$ LANGUAGE plpgsql;
