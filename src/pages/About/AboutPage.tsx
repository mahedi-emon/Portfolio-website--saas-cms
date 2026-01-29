import { useCms } from '../../hooks/useCms';

export function AboutPage() {
  const { data } = useCms();
  const published = <T extends { status?: string; orderIndex?: number }>(items: T[]) =>
    items
      .filter((item) => item.status === 'published')
      .slice()
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const about = data.singletons.about ?? {};
  const skills = published(data.collections.skills ?? []);
  const education = published(data.collections.education ?? []);
  const experience = published(data.collections.experience ?? []);
  const certifications = published(data.collections.certifications ?? []);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">{about.title ?? 'About'}</h1>
        <div className="grid gap-6 md:grid-cols-[160px_1fr]">
          <div>
            {about.profileImageUrl ? (
              <img className="h-40 w-40 rounded border object-cover" src={about.profileImageUrl} alt="Profile" />
            ) : (
              <div className="h-40 w-40 rounded border" />
            )}
          </div>
          <div className="space-y-2">
            <p className="max-w-3xl text-slate-600">{about.bio ?? ''}</p>
            <p className="text-sm text-slate-600">Current Role: {about.currentRole}</p>
            <p className="text-sm text-slate-600">Research Interest: {about.researchInterest}</p>
          </div>
        </div>
        {Array.isArray(about.highlights) && about.highlights.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-slate-600">
            {about.highlights.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Core Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="rounded border px-3 py-1 text-sm">
              {skill.name} · {skill.level}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        <div className="space-y-3">
          {education.map((item) => (
            <article key={item.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{item.institution}</h3>
              <p className="text-sm text-slate-600">{item.degree} · {item.field}</p>
              <p className="text-xs text-slate-500">{item.endDate}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Experience Summary</h2>
        <div className="space-y-3">
          {experience.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{item.role}</h3>
              <p className="text-sm text-slate-600">{item.company}</p>
              <p className="text-xs text-slate-500">{item.startDate} – {item.endDate}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <div className="space-y-3">
          {certifications.map((item) => (
            <article key={item.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{item.certificateTitle}</h3>
              <p className="text-sm text-slate-600">{item.issuer}</p>
              <p className="text-xs text-slate-500">{item.issueDate}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
