import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { EntityForm } from '../../components/EntityForm';
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

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'subject', label: 'Subject' },
  { name: 'message', label: 'Message', type: 'textarea' },
  { name: 'status', label: 'Status' },
  { name: 'createdAt', label: 'Created At' },
] as const;

export function ContactMessagesPage() {
  const { data, createItem, updateItem, deleteItem } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);

  const rows = (data.collections.contactMessages ?? []) as MessageItem[];
  const editingItem = rows.find((row) => row.id === editingId);

  const columns = useMemo(
    () => [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'subject', header: 'Subject' },
      { key: 'status', header: 'Status' },
      {
        key: 'id',
        header: 'Detail',
        render: (row: MessageItem) => <Link to={`/admin/messages/${row.id}`}>View</Link>,
      },
    ],
    []
  );

  return (
    <div>
      <h1>Contact Messages</h1>
      <EntityForm
        fields={[...fields]}
        initialValues={editingItem}
        submitLabel={editingId ? 'Update' : 'Create'}
        onSubmit={(values) => {
          if (editingId) {
            updateItem('contactMessages', editingId, values);
            setEditingId(null);
            return;
          }
          createItem('contactMessages', values);
        }}
        onCancel={editingId ? () => setEditingId(null) : undefined}
      />

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        onEdit={(row) => setEditingId(row.id)}
        onDelete={(row) => deleteItem('contactMessages', row.id)}
      />
    </div>
  );
}
