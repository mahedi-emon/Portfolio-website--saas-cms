import type { ReactNode } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, MessageCircle } from 'lucide-react';
import { useCms } from '../../hooks/useCms';

type SocialLink = {
  platform: string;
  url: string;
  iconKey: string;
};

const iconMap: Record<string, ReactNode> = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  twitter: <Twitter size={18} />,
  x: <Twitter size={18} />,
  telegram: <Send size={18} />,
  discord: <MessageCircle size={18} />,
};

export function Footer() {
  const { data } = useCms();
  const footer = data.singletons.footer ?? {};
  const contact = footer.contact ?? {};
  const socialLinks: SocialLink[] = footer.socialLinks ?? [];

  return (
    <footer className="border-t py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">{footer.title}</h2>
            <p className="text-sm">{footer.description}</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              {contact.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{contact.location}</span>
                </div>
              )}
            </div>
            {contact.directMessageUrl && (
              <a className="inline-flex items-center gap-2 text-sm" href={contact.directMessageUrl}>
                Direct message
              </a>
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Social</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  className="inline-flex items-center gap-2 text-sm"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  title={link.platform}
                >
                  {iconMap[link.iconKey?.toLowerCase()] ?? link.platform}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t pt-6 text-sm text-center">
          {footer.copyrightText}
        </div>
      </div>
    </footer>
  );
}
