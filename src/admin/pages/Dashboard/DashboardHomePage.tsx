import { NavLink } from 'react-router-dom';
import { useCms } from '../../../hooks/useCms';

export function DashboardHomePage() {
  const { data } = useCms();

  const projectsCount = data.collections.projects?.length ?? 0;
  const blogsCount = data.collections.blogs?.length ?? 0;
  const skillsCount = data.collections.techStackCategories?.length ?? 0;
  const messagesCount = data.collections.contactMessages?.length ?? 0;

  const statusCounts = Object.values(data.collections).reduce(
    (acc, items) => {
      items.forEach((item) => {
        const status = (item as Record<string, unknown>).status;
        if (status === 'draft') acc.draft += 1;
        if (status === 'published') acc.published += 1;
      });
      return acc;
    },
    { draft: 0, published: 0 }
  );

  const recentActivity = Object.entries(data.collections)
    .flatMap(([collection, items]) =>
      items.map((item) => {
        const record = item as Record<string, unknown>;
        const label = String(
          record.title ??
            record.name ??
            record.subject ??
            record.slug ??
            record.company ??
            record.role ??
            record.institution ??
            record.categoryName ??
            record.certificateTitle ??
            record.issuer ??
            record.id
        );
        const timestamp = new Date(String(record.updatedAt ?? record.createdAt ?? 0)).getTime() || 0;
        return { id: String(record.id ?? label), label, collection, timestamp };
      })
    )
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Overview of your CMS content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Projects', value: projectsCount },
          { label: 'Blogs', value: blogsCount },
          { label: 'Skill Categories', value: skillsCount },
          { label: 'Messages', value: messagesCount },
        ].map((card) => (
            <div key={card.label} className="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs uppercase tracking-wide text-slate-400">{card.label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">Draft Items</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{statusCounts.draft}</div>
        </div>
        <div className="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">Published Items</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{statusCounts.published}</div>
        </div>
        <div className="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">Quick Actions</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <NavLink className="rounded border border-slate-200 px-3 py-1 text-sm dark:border-slate-700" to="/admin/cms/projects">
              Add Project
            </NavLink>
            <NavLink className="rounded border border-slate-200 px-3 py-1 text-sm dark:border-slate-700" to="/admin/cms/blogs">
              Add Blog
            </NavLink>
            <NavLink className="rounded border border-slate-200 px-3 py-1 text-sm dark:border-slate-700" to="/admin/cms/resume">
              Upload Resume
            </NavLink>
          </div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          {recentActivity.length === 0 && <div className="text-sm text-slate-600 dark:text-slate-400">No recent edits.</div>}
          {recentActivity.map((activity) => (
            <div key={`${activity.collection}-${activity.id}`} className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-100">{activity.label}</div>
                <div className="text-xs text-slate-500">{activity.collection}</div>
              </div>
              <div className="text-xs text-slate-400">
                {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Collections</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Collection</th>
                <th className="px-4 py-3 font-semibold">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {Object.entries(data.collections).map(([key, items]) => (
                <tr key={key}>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{key}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
