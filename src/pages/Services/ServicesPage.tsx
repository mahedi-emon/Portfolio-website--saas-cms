import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useCms } from '../../hooks/useCms';

const gradients = [
  'from-indigo-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-violet-500 to-fuchsia-500',
];

export function ServicesPage() {
  const { data } = useCms();
  const services = (data.collections.services ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
          <span className="text-sm font-medium text-indigo-600">What I Offer</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
          My <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Services</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
          Professional services tailored to bring your ideas to life with cutting-edge solutions and expert craftsmanship.
        </p>
      </section>

      {/* Services Grid */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article 
              key={service.id} 
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient blur background */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse-glow`} />
              
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 card-animated">
                {/* Icon */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Zap className="w-7 h-7 text-white group-hover:animate-bounce-subtle" />
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.summary}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-4 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4 animate-bounce-subtle">
              <Zap className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg">No services available yet.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative animate-fade-in overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl animate-bg-pan" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] rounded-3xl opacity-50" />
        
        {/* Floating decoration */}
        <div className="absolute top-4 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl floating" />
        <div className="absolute bottom-4 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl floating-delayed" />
        
        <div className="relative px-8 py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-slide-up">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 animate-fade-in">
            Let's work together to create something amazing. Get in touch and let's discuss your ideas.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 btn-animated group"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
