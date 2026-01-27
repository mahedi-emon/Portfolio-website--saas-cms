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
      <div>
        <p>Message not found.</p>
        <Link to="/admin/messages">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Message Detail</h1>
      <pre>{JSON.stringify(message, null, 2)}</pre>
      <Link to="/admin/messages">Back</Link>
    </div>
  );
}
