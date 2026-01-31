import { useState } from 'react';
import { useCms } from '../../hooks/useCms';
import { Sparkles, FolderGit2, BookOpen, Trophy, Award, ExternalLink, Github, FileText, Eye } from 'lucide-react';
import { CertificateModal } from '../../components/common/CertificateModal';

const tabs = ['projects', 'publications', 'achievements'] as const;

type TabKey = (typeof tabs)[number];

const tabConfig = {
  projects: { icon: FolderGit2, label: 'Projects', gradient: 'from-indigo-500 to-purple-500' },
  publications: { icon: BookOpen, label: 'Publications', gradient: 'from-emerald-500 to-teal-500' },
  achievements: { icon: Trophy, label: 'Achievements', gradient: 'from-orange-500 to-amber-500' },
};

export function PortfolioPage() {
  const { data } = useCms();
  const [activeTab, setActiveTab] = useState<TabKey>('projects');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certModalImage, setCertModalImage] = useState('');

  const projects = (data.collections.projects ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const publications = (data.collections.publications ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const achievements = (data.collections.achievements ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const certifications = (data.collections.certifications ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  const handleViewCertificate = (imageUrl: string) => {
    setCertModalImage(imageUrl);
    setCertModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
          <span className="text-sm font-medium text-indigo-600">My Portfolio</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
          Work & <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Achievements</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
          A curated collection of my projects, publications, and achievements throughout my career.
        </p>
      </section>

      {/* Tab Navigation */}
      <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl">
            {tabs.map((tab, index) => {
              const config = tabConfig[tab];
              const Icon = config.icon;
              const isActive = activeTab === tab;
              
              return (
                <button
                  key={tab}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? 'bg-white text-slate-800 shadow-md' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-500 animate-bounce-subtle' : ''} transition-colors`} />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <section className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow" />
              
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 card-animated">
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
                  <div className="h-52 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-bg-pan">
                    <FolderGit2 className="w-16 h-16 text-indigo-300 animate-bounce-subtle" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-3 group-hover:bg-indigo-100 transition-colors">
                    <Sparkles className="w-3 h-3 group-hover:animate-spin-slow" />
                    Project {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 mb-4 line-clamp-2">{project.summary}</p>
                  
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
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-2 text-center py-16 animate-fade-in">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4 animate-bounce-subtle">
                <FolderGit2 className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg">No projects available yet.</p>
            </div>
          )}
        </section>
      )}

      {/* Publications Tab */}
      {activeTab === 'publications' && (
        <section className="space-y-6">
          {publications.map((pub, index) => (
            <article key={pub.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500 animate-pulse-glow" />
              
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 card-animated">
                <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6">
                  {pub.coverImageUrl ? (
                    <div className="h-40 md:h-full rounded-xl overflow-hidden img-hover-shine">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        src={pub.coverImageUrl} 
                        alt={pub.title} 
                      />
                    </div>
                  ) : (
                    <div className="h-40 md:h-full rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center animate-bg-pan">
                      <BookOpen className="w-12 h-12 text-emerald-300 animate-bounce-subtle" />
                    </div>
                  )}
                  
                  <div className="flex flex-col">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold w-fit mb-3 group-hover:bg-emerald-100 transition-colors">
                      <BookOpen className="w-3 h-3 group-hover:animate-wiggle" />
                      {pub.venue || 'Publication'}
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {pub.title}
                    </h2>
                    
                    {Array.isArray(pub.authors) && pub.authors.length > 0 && (
                      <p className="text-sm text-slate-500 mb-2">{pub.authors.join(', ')}</p>
                    )}
                    
                    {pub.year && (
                      <p className="text-sm text-indigo-600 font-medium mb-3">Published {pub.year}</p>
                    )}
                    
                    {pub.abstract && (
                      <p className="text-slate-600 text-sm line-clamp-2 mb-4">{pub.abstract}</p>
                    )}
                    
                    <div className="flex items-center gap-3 mt-auto">
                      {pub.paperUrl && (
                        <a 
                          href={pub.paperUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group/link"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:animate-wiggle" />
                          View Paper
                        </a>
                      )}
                      {pub.pdfUrl && (
                        <a 
                          href={pub.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group/link"
                        >
                          <FileText className="w-4 h-4 group-hover/link:animate-bounce-subtle" />
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          {publications.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4 animate-bounce-subtle">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg">No publications available yet.</p>
            </div>
          )}
        </section>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <section className="space-y-12">
          {/* Achievements */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 animate-pulse-glow">
                <Trophy className="w-5 h-5 text-white animate-bounce-subtle" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 hover:text-orange-600 transition-colors">Achievements & Awards</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((item, index) => (
                <article key={item.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500 animate-pulse-glow" />
                  
                  <div className="relative h-full bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 card-animated">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Trophy className="w-6 h-6 text-orange-500 group-hover:animate-wiggle" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-indigo-600 font-medium text-sm">{item.issuer}</p>
                        {item.year && (
                          <p className="text-sm text-slate-500 mt-1">{item.year}</p>
                        )}
                        {item.description && (
                          <p className="text-slate-600 text-sm mt-3">{item.description}</p>
                        )}
                        {item.externalLink && (
                          <a 
                            href={item.externalLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-orange-600 font-medium mt-3 hover:gap-3 transition-all duration-300 group/link"
                          >
                            <ExternalLink className="w-4 h-4 group-hover/link:animate-wiggle" />
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {achievements.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl animate-fade-in">
                <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-bounce-subtle" />
                <p className="text-slate-500">No achievements available yet.</p>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse-glow">
                <Award className="w-5 h-5 text-white animate-bounce-subtle" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">Certifications</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <article key={cert.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500 animate-pulse-glow" />
                  
                  <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 card-animated">
                    {cert.certificateImageUrl && (
                      <div className="h-40 overflow-hidden img-hover-shine">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          src={cert.certificateImageUrl} 
                          alt={cert.certificateTitle} 
                        />
                      </div>
                    )}
                    
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {cert.certificateTitle}
                      </h3>
                      <p className="text-indigo-600 text-sm font-medium">{cert.issuer}</p>
                      <p className="text-xs text-slate-500 mt-1">Issued: {cert.issueDate}</p>
                      {cert.expiryDate && (
                        <p className="text-xs text-slate-500">Expires: {cert.expiryDate}</p>
                      )}
                      {cert.credentialId && (
                        <p className="text-xs text-slate-400 mt-2 truncate">ID: {cert.credentialId}</p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                        {cert.certificateImageUrl && (
                          <button
                            onClick={() => handleViewCertificate(cert.certificateImageUrl)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                          >
                            <Eye className="w-3 h-3 group-hover/btn:animate-wiggle" />
                            View
                          </button>
                        )}
                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 hover:-translate-y-0.5 transition-all duration-300 group/link"
                          >
                            <ExternalLink className="w-3 h-3 group-hover/link:animate-bounce-subtle" />
                            Verify
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {certifications.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl animate-fade-in">
                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-bounce-subtle" />
                <p className="text-slate-500">No certifications available yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        imageUrl={certModalImage}
        onClose={() => setCertModalOpen(false)}
      />
    </div>
  );
}
