import { User, GraduationCap, Briefcase, Award, Code2, Sparkles, MapPin, Mail } from 'lucide-react';
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
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Profile Card */}
          <div className="lg:sticky lg:top-24 animate-slide-up">
            <div className="relative group card-3d">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500 animate-pulse-glow" />
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 card-animated">
                {about.profileImageUrl ? (
                  <div className="relative overflow-hidden rounded-2xl img-hover-shine">
                    <img 
                      className="w-full aspect-square rounded-2xl object-cover border-4 border-white shadow-lg transition-transform duration-700 group-hover:scale-105" 
                      src={about.profileImageUrl} 
                      alt="Profile" 
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-bg-pan">
                    <User className="w-24 h-24 text-indigo-300 animate-bounce-subtle" />
                  </div>
                )}
                
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">{about.fullName ?? 'Your Name'}</h2>
                  <p className="text-indigo-600 font-medium text-shimmer">{about.currentRole ?? 'Your Role'}</p>
                </div>

                {about.researchInterest && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-center hover:bg-indigo-50 transition-colors duration-300">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Research Focus</p>
                    <p className="text-sm text-slate-700">{about.researchInterest}</p>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {data.singletons.contact?.contactInfo?.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors group/item">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover/item:text-indigo-500 group-hover/item:animate-bounce-subtle transition-colors" />
                      {data.singletons.contact.contactInfo.location}
                    </div>
                  )}
                  {data.singletons.contact?.contactInfo?.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors group/item">
                      <Mail className="w-4 h-4 text-slate-400 group-hover/item:text-indigo-500 group-hover/item:animate-wiggle transition-colors" />
                      {data.singletons.contact.contactInfo.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-16">
            {/* About Header */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
                <span className="text-sm font-medium text-indigo-600">About Me</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {about.title ?? 'Hello, I\'m'} <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">{about.fullName ?? 'Your Name'}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl animate-slide-up">
                {about.bio ?? 'Your bio goes here...'}
              </p>
              
              {Array.isArray(about.highlights) && about.highlights.length > 0 && (
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {about.highlights.map((item: string, index: number) => (
                    <div 
                      key={item} 
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 card-animated"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold animate-pulse-glow">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse-glow">
                    <Code2 className="w-5 h-5 text-white animate-bounce-subtle" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">Core Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span 
                      key={skill.id} 
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-sm hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill.name}
                      {skill.level && (
                        <span className="ml-2 text-indigo-600">· {skill.level}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 animate-pulse-glow">
                    <GraduationCap className="w-5 h-5 text-white animate-bounce-subtle" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 hover:text-emerald-600 transition-colors">Education</h2>
                </div>
                <div className="space-y-4">
                  {education.map((item, index) => (
                    <article 
                      key={item.id} 
                      className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 card-animated"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                            {item.institution}
                          </h3>
                          <p className="text-indigo-600 font-medium">{item.degree}</p>
                          <p className="text-slate-600">{item.field}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-600 whitespace-nowrap">
                          {item.endDate}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 animate-pulse-glow">
                    <Briefcase className="w-5 h-5 text-white animate-bounce-subtle" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 hover:text-orange-600 transition-colors">Experience</h2>
                </div>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-amber-200 to-transparent animate-pulse-glow" />
                  
                  <div className="space-y-6">
                    {experience.slice(0, 5).map((item, index) => (
                      <article 
                        key={item.id} 
                        className="relative pl-12 animate-slide-in-left"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-orange-200 shadow-sm group-hover:border-orange-400 transition-colors animate-pulse-glow">
                          <span className="text-sm font-bold text-orange-500">{index + 1}</span>
                        </div>
                        
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 card-animated">
                          <h3 className="text-lg font-semibold text-slate-800 hover:text-orange-600 transition-colors">{item.role}</h3>
                          <p className="text-indigo-600 font-medium">{item.company}</p>
                          <p className="text-sm text-slate-500 mt-1">{item.startDate} – {item.endDate ?? 'Present'}</p>
                          {item.description && (
                            <p className="text-slate-600 mt-3">{item.description}</p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {certifications.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse-glow">
                    <Award className="w-5 h-5 text-white animate-bounce-subtle" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">Certifications</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.map((item, index) => (
                    <article 
                      key={item.id} 
                      className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 card-animated"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {item.certificateTitle}
                      </h3>
                      <p className="text-sm text-indigo-600 font-medium">{item.issuer}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.issueDate}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
