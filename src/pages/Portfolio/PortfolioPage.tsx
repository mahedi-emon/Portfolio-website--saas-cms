import { useState } from 'react';
import { useCms } from '../../hooks/useCms';

const tabs = ['projects', 'publications', 'achievements'] as const;

type TabKey = (typeof tabs)[number];

export function PortfolioPage() {
  const { data } = useCms();
  const [activeTab, setActiveTab] = useState<TabKey>('projects');

  const projects = data.collections.projects ?? [];
  const publications = data.collections.publications ?? [];
  const achievements = data.collections.achievements ?? [];
  const certifications = data.collections.certifications ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Portfolio</h1>
      <div className="flex gap-3 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'font-semibold underline' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'projects' && (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="rounded border p-4">
              {project.coverImageUrl && (
                <img className="mb-3 w-full rounded border" src={project.coverImageUrl} alt={project.title} />
              )}
              <h2 className="text-lg font-medium">{project.title}</h2>
              <p className="text-sm text-slate-600">{project.summary}</p>
              <div className="mt-2 flex gap-3 text-sm">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {activeTab === 'publications' && (
        <div className="space-y-4">
          {publications.map((pub) => (
            <article key={pub.id} className="rounded border p-4">
              {pub.coverImageUrl && (
                <img className="mb-3 w-full rounded border" src={pub.coverImageUrl} alt={pub.title} />
              )}
              <h2 className="text-lg font-medium">{pub.title}</h2>
              <p className="text-sm text-slate-600">{pub.venue}</p>
              <p className="text-sm text-slate-500">{pub.year}</p>
              <p className="text-sm text-slate-600">{pub.abstract}</p>
              {Array.isArray(pub.authors) && pub.authors.length > 0 && (
                <p className="text-sm text-slate-600">{pub.authors.join(', ')}</p>
              )}
              <div className="mt-2 flex gap-3 text-sm">
                {pub.paperUrl && (
                  <a href={pub.paperUrl} target="_blank" rel="noreferrer">
                    Paper
                  </a>
                )}
                {pub.pdfUrl && (
                  <a href={pub.pdfUrl} target="_blank" rel="noreferrer">
                    PDF
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="space-y-4">
            {achievements.map((item) => (
              <article key={item.id} className="rounded border p-4">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-sm text-slate-600">{item.issuer}</p>
                <p className="text-sm text-slate-500">{item.year}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
                {item.externalLink && (
                  <a className="text-sm" href={item.externalLink} target="_blank" rel="noreferrer">
                    External Link
                  </a>
                )}
              </article>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold">Certifications</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <article key={cert.id} className="rounded border p-4">
                {cert.certificateImageUrl && (
                  <img className="mb-3 w-full rounded border" src={cert.certificateImageUrl} alt={cert.certificateTitle} />
                )}
                <h3 className="text-lg font-medium">{cert.certificateTitle}</h3>
                <p className="text-sm text-slate-600">{cert.issuer}</p>
                <p className="text-sm text-slate-500">Issued: {cert.issueDate}</p>
                {cert.expiryDate && <p className="text-sm text-slate-500">Expires: {cert.expiryDate}</p>}
                {cert.credentialId && <p className="text-sm text-slate-600">Credential ID: {cert.credentialId}</p>}
                <div className="mt-2 flex gap-3 text-sm">
                  {cert.certificateFileUrl && (
                    <a href={cert.certificateFileUrl} target="_blank" rel="noreferrer">
                      Download PDF
                    </a>
                  )}
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                      Credential Link
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
