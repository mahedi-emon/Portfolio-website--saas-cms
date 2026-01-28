export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'list';

export type FieldSchema = {
  name: string;
  label: string;
  type?: FieldType;
};

export type SectionSchema = {
  key: string;
  title: string;
  kind: 'singleton' | 'collection';
  fields: FieldSchema[];
};

export const sectionSchemas: Record<string, SectionSchema> = {
  siteSettings: {
    key: 'siteSettings',
    title: 'Site Settings',
    kind: 'singleton',
    fields: [
      { name: 'siteName', label: 'Site Name' },
      { name: 'tagline', label: 'Tagline' },
    ],
  },
  hero: {
    key: 'hero',
    title: 'Hero',
    kind: 'singleton',
    fields: [
      { name: 'fullName', label: 'Full Name' },
      { name: 'headline', label: 'Headline' },
      { name: 'subheadline', label: 'Subheadline', type: 'textarea' },
    ],
  },
  about: {
    key: 'about',
    title: 'About',
    kind: 'singleton',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      { name: 'profileImageUrl', label: 'Profile Image URL' },
      { name: 'currentRole', label: 'Current Role' },
      { name: 'researchInterest', label: 'Research Interest' },
    ],
  },
  contactInfo: {
    key: 'contactInfo',
    title: 'Contact Info',
    kind: 'singleton',
    fields: [
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'location', label: 'Location' },
    ],
  },
  footer: {
    key: 'footer',
    title: 'Footer',
    kind: 'singleton',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'contact.email', label: 'Contact Email' },
      { name: 'contact.phone', label: 'Contact Phone' },
      { name: 'contact.location', label: 'Contact Location' },
      { name: 'contact.directMessageUrl', label: 'Direct Message URL' },
      { name: 'copyrightText', label: 'Copyright Text' },
    ],
  },
  resume: {
    key: 'resume',
    title: 'Resume',
    kind: 'singleton',
    fields: [
      { name: 'resumeFileUrl', label: 'Resume File URL' },
      { name: 'resumePreviewUrl', label: 'Resume Preview URL' },
    ],
  },
  education: {
    key: 'education',
    title: 'Education',
    kind: 'collection',
    fields: [
      { name: 'institution', label: 'Institution' },
      { name: 'degree', label: 'Degree' },
      { name: 'field', label: 'Field' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
  },
  skills: {
    key: 'skills',
    title: 'Skills',
    kind: 'collection',
    fields: [
      { name: 'name', label: 'Skill Name' },
      { name: 'level', label: 'Level', type: 'number' },
    ],
  },
  services: {
    key: 'services',
    title: 'Services',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
    ],
  },
  projects: {
    key: 'projects',
    title: 'Projects',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'coverImageUrl', label: 'Cover Image URL' },
      { name: 'galleryImages', label: 'Gallery Images (comma separated)', type: 'list' },
      { name: 'githubUrl', label: 'GitHub URL' },
      { name: 'liveDemoUrl', label: 'Live Demo URL' },
      { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'list' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  publications: {
    key: 'publications',
    title: 'Publications',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'authors', label: 'Authors (comma separated)', type: 'list' },
      { name: 'venue', label: 'Venue' },
      { name: 'year', label: 'Year' },
      { name: 'abstract', label: 'Abstract', type: 'textarea' },
      { name: 'paperUrl', label: 'Paper URL' },
      { name: 'pdfUrl', label: 'PDF URL' },
      { name: 'coverImageUrl', label: 'Cover Image URL' },
      { name: 'citation', label: 'Citation', type: 'textarea' },
    ],
  },
  certifications: {
    key: 'certifications',
    title: 'Certifications',
    kind: 'collection',
    fields: [
      { name: 'certificateTitle', label: 'Certificate Title' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'issueDate', label: 'Issue Date', type: 'date' },
      { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
      { name: 'credentialId', label: 'Credential ID' },
      { name: 'credentialUrl', label: 'Credential URL' },
      { name: 'certificateImageUrl', label: 'Certificate Image URL' },
      { name: 'certificateFileUrl', label: 'Certificate File URL' },
    ],
  },
  experience: {
    key: 'experience',
    title: 'Experience',
    kind: 'collection',
    fields: [
      { name: 'company', label: 'Company' },
      { name: 'role', label: 'Role' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
  },
  blogs: {
    key: 'blogs',
    title: 'Blogs',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'slug', label: 'Slug' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
    ],
  },
  testimonials: {
    key: 'testimonials',
    title: 'Testimonials',
    kind: 'collection',
    fields: [
      { name: 'author', label: 'Author' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
    ],
  },
  achievements: {
    key: 'achievements',
    title: 'Achievements',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'year', label: 'Year' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'externalLink', label: 'External Link' },
    ],
  },
  clients: {
    key: 'clients',
    title: 'Clients',
    kind: 'collection',
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'logoUrl', label: 'Logo URL' },
      { name: 'websiteUrl', label: 'Website URL' },
    ],
  },
  techStackCategories: {
    key: 'techStackCategories',
    title: 'Tech Stack Categories',
    kind: 'collection',
    fields: [{ name: 'categoryName', label: 'Category Name' }],
  },
};

export const sectionList = Object.values(sectionSchemas);
