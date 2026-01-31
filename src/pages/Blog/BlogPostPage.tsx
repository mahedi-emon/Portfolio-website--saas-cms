import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, Tag, User } from 'lucide-react';
import { useCms } from '../../hooks/useCms';

export function BlogPostPage() {
  const { slug } = useParams();
  const { data } = useCms();

  const post = (data.collections.blogs ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
    .find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6 animate-bounce-subtle">
            <BookOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Blog post not found</h1>
          <p className="text-slate-600 mb-6">We couldn't find the post you're looking for.</p>
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-animated group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto pb-16">
      <Link 
        to="/blog"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 hover:-translate-x-1 transition-all duration-300 mb-8 animate-fade-in group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:animate-wiggle" />
        Back to Blog
      </Link>

      <header className="relative mb-12 animate-slide-up">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
        </div>

        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string, index: number) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight hover:text-emerald-600 transition-colors">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-slate-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {post.author && (
            <span className="inline-flex items-center gap-2 hover:text-emerald-600 transition-colors group">
              <User className="w-5 h-5 group-hover:animate-bounce-subtle" />
              {post.author}
            </span>
          )}
          {post.publishedDate && (
            <span className="inline-flex items-center gap-2 hover:text-emerald-600 transition-colors group">
              <Calendar className="w-5 h-5 group-hover:animate-wiggle" />
              {post.publishedDate}
            </span>
          )}
          {post.readTime && (
            <span className="inline-flex items-center gap-2 hover:text-emerald-600 transition-colors group">
              <Clock className="w-5 h-5 group-hover:animate-spin-slow" />
              {post.readTime} min read
            </span>
          )}
        </div>
      </header>

      {post.coverImageUrl && (
        <div className="relative group mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500 animate-pulse-glow" />
          <div className="relative overflow-hidden rounded-2xl img-hover-shine">
            <img 
              className="relative w-full rounded-2xl shadow-xl border border-slate-100 group-hover:scale-[1.02] transition-transform duration-700" 
              src={post.coverImageUrl} 
              alt={post.title} 
            />
          </div>
        </div>
      )}

      <div className="prose prose-lg prose-slate max-w-none animate-fade-in" style={{ animationDelay: '400ms' }}>
        {post.excerpt && (
          <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-emerald-500 pl-6 mb-8 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 rounded-r-lg">
            {post.excerpt}
          </p>
        )}
        
        {post.content && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 card-animated">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        )}
      </div>
    </article>
  );
}
