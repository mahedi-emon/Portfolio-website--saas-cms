import { Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <footer className="relative w-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl animate-morph floating" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 pb-8 sm:pb-10">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12 sm:mb-16">
          {/* Brand Section */}
          <section className="lg:col-span-1 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 group">
              {about.profileImageUrl ? (
                <img
                  src={String(about.profileImageUrl)}
                  alt={String(about.fullName ?? 'Profile')}
                  className="h-14 w-14 rounded-2xl border-2 border-white/20 object-cover group-hover:scale-105 group-hover:border-indigo-500/50 transition-all duration-300"
                />
              ) : (
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 animate-pulse-glow">
                  {(about.fullName ?? 'P').charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{about.fullName ?? 'Portfolio'}</h2>
                {about.tagline && <p className="text-sm text-slate-400">{about.tagline}</p>}
              </div>
            </div>
            {about.bio && (
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{about.bio}</p>
            )}
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.slice(0, 5).map((link, index) => {
                const derived = detectSocialPlatform(String(link.url ?? ''));
                const iconKey = (link.iconKey ?? derived.iconKey) as keyof typeof iconMap;
                const Icon = iconMap[iconKey] ?? iconMap.custom;
                return (
                  <a 
                    key={`${link.url}`} 
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 hover:-translate-y-1 hover:rotate-6 transition-all duration-300 group/social" 
                    href={String(link.url)} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon className="h-4 w-4 group-hover/social:animate-bounce-subtle" />
                  </a>
                );
              })}
            </div>
          </section>

          {/* Quick Links */}
          <nav className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }} aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.label} style={{ animationDelay: `${index * 50}ms` }}>
                  <Link 
                    className="group inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300" 
                    to={link.href}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="not-italic space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">Contact</h3>
            <div className="space-y-4">
              {contactInfo.email && (
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300">
                    <Mail size={16} className="group-hover:animate-wiggle" />
                  </div>
                  <span className="text-sm">{contactInfo.email}</span>
                </a>
              )}
              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300">
                    <Phone size={16} className="group-hover:animate-wiggle" />
                  </div>
                  <span className="text-sm">{contactInfo.phone}</span>
                </a>
              )}
              {contactInfo.location && (
                <div className="flex items-center gap-3 text-slate-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin size={16} className="group-hover:animate-bounce-subtle" />
                  </div>
                  <span className="text-sm">{contactInfo.location}</span>
                </div>
              )}
            </div>
          </address>

          {/* CTA Section */}
          <section className="space-y-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">Let's Work Together</h3>
            <p className="text-sm text-slate-400">
              Have a project in mind? Let's create something amazing together.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 hover:scale-105 transition-all duration-300 btn-animated"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <span>© {year} {about.fullName ?? 'Portfolio'}.</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-500 hidden sm:inline mx-1 animate-heartbeat" />
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              {legalLinks.map((link) => (
                <a 
                  key={link.label} 
                  className="hover:text-white hover:-translate-y-0.5 transition-all duration-300" 
                  href={link.href}
                >
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
