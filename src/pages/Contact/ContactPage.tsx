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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      {contact.pageIntroText && <p className="text-slate-600">{contact.pageIntroText}</p>}
      <div className="space-y-2 text-slate-600">
        <p>Email: {contactInfo.email ?? 'hello@example.com'}</p>
        <p>Phone: {contactInfo.phone ?? '+1 (555) 000-0000'}</p>
        <p>Location: {contactInfo.location ?? 'Remote / Worldwide'}</p>
        <div className="space-y-1 pt-2 text-sm">
          {socialLinks.map((link) => {
            const derived = detectSocialPlatform(String(link.url ?? ''));
            const platformKey = (link.platform ?? derived.platform) as keyof typeof iconMap;
            const iconKey = (link.iconKey ?? derived.iconKey) as keyof typeof iconMap;
            const Icon = iconMap[iconKey] ?? iconMap.custom;
            const label = formatPlatformLabel(String(platformKey), derived.label);
            return (
              <a key={`${label}-${link.url}`} className="flex items-center gap-2 hover:underline" href={String(link.url)} target="_blank" rel="noreferrer">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
      <form
        id="contact-form"
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          const nextErrors = validate();
          setErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) return;
          addContactMessage({
            name: formValues.name,
            email: formValues.email,
            subject: formValues.subject,
            message: formValues.message,
          });
          setFormValues({ name: '', email: '', subject: '', message: '' });
          setErrors({});
          setSuccess('Message sent successfully.');
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
        <button className="rounded border px-4 py-2" type="submit">
          Send message
        </button>
        {success && <div className="text-sm text-emerald-600">{success}</div>}
      </form>
    </div>
  );
}
