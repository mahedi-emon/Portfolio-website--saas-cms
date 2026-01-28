export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'list' | 'image' | 'file';

export type FieldSchema = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
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
      { name: 'siteName', label: 'Site Name', required: true },
      { name: 'tagline', label: 'Tagline' },
    ],
  },
  hero: {
    key: 'hero',
    title: 'Hero',
    kind: 'singleton',
    fields: [
      { name: 'fullName', label: 'Full Name', required: true },
      { name: 'headline', label: 'Headline', required: true },
      { name: 'subheadline', label: 'Subheadline', type: 'textarea' },
    ],
  },
  about: {
    key: 'about',
    title: 'About',
    kind: 'singleton',
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'profileImageUrl', label: 'Profile Image URL', type: 'image' },
      { name: 'currentRole', label: 'Current Role' },
      { name: 'researchInterest', label: 'Research Interest' },
    ],
  },
  contactInfo: {
    key: 'contactInfo',
    title: 'Contact Info',
    kind: 'singleton',
    fields: [
      { name: 'email', label: 'Email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'location', label: 'Location' },
    ],
  },
  footer: {
    key: 'footer',
    title: 'Footer',
    kind: 'singleton',
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'contact.email', label: 'Contact Email', required: true },
      { name: 'contact.phone', label: 'Contact Phone' },
      { name: 'contact.location', label: 'Contact Location' },
      { name: 'contact.directMessageUrl', label: 'Direct Message URL' },
      { name: 'copyrightText', label: 'Copyright Text', required: true },
    ],
  },
  resume: {
    key: 'resume',
    title: 'Resume',
    kind: 'singleton',
    fields: [
      { name: 'resumeFileUrl', label: 'Resume File URL', type: 'file', required: true },
      { name: 'resumePreviewUrl', label: 'Resume Preview URL', type: 'file' },
    ],
  },
  education: {
    key: 'education',
    title: 'Education',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'institution', label: 'Institution', required: true },
      { name: 'degree', label: 'Degree', required: true },
      { name: 'field', label: 'Field', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
  },
  skills: {
    key: 'skills',
    title: 'Skills',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'name', label: 'Skill Name', required: true },
      { name: 'level', label: 'Level', type: 'number' },
    ],
  },
  services: {
    key: 'services',
    title: 'Services',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'title', label: 'Title', required: true },
      { name: 'summary', label: 'Summary', type: 'textarea' },
    ],
  },
  projects: {
    key: 'projects',
    title: 'Projects',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'title', label: 'Title', required: true },
      { name: 'summary', label: 'Summary', type: 'textarea', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'coverImageUrl', label: 'Cover Image URL', type: 'image' },
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
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'title', label: 'Title', required: true },
      { name: 'authors', label: 'Authors (comma separated)', type: 'list', required: true },
      { name: 'venue', label: 'Venue', required: true },
      { name: 'year', label: 'Year', required: true },
      { name: 'abstract', label: 'Abstract', type: 'textarea' },
      { name: 'paperUrl', label: 'Paper URL' },
      { name: 'pdfUrl', label: 'PDF URL', type: 'file' },
      { name: 'coverImageUrl', label: 'Cover Image URL', type: 'image' },
      { name: 'citation', label: 'Citation', type: 'textarea' },
    ],
  },
  certifications: {
    key: 'certifications',
    title: 'Certifications',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'certificateTitle', label: 'Certificate Title', required: true },
      { name: 'issuer', label: 'Issuer', required: true },
      { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
      { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
      { name: 'credentialId', label: 'Credential ID' },
      { name: 'credentialUrl', label: 'Credential URL' },
      { name: 'certificateImageUrl', label: 'Certificate Image URL', type: 'image' },
      { name: 'certificateFileUrl', label: 'Certificate File URL', type: 'file' },
    ],
  },
  experience: {
    key: 'experience',
    title: 'Experience',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'company', label: 'Company', required: true },
      { name: 'role', label: 'Role', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
  },
  blogs: {
    key: 'blogs',
    title: 'Blogs',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'title', label: 'Title', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
    ],
  },
  testimonials: {
    key: 'testimonials',
    title: 'Testimonials',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'author', label: 'Author', required: true },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
    ],
  },
  achievements: {
    key: 'achievements',
    title: 'Achievements',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'title', label: 'Title', required: true },
      { name: 'issuer', label: 'Issuer', required: true },
      { name: 'year', label: 'Year', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'certificateImageUrl', label: 'Certificate Image URL', type: 'image' },
      { name: 'certificateFileUrl', label: 'Certificate File URL', type: 'file' },
      { name: 'externalLink', label: 'External Link' },
    ],
  },
  clients: {
    key: 'clients',
    title: 'Clients',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'name', label: 'Name', required: true },
      { name: 'logoUrl', label: 'Logo URL', type: 'image' },
      { name: 'websiteUrl', label: 'Website URL' },
    ],
  },
  techStackCategories: {
    key: 'techStackCategories',
    title: 'Tech Stack Categories',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'categoryName', label: 'Category Name', required: true },
    ],
  },
};

export const sectionList = Object.values(sectionSchemas);
