import { useCms } from '../../hooks/useCms';

export function BlogListPage() {
  const { data } = useCms();
  const blogs = (data.collections.blogs ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="space-y-4">
        {blogs.map((post) => (
          <article key={post.id} className="rounded border p-4">
            <div className="text-xs uppercase text-slate-500">{post.slug}</div>
            <h2 className="text-lg font-medium">{post.title}</h2>
            <p className="text-sm text-slate-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
