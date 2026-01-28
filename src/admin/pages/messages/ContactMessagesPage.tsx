import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { useCms } from '../../../hooks/useCms';
import type { CollectionItem } from '../../../context/CmsContext';

type MessageItem = CollectionItem & {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: 'new' | 'read' | 'archived';
  createdAt?: string;
  handledBy?: string;
  handledAt?: string;
};

export function ContactMessagesPage() {
  const { data, updateContactMessage, deleteContactMessage } = useCms();

  const rows = (data.collections.contactMessages ?? []) as MessageItem[];

  const columns = useMemo(
    () => [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'subject', header: 'Subject' },
      {
        key: 'status',
        header: 'Status',
        render: (row: MessageItem) => (
          <select
            className="rounded border border-slate-200 px-2 py-1 text-xs"
            value={row.status ?? 'new'}
            onChange={(event) => {
              const nextStatus = event.target.value as MessageItem['status'];
              updateContactMessage(row.id, {
                status: nextStatus,
                handledBy: nextStatus === 'new' ? '' : 'admin',
                handledAt: nextStatus === 'new' ? '' : new Date().toISOString(),
              });
            }}
          >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        ),
      },
      {
        key: 'id',
        header: 'Detail',
        render: (row: MessageItem) => (
          <Link className="text-slate-600 underline" to={`/admin/messages/${row.id}`}>
            View
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage inbound inquiries and updates.</p>
      </div>
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          onDelete={(row) => deleteContactMessage(row.id)}
        />
      </div>
    </div>
  );
}
