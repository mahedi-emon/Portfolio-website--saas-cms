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
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1320]/60 border border-white/10 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <FolderGit2 className="w-4 h-4 text-[#C77DFF] animate-bounce-subtle" />
          <span className="text-sm font-medium text-[#C77DFF]">My Work</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-white">
          Featured <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent text-shimmer hover:animate-wiggle inline-block">Projects</span>
        </h1>
        <p className="text-lg text-[#C9D1D9] max-w-2xl mx-auto animate-slide-up">
          A showcase of my recent work, side projects, and experiments with cutting-edge technologies.
        </p>
      </section>

      {/* Projects Grid */}
      {projects.length > 0 && (
        <section>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <article 
                key={project.id} 
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] rounded-3xl blur-sm opacity-[0.06] group-hover:blur-md group-hover:opacity-[0.14] transition-all duration-600 ease-out" />
                
                <div className="relative h-full bg-[#0B1320]/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-[#C77DFF]/[0.05] border border-white/[0.06] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-600 ease-out card-animated">
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
                    <div className="h-52 bg-[#0B1320]/50 flex items-center justify-center animate-bg-pan">
                      <FolderGit2 className="w-16 h-16 text-[#C77DFF] animate-bounce-subtle" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Project Number Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1320]/50 text-[#C77DFF] text-xs font-semibold mb-3 group-hover:bg-[#C77DFF]/20 transition-colors">
                      <Sparkles className="w-3 h-3 group-hover:animate-spin-slow" />
                      Project {String(index + 1).padStart(2, '0')}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#C77DFF] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-[#C9D1D9] leading-relaxed mb-4 line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Tech Stack Tags */}
                    {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech: string, techIndex: number) => (
                          <span 
                            key={tech} 
                            className="px-2 py-1 rounded-md bg-[#0B1320]/50 text-[#C9D1D9] text-xs font-medium hover:bg-[#C77DFF]/20 hover:text-[#C77DFF] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-[#0B1320]/50 text-white/60 text-xs hover:bg-[#C77DFF]/20 hover:text-[#C77DFF] transition-colors">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#C9D1D9] hover:text-[#C77DFF] hover:-translate-y-0.5 transition-all duration-300 group/link"
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
                          className="inline-flex items-center gap-2 text-sm text-[#C9D1D9] hover:text-[#C77DFF] hover:-translate-y-0.5 transition-all duration-300 group/link"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:animate-wiggle" />
                          Live Demo
                        </a>
                      )}
                      <Link 
                        to={`/projects/${project.slug}`}
                        className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-[#C77DFF] hover:gap-3 transition-all duration-300 group/detail"
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
        </section>
      )}
    </div>
  );
}
