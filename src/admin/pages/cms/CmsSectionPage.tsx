import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { EntityForm } from '../../components/EntityForm';
import { sectionSchemas } from '../../cms/cmsSchemas';
import { useCms } from '../../../hooks/useCms';
import type { CollectionKey, CollectionItem, SingletonKey } from '../../../context/CmsContext';

export function CmsSectionPage() {
  const { sectionKey } = useParams();
  const { data, updateSingleton, createItem, updateItem, deleteItem } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);

  const schema = sectionKey ? sectionSchemas[sectionKey] : undefined;

  const tableColumns = useMemo(() => {
    if (!schema) return [];
    return schema.fields.map((field) => ({ key: field.name, header: field.label }));
  }, [schema]);

  if (!schema) {
    return (
      <div>
        <h1>Unknown section</h1>
        <p>Section not found.</p>
      </div>
    );
  }

  if (schema.kind === 'singleton') {
    const values = data.singletons[schema.key as SingletonKey] ?? {};
    return (
      <div>
        <h1>{schema.title}</h1>
        <EntityForm
          fields={schema.fields}
          initialValues={values}
          onSubmit={(nextValues) => updateSingleton(schema.key as SingletonKey, nextValues)}
        />
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    );
  }

  const collectionKey = schema.key as CollectionKey;
  const rows = data.collections[collectionKey] as CollectionItem[];
  const editingItem = rows.find((row) => row.id === editingId);

  return (
    <div>
      <h1>{schema.title}</h1>
      <EntityForm
        fields={schema.fields}
        initialValues={editingItem}
        submitLabel={editingId ? 'Update' : 'Create'}
        onSubmit={(values) => {
          if (editingId) {
            updateItem(collectionKey, editingId, values);
            setEditingId(null);
            return;
          }
          createItem(collectionKey, values);
        }}
        onCancel={editingId ? () => setEditingId(null) : undefined}
      />

      <DataTable
        columns={tableColumns}
        rows={rows}
        rowKey={(row) => row.id}
        onEdit={(row) => setEditingId(row.id)}
        onDelete={(row) => deleteItem(collectionKey, row.id)}
      />
    </div>
  );
}
