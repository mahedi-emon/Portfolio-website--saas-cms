const LOGO_BASE_URL = 'https://cdn.simpleicons.org/';

const toolLogoOverrides: Record<string, string> = {
  // Core dev
  git: `${LOGO_BASE_URL}git`,
  github: `${LOGO_BASE_URL}github`,
  gitlab: `${LOGO_BASE_URL}gitlab`,
  bitbucket: `${LOGO_BASE_URL}bitbucket`,
  docker: `${LOGO_BASE_URL}docker`,
  kubernetes: `${LOGO_BASE_URL}kubernetes`,
  terraform: `${LOGO_BASE_URL}terraform`,
  vercel: `${LOGO_BASE_URL}vercel`,
  netlify: `${LOGO_BASE_URL}netlify`,
  aws: `${LOGO_BASE_URL}amazonaws`,
  azure: `${LOGO_BASE_URL}microsoftazure`,
  gcp: `${LOGO_BASE_URL}googlecloud`,
  nginx: `${LOGO_BASE_URL}nginx`,
  apache: `${LOGO_BASE_URL}apache`,

  // Backend
  django: `${LOGO_BASE_URL}django`,
  flask: `${LOGO_BASE_URL}flask`,
  fastapi: `${LOGO_BASE_URL}fastapi`,
  node: `${LOGO_BASE_URL}nodedotjs`,
  nodejs: `${LOGO_BASE_URL}nodedotjs`,
  express: `${LOGO_BASE_URL}express`,
  expressjs: `${LOGO_BASE_URL}express`,
  nestjs: `${LOGO_BASE_URL}nestjs`,
  graphql: `${LOGO_BASE_URL}graphql`,
  apollo: `${LOGO_BASE_URL}apollographql`,
  postgresql: `${LOGO_BASE_URL}postgresql`,
  postgres: `${LOGO_BASE_URL}postgresql`,
  mysql: `${LOGO_BASE_URL}mysql`,
  mariadb: `${LOGO_BASE_URL}mariadb`,
  sqlite: `${LOGO_BASE_URL}sqlite`,
  mongodb: `${LOGO_BASE_URL}mongodb`,
  redis: `${LOGO_BASE_URL}redis`,
  supabase: `${LOGO_BASE_URL}supabase`,
  firebase: `${LOGO_BASE_URL}firebase`,

  // Frontend
  react: `${LOGO_BASE_URL}react`,
  reactjs: `${LOGO_BASE_URL}react`,
  nextjs: `${LOGO_BASE_URL}nextdotjs`,
  next: `${LOGO_BASE_URL}nextdotjs`,
  remix: `${LOGO_BASE_URL}remix`,
  vue: `${LOGO_BASE_URL}vuedotjs`,
  vuejs: `${LOGO_BASE_URL}vuedotjs`,
  nuxtjs: `${LOGO_BASE_URL}nuxtdotjs`,
  angular: `${LOGO_BASE_URL}angular`,
  svelte: `${LOGO_BASE_URL}svelte`,
  sveltekit: `${LOGO_BASE_URL}svelte`,
  astro: `${LOGO_BASE_URL}astro`,
  tailwind: `${LOGO_BASE_URL}tailwindcss`,
  tailwindcss: `${LOGO_BASE_URL}tailwindcss`,
  bootstrap: `${LOGO_BASE_URL}bootstrap`,
  sass: `${LOGO_BASE_URL}sass`,
  css3: `${LOGO_BASE_URL}css3`,
  html5: `${LOGO_BASE_URL}html5`,
  vite: `${LOGO_BASE_URL}vite`,
  webpack: `${LOGO_BASE_URL}webpack`,
  babel: `${LOGO_BASE_URL}babel`,
  eslint: `${LOGO_BASE_URL}eslint`,
  prettier: `${LOGO_BASE_URL}prettier`,
  npm: `${LOGO_BASE_URL}npm`,
  yarn: `${LOGO_BASE_URL}yarn`,
  pnpm: `${LOGO_BASE_URL}pnpm`,

  // Languages
  python: `${LOGO_BASE_URL}python`,
  javascript: `${LOGO_BASE_URL}javascript`,
  typescript: `${LOGO_BASE_URL}typescript`,
  java: `${LOGO_BASE_URL}java`,
  csharp: `${LOGO_BASE_URL}csharp`,
  cplusplus: `${LOGO_BASE_URL}cplusplus`,
  c: `${LOGO_BASE_URL}c`,
  go: `${LOGO_BASE_URL}go`,
  golang: `${LOGO_BASE_URL}go`,
  php: `${LOGO_BASE_URL}php`,
  ruby: `${LOGO_BASE_URL}ruby`,
  swift: `${LOGO_BASE_URL}swift`,
  kotlin: `${LOGO_BASE_URL}kotlin`,
  rust: `${LOGO_BASE_URL}rust`,
  dart: `${LOGO_BASE_URL}dart`,
  r: `${LOGO_BASE_URL}r`,
  matlab: `${LOGO_BASE_URL}mathworks`,

  // Data/ML
  tensorflow: `${LOGO_BASE_URL}tensorflow`,
  pytorch: `${LOGO_BASE_URL}pytorch`,
  keras: `${LOGO_BASE_URL}keras`,
  scikitlearn: `${LOGO_BASE_URL}scikitlearn`,
  numpy: `${LOGO_BASE_URL}numpy`,
  pandas: `${LOGO_BASE_URL}pandas`,
  matplotlib: `${LOGO_BASE_URL}plotly`,
  seaborn: `${LOGO_BASE_URL}plotly`,
  jupyter: `${LOGO_BASE_URL}jupyter`,
  opencv: `${LOGO_BASE_URL}opencv`,
  huggingface: `${LOGO_BASE_URL}huggingface`,
  spacy: `${LOGO_BASE_URL}spacy`,
  nltk: `${LOGO_BASE_URL}nltk`,
  onnx: `${LOGO_BASE_URL}onnx`,
  mlflow: `${LOGO_BASE_URL}mlflow`,

  // Mobile
  reactnative: `${LOGO_BASE_URL}react`,
  flutter: `${LOGO_BASE_URL}flutter`,
  ionic: `${LOGO_BASE_URL}ionic`,

  // Mappings for non-brand terms
  restapi: `${LOGO_BASE_URL}postman`,
  restapis: `${LOGO_BASE_URL}postman`,
  restfulapi: `${LOGO_BASE_URL}postman`,
  api: `${LOGO_BASE_URL}postman`,
  deeplearning: `${LOGO_BASE_URL}tensorflow`,
  machinelearning: `${LOGO_BASE_URL}tensorflow`,
  nlp: `${LOGO_BASE_URL}huggingface`,
  naturallanguageprocessing: `${LOGO_BASE_URL}huggingface`,
  bilstm: `${LOGO_BASE_URL}tensorflow`,
  lstm: `${LOGO_BASE_URL}tensorflow`,
  cnn: `${LOGO_BASE_URL}tensorflow`,
  rnn: `${LOGO_BASE_URL}tensorflow`,
  banglabert: `${LOGO_BASE_URL}huggingface`,
  bert: `${LOGO_BASE_URL}huggingface`,
  transformers: `${LOGO_BASE_URL}huggingface`,
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const normalizeForLookup = (name: string) =>
  normalizeName(name)
    .replace(/\s+/g, '')
    .replace(/\./g, '')
    .replace(/_/g, '')
    .replace(/-/g, '')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp');

const slugifySimpleIcon = (name: string) =>
  normalizeForLookup(name).replace(/[^a-z0-9]/g, '');

export const getToolLogoUrl = (name: string) => {
  const normalized = normalizeName(name);
  const normalizedKey = normalizeForLookup(name);
  if (!normalizedKey) return '';
  if (toolLogoOverrides[normalizedKey]) return toolLogoOverrides[normalizedKey];
  if (toolLogoOverrides[normalized]) return toolLogoOverrides[normalized];
  const slug = slugifySimpleIcon(normalizedKey);
  return slug ? `${LOGO_BASE_URL}${slug}` : '';
};