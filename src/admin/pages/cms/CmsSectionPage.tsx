import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { EntityForm } from '../../components/EntityForm';
import { sectionSchemas } from '../../cms/cmsSchemas';
import { useCms } from '../../../hooks/useCms';
import type { CollectionKey, CollectionItem, SingletonKey } from '../../../context/CmsContext';

export function CmsSectionPage() {
  const { sectionKey } = useParams();
  const { data, updateSingleton, createItem, updateItem, deleteItem, replaceCollection } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTool, setEditingTool] = useState<{ categoryId: string; toolId: string } | null>(null);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [dragCategoryId, setDragCategoryId] = useState<string | null>(null);
  const [dragTool, setDragTool] = useState<{ categoryId: string; toolId: string } | null>(null);

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
        {schema.key === 'footer' && (
          <div>
            <h2>Social Links</h2>
            <EntityForm
              fields={[
                { name: 'platform', label: 'Platform' },
                { name: 'url', label: 'URL' },
                { name: 'iconKey', label: 'Icon Key' },
              ]}
              initialValues={(values.socialLinks ?? []).find((link: { id: string }) => link.id === editingSocialId)}
              submitLabel={editingSocialId ? 'Update Link' : 'Add Link'}
              onSubmit={(linkValues) => {
                const current = Array.isArray(values.socialLinks) ? values.socialLinks : [];
                const next = editingSocialId
                  ? current.map((link: { id: string }) =>
                      link.id === editingSocialId ? { ...link, ...linkValues } : link
                    )
                  : [
                      ...current,
                      {
                        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                        ...linkValues,
                      },
                    ];
                updateSingleton('footer', { socialLinks: next });
                setEditingSocialId(null);
              }}
              onCancel={editingSocialId ? () => setEditingSocialId(null) : undefined}
            />

            <ul role="list">
              {(values.socialLinks ?? []).map((link: { id: string; platform: string; url: string; iconKey: string }) => (
                <li key={link.id} role="listitem">
                  <div>{link.platform}</div>
                  <div>{link.url}</div>
                  <div>{link.iconKey}</div>
                  <div>
                    <button type="button" onClick={() => setEditingSocialId(link.id)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateSingleton('footer', {
                          socialLinks: (values.socialLinks ?? []).filter((item: { id: string }) => item.id !== link.id),
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const collectionKey = schema.key as CollectionKey;
  const rows = data.collections[collectionKey] as CollectionItem[];
  const editingItem = rows.find((row) => row.id === editingId);

  const isTechStack = schema.key === 'techStackCategories';
  const isAchievements = schema.key === 'achievements';

  const toolFormFields = [
    { name: 'name', label: 'Tool Name' },
    { name: 'logoUrl', label: 'Logo URL' },
    { name: 'proficiencyLevel', label: 'Proficiency (0-100)', type: 'number' },
  ] as const;

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

  return (
    <div>
      <h1>{schema.title}</h1>
      {!isTechStack && !isAchievements && (
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
      )}

      {!isTechStack && !isAchievements && (
        <DataTable
          columns={tableColumns}
          rows={rows}
          rowKey={(row) => row.id}
          onEdit={(row) => setEditingId(row.id)}
          onDelete={(row) => deleteItem(collectionKey, row.id)}
        />
      )}

      {isAchievements && (
        <div>
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
          <ul role="list">
            {rows.map((achievement) => (
              <li
                key={achievement.id}
                role="listitem"
                draggable
                onDragStart={(event) => {
                  setDragCategoryId(achievement.id);
                  event.dataTransfer.setData('text/plain', achievement.id);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const fromId = dragCategoryId ?? event.dataTransfer.getData('text/plain');
                  if (!fromId || fromId === achievement.id) return;
                  const reordered = reorderItems(rows, fromId, achievement.id);
                  replaceCollection(collectionKey, reordered as CollectionItem[]);
                  setDragCategoryId(null);
                }}
              >
                <div>
                  <button
                    type="button"
                    aria-label={`Reorder achievement ${achievement.title}`}
                    aria-grabbed={dragCategoryId === achievement.id}
                    draggable
                    onDragStart={(event) => {
                      event.stopPropagation();
                      setDragCategoryId(achievement.id);
                      event.dataTransfer.setData('text/plain', achievement.id);
                    }}
                  >
                    ⠿
                  </button>
                  <strong>{achievement.title}</strong>
                </div>
                <div>
                  <button
                    type="button"
                    aria-label="Move achievement up"
                    onClick={() => {
                      const reordered = moveItem(rows, achievement.id, 'up');
                      replaceCollection(collectionKey, reordered as CollectionItem[]);
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move achievement down"
                    onClick={() => {
                      const reordered = moveItem(rows, achievement.id, 'down');
                      replaceCollection(collectionKey, reordered as CollectionItem[]);
                    }}
                  >
                    ↓
                  </button>
                  <button type="button" onClick={() => setEditingId(achievement.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteItem(collectionKey, achievement.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isTechStack && (
        <div>
          <div>
            <EntityForm
              fields={schema.fields}
              submitLabel="Create Category"
              onSubmit={(values) => createItem(collectionKey, values)}
            />
          </div>

          <ul role="list">
            {rows.map((category, categoryIndex) => {
            const toolRows = (category.tools ?? []) as Array<{
              id: string;
              name: string;
              logoUrl: string;
              proficiencyLevel: number;
            }>;
            const editingToolId = editingTool?.categoryId === category.id ? editingTool.toolId : null;
            const editingToolRow = editingToolId ? toolRows.find((tool) => tool.id === editingToolId) : undefined;

            return (
              <li key={category.id} role="listitem">
                <details
                  draggable
                  onDragStart={(event) => {
                    setDragCategoryId(category.id);
                    event.dataTransfer.setData('text/plain', category.id);
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const fromId = dragCategoryId ?? event.dataTransfer.getData('text/plain');
                    if (!fromId || fromId === category.id) return;
                    const reordered = reorderItems(rows, fromId, category.id);
                    replaceCollection(collectionKey, reordered as CollectionItem[]);
                    setDragCategoryId(null);
                  }}
                >
                  <summary>
                    <button
                      type="button"
                      aria-label={`Reorder category ${category.categoryName}`}
                      aria-grabbed={dragCategoryId === category.id}
                      draggable
                      onDragStart={(event) => {
                        event.stopPropagation();
                        setDragCategoryId(category.id);
                        event.dataTransfer.setData('text/plain', category.id);
                      }}
                    >
                      ⠿
                    </button>
                    <span>{category.categoryName}</span>
                    <span> ({toolRows.length} tools)</span>
                    <button
                      type="button"
                      aria-label="Move category up"
                      onClick={() => {
                        const reordered = moveItem(rows, category.id, 'up');
                        replaceCollection(collectionKey, reordered as CollectionItem[]);
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move category down"
                      onClick={() => {
                        const reordered = moveItem(rows, category.id, 'down');
                        replaceCollection(collectionKey, reordered as CollectionItem[]);
                      }}
                    >
                      ↓
                    </button>
                  </summary>
                  <div>
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

                  <div>
                    <button type="button" onClick={() => deleteItem(collectionKey, category.id)}>
                      Delete Category
                    </button>
                  </div>

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

                  <ul role="list">
                    {toolRows.map((tool) => (
                      <li
                        key={tool.id}
                        role="listitem"
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
                        <div>
                          <button
                            type="button"
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
                          <strong>{tool.name}</strong> — {tool.proficiencyLevel}%
                        </div>
                        <div>
                          <button
                            type="button"
                            aria-label="Move tool up"
                            onClick={() => {
                              const reorderedTools = moveItem(toolRows, tool.id, 'up');
                              updateItem(collectionKey, category.id, {
                                ...category,
                                tools: reorderedTools,
                              });
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            aria-label="Move tool down"
                            onClick={() => {
                              const reorderedTools = moveItem(toolRows, tool.id, 'down');
                              updateItem(collectionKey, category.id, {
                                ...category,
                                tools: reorderedTools,
                              });
                            }}
                          >
                            ↓
                          </button>
                          <button type="button" onClick={() => setEditingTool({ categoryId: category.id, toolId: tool.id })}>
                            Edit
                          </button>
                          <button
                            type="button"
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
