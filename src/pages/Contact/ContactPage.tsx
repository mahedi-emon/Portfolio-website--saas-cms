import { useCms } from '../../hooks/useCms';

export function ContactPage() {
  const { data } = useCms();
  const contact = data.singletons.contactInfo ?? {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <div className="space-y-2 text-slate-600">
        <p>Email: {contact.email ?? 'hello@example.com'}</p>
        <p>Phone: {contact.phone ?? '+1 (555) 000-0000'}</p>
        <p>Location: {contact.location ?? 'Remote / Worldwide'}</p>
      </div>
      <form id="contact-form" className="space-y-3">
        <input className="w-full rounded border px-3 py-2" placeholder="Name" />
        <input className="w-full rounded border px-3 py-2" placeholder="Email" />
        <input className="w-full rounded border px-3 py-2" placeholder="Subject" />
        <textarea className="w-full rounded border px-3 py-2" placeholder="Message" rows={5} />
        <button className="rounded border px-4 py-2" type="button">
          Send message
        </button>
      </form>
    </div>
  );
}
