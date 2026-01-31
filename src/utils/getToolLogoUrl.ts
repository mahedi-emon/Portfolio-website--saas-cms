const LOGO_BASE_URL = 'https://cdn.simpleicons.org/';

const toolLogoOverrides: Record<string, string> = {
  git: `${LOGO_BASE_URL}git`,
  github: `${LOGO_BASE_URL}github`,
  gitlab: `${LOGO_BASE_URL}gitlab`,
  django: `${LOGO_BASE_URL}django`,
  python: `${LOGO_BASE_URL}python`,
  react: `${LOGO_BASE_URL}react`,
  vue: `${LOGO_BASE_URL}vuedotjs`,
  angular: `${LOGO_BASE_URL}angular`,
  node: `${LOGO_BASE_URL}nodedotjs`,
  nodejs: `${LOGO_BASE_URL}nodedotjs`,
  nextjs: `${LOGO_BASE_URL}nextdotjs`,
  typescript: `${LOGO_BASE_URL}typescript`,
  javascript: `${LOGO_BASE_URL}javascript`,
  docker: `${LOGO_BASE_URL}docker`,
  kubernetes: `${LOGO_BASE_URL}kubernetes`,
  postgres: `${LOGO_BASE_URL}postgresql`,
  postgresql: `${LOGO_BASE_URL}postgresql`,
  mysql: `${LOGO_BASE_URL}mysql`,
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const slugifySimpleIcon = (name: string) =>
  normalizeName(name)
    .replace(/\+|\.|_/g, '')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

export const getToolLogoUrl = (name: string) => {
  const normalized = normalizeName(name);
  if (!normalized) return '';
  if (toolLogoOverrides[normalized]) return toolLogoOverrides[normalized];
  const slug = slugifySimpleIcon(normalized);
  return slug ? `${LOGO_BASE_URL}${slug}` : '';
};