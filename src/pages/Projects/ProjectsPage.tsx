import { useCms } from '../../hooks/useCms';

export function ProjectsPage() {
  const { data } = useCms();
  const projects = (data.collections.projects ?? []).filter((item) => item.status === 'published');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="rounded border p-4">
            <div className="text-xs uppercase text-slate-500">{project.slug}</div>
            <h2 className="text-lg font-medium">{project.title}</h2>
            <p className="text-sm text-slate-600">{project.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
