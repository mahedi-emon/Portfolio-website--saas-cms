import { useParams } from 'react-router-dom';
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
      <div className="rounded border p-4">
        <h1 className="text-2xl font-semibold">Blog post not found</h1>
        <p className="mt-2 text-sm text-slate-600">We couldn’t find the post you’re looking for.</p>
      </div>
    );
  }

  return (
    <article className="space-y-4">
      <header className="space-y-1">
        <div className="text-xs uppercase text-slate-500">{post.slug}</div>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
      </header>
      {post.excerpt && <p className="text-slate-600">{post.excerpt}</p>}
    </article>
  );
}
