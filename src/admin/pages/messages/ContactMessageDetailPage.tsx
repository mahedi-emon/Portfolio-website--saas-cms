import { Link, useParams } from 'react-router-dom';
import { useCms } from '../../../hooks/useCms';
import type { CollectionItem } from '../../../context/CmsContext';

type MessageItem = CollectionItem & {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt?: string;
};

export function ContactMessageDetailPage() {
  const { id } = useParams();
  const { data } = useCms();

  const rows = (data.collections.contactMessages ?? []) as MessageItem[];
  const message = rows.find((row) => row.id === id);

  if (!message) {
    return (
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Message not found.</p>
        <Link className="mt-3 inline-block text-sm text-slate-600 underline" to="/admin/messages">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Message Detail</h1>
        <Link className="mt-2 inline-block text-sm text-slate-600 underline" to="/admin/messages">
          Back to messages
        </Link>
      </div>
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{JSON.stringify(message, null, 2)}</pre>
      </div>
    </div>
  );
}
