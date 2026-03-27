// Netlify Edge Function: Injects unique SEO meta tags per route
// so Google sees different HTML for each page (fixes SPA duplicate content issue)

const SITE_URL = 'https://mahedihasanemon.site';

const PAGE_SEO = {
  '/': {
    title: 'Mahedi Hasan Emon — Full-Stack Developer & Portfolio',
    description:
      'Mahedi Hasan Emon — Full-Stack Developer specializing in scalable web platforms, React, Node.js, and modern cloud solutions. Explore my portfolio, services, blog, and publications.',
  },
  '/about': {
    title: 'About Mahedi Hasan Emon — Full-Stack Developer & Portfolio',
    description:
      'Mahedi Hasan Emon — Full-Stack Software Engineer. Learn about his skills, experience, education, and professional certifications.',
  },
  '/portfolio': {
    title: 'Portfolio — Mahedi Hasan Emon',
    description:
      'Explore the portfolio of Mahedi Hasan Emon — featured projects, case studies, and web development work.',
  },
  '/services': {
    title: 'Services — Mahedi Hasan Emon',
    description:
      'Professional web development services by Mahedi Hasan Emon. Full-stack development, UI/UX design, and custom software solutions.',
  },
  '/blog': {
    title: 'Blog — Mahedi Hasan Emon',
    description:
      'Articles, tutorials, and insights on web development, React, Node.js, and software engineering by Mahedi Hasan Emon.',
  },
  '/contact': {
    title: 'Contact Mahedi Hasan Emon',
    description:
      'Get in touch with Mahedi Hasan Emon for web development projects, freelance work, or collaboration opportunities.',
  },
  '/publications': {
    title: 'Publications — Mahedi Hasan Emon',
    description:
      'Research publications, papers, and academic work by Mahedi Hasan Emon in software engineering and web development.',
  },
};

export default async (request, context) => {
  const response = await context.next();
  const url = new URL(request.url);
  let path = url.pathname.replace(/\/+$/, '') || '/';

  const pageData = PAGE_SEO[path];

  // Only modify HTML responses for known pages
  if (!pageData) return response;

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  let html = await response.text();

  const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${pageData.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${pageData.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${pageData.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${pageData.description}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${pageData.title}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${pageData.description}" />`
  );

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};
