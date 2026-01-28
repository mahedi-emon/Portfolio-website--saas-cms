import { useState } from 'react';
import { CmsSectionEditor } from '../cms/CmsSectionEditor';

const tabs = ['projects', 'publications', 'achievements'] as const;

type TabKey = (typeof tabs)[number];

export function AdminPortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('projects');

  return (
    <div>
      <h1>Portfolio</h1>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
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
