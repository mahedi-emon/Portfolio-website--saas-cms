import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ExternalLink, Github, Quote, Award, ChevronRight, Sparkles, Zap, Code2, Rocket } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { ResumeViewerModal } from '../../components/common/ResumeViewerModal';
import { CertificateModal } from '../../components/common/CertificateModal';

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
  const certifications = published(data.collections.certifications ?? []);
  const about = data.singletons.about ?? {};
  const education = published(data.collections.education ?? []);
  const resumes = data.collections.resumes ?? [];
  const resumeSettings = data.singletons.resumeSettings ?? {};
  const activeResume =
    resumes.find((item) => item.id === resumeSettings.activeResumeId && item.status === 'active') ??
    resumes.find((item) => item.status === 'active');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ imageUrl: string; title: string } | null>(null);
  const techStackCategories = published(data.collections.techStackCategories ?? []);

  // Intersection Observer for scroll animations
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const sectionClass = (id: string) =>
    `transition-all duration-1000 ${visibleSections.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;

  return (
    <div className="space-y-32">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - Premium Cinematic Landing
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="hero" 
        ref={setSectionRef('hero')}
        className={`relative min-h-[85vh] flex items-center ${sectionClass('hero')}`}
      >
        {/* Radial Glow Behind Hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(199,125,255,0.15),transparent_60%)]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(157,78,221,0.1),transparent_60%)]" />
        </div>
        
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Content */}
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1320]/60 border border-white/10 animate-slide-in-left hover:scale-105 hover:border-[#C77DFF]/50 transition-all cursor-default backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#C77DFF] animate-spin-slow" />
              <span className="text-sm font-medium text-[#C9D1D9]">Available for freelance work</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.15] animate-slide-up text-white">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-[#C77DFF] via-[#E0AAFF] to-[#9D4EDD] bg-[length:200%_auto] bg-clip-text text-transparent inline-block pb-2 animate-gradient-x">
                {hero.fullName ?? about.fullName ?? 'Full Name'}
              </span>
            </h1>
            
            <p className="text-xl text-[#C9D1D9] max-w-xl leading-relaxed animate-slide-up delay-200 hover:text-white transition-colors">
              {hero.subheadline ?? 'Full-stack engineer focused on scalable web platforms.'}
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up delay-300">
              <Link
                to={hero.ctaPrimaryHref ?? '/portfolio'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C77DFF] text-[#0B1320] font-semibold shadow-lg shadow-[#C77DFF]/20 hover:shadow-xl hover:shadow-[#C77DFF]/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {hero.ctaPrimaryLabel ?? 'View Portfolio'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                to={hero.ctaSecondaryHref ?? '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/20 text-white font-medium hover:border-[#C77DFF]/50 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                {hero.ctaSecondaryLabel ?? 'Contact Me'}
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 pt-8 border-t border-white/10 animate-slide-up delay-500">
              <div className="group cursor-default">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">{projects.length}+</div>
                <div className="text-sm text-white/60 group-hover:text-[#C77DFF] transition-colors">Projects</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">{clients.length}+</div>
                <div className="text-sm text-white/60 group-hover:text-[#C77DFF] transition-colors">Clients</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">{certifications.length}+</div>
                <div className="text-sm text-white/60 group-hover:text-[#C77DFF] transition-colors">Certifications</div>
              </div>
            </div>
          </div>

          {/* Profile Image / Visual */}
          <div className="relative hidden lg:flex justify-center items-center lg:pl-8">
            <div className="absolute w-80 h-80 bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] rounded-full opacity-20 blur-3xl animate-morph" />
            <div className="relative">
              {about.profileImageUrl ? (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                  <img 
                    className="relative w-80 h-80 rounded-3xl object-cover border-4 border-white/10 shadow-2xl shadow-[#C77DFF]/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-1 group-hover:border-[#C77DFF]/50" 
                    src={about.profileImageUrl} 
                    alt="Profile" 
                  />
                </div>
              ) : (
                <div className="w-80 h-80 rounded-3xl bg-[#0B1320]/60 border-4 border-white/10 shadow-2xl flex items-center justify-center">
                  <Code2 className="w-20 h-20 text-[#C77DFF] animate-bounce-subtle" />
                </div>
              )}
              
              {/* Floating Elements - Ink Purple Theme */}
              <div className="absolute -top-6 -right-6 p-4 bg-[#0B1320]/60 border border-white/10 rounded-2xl shadow-xl shadow-[#C77DFF]/10 floating hover:scale-110 hover:border-[#C77DFF]/50 transition-all cursor-pointer">
                <Zap className="w-8 h-8 text-[#C77DFF]" />
              </div>
              <div className="absolute -bottom-6 -left-6 p-4 bg-[#0B1320]/60 border border-white/10 rounded-2xl shadow-xl shadow-[#C77DFF]/10 floating-delayed hover:scale-110 hover:border-[#C77DFF]/50 transition-all cursor-pointer">
                <Rocket className="w-8 h-8 text-[#C77DFF]" />
              </div>
              <div className="absolute top-1/2 -right-12 p-3 bg-[#0B1320]/60 border border-white/10 rounded-xl shadow-lg animate-bounce-subtle delay-300">
                <Sparkles className="w-6 h-6 text-[#9D4EDD]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          ABOUT SECTION - Ink Purple Theme
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="about-section" 
        ref={setSectionRef('about-section')}
        className={sectionClass('about-section')}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            About <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto animate-fade-in">Passionate about creating impactful digital experiences</p>
        </div>
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="relative group">
            {about.profileImageUrl ? (
              <>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] rounded-3xl blur opacity-25 group-hover:opacity-40 transition-all duration-500" />
                <img 
                  className="relative w-full aspect-square rounded-3xl object-cover shadow-2xl shadow-[#C77DFF]/20 border-2 border-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#C77DFF]/50" 
                  src={about.profileImageUrl} 
                  alt="Profile" 
                />
              </>
            ) : (
              <div className="w-full aspect-square rounded-3xl bg-[#0B1320]/60 border-2 border-white/10" />
            )}
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-[#C9D1D9] leading-relaxed hover:text-white transition-colors duration-300">{about.bio}</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {about.currentRole && (
                <div className="p-4 rounded-2xl bg-[#0B1320]/60 border border-white/10 hover:border-[#C77DFF]/50 transition-all">
                  <div className="text-xs font-semibold text-[#C77DFF] uppercase tracking-wider mb-1">Current Role</div>
                  <div className="font-medium text-white">{about.currentRole}</div>
                </div>
              )}
              {about.researchInterest && (
                <div className="p-4 rounded-2xl bg-[#0B1320]/60 border border-white/10 hover:border-[#C77DFF]/50 transition-all">
                  <div className="text-xs font-semibold text-[#C77DFF] uppercase tracking-wider mb-1">Research Interest</div>
                  <div className="font-medium text-white">{about.researchInterest}</div>
                </div>
              )}
            </div>
            
            {education.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#0B1320]/60 border border-white/10 hover:border-[#C77DFF]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] flex items-center justify-center shadow-lg shadow-[#C77DFF]/20">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white">Education</div>
                </div>
                <div className="text-[#C9D1D9]">
                  {education[0].degree} in {education[0].field}
                </div>
                <div className="text-sm text-white/60">
                  {education[0].institution} • {education[0].endDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          TECH STACK SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="skills" 
        ref={setSectionRef('skills')}
        className={sectionClass('skills')}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Tech Stack & <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Tools</span>
          </h2>
          <p className="text-[#C9D1D9] max-w-2xl mx-auto">Technologies I work with to bring ideas to life</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackCategories.map((category, catIndex) => (
            <div 
              key={category.id} 
              className="group p-6 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/10">
                {category.categoryName}
              </h3>
              <div className="space-y-4">
                {(category.tools ?? []).map((tool: { id: string; name: string; logoUrl: string; proficiencyLevel: number }) => (
                  <div key={tool.id} className="flex items-center gap-4 group/item">
                    <div className="relative">
                      {tool.logoUrl ? (
                        <img 
                          className="w-10 h-10 rounded-xl object-contain p-1 bg-[#0B1320]/50 border border-white/10 group-hover/item:border-[#C77DFF]/50 transition-colors" 
                          src={tool.logoUrl} 
                          alt={tool.name} 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#0B1320]/50 border border-white/10 flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-white/60" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#C9D1D9]">{tool.name}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#0B1320]/50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] transition-all duration-1000 ease-out progress-bar"
                          style={{ width: `${tool.proficiencyLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          SERVICES SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="services-section" 
        ref={setSectionRef('services-section')}
        className={sectionClass('services-section')}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            My <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-[#C9D1D9] max-w-2xl mx-auto">What I can do for you</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative p-8 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] overflow-hidden hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C77DFF]/20 to-[#9D4EDD]/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#C77DFF]/10 border border-[#C77DFF]/15 flex items-center justify-center mb-6 group-hover:bg-[#C77DFF]/15 group-hover:border-[#C77DFF]/25 transition-all duration-500 ease-out">
                  <Zap className="w-7 h-7 text-[#C77DFF]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-[#C9D1D9] leading-relaxed">{service.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="projects-section" 
        ref={setSectionRef('projects-section')}
        className={sectionClass('projects-section')}
      >
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Featured <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-[#C9D1D9]">Some of my best work</p>
          </div>
          <Link to="/portfolio" className="hidden sm:flex items-center gap-2 text-[#C77DFF] font-medium hover:gap-3 transition-all">
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects
            .filter((project) => project.featured)
            .slice(0, 4)
            .map((project) => (
              <article 
                key={project.id} 
                className="group rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] overflow-hidden hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
              >
                {project.coverImageUrl && (
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src={project.coverImageUrl} 
                      alt={project.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#0B1320] text-sm font-medium hover:bg-white transition-colors"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a 
                          href={project.liveDemoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C77DFF] text-white text-sm font-medium hover:bg-[#9D4EDD] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#C77DFF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#C9D1D9] line-clamp-2">{project.summary}</p>
                </div>
              </article>
            ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
            View All Projects <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          BLOG SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="blog-section" 
        ref={setSectionRef('blog-section')}
        className={sectionClass('blog-section')}
      >
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Latest <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Blog Posts</span>
            </h2>
            <p className="text-[#C9D1D9]">Thoughts, tutorials, and insights</p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[#C77DFF] font-medium hover:gap-3 transition-all">
            Read More <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              className="group p-6 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C77DFF]/10 border border-[#C77DFF]/15 flex items-center justify-center mb-5 group-hover:bg-[#C77DFF]/15 group-hover:border-[#C77DFF]/25 transition-all duration-500 ease-out">
                <Quote className="w-5 h-5 text-[#C77DFF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#C77DFF] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#C9D1D9] text-sm line-clamp-3">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 mt-4 text-[#C77DFF] text-sm font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section 
          id="testimonials-section" 
          ref={setSectionRef('testimonials-section')}
          className={sectionClass('testimonials-section')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Client <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">What people say about working with me</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <blockquote 
                key={item.id} 
                className="relative p-8 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C77DFF]/20" />
                <p className="text-lg text-[#C9D1D9] italic leading-relaxed mb-6">"{item.quote}"</p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] flex items-center justify-center text-white font-semibold">
                    {item.author?.charAt(0) ?? 'A'}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.author}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          CLIENTS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {clients.length > 0 && (
        <section 
          id="clients-section" 
          ref={setSectionRef('clients-section')}
          className={sectionClass('clients-section')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Trusted <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Clients</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">Companies I've had the pleasure to work with</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client) => {
              const content = (
                <div className="group p-8 rounded-2xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out flex items-center justify-center h-32">
                  {client.logoUrl ? (
                    <img
                      className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      src={client.logoUrl}
                      alt={`${client.name} logo`}
                    />
                  ) : (
                    <div className="text-lg font-semibold text-white/60 group-hover:text-[#C77DFF] transition-colors">{client.name}</div>
                  )}
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
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          ACHIEVEMENTS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {achievements.length > 0 && (
        <section 
          id="achievements-section" 
          ref={setSectionRef('achievements-section')}
          className={sectionClass('achievements-section')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Awards & <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">Recognition and milestones</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div 
                key={item.id} 
                className="group p-6 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C77DFF]/10 border border-[#C77DFF]/15 flex items-center justify-center group-hover:bg-[#C77DFF]/15 group-hover:border-[#C77DFF]/25 transition-all duration-500 ease-out">
                    <Award className="w-6 h-6 text-[#C77DFF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <div className="text-sm text-[#C77DFF] font-medium">{item.issuer}</div>
                    <div className="text-xs text-white/60 mb-3">{item.year}</div>
                    <p className="text-sm text-[#C9D1D9]">{item.description}</p>
                    {item.externalLink && (
                      <a 
                        className="inline-flex items-center gap-1 mt-3 text-[#C77DFF] text-sm font-medium hover:gap-2 transition-all" 
                        href={item.externalLink} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          CERTIFICATIONS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section 
          id="certifications-section" 
          ref={setSectionRef('certifications-section')}
          className={sectionClass('certifications-section')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">Verified skills and expertise</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <article 
                key={cert.id} 
                className="group p-6 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#C77DFF]/[0.05] hover:shadow-xl hover:shadow-[#C77DFF]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  {cert.certificateImageUrl ? (
                    <img
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[#C77DFF]/50 transition-colors"
                      src={cert.certificateImageUrl}
                      alt={cert.certificateTitle}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C77DFF]/20 to-[#9D4EDD]/20 flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#C77DFF]" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-white group-hover:text-[#C77DFF] transition-colors">
                      {cert.certificateTitle}
                    </h3>
                    <div className="text-sm text-[#C77DFF] font-medium">{cert.issuer}</div>
                    <div className="text-xs text-white/60">
                      Issued: {cert.issueDate}
                      {cert.expiryDate ? ` • Expires: ${cert.expiryDate}` : ''}
                    </div>
                    {cert.credentialId && (
                      <div className="text-xs text-white/60">ID: {cert.credentialId}</div>
                    )}
                    <div className="flex gap-3 pt-2">
                      {cert.credentialUrl && (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[#C77DFF] font-medium hover:gap-2 transition-all"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {(cert.certificateImageUrl || cert.certificateFileUrl) && (
                        <button 
                          type="button"
                          onClick={() => setSelectedCertificate({ 
                            imageUrl: cert.certificateImageUrl || cert.certificateFileUrl, 
                            title: cert.certificateTitle 
                          })}
                          className="inline-flex items-center gap-1 text-sm text-[#C9D1D9] hover:text-[#C77DFF] font-medium transition-colors"
                        >
                          View Certificate <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          RESUME SECTION - Full Width CTA
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        id="resume-section" 
        ref={setSectionRef('resume-section')}
        className={`${sectionClass('resume-section')} -mx-4 sm:-mx-6 lg:-mx-8 px-0`}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1320] via-[#0B1320]/80 to-[#0B1320] py-16 sm:py-20 lg:py-24 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#C77DFF] rounded-full opacity-10 blur-3xl animate-morph floating" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D4EDD] rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C77DFF] rounded-full opacity-5 blur-3xl animate-pulse-glow" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-up">
              Want to know more?
            </h2>
            <p className="text-[#C9D1D9] text-lg sm:text-xl max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Download my resume to see my full experience, education, and skills
            </p>
            
            {activeResume ? (
              <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <button 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C77DFF] text-[#0B1320] font-semibold shadow-xl shadow-[#C77DFF]/30 hover:shadow-2xl hover:shadow-[#C77DFF]/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300 btn-animated group"
                  type="button" 
                  onClick={() => setIsResumeOpen(true)}
                >
                  View Resume
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </button>
              </div>
            ) : (
              <div className="text-white/60 animate-pulse">Resume coming soon...</div>
            )}
          </div>
        </div>
      </section>

      <ResumeViewerModal
        isOpen={isResumeOpen}
        previewUrl={activeResume?.fileUrl}
        onClose={() => setIsResumeOpen(false)}
      />

      <CertificateModal
        isOpen={!!selectedCertificate}
        imageUrl={selectedCertificate?.imageUrl}
        title={selectedCertificate?.title}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
