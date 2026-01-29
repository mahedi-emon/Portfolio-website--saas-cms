import { useParams } from 'react-router-dom';
import { useCms } from '../../hooks/useCms';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { data } = useCms();

  const project = (data.collections.projects ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
    .find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="rounded border p-4">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-sm text-slate-600">We couldn’t find the project you’re looking for.</p>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <div className="text-xs uppercase text-slate-500">{project.slug}</div>
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        {project.summary && <p className="text-slate-600">{project.summary}</p>}
      </header>

      {project.coverImageUrl && (
        <img className="w-full rounded border" src={project.coverImageUrl} alt={project.title} />
      )}

      {project.description && <p className="text-slate-600">{project.description}</p>}

      {Array.isArray(project.techStack) && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="rounded border px-3 py-1 text-sm">
              {tech}
            </span>
          ))}
        </div>
      )}

      {Array.isArray(project.galleryImages) && project.galleryImages.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {project.galleryImages.map((src: string) => (
            <img key={src} className="w-full rounded border" src={src} alt={project.title} />
          ))}
        </div>
      )}

      <div className="flex gap-3 text-sm">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.liveDemoUrl && (
          <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
