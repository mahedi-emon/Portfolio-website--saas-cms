# Supabase Integration Readiness

This document summarizes the current state of the codebase and provides a clear integration plan for Supabase.

## ✅ Already Supabase-Ready

### Authentication
- **`src/lib/supabase.ts`** - Supabase client configured with proper auth options
- **`src/context/AuthContext.tsx`** - Full Supabase Auth implementation:
  - `signInWithPassword()` for email/password login
  - `onAuthStateChange()` listener for session persistence
  - `getSession()` for checking existing sessions
  - Auto-refresh tokens enabled
- **`src/app/guards/ProtectedRoute.tsx`** - Blocks unauthenticated users
- **`src/app/guards/AdminOnlyRoute.tsx`** - Verifies admin role
- **`src/admin/pages/Login/AdminLoginPage.tsx`** - Ready for Supabase credentials
- **`src/admin/pages/AuthCallback/AuthCallbackPage.tsx`** - Handles OAuth callbacks

### DEV-Only Mock Auth (Intentional & Correct)
The mock auth ONLY activates when:
1. Supabase is NOT configured (`!supabase`)
2. AND running in development mode (`import.meta.env.DEV`)

In production, if Supabase credentials are missing, login will fail with "Authentication service not configured" - this is correct behavior.

### Database Types
- **`src/types/database.types.ts`** - Supabase-compatible snake_case types
- **`src/services/cms.service.ts`** - Async-ready service pattern
- **`src/context/CmsContext.tsx`** - Loading/error states implemented

### Storage Abstraction
- **`src/services/storage.service.ts`** - Storage service interface ready
- **`src/admin/cms/cmsSchemas.ts`** - Fields marked with `storageBucket` assignments
- **`src/hooks/useStorage.ts`** - Upload hook ready for Supabase swap

### Security
- **`src/utils/sanitizeHtml.ts`** - HTML sanitization utility for user content
- **`src/pages/Blog/BlogPostPage.tsx`** - Uses sanitizeHtml for content rendering

---

## 🔧 Required Before Production

### Install DOMPurify for Production
```bash
npm install dompurify
npm install -D @types/dompurify
```

Then update `src/utils/sanitizeHtml.ts` to use DOMPurify (see comments in file).

---

## 📋 Supabase Integration Plan

### Phase 1: Authentication (No Code Changes Needed)

1. Create Supabase project at https://supabase.com
2. Get project URL and anon key from Settings → API
3. Create `.env` file:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Create admin user: Supabase Dashboard → Authentication → Users → Add User
5. Test login - existing code will work immediately

### Phase 2: Database

1. Create tables in Supabase SQL Editor:
   ```sql
   -- Singletons
   CREATE TABLE cms_hero (...);
   CREATE TABLE cms_about (...);
   CREATE TABLE cms_contact (...);
   CREATE TABLE cms_resume_settings (...);
   
   -- Collections
   CREATE TABLE education (...);
   CREATE TABLE skills (...);
   CREATE TABLE projects (...);
   -- etc.
   ```

2. Enable Row Level Security:
   ```sql
   -- Public read for published content
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Public read published" ON projects
     FOR SELECT USING (status = 'published');
   
   CREATE POLICY "Admin full access" ON projects
     FOR ALL USING (auth.role() = 'authenticated');
   ```

3. Update `CmsContext` to fetch from Supabase (replace mock data)

### Phase 3: Storage

1. Create buckets in Supabase Storage:
   - `images` - Profile photos, cover images
   - `resumes` - PDF resume files
   - `documents` - Certificates, documents
   - `gallery` - Project gallery images

2. Set bucket policies:
   ```sql
   -- Public read
   CREATE POLICY "Public read" ON storage.objects
     FOR SELECT USING (bucket_id IN ('images', 'gallery'));
   
   -- Admin upload
   CREATE POLICY "Admin upload" ON storage.objects
     FOR INSERT WITH CHECK (auth.role() = 'authenticated');
   ```

3. Implement `createSupabaseStorageService()` in storage.service.ts

### Phase 4: Deploy to Netlify

1. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Deploy - no additional configuration needed

---

## 🔒 Security Checklist

- [x] Auth guards on all admin routes
- [x] DEV-only mock auth (disabled in production)
- [x] HTML sanitization utility created
- [x] BlogPostPage uses sanitization
- [ ] Install DOMPurify for production
- [ ] Set up RLS policies in Supabase
- [ ] Configure Storage bucket policies

---

## 📁 Files That Will Change for Supabase

| File | Change Required |
|------|-----------------|
| `.env` | Add Supabase credentials |
| `src/context/CmsContext.tsx` | Replace mock with Supabase queries |
| `src/services/cms.service.ts` | Implement Supabase methods |
| `src/services/storage.service.ts` | Implement Supabase Storage |
| `src/utils/sanitizeHtml.ts` | Uncomment DOMPurify import |

---

## ✓ Confirmation

After completing the above:
- ✅ All existing functionality will work
- ✅ UI/UX will be unchanged
- ✅ CMS logic remains the same
- ✅ Admin behavior is identical
- ✅ Data will be persisted in Supabase
