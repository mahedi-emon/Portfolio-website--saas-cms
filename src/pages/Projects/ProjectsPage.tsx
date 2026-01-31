import { Sparkles, FolderGit2, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCms } from '../../hooks/useCms';

export function ProjectsPage() {
  const { data } = useCms();
  const projects = (data.collections.projects ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <FolderGit2 className="w-4 h-4 text-cyan-500 animate-bounce-subtle" />
          <span className="text-sm font-medium text-cyan-600">My Work</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
          Featured <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Projects</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
          A showcase of my recent work, side projects, and experiments with cutting-edge technologies.
        </p>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow" />
              
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 card-animated">
                {/* Cover Image */}
                {project.coverImageUrl ? (
                  <div className="relative h-52 overflow-hidden img-hover-shine">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src={project.coverImageUrl} 
                      alt={project.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center animate-bg-pan">
                    <FolderGit2 className="w-16 h-16 text-slate-300 animate-bounce-subtle" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Project Number Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-3 group-hover:bg-indigo-100 transition-colors">
                    <Sparkles className="w-3 h-3 group-hover:animate-spin-slow" />
                    Project {String(index + 1).padStart(2, '0')}
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack Tags */}
                  {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 4).map((tech: string, techIndex: number) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-indigo-100 hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                          style={{ animationDelay: `${techIndex * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300 group/link"
                      >
                        <Github className="w-4 h-4 group-hover/link:animate-bounce-subtle" />
                        Code
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a 
                        href={project.liveDemoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300 group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:animate-wiggle" />
                        Live Demo
                      </a>
                    )}
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-3 transition-all duration-300 group/detail"
                    >
                      Details
                      <ArrowRight className="w-4 h-4 group-hover/detail:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4 animate-bounce-subtle">
              <FolderGit2 className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg">No projects available yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
