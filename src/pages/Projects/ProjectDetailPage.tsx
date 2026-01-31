import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FolderGit2, Sparkles, Code2 } from 'lucide-react';
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
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6 animate-bounce-subtle">
            <FolderGit2 className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Project not found</h1>
          <p className="text-slate-600 mb-6">We couldn't find the project you're looking for.</p>
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 btn-animated group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-12 pb-16">
      <Link 
        to="/projects"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:-translate-x-1 transition-all duration-300 group animate-fade-in"
      >
        <ArrowLeft className="w-5 h-5 group-hover:animate-wiggle" />
        Back to Projects
      </Link>

      <header className="relative animate-slide-up">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
          <span className="text-sm font-medium text-indigo-600">Project Details</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 hover:text-indigo-600 transition-colors">{project.title}</h1>
        
        {project.summary && (
          <p className="text-xl text-slate-600 max-w-3xl animate-fade-in" style={{ animationDelay: '100ms' }}>{project.summary}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:animate-bounce-subtle" />
              View on GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 btn-animated group"
            >
              <ExternalLink className="w-5 h-5 group-hover:animate-wiggle" />
              Live Demo
            </a>
          )}
        </div>
      </header>

      {project.coverImageUrl && (
        <div className="relative group animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500 animate-pulse-glow" />
          <div className="relative overflow-hidden rounded-2xl img-hover-shine">
            <img 
              className="relative w-full rounded-2xl shadow-xl border border-slate-100 group-hover:scale-[1.02] transition-transform duration-700" 
              src={project.coverImageUrl} 
              alt={project.title} 
            />
          </div>
        </div>
      )}

      {project.description && (
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 card-animated animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 hover:text-indigo-600 transition-colors">About This Project</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
        </section>
      )}

      {Array.isArray(project.techStack) && project.techStack.length > 0 && (
        <section className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse-glow">
              <Code2 className="w-5 h-5 text-white animate-bounce-subtle" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 hover:text-cyan-600 transition-colors">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech: string, index: number) => (
              <span 
                key={tech} 
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-sm hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {Array.isArray(project.galleryImages) && project.galleryImages.length > 0 && (
        <section className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 hover:text-indigo-600 transition-colors">Gallery</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {project.galleryImages.map((src: string, index: number) => (
              <div key={src} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow" />
                <div className="relative overflow-hidden rounded-xl img-hover-shine">
                  <img 
                    className="relative w-full rounded-xl shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-500" 
                    src={src} 
                    alt={`${project.title} screenshot ${index + 1}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
