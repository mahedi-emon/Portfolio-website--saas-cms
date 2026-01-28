import { Link, useNavigate, useParams } from 'react-router-dom';
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

export function ContactMessageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, updateContactMessage, deleteContactMessage } = useCms();

  const rows = (data.collections.contactMessages ?? []) as MessageItem[];
  const message = rows.find((row) => row.id === id);

  if (!message) {
    return (
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">Message not found.</p>
        <Link className="mt-3 inline-block text-sm text-slate-600 underline dark:text-slate-300" to="/admin/messages">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Message Detail</h1>
        <Link className="mt-2 inline-block text-sm text-slate-600 underline dark:text-slate-300" to="/admin/messages">
          Back to messages
        </Link>
      </div>
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase text-slate-400">Name</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.name}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Email</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.email}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Subject</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.subject}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Created</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.createdAt}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Status</div>
            <select
              className="mt-1 rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={message.status ?? 'new'}
              onChange={(event) => {
                const nextStatus = event.target.value as MessageItem['status'];
                updateContactMessage(message.id, {
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
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Handled By</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.handledBy || '—'}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Handled At</div>
            <div className="text-sm text-slate-800 dark:text-slate-100">{message.handledAt || '—'}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs uppercase text-slate-400">Message</div>
          <div className="mt-1 rounded border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {message.message}
          </div>
        </div>
        <button
          className="mt-4 rounded border border-red-200 px-3 py-1 text-xs text-red-600 dark:border-red-900/60 dark:text-red-400"
          onClick={() => {
            deleteContactMessage(message.id);
            navigate('/admin/messages');
          }}
        >
          Delete message
        </button>
      </div>
    </div>
  );
}
