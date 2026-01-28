import { useMemo, useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { EntityForm } from '../../components/EntityForm';
import { sectionSchemas } from '../../cms/cmsSchemas';
import { useCms } from '../../../hooks/useCms';
import type { CollectionItem, CollectionKey, SingletonKey } from '../../../context/CmsContext';

export function CmsSectionEditor({ sectionKey }: { sectionKey: string }) {
  const { data, updateSingleton, createItem, updateItem, deleteItem, replaceCollection } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTool, setEditingTool] = useState<{ categoryId: string; toolId: string } | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragTool, setDragTool] = useState<{ categoryId: string; toolId: string } | null>(null);

  const schema = sectionSchemas[sectionKey];

  const tableColumns = useMemo(() => {
    if (!schema) return [];
    return schema.fields.map((field) => ({ key: field.name, header: field.label }));
  }, [schema]);

  const reorderItems = <T extends { id: string }>(items: T[], fromId: string, toId: string) => {
    const fromIndex = items.findIndex((item) => item.id === fromId);
    const toIndex = items.findIndex((item) => item.id === toId);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return items;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
  };

  const moveItem = <T extends { id: string }>(items: T[], id: string, direction: 'up' | 'down') => {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return items;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return items;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    return next;
  };

  const applyOrderIndex = <T extends { id: string }>(items: T[]) =>
    items.map((item, index) => ({ ...item, orderIndex: index + 1 }));

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const withAutoSlug = (values: Record<string, unknown>) => {
    const hasSlugField = schema?.fields.some((field) => field.name === 'slug');
    if (!hasSlugField) return values;
    const slug = String(values.slug ?? '').trim();
    if (slug) return values;
    const title = String(values.title ?? '').trim();
    if (!title) return values;
    return { ...values, slug: slugify(title) };
  };

  if (!schema) {
    return (
      <div className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-lg font-semibold text-slate-900">Unknown section</h1>
        <p className="mt-2 text-sm text-slate-600">Section not found.</p>
      </div>
    );
  }

  if (schema.kind === 'singleton') {
    const values = data.singletons[schema.key as SingletonKey] ?? {};
    if (schema.key === 'contact') {
      const contactInfoFields = schema.fields.filter((field) =>
        ['pageIntroText', 'contactInfo.email', 'contactInfo.phone', 'contactInfo.location'].includes(field.name)
      );
      const socialLinksFields = schema.fields.filter((field) => field.type === 'socialLinks');
      const hireMeFields = schema.fields.filter((field) => field.name === 'hireMeLabel');

      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{schema.title}</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage {schema.title.toLowerCase()} content.</p>
          </div>

          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">Contact Details</h2>
            <div className="mt-4">
              <EntityForm
                fields={contactInfoFields}
                initialValues={values}
                submitLabel="Save Contact Info"
                onSubmit={(nextValues) => updateSingleton(schema.key as SingletonKey, nextValues)}
              />
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">Social Links</h2>
            <div className="mt-4">
              <EntityForm
                fields={socialLinksFields}
                initialValues={values}
                submitLabel="Save Social Links"
                onSubmit={(nextValues) => updateSingleton(schema.key as SingletonKey, nextValues)}
              />
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">Hire Me CTA</h2>
            <div className="mt-4">
              <EntityForm
                fields={hireMeFields}
                initialValues={values}
                submitLabel="Save Hire Me Label"
                onSubmit={(nextValues) => updateSingleton(schema.key as SingletonKey, nextValues)}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{schema.title}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage {schema.title.toLowerCase()} content.</p>
        </div>
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <EntityForm
            fields={schema.fields}
            initialValues={values}
            onSubmit={(nextValues) => updateSingleton(schema.key as SingletonKey, nextValues)}
          />
        </div>
      </div>
    );
  }

  const collectionKey = schema.key as CollectionKey;
  const rows = data.collections[collectionKey] as CollectionItem[];
  const editingItem = rows.find((row) => row.id === editingId);

  const isTechStack = schema.key === 'techStackCategories';
  const isAchievements = schema.key === 'achievements';
  const reorderCollections = new Set(['projects', 'blogs']);
  const isReorderList = isAchievements || reorderCollections.has(schema.key);

  const toolFormFields = [
    { name: 'name', label: 'Tool Name', required: true },
    { name: 'logoUrl', label: 'Logo URL' },
    { name: 'proficiencyLevel', label: 'Proficiency (0-100)', type: 'number' },
  ] as const;

  return (
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{schema.title}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage {schema.title.toLowerCase()} entries.</p>
      </div>

      {!isTechStack && (
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <EntityForm
            fields={schema.fields}
            initialValues={editingItem}
            submitLabel={editingId ? 'Update' : 'Create'}
            onSubmit={(values) => {
              const nextValues = withAutoSlug(values);
              if (editingId) {
                updateItem(collectionKey, editingId, nextValues);
                setEditingId(null);
                return;
              }
              createItem(collectionKey, nextValues);
            }}
            onCancel={editingId ? () => setEditingId(null) : undefined}
          />
        </div>
      )}

      {!isTechStack && !isReorderList && (
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <DataTable
            columns={tableColumns}
            rows={rows}
            rowKey={(row) => row.id}
            onEdit={(row) => setEditingId(row.id)}
            onDelete={(row) => deleteItem(collectionKey, row.id)}
          />
        </div>
      )}

      {isReorderList && !isTechStack && (
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ul role="list" className="space-y-3">
            {rows.map((item) => (
              <li
                key={item.id}
                role="listitem"
                className="flex items-center justify-between rounded border border-slate-100 px-4 py-3 dark:border-slate-800"
                draggable
                onDragStart={(event) => {
                  setDragId(item.id);
                  event.dataTransfer.setData('text/plain', item.id);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const fromId = dragId ?? event.dataTransfer.getData('text/plain');
                  if (!fromId || fromId === item.id) return;
                  const reordered = applyOrderIndex(reorderItems(rows, fromId, item.id));
                  replaceCollection(collectionKey, reordered as CollectionItem[]);
                  setDragId(null);
                }}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="cursor-grab text-slate-400"
                    aria-label={`Reorder ${schema.title} item`}
                    aria-grabbed={dragId === item.id}
                    draggable
                    onDragStart={(event) => {
                      event.stopPropagation();
                      setDragId(item.id);
                      event.dataTransfer.setData('text/plain', item.id);
                    }}
                  >
                    ⠿
                  </button>
                  <strong className="text-sm text-slate-800 dark:text-slate-100">{String(item.title ?? item.slug ?? item.id)}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                    aria-label="Move item up"
                    onClick={() =>
                      replaceCollection(collectionKey, applyOrderIndex(moveItem(rows, item.id, 'up')) as CollectionItem[])
                    }
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                    aria-label="Move item down"
                    onClick={() =>
                      replaceCollection(collectionKey, applyOrderIndex(moveItem(rows, item.id, 'down')) as CollectionItem[])
                    }
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                    onClick={() => setEditingId(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-200 px-3 py-1 text-xs text-red-600 dark:border-red-900/60 dark:text-red-400"
                    onClick={() => deleteItem(collectionKey, item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isTechStack && (
        <div className="space-y-6">
          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create Category</h2>
            <div className="mt-4">
              <EntityForm
                fields={schema.fields}
                submitLabel="Create Category"
                onSubmit={(values) => createItem(collectionKey, values)}
              />
            </div>
          </div>

          <ul role="list" className="space-y-4">
            {rows.map((category) => {
              const toolRows = (category.tools ?? []) as Array<{
                id: string;
                name: string;
                logoUrl: string;
                proficiencyLevel: number;
              }>;
              const editingToolId = editingTool?.categoryId === category.id ? editingTool.toolId : null;
              const editingToolRow = editingToolId ? toolRows.find((tool) => tool.id === editingToolId) : undefined;

              return (
                <li key={category.id} role="listitem" className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <details
                    open
                    draggable
                    onDragStart={(event) => {
                      setDragId(category.id);
                      event.dataTransfer.setData('text/plain', category.id);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const fromId = dragId ?? event.dataTransfer.getData('text/plain');
                      if (!fromId || fromId === category.id) return;
                      const reordered = applyOrderIndex(reorderItems(rows, fromId, category.id));
                      replaceCollection(collectionKey, reordered as CollectionItem[]);
                      setDragId(null);
                    }}
                  >
                    <summary className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="cursor-grab text-slate-400"
                          aria-label={`Reorder category ${category.categoryName}`}
                          aria-grabbed={dragId === category.id}
                          draggable
                          onDragStart={(event) => {
                            event.stopPropagation();
                            setDragId(category.id);
                            event.dataTransfer.setData('text/plain', category.id);
                          }}
                        >
                          ⠿
                        </button>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{String(category.categoryName)}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{toolRows.length} tools</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                          aria-label="Move category up"
                          onClick={() =>
                            replaceCollection(
                              collectionKey,
                              applyOrderIndex(moveItem(rows, category.id, 'up')) as CollectionItem[]
                            )
                          }
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                          aria-label="Move category down"
                          onClick={() =>
                            replaceCollection(
                              collectionKey,
                              applyOrderIndex(moveItem(rows, category.id, 'down')) as CollectionItem[]
                            )
                          }
                        >
                          ↓
                        </button>
                      </div>
                    </summary>
                    <div className="mt-4 space-y-4">
                      <div className="rounded border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <EntityForm
                          fields={schema.fields}
                          initialValues={category}
                          submitLabel="Update Category"
                          onSubmit={(values) =>
                            updateItem(collectionKey, category.id, {
                              ...category,
                              ...values,
                            })
                          }
                        />
                        <div className="mt-3">
                          <button
                            type="button"
                            className="rounded border border-red-200 px-3 py-1 text-xs text-red-600 dark:border-red-900/60 dark:text-red-400"
                            onClick={() => deleteItem(collectionKey, category.id)}
                          >
                            Delete Category
                          </button>
                        </div>
                      </div>

                      <div className="rounded border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tools</h3>
                        <div className="mt-3">
                          <EntityForm
                            fields={[...toolFormFields]}
                            initialValues={editingToolRow}
                            submitLabel={editingToolId ? 'Update Tool' : 'Add Tool'}
                            onSubmit={(values) => {
                              const nextTools = editingToolId
                                ? toolRows.map((tool) =>
                                    tool.id === editingToolId
                                      ? {
                                          ...tool,
                                          ...values,
                                          proficiencyLevel: Number(values.proficiencyLevel ?? tool.proficiencyLevel ?? 0),
                                        }
                                      : tool
                                  )
                                : [
                                    ...toolRows,
                                    {
                                      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                                      name: String(values.name ?? ''),
                                      logoUrl: String(values.logoUrl ?? ''),
                                      proficiencyLevel: Number(values.proficiencyLevel ?? 0),
                                    },
                                  ];

                              updateItem(collectionKey, category.id, {
                                ...category,
                                tools: nextTools,
                              });
                              setEditingTool(null);
                            }}
                            onCancel={editingToolId ? () => setEditingTool(null) : undefined}
                          />
                        </div>

                        <ul role="list" className="mt-4 space-y-2">
                          {toolRows.map((tool) => (
                            <li
                              key={tool.id}
                              role="listitem"
                              className="flex items-center justify-between rounded border border-slate-100 px-3 py-2 dark:border-slate-800"
                              draggable
                              onDragStart={(event) => {
                                setDragTool({ categoryId: category.id, toolId: tool.id });
                                event.dataTransfer.setData('text/plain', tool.id);
                              }}
                              onDragOver={(event) => event.preventDefault()}
                              onDrop={(event) => {
                                event.preventDefault();
                                const from = dragTool?.categoryId === category.id ? dragTool : null;
                                const fromId = from?.toolId ?? event.dataTransfer.getData('text/plain');
                                if (!fromId || fromId === tool.id) return;
                                const reorderedTools = reorderItems(toolRows, fromId, tool.id);
                                updateItem(collectionKey, category.id, {
                                  ...category,
                                  tools: reorderedTools,
                                });
                                setDragTool(null);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  className="cursor-grab text-slate-400"
                                  aria-label={`Reorder tool ${tool.name}`}
                                  aria-grabbed={dragTool?.toolId === tool.id}
                                  draggable
                                  onDragStart={(event) => {
                                    event.stopPropagation();
                                    setDragTool({ categoryId: category.id, toolId: tool.id });
                                    event.dataTransfer.setData('text/plain', tool.id);
                                  }}
                                >
                                  ⠿
                                </button>
                                <strong className="text-sm text-slate-800 dark:text-slate-100">{tool.name}</strong>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{tool.proficiencyLevel}%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                                  aria-label="Move tool up"
                                  onClick={() =>
                                    updateItem(collectionKey, category.id, {
                                      ...category,
                                      tools: moveItem(toolRows, tool.id, 'up'),
                                    })
                                  }
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
                                  aria-label="Move tool down"
                                  onClick={() =>
                                    updateItem(collectionKey, category.id, {
                                      ...category,
                                      tools: moveItem(toolRows, tool.id, 'down'),
                                    })
                                  }
                                >
                                  ↓
                                </button>
                                <button
                                  type="button"
                                  className="rounded border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                                  onClick={() => setEditingTool({ categoryId: category.id, toolId: tool.id })}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="rounded border border-red-200 px-3 py-1 text-xs text-red-600 dark:border-red-900/60 dark:text-red-400"
                                  onClick={() => {
                                    const nextTools = toolRows.filter((item) => item.id !== tool.id);
                                    updateItem(collectionKey, category.id, {
                                      ...category,
                                      tools: nextTools,
                                    });
                                    if (editingTool?.categoryId === category.id && editingTool.toolId === tool.id) {
                                      setEditingTool(null);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
