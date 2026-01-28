import { useState } from 'react';
import { CmsSectionEditor } from '../cms/CmsSectionEditor';

const tabs = ['projects', 'publications', 'achievements'] as const;

type TabKey = (typeof tabs)[number];

export function AdminPortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('projects');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Portfolio</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage projects, publications, and achievements.</p>
      </div>
      <div className="flex flex-wrap gap-2 rounded border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            className={`rounded px-3 py-1 text-sm ${
              activeTab === tab
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'projects' && <CmsSectionEditor sectionKey="projects" />}
        {activeTab === 'publications' && <CmsSectionEditor sectionKey="publications" />}
        {activeTab === 'achievements' && <CmsSectionEditor sectionKey="achievements" />}
      </div>
    </div>
  );
}
