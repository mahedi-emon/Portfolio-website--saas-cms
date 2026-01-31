import { BookOpen, Sparkles, FileText, ExternalLink, Users } from 'lucide-react';
import { useCms } from '../../hooks/useCms';

export function PublicationsPage() {
  const { data } = useCms();
  const publications = (data.collections.publications ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-300 to-emerald-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <BookOpen className="w-4 h-4 text-emerald-500 animate-bounce-subtle" />
          <span className="text-sm font-medium text-emerald-600">Research & Papers</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
          My <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Publications</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
          A collection of my research papers, articles, and academic contributions.
        </p>
      </section>

      {/* Publications List */}
      <section className="space-y-6">
        {publications.map((pub, index) => (
          <article key={pub.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500 animate-pulse-glow" />
            
            <div className="relative bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 card-animated">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Publication Number */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                </div>
                
                <div className="flex-1 space-y-3">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {pub.title}
                  </h2>
                  
                  {/* Authors */}
                  {Array.isArray(pub.authors) && pub.authors.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4 text-slate-400 group-hover:animate-wiggle" />
                      <span>{pub.authors.join(', ')}</span>
                    </div>
                  )}
                  
                  {/* Publisher & Date */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {pub.publisher && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium group-hover:bg-emerald-100 transition-colors">
                        <Sparkles className="w-3 h-3 group-hover:animate-spin-slow" />
                        {pub.publisher}
                      </span>
                    )}
                    {pub.publishedDate && (
                      <span className="text-slate-500">{pub.publishedDate}</span>
                    )}
                  </div>
                  
                  {/* DOI */}
                  {pub.doi && (
                    <p className="text-sm text-slate-500">
                      <span className="font-medium">DOI:</span> {pub.doi}
                    </p>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    {pub.pdfUrl && (
                      <a 
                        href={pub.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group/link"
                      >
                        <FileText className="w-4 h-4 group-hover/link:animate-bounce-subtle" />
                        View PDF
                      </a>
                    )}
                    {pub.externalUrl && (
                      <a 
                        href={pub.externalUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:animate-wiggle" />
                        View Source
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
    </div>
  );
}
