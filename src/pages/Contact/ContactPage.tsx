import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { detectSocialPlatform, formatPlatformLabel } from '../../utils/detectSocialPlatform';
import { iconMap } from '../../utils/iconMap';
import { useCms } from '../../hooks/useCms';

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
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Contact</h1>
        {contact.pageIntroText && <p className="text-slate-600">{contact.pageIntroText}</p>}
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded border bg-white p-5">
            <h2 className="text-sm font-semibold uppercase text-slate-500">Contact Info</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <span className="font-medium">{contactInfo.email ?? ''}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium">{contactInfo.phone ?? ''}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Location</span>
                <span className="font-medium">{contactInfo.location ?? ''}</span>
              </div>
            </div>
          </div>

          <div className="rounded border bg-white p-5">
            <h2 className="text-sm font-semibold uppercase text-slate-500">Social Links</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const derived = detectSocialPlatform(String(link.url ?? ''));
                const platformKey = (link.platform ?? derived.platform) as keyof typeof iconMap;
                const iconKey = (link.iconKey ?? derived.iconKey) as keyof typeof iconMap;
                const Icon = iconMap[iconKey] ?? iconMap.custom;
                const label = formatPlatformLabel(String(platformKey), derived.label);
                return (
                  <a
                    key={`${label}-${link.url}`}
                    className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    href={String(link.url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded border bg-white p-6">
          <h2 className="text-sm font-semibold uppercase text-slate-500">Send a Message</h2>
          <form
            id="contact-form"
            className="mt-4 space-y-4"
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
              setSuccess('Message sent successfully.');
              setIsSubmitting(false);
            }}
          >
            <div>
              <input
                className="w-full rounded border px-3 py-2"
                placeholder="Name"
                value={formValues.name}
                onChange={(event) => handleChange('name', event.target.value)}
              />
              {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
            </div>
            <div>
              <input
                className="w-full rounded border px-3 py-2"
                placeholder="Email"
                value={formValues.email}
                onChange={(event) => handleChange('email', event.target.value)}
              />
              {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
            </div>
            <div>
              <input
                className="w-full rounded border px-3 py-2"
                placeholder="Subject"
                value={formValues.subject}
                onChange={(event) => handleChange('subject', event.target.value)}
              />
              {errors.subject && <div className="text-sm text-red-600">{errors.subject}</div>}
            </div>
            <div>
              <textarea
                className="w-full rounded border px-3 py-2"
                placeholder="Message"
                rows={5}
                value={formValues.message}
                onChange={(event) => handleChange('message', event.target.value)}
              />
              {errors.message && <div className="text-sm text-red-600">{errors.message}</div>}
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded border px-4 py-2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
              {success && <div className="text-sm text-emerald-600">{success}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
