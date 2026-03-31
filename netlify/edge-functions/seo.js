// Netlify Edge Function: Injects unique SEO meta tags, JSON-LD structured data,
// and noscript content per route so Google sees genuinely different HTML for each page.
// This fixes SPA duplicate content, "different canonical", and "not indexed" issues.

const SITE_URL = 'https://mahedihasanemon.site';
const SITE_NAME = 'Mahedi Hasan Emon';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

// ─── Per-page SEO data ────────────────────────────────────────────────────────

const PAGE_SEO = {
  '/': {
    title: 'Mahedi Hasan Emon — Full-Stack Developer & Portfolio',
    description:
      'Mahedi Hasan Emon — Full-Stack Developer specializing in scalable web platforms, React, Node.js, and modern cloud solutions. Explore my portfolio, services, blog, and publications.',
    keywords:
      'Mahedi Hasan Emon, full-stack developer, portfolio, React developer, Node.js developer, software engineer Bangladesh, web development',
    noscript: `
      <h1>Mahedi Hasan Emon — Full-Stack Developer</h1>
      <p>Welcome to the official portfolio of Mahedi Hasan Emon, a Full-Stack Developer specializing in scalable web platforms, React, Node.js, and modern cloud solutions.</p>
      <nav>
        <a href="/about">About</a> |
        <a href="/portfolio">Portfolio</a> |
        <a href="/services">Services</a> |
        <a href="/blog">Blog</a> |
        <a href="/contact">Contact</a> |
        <a href="/publications">Publications</a>
      </nav>
      <p>Explore my projects, professional services, blog articles, and research publications.</p>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Mahedi Hasan Emon',
        givenName: 'Mahedi Hasan',
        familyName: 'Emon',
        alternateName: ['Mahedi Emon', 'MH Emon'],
        url: SITE_URL,
        image: DEFAULT_IMAGE,
        jobTitle: 'Full-Stack Developer',
        description:
          'Mahedi Hasan Emon is a Full-Stack Developer specializing in scalable web platforms, React, Node.js, and modern cloud solutions.',
        nationality: { '@type': 'Country', name: 'Bangladesh' },
        knowsAbout: [
          'Web Development',
          'React',
          'Node.js',
          'TypeScript',
          'Full-Stack Development',
          'Software Engineering',
        ],
        sameAs: [
          'https://github.com/mahedi-emon',
          'https://www.linkedin.com/in/mahediemon/',
          'https://web.facebook.com/Mahedi999',
          'https://t.me/Mahedi9',
          'https://fiverr.com/mahedi_emon',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        name: 'Mahedi Hasan Emon — Portfolio',
        url: SITE_URL,
        mainEntity: { '@id': `${SITE_URL}/#person` },
        description:
          'Official portfolio website of Mahedi Hasan Emon — Full-Stack Developer.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Mahedi Hasan Emon — Portfolio',
        url: SITE_URL,
        description:
          'Official portfolio website of Mahedi Hasan Emon — Full-Stack Developer building scalable web platforms.',
        author: { '@id': `${SITE_URL}/#person` },
      },
    ],
  },

  '/about': {
    title: 'About Mahedi Hasan Emon — Skills, Experience & Education',
    description:
      'Learn about Mahedi Hasan Emon — a Full-Stack Software Engineer. Discover his skills, professional experience, education background, and certifications.',
    keywords:
      'about Mahedi Hasan Emon, software engineer skills, web developer experience, education, certifications, full-stack developer background',
    noscript: `
      <h1>About Mahedi Hasan Emon</h1>
      <p>Mahedi Hasan Emon is a Full-Stack Software Engineer with expertise in React, Node.js, TypeScript, and modern cloud solutions.</p>
      <h2>Skills & Expertise</h2>
      <p>Proficient in full-stack web development, UI/UX design, database management, and cloud architecture.</p>
      <h2>Education</h2>
      <p>Computer Science graduate with professional certifications in software engineering.</p>
      <h2>Experience</h2>
      <p>Professional experience building scalable web platforms and enterprise applications.</p>
      <nav><a href="/">Home</a> | <a href="/portfolio">Portfolio</a> | <a href="/services">Services</a> | <a href="/contact">Contact</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about#aboutpage`,
        name: 'About Mahedi Hasan Emon',
        url: `${SITE_URL}/about`,
        description:
          'Learn about Mahedi Hasan Emon — skills, experience, education, and professional certifications.',
        mainEntity: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Mahedi Hasan Emon',
        url: SITE_URL,
        jobTitle: 'Full-Stack Developer',
        image: DEFAULT_IMAGE,
      },
    ],
  },

  '/portfolio': {
    title: 'Portfolio — Projects & Achievements | Mahedi Hasan Emon',
    description:
      'Browse the portfolio of Mahedi Hasan Emon — featured projects, case studies, publications, achievements, and professional certifications in web development.',
    keywords:
      'Mahedi Hasan Emon portfolio, web development projects, case studies, achievements, publications, React projects, Node.js projects',
    noscript: `
      <h1>Portfolio — Mahedi Hasan Emon</h1>
      <p>Explore a curated collection of projects, publications, achievements, and certifications by Mahedi Hasan Emon.</p>
      <h2>Projects</h2>
      <p>Full-stack web applications, SaaS platforms, and open-source contributions built with React, Node.js, and modern technologies.</p>
      <h2>Publications</h2>
      <p>Research papers and academic work in software engineering and web development.</p>
      <h2>Achievements & Certifications</h2>
      <p>Professional awards, recognitions, and verified certifications.</p>
      <nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | <a href="/contact">Contact</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/portfolio#collectionpage`,
        name: 'Portfolio — Mahedi Hasan Emon',
        url: `${SITE_URL}/portfolio`,
        description:
          'A curated collection of projects, publications, and achievements by Mahedi Hasan Emon.',
        author: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  },

  '/services': {
    title: 'Web Development Services — Mahedi Hasan Emon',
    description:
      'Professional web development services by Mahedi Hasan Emon — full-stack development, UI/UX design, custom software solutions, API development, and cloud deployment.',
    keywords:
      'web development services, full-stack developer for hire, freelance web developer Bangladesh, UI/UX design services, custom software development, Mahedi Hasan Emon services',
    noscript: `
      <h1>Professional Web Development Services</h1>
      <p>Mahedi Hasan Emon offers professional web development services tailored to bring your ideas to life with cutting-edge technology.</p>
      <h2>Services Offered</h2>
      <ul>
        <li>Full-Stack Web Development — React, Node.js, TypeScript</li>
        <li>UI/UX Design — Modern, responsive, user-centered design</li>
        <li>Custom Software Solutions — Tailored applications for your business</li>
        <li>API Development & Integration — RESTful and GraphQL APIs</li>
        <li>Cloud Deployment & DevOps — AWS, Vercel, Netlify</li>
        <li>Database Design & Management — PostgreSQL, MongoDB, Supabase</li>
      </ul>
      <p><a href="/contact">Get in touch</a> to discuss your project requirements.</p>
      <nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/portfolio">Portfolio</a> | <a href="/contact">Contact</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/services#service`,
        name: 'Web Development Services — Mahedi Hasan Emon',
        url: `${SITE_URL}/services`,
        description:
          'Professional web development services including full-stack development, UI/UX design, and custom software solutions.',
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: 'Worldwide',
        serviceType: 'Web Development',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        '@id': `${SITE_URL}/services#offers`,
        name: 'Web Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Stack Web Development',
              description: 'End-to-end web application development with React, Node.js, and TypeScript.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX Design',
              description: 'Modern, responsive, user-centered web design.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Software Solutions',
              description: 'Tailored software applications for your business needs.',
            },
          },
        ],
      },
    ],
  },

  '/blog': {
    title: 'Blog — Articles & Tutorials | Mahedi Hasan Emon',
    description:
      'Read articles, tutorials, and insights on web development, React, Node.js, TypeScript, and software engineering by Mahedi Hasan Emon.',
    keywords:
      'web development blog, React tutorials, Node.js articles, TypeScript tips, software engineering insights, Mahedi Hasan Emon blog',
    noscript: `
      <h1>Blog — Mahedi Hasan Emon</h1>
      <p>Articles, tutorials, and insights on web development, React, Node.js, and software engineering.</p>
      <p>Explore in-depth technical content covering modern JavaScript frameworks, backend development, and best practices in software engineering.</p>
      <nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/portfolio">Portfolio</a> | <a href="/contact">Contact</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'Blog — Mahedi Hasan Emon',
        url: `${SITE_URL}/blog`,
        description:
          'Articles, tutorials, and insights on web development and software engineering.',
        author: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  },

  '/contact': {
    title: 'Contact Mahedi Hasan Emon — Get in Touch',
    description:
      'Contact Mahedi Hasan Emon for web development projects, freelance work, collaboration opportunities, or general inquiries.',
    keywords:
      'contact Mahedi Hasan Emon, hire web developer, freelance developer contact, web development inquiry, collaboration, get in touch',
    noscript: `
      <h1>Contact Mahedi Hasan Emon</h1>
      <p>Get in touch for web development projects, freelance work, or collaboration opportunities.</p>
      <h2>How to Reach Me</h2>
      <p>Fill out the contact form or reach out through social media platforms.</p>
      <ul>
        <li><a href="https://github.com/mahedi-emon" rel="noopener">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/mahediemon/" rel="noopener">LinkedIn</a></li>
        <li><a href="https://fiverr.com/mahedi_emon" rel="noopener">Fiverr</a></li>
      </ul>
      <nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/portfolio">Portfolio</a> | <a href="/services">Services</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#contactpage`,
        name: 'Contact Mahedi Hasan Emon',
        url: `${SITE_URL}/contact`,
        description:
          'Get in touch with Mahedi Hasan Emon for web development projects and collaboration.',
        mainEntity: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  },

  '/publications': {
    title: 'Publications & Research — Mahedi Hasan Emon',
    description:
      'Research publications, academic papers, and scholarly work by Mahedi Hasan Emon in software engineering, web development, and computer science.',
    keywords:
      'Mahedi Hasan Emon publications, research papers, academic work, software engineering research, computer science publications',
    noscript: `
      <h1>Publications — Mahedi Hasan Emon</h1>
      <p>Research publications, academic papers, and scholarly work in software engineering and web development.</p>
      <p>Explore peer-reviewed research contributions to the fields of computer science and software engineering.</p>
      <nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/portfolio">Portfolio</a> | <a href="/contact">Contact</a></nav>
    `,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/publications#collectionpage`,
        name: 'Publications — Mahedi Hasan Emon',
        url: `${SITE_URL}/publications`,
        description:
          'Research publications and academic papers by Mahedi Hasan Emon.',
        author: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  },
};

