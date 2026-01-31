import { NavLink } from 'react-router-dom';
import { 
  FolderKanban, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  BarChart3,
  Users,
  Eye
} from 'lucide-react';
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

  const statCards = [
    { 
      label: 'Projects', 
      value: projectsCount, 
      icon: FolderKanban, 
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      href: '/admin/cms/projects'
    },
    { 
      label: 'Blog Posts', 
      value: blogsCount, 
      icon: FileText, 
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-50',
      href: '/admin/cms/blogs'
    },
    { 
      label: 'Tech Stack', 
      value: skillsCount, 
      icon: Sparkles, 
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      href: '/admin/cms/skills'
    },
    { 
      label: 'Messages', 
      value: messagesCount, 
      icon: MessageSquare, 
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      href: '/admin/messages'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <NavLink 
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
        >
          <Eye className="w-4 h-4" />
          View Site
          <ArrowUpRight className="w-4 h-4" />
        </NavLink>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <NavLink 
            key={card.label} 
            to={card.href}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgGradient} p-6 border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
                <p className="mt-2 text-4xl font-bold text-slate-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>View all</span>
            </div>
            {/* Decorative */}
            <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
          </NavLink>
        ))}
      </div>

      {/* Status & Quick Actions Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Published */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Published</p>
              <p className="text-2xl font-bold text-slate-900">{statusCounts.published}</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(statusCounts.published / (statusCounts.published + statusCounts.draft || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Draft */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Drafts</p>
              <p className="text-2xl font-bold text-slate-900">{statusCounts.draft}</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${(statusCounts.draft / (statusCounts.published + statusCounts.draft || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <NavLink 
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors" 
              to="/admin/cms/projects"
            >
              <Plus className="w-4 h-4" /> New Project
            </NavLink>
            <NavLink 
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors" 
              to="/admin/cms/blogs"
            >
              <Plus className="w-4 h-4" /> New Blog
            </NavLink>
          </div>
        </div>
      </div>

      {/* Activity & Collections Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Clock className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p>No recent edits yet</p>
              </div>
            )}
            {recentActivity.map((activity, index) => (
              <div 
                key={`${activity.collection}-${activity.id}`} 
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{activity.label}</p>
                  <p className="text-xs text-slate-500 capitalize">{activity.collection.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections Overview */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Collections Overview</h2>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(data.collections).slice(0, 8).map(([key, items], index) => (
              <div 
                key={key} 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      backgroundColor: `hsl(${(index * 40) % 360}, 70%, 50%)` 
                    }}
                  />
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                  {items.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
