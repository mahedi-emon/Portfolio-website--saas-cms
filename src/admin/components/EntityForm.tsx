import { useEffect, useMemo, useState } from 'react';
import type { FieldSchema } from '../cms/cmsSchemas';

export type EntityFormProps = {
  fields: FieldSchema[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

const getNested = (obj: Record<string, unknown>, path: string) => {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

const setNested = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const keys = path.split('.');
  const next = { ...obj } as Record<string, unknown>;
  let cursor: Record<string, unknown> = next;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
      return;
    }
    const existing = cursor[key];
    cursor[key] = typeof existing === 'object' && existing !== null ? { ...(existing as Record<string, unknown>) } : {};
    cursor = cursor[key] as Record<string, unknown>;
  });
  return next;
};

function buildInitial(fields: FieldSchema[], initialValues?: Record<string, unknown>) {
  const base: Record<string, unknown> = {};
  for (const field of fields) {
    const nestedValue = initialValues ? getNested(initialValues, field.name) : undefined;
    if (initialValues && nestedValue !== undefined) {
      base[field.name] = nestedValue;
      continue;
    }

    switch (field.type) {
      case 'checkbox':
        base[field.name] = false;
        break;
      case 'number':
        base[field.name] = 0;
        break;
      case 'list':
        base[field.name] = [];
        break;
      default:
        base[field.name] = '';
        break;
    }
  }

  return base;
}

export function EntityForm({ fields, initialValues, onSubmit, onCancel, submitLabel }: EntityFormProps) {
  const initial = useMemo(() => buildInitial(fields, initialValues), [fields, initialValues]);
  const [values, setValues] = useState<Record<string, unknown>>(initial);

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => setNested(prev, name, value));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label>
            {field.label}
            {field.type === 'textarea' ? (
              <textarea
                value={String(getNested(values, field.name) ?? '')}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(getNested(values, field.name))}
                onChange={(event) => handleChange(field.name, event.target.checked)}
              />
            ) : field.type === 'list' ? (
              <input
                type="text"
                value={Array.isArray(getNested(values, field.name)) ? ((getNested(values, field.name) as unknown[]) ?? []).join(', ') : ''}
                onChange={(event) =>
                  handleChange(
                    field.name,
                    event.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean)
                  )
                }
              />
            ) : (
              <input
                type={field.type ?? 'text'}
                value={String(getNested(values, field.name) ?? '')}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            )}
          </label>
        </div>
      ))}
      <div>
        <button type="submit">{submitLabel ?? 'Save'}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
