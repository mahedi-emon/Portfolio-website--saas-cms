import { useState } from 'react';
import { useCms } from '../../hooks/useCms';
import { ResumeViewerModal } from '../../components/common/ResumeViewerModal';

export function HomePage() {
  const { data } = useCms();
  const published = <T extends { status?: string; orderIndex?: number }>(items: T[]) =>
    items
      .filter((item) => item.status === 'published')
      .slice()
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const hero = data.singletons.hero ?? {};
  const services = published(data.collections.services ?? []);
  const projects = published(data.collections.projects ?? []);
  const blogs = published(data.collections.blogs ?? []);
  const testimonials = published(data.collections.testimonials ?? []);
  const clients = published(data.collections.clients ?? []);
  const achievements = published(data.collections.achievements ?? []);
  const about = data.singletons.about ?? {};
  const education = published(data.collections.education ?? []);
  const resumes = data.collections.resumes ?? [];
  const resumeSettings = data.singletons.resumeSettings ?? {};
  const activeResume =
    resumes.find((item) => item.id === resumeSettings.activeResumeId && item.status === 'active') ??
    resumes.find((item) => item.status === 'active');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const techStackCategories = published(data.collections.techStackCategories ?? []);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold">
          Hi, I'm {hero.fullName ?? about.fullName ?? 'Full Name'}
        </h1>
        <p className="max-w-2xl text-slate-600">
          {hero.subheadline ?? 'Full-stack engineer focused on scalable web platforms.'}
        </p>
        <div className="flex gap-3">
          <a className="rounded border px-4 py-2" href={hero.ctaPrimaryHref ?? '/portfolio'}>
            {hero.ctaPrimaryLabel ?? 'View Portfolio'}
          </a>
          <a className="rounded border px-4 py-2" href={hero.ctaSecondaryHref ?? '/contact'}>
            {hero.ctaSecondaryLabel ?? 'Contact'}
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <div className="grid gap-6 md:grid-cols-[160px_1fr]">
          <div>
            {about.profileImageUrl ? (
              <img className="h-40 w-40 rounded border object-cover" src={about.profileImageUrl} alt="Profile" />
            ) : (
              <div className="h-40 w-40 rounded border" />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-slate-600">{about.bio}</p>
            <p className="text-sm text-slate-600">Current Role: {about.currentRole}</p>
            <p className="text-sm text-slate-600">Research Interest: {about.researchInterest}</p>
            {education.length > 0 && (
              <div className="text-sm text-slate-600">
                Education: {education[0].degree} in {education[0].field} — {education[0].institution} ({education[0].endDate})
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="skills" className="space-y-4">
        <h2 className="text-2xl font-semibold">Tech Stack & Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techStackCategories.map((category) => (
            <div key={category.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{category.categoryName}</h3>
              <div className="mt-4 space-y-3">
                {(category.tools ?? []).map((tool: { id: string; name: string; logoUrl: string; proficiencyLevel: number }) => (
                  <div key={tool.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      {tool.logoUrl ? (
                        <img className="h-8 w-8 rounded border" src={tool.logoUrl} alt={tool.name} />
                      ) : (
                        <div className="h-8 w-8 rounded border" />
                      )}
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="ml-auto text-xs text-slate-500">{tool.proficiencyLevel}%</div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded border">
                      <div
                        className="h-full bg-slate-800"
                        style={{ width: `${tool.proficiencyLevel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Services</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="text-sm text-slate-600">{service.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <article key={project.id} className="rounded border p-4">
                {project.coverImageUrl && (
                  <img className="mb-3 w-full rounded border" src={project.coverImageUrl} alt={project.title} />
                )}
                <h3 className="text-lg font-medium">{project.title}</h3>
                <p className="text-sm text-slate-600">{project.summary}</p>
                <div className="mt-2 flex gap-3 text-sm">
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
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Blog Posts</h2>
        <div className="space-y-3">
          {blogs.slice(0, 3).map((post) => (
            <div key={post.id} className="rounded border p-4">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-sm text-slate-600">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="rounded border p-4">
              <p className="text-sm text-slate-600">“{item.quote}”</p>
              <footer className="mt-2 text-xs text-slate-500">— {item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clients</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client) => {
            const content = (
              <div className="rounded border p-4 text-center">
                {client.logoUrl ? (
                  <img
                    className="mx-auto h-16 w-auto object-contain"
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                  />
                ) : (
                  <div className="text-sm text-slate-500">No logo</div>
                )}
                <div className="mt-2 text-sm text-slate-700">{client.name}</div>
              </div>
            );

            if (client.websiteUrl) {
              return (
                <a key={client.id} href={client.websiteUrl} target="_blank" rel="noreferrer">
                  {content}
                </a>
              );
            }

            return <div key={client.id}>{content}</div>;
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Achievements</h2>
        <div className="space-y-2">
          {achievements.map((item) => (
            <div key={item.id} className="rounded border p-3">
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-xs text-slate-500">{item.issuer}</div>
              <div className="text-xs text-slate-500">{item.year}</div>
              <div className="text-sm text-slate-600">{item.description}</div>
              {item.externalLink && (
                <a className="text-xs" href={item.externalLink} target="_blank" rel="noreferrer">
                  External Link
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Resume</h2>
        {activeResume ? (
          <div className="space-y-2">
            <div className="text-sm text-slate-600">{activeResume.title}</div>
            <div className="rounded border">
              <iframe
                title="Resume Preview"
                src={activeResume.fileUrl}
                className="h-64 w-full"
              />
            </div>
            <button className="rounded border px-4 py-2" type="button" onClick={() => setIsResumeOpen(true)}>
              View full resume
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Resume not available.</div>
        )}
      </section>

      <ResumeViewerModal
        isOpen={isResumeOpen}
        previewUrl={activeResume?.fileUrl}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
