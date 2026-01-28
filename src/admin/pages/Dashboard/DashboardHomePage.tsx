import { useCms } from '../../../hooks/useCms';

export function DashboardHomePage() {
  const { data } = useCms();

  const projectsCount = data.collections.projects?.length ?? 0;
  const blogsCount = data.collections.blogs?.length ?? 0;
  const skillsCount = data.collections.techStackCategories?.length ?? 0;
  const messagesCount = data.collections.contactMessages?.length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Overview of your CMS content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Projects', value: projectsCount },
          { label: 'Blogs', value: blogsCount },
          { label: 'Skill Categories', value: skillsCount },
          { label: 'Messages', value: messagesCount },
        ].map((card) => (
          <div key={card.label} className="rounded border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-400">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Collections</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Collection</th>
                <th className="px-4 py-3 font-semibold">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(data.collections).map(([key, items]) => (
                <tr key={key}>
                  <td className="px-4 py-3 text-slate-700">{key}</td>
                  <td className="px-4 py-3 text-slate-700">{items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
