import { useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { EntityForm } from '../../components/EntityForm';
import { useCms } from '../../../hooks/useCms';
import type { CollectionItem } from '../../../context/CmsContext';

type ResumeItem = CollectionItem & {
  title?: string;
  fileUrl?: string;
  uploadedAt?: string;
  status?: 'active' | 'inactive';
};

const formFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'fileUrl', label: 'File URL', type: 'url', required: true },
  { name: 'uploadedAt', label: 'Uploaded At', type: 'date' },
] as const;

export function ResumeLibraryPage() {
  const { data, createItem, updateItem, deleteItem, setActiveResume } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);

  const resumes = (data.collections.resumes ?? []) as ResumeItem[];
  const settings = data.singletons.resumeSettings ?? {};
  const activeResumeId = settings.activeResumeId as string | undefined;
  const editingItem = resumes.find((item) => item.id === editingId);

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'uploadedAt', header: 'Uploaded' },
    {
      key: 'status',
      header: 'Status',
      render: (row: ResumeItem) => (
        <span className={row.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}>
          {row.status ?? 'inactive'}
        </span>
      ),
    },
    {
      key: 'fileUrl',
      header: 'Preview',
      render: (row: ResumeItem) =>
        row.fileUrl ? (
          <a className="text-slate-600 underline" href={row.fileUrl} target="_blank" rel="noreferrer">
            Preview
          </a>
        ) : (
          '—'
        ),
    },
    {
      key: 'download',
      header: 'Download',
      render: (row: ResumeItem) =>
        row.fileUrl ? (
          <a className="text-slate-600 underline" href={row.fileUrl} target="_blank" rel="noreferrer">
            Download
          </a>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Resume Library</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage resume files and set the active resume for the public site.</p>
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Add or Edit Resume</h2>
        <div className="mt-4">
          <EntityForm
            fields={[...formFields]}
            initialValues={editingItem}
            submitLabel={editingId ? 'Update Resume' : 'Add Resume'}
            onSubmit={(values) => {
              const payload = {
                ...values,
                status: editingItem?.status ?? 'inactive',
                uploadedAt: String(values.uploadedAt ?? new Date().toISOString().slice(0, 10)),
              };
              if (editingId) {
                updateItem('resumes', editingId, payload);
                setEditingId(null);
                return;
              }
              createItem('resumes', payload);
            }}
            onCancel={editingId ? () => setEditingId(null) : undefined}
          />
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Resume List</h2>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Active Resume</span>
            <select
              className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={activeResumeId ?? ''}
              onChange={(event) => {
                if (!event.target.value) return;
                setActiveResume(event.target.value);
              }}
            >
              <option value="" disabled>
                Select resume
              </option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title ?? resume.id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={resumes}
          rowKey={(row) => row.id}
          onEdit={(row) => setEditingId(row.id)}
          onDelete={(row) => {
            deleteItem('resumes', row.id);
          }}
        />
      </div>
    </div>
  );
}
