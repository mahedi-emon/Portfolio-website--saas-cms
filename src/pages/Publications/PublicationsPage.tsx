import { useCms } from '../../hooks/useCms';

export function PublicationsPage() {
  const { data } = useCms();
  const publications = (data.collections.publications ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Publications</h1>
      <div className="space-y-4">
        {publications.map((pub) => (
          <article key={pub.id} className="rounded border p-4">
            <h2 className="text-lg font-medium">{pub.title}</h2>
            <p className="text-sm text-slate-600">{pub.publisher}</p>
            <p className="text-sm text-slate-500">{pub.publishedDate}</p>
            {Array.isArray(pub.authors) && pub.authors.length > 0 && (
              <p className="text-sm text-slate-600">{pub.authors.join(', ')}</p>
            )}
            <div className="text-sm text-slate-600">
              {pub.doi && <span>DOI: {pub.doi}</span>}
            </div>
            {pub.pdfUrl && (
              <a className="text-sm text-blue-600" href={pub.pdfUrl} target="_blank" rel="noreferrer">
                View PDF
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