// ─── Edge function handler ────────────────────────────────────────────────────

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

  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  // ── Replace <title> ──
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${pageData.title}</title>`
  );

  // ── Replace meta description ──
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${pageData.description}" />`
  );

  // ── Replace meta keywords (unique per page) ──
  html = html.replace(
    /<meta name="keywords" content="[^"]*"\s*\/?>/,
    `<meta name="keywords" content="${pageData.keywords}" />`
  );

  // ── Replace canonical ──
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // ── Replace og:title ──
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${pageData.title}" />`
  );

  // ── Replace og:description ──
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${pageData.description}" />`
  );

  // ── Replace og:url ──
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // ── Replace twitter:title ──
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${pageData.title}" />`
  );

  // ── Replace twitter:description ──
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${pageData.description}" />`
  );

  // ── Replace JSON-LD structured data (swap all existing blocks with page-specific ones) ──
  // Remove all existing JSON-LD script blocks
  html = html.replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    ''
  );

  // Build new JSON-LD blocks for this page
  const jsonLdBlocks = pageData.jsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n    ');

  // Inject new JSON-LD right before </head>
  html = html.replace('</head>', `    ${jsonLdBlocks}\n  </head>`);

  // ── Inject <noscript> with unique content into <body> ──
  // This gives crawlers real, indexable text before JS renders
  if (pageData.noscript) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript>${pageData.noscript}</noscript>`
    );
  }

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};
