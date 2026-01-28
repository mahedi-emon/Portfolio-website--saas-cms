import { Mail, Phone, MapPin } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { detectSocialPlatform, formatPlatformLabel } from '../../utils/detectSocialPlatform';
import { iconMap } from '../../utils/iconMap';

export function Footer() {
  const { data } = useCms();
  const about = data.singletons.about ?? {};
  const contact = data.singletons.contact ?? {};
  const contactInfo = contact.contactInfo ?? {};
  const socialLinks = Array.isArray(contact.socialLinks) ? contact.socialLinks : [];
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];
  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms', href: '#' },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              {about.profileImageUrl && (
                <img
                  src={String(about.profileImageUrl)}
                  alt={String(about.fullName ?? 'Profile')}
                  className="h-12 w-12 rounded-full border object-cover"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{about.fullName ?? 'Portfolio'}</h2>
                {about.tagline && <p className="text-sm text-slate-600">{about.tagline}</p>}
              </div>
            </div>
            {about.bio && <p className="text-sm text-slate-600">{about.bio}</p>}
          </section>

          <nav className="space-y-3" aria-label="Footer">
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-slate-900" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
            <div className="space-y-2 text-sm text-slate-600">
              {contactInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{contactInfo.email}</span>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{contactInfo.location}</span>
                </div>
              )}
            </div>
            {contact.hireMeLabel && (
              <a
                className="inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-1 text-sm text-slate-700"
                href="/contact#contact-form"
              >
                {contact.hireMeLabel}
              </a>
            )}
          </address>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Social & Research</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              {socialLinks.map((link) => {
                const derived = detectSocialPlatform(String(link.url ?? ''));
                const platformKey = (link.platform ?? derived.platform) as keyof typeof iconMap;
                const iconKey = (link.iconKey ?? derived.iconKey) as keyof typeof iconMap;
                const Icon = iconMap[iconKey] ?? iconMap.custom;
                const label = formatPlatformLabel(String(platformKey), derived.label);
                return (
                  <a key={`${label}-${link.url}`} className="inline-flex items-center gap-2" href={String(link.url)} target="_blank" rel="noreferrer">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="border-t pt-6 text-sm text-slate-600">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <span>
              © {year} {about.fullName ?? 'Portfolio'}. All rights reserved.
            </span>
            <div className="flex gap-4 text-xs">
              {legalLinks.map((link) => (
                <a key={link.label} className="hover:text-slate-900" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
