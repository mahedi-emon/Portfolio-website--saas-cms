export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'date';

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
    fields: [{ name: 'copyright', label: 'Copyright' }],
  },
  resume: {
    key: 'resume',
    title: 'Resume',
    kind: 'singleton',
    fields: [{ name: 'activeResumeUrl', label: 'Resume URL' }],
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
      { name: 'slug', label: 'Slug' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  publications: {
    key: 'publications',
    title: 'Publications',
    kind: 'collection',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'publisher', label: 'Publisher' },
      { name: 'publishedDate', label: 'Published Date', type: 'date' },
    ],
  },
  certifications: {
    key: 'certifications',
    title: 'Certifications',
    kind: 'collection',
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'issueDate', label: 'Issue Date', type: 'date' },
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
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  clients: {
    key: 'clients',
    title: 'Clients',
    kind: 'collection',
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'website', label: 'Website' },
    ],
  },
};

export const sectionList = Object.values(sectionSchemas);
