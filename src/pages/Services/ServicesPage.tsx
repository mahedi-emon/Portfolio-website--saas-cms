import { useCms } from '../../hooks/useCms';

export function ServicesPage() {
  const { data } = useCms();
  const services = (data.collections.services ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Services</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="rounded border p-4">
            <h2 className="text-lg font-medium">{service.title}</h2>
            <p className="text-sm text-slate-600">{service.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
