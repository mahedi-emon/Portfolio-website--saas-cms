import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { detectSocialPlatform, formatPlatformLabel } from '../../utils/detectSocialPlatform';
import { iconMap } from '../../utils/iconMap';
import { useCms } from '../../hooks/useCms';
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const { data, addContactMessage } = useCms();
  const location = useLocation();
  const contact = data.singletons.contact ?? {};
  const contactInfo = contact.contactInfo ?? {};
  const socialLinks = Array.isArray(contact.socialLinks) ? contact.socialLinks : [];
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.hash !== '#contact-form') return;
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  const handleChange = (key: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formValues.name.trim()) nextErrors.name = 'Name is required.';
    if (!formValues.email.trim()) nextErrors.email = 'Email is required.';
    if (!formValues.subject.trim()) nextErrors.subject = 'Subject is required.';
    if (!formValues.message.trim()) nextErrors.message = 'Message is required.';
    if (formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = 'Enter a valid email.';
    }
    return nextErrors;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <MessageCircle className="w-4 h-4 text-indigo-500 animate-bounce-subtle" />
          <span className="text-sm font-medium text-indigo-600">Get in Touch</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
          Let's <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Connect</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
          {contact.pageIntroText || "Have a question or want to work together? I'd love to hear from you."}
        </p>
      </section>

      {/* Main Content */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {/* Contact Details Card */}
          <div className="group relative animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow" />
            <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-animated">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Contact Info</h2>
              </div>
              
              <div className="space-y-4">
                {contactInfo.email && (
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 hover:-translate-x-1 transition-all duration-300 group/item"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 group-hover/item:bg-indigo-100 group-hover/item:scale-110 transition-all">
                      <Mail className="w-5 h-5 group-hover/item:animate-wiggle" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-slate-700">{contactInfo.email}</p>
                    </div>
                  </a>
                )}
                
                {contactInfo.phone && (
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 hover:-translate-x-1 transition-all duration-300 group/item"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500 group-hover/item:bg-cyan-100 group-hover/item:scale-110 transition-all">
                      <Phone className="w-5 h-5 group-hover/item:animate-wiggle" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-slate-700">{contactInfo.phone}</p>
                    </div>
                  </a>
                )}
                
                {contactInfo.location && (
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 group-hover/item:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 group-hover/item:animate-bounce-subtle" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                      <p className="text-sm font-medium text-slate-700">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          {socialLinks.length > 0 && (
            <div className="group relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow" />
              <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-animated">
                <h2 className="text-lg font-bold text-slate-800 mb-4 group-hover:text-cyan-600 transition-colors">Follow Me</h2>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => {
                    const derived = detectSocialPlatform(String(link.url ?? ''));
                    const platformKey = (link.platform ?? derived.platform) as keyof typeof iconMap;
                    const iconKey = (link.iconKey ?? derived.iconKey) as keyof typeof iconMap;
                    const Icon = iconMap[iconKey] ?? iconMap.custom;
                    const label = formatPlatformLabel(String(platformKey), derived.label);
                    return (
                      <a
                        key={`${label}-${link.url}`}
                        className="group/social inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                        href={String(link.url)}
                        target="_blank"
                        rel="noreferrer"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Icon className="h-5 w-5 group-hover/social:animate-bounce-subtle" />
                        <span className="text-sm font-medium">{label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="group relative animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500 animate-pulse-glow" />
          <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100 card-animated">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Send className="w-5 h-5 text-white animate-bounce-subtle" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Send a Message</h2>
            </div>

            <form
              id="contact-form"
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                const nextErrors = validate();
                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;
                setIsSubmitting(true);
                setSuccess(null);
                addContactMessage({
                  name: formValues.name,
                  email: formValues.email,
                  subject: formValues.subject,
                  message: formValues.message,
                });
                setFormValues({ name: '', email: '', subject: '', message: '' });
                setErrors({});
                setSuccess('Message sent successfully!');
                setIsSubmitting(false);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="animate-fade-in" style={{ animationDelay: '350ms' }}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                  <input
                    className={`w-full rounded-xl border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-indigo-300 hover:shadow-sm`}
                    placeholder="John Doe"
                    value={formValues.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.name}</p>}
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    className={`w-full rounded-xl border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-indigo-300 hover:shadow-sm`}
                    placeholder="john@example.com"
                    type="email"
                    value={formValues.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.email}</p>}
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '450ms' }}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  className={`w-full rounded-xl border ${errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-indigo-300 hover:shadow-sm`}
                  placeholder="Project Inquiry"
                  value={formValues.subject}
                  onChange={(event) => handleChange('subject', event.target.value)}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.subject}</p>}
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  className={`w-full rounded-xl border ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'} px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 resize-none hover:border-indigo-300 hover:shadow-sm`}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formValues.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.message}</p>}
              </div>
              
              <div className="flex items-center gap-4 pt-2 animate-fade-in" style={{ animationDelay: '550ms' }}>
                <button 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 btn-animated group/btn" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
                
                {success && (
                  <div className="flex items-center gap-2 text-emerald-600 animate-slide-in-left">
                    <CheckCircle2 className="w-5 h-5 animate-bounce-subtle" />
                    <span className="font-medium">{success}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
