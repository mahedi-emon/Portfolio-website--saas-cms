import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  BookOpen,
  GraduationCap,
  Briefcase,
  BarChart,
  Code,
  Globe,
} from 'lucide-react';

import type { SocialPlatformKey } from './detectSocialPlatform';

export const iconMap: Record<SocialPlatformKey, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  medium: BookOpen,
  google_scholar: GraduationCap,
  fiverr: Briefcase,
  upwork: Briefcase,
  kaggle: BarChart,
  researchgate: GraduationCap,
  stackoverflow: Code,
  custom: Globe,
};
