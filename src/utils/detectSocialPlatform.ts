export type SocialPlatformKey =
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'facebook'
  | 'youtube'
  | 'medium'
  | 'google_scholar'
  | 'fiverr'
  | 'upwork'
  | 'kaggle'
  | 'researchgate'
  | 'stackoverflow'
  | 'custom';

export type DetectedSocial = {
  platform: SocialPlatformKey;
  iconKey: SocialPlatformKey;
  label: string;
};

const normalizeHost = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
};

const extractLabelFromHost = (host: string) => {
  if (!host) return 'Custom';
  const core = host.split('.')[0] || host;
  return core.charAt(0).toUpperCase() + core.slice(1);
};

export const formatPlatformLabel = (platform: string, fallbackLabel?: string) => {
  if (platform === 'google_scholar') return 'Google Scholar';
  if (platform === 'stackoverflow') return 'Stack Overflow';
  if (platform === 'twitter') return 'Twitter/X';
  if (platform === 'custom') return fallbackLabel ?? 'Custom';
  return platform
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
};

export const detectSocialPlatform = (url: string): DetectedSocial => {
  const host = normalizeHost(url);

  if (host.includes('linkedin.com')) {
    return { platform: 'linkedin', iconKey: 'linkedin', label: 'LinkedIn' };
  }
  if (host.includes('github.com')) {
    return { platform: 'github', iconKey: 'github', label: 'GitHub' };
  }
  if (host.includes('twitter.com') || host.includes('x.com')) {
    return { platform: 'twitter', iconKey: 'twitter', label: 'Twitter/X' };
  }
  if (host.includes('facebook.com')) {
    return { platform: 'facebook', iconKey: 'facebook', label: 'Facebook' };
  }
  if (host.includes('youtube.com') || host.includes('youtu.be')) {
    return { platform: 'youtube', iconKey: 'youtube', label: 'YouTube' };
  }
  if (host.includes('medium.com')) {
    return { platform: 'medium', iconKey: 'medium', label: 'Medium' };
  }
  if (host.includes('scholar.google.com')) {
    return { platform: 'google_scholar', iconKey: 'google_scholar', label: 'Google Scholar' };
  }
  if (host.includes('fiverr.com')) {
    return { platform: 'fiverr', iconKey: 'fiverr', label: 'Fiverr' };
  }
  if (host.includes('upwork.com')) {
    return { platform: 'upwork', iconKey: 'upwork', label: 'Upwork' };
  }
  if (host.includes('kaggle.com')) {
    return { platform: 'kaggle', iconKey: 'kaggle', label: 'Kaggle' };
  }
  if (host.includes('researchgate.net')) {
    return { platform: 'researchgate', iconKey: 'researchgate', label: 'ResearchGate' };
  }
  if (host.includes('stackoverflow.com') || host.includes('stackexchange.com')) {
    return { platform: 'stackoverflow', iconKey: 'stackoverflow', label: 'Stack Overflow' };
  }

  const label = extractLabelFromHost(host);
  return { platform: 'custom', iconKey: 'custom', label };
};
