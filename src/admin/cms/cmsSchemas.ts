export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'list' | 'image' | 'url' | 'socialLinks' | 'select';

export type FieldSchema = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
};

export type SectionSchema = {
  key: string;
  title: string;
  kind: 'singleton' | 'collection';
  fields: FieldSchema[];
};

export const sectionSchemas: Record<string, SectionSchema> = {
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
      { name: 'fullName', label: 'Full Name', required: true },
      { name: 'tagline', label: 'Tagline', type: 'textarea' },
      { name: 'title', label: 'Title', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'profileImageUrl', label: 'Profile Image', type: 'image' },
      { name: 'currentRole', label: 'Current Role' },
      { name: 'researchInterest', label: 'Research Interest' },
    ],
  },
  contact: {
    key: 'contact',
    title: 'Contact',
    kind: 'singleton',
    fields: [
      { name: 'pageIntroText', label: 'Contact Page Intro', type: 'textarea' },
      { name: 'contactInfo.email', label: 'Email', required: true },
      { name: 'contactInfo.phone', label: 'Phone' },
      { name: 'contactInfo.location', label: 'Location' },
      { name: 'socialLinks', label: 'Social Links', type: 'socialLinks' },
      { name: 'hireMeLabel', label: 'Hire Me Label' },
    ],
  },
  resumeSettings: {
    key: 'resumeSettings',
    title: 'Resume Settings',
    kind: 'singleton',
    fields: [{ name: 'activeResumeId', label: 'Active Resume ID' }],
  },
  education: {
    key: 'education',
    title: 'Education',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'orderIndex', label: 'Order Index', type: 'number' },
      { name: 'institution', label: 'Institution', required: true, placeholder: 'e.g., Harvard University' },
      { name: 'degree', label: 'Degree', required: true, placeholder: 'e.g., Bachelor of Science' },
      { name: 'field', label: 'Field of Study', required: true, placeholder: 'e.g., Computer Science' },
      { name: 'grade', label: 'Grade (Optional)', type: 'text', placeholder: 'e.g., 3.8 GPA, First Class Honours, Cum Laude' },
      { name: 'activities', label: 'Activities & Societies (Optional)', type: 'textarea', placeholder: 'e.g., Chess Club, Student Government, Dean\'s List' },
      { name: 'description', label: 'Description (Optional)', type: 'textarea', placeholder: 'Describe your studies, achievements, or thesis...' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date (or expected)', type: 'date' },
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
  resumes: {
    key: 'resumes',
    title: 'Resumes',
    kind: 'collection',
    fields: [
      { name: 'status', label: 'Status', required: true },
      { name: 'title', label: 'Title', required: true },
      { name: 'fileUrl', label: 'File URL', type: 'url', required: true },
      { name: 'uploadedAt', label: 'Uploaded At', type: 'date' },
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
      { name: 'pdfUrl', label: 'PDF URL', type: 'url' },
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
      { name: 'certificateFileUrl', label: 'Certificate File URL', type: 'url' },
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
      { name: 'description', label: 'Description', type: 'textarea' },
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
      { name: 'content', label: 'Content', type: 'textarea' },
      { name: 'coverImageUrl', label: 'Cover Image URL', type: 'image' },
      { name: 'author', label: 'Author' },
      { name: 'publishedDate', label: 'Published Date', type: 'date' },
      { name: 'readTime', label: 'Read Time (minutes)', type: 'number' },
      { name: 'tags', label: 'Tags (comma separated)', type: 'list' },
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
      { name: 'certificateFileUrl', label: 'Certificate File URL', type: 'url' },
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
      { name: 'featured', label: 'Featured Client', type: 'checkbox' },
      { name: 'name', label: 'Company Name', required: true },
      { name: 'industry', label: 'Industry', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Media', 'Government', 'Non-profit', 'Startup', 'Enterprise', 'Other'] },
      { name: 'logoUrl', label: 'Company Logo', type: 'image' },
      { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://example.com' },
      { name: 'description', label: 'Project Description', type: 'textarea', placeholder: 'Brief description of your work with this client...' },
      { name: 'projectDuration', label: 'Project Duration', placeholder: 'e.g., Jan 2023 - Dec 2023' },
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
