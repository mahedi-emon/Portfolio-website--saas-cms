import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
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
        if (field.name === 'status') {
          base[field.name] = 'draft';
        } else if (field.name === 'orderIndex') {
          base[field.name] = 0;
        } else {
          base[field.name] = '';
        }
        break;
    }
  }

  return base;
}

const isEmptyValue = (value: unknown) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

const validateValues = (fields: FieldSchema[], values: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  fields.forEach((field) => {
    const value = getNested(values, field.name);

    if (field.required && isEmptyValue(value)) {
      errors[field.name] = 'Required';
      return;
    }

    const isUrlField = field.name.toLowerCase().includes('url');
    if (!isEmptyValue(value) && isUrlField) {
      if (Array.isArray(value)) {
        const invalid = value.some((item) => !z.string().url().safeParse(String(item)).success);
        if (invalid) {
          errors[field.name] = 'Invalid URL';
        }
      } else if (!z.string().url().safeParse(String(value)).success) {
        errors[field.name] = 'Invalid URL';
      }
    }
  });

  return errors;
};

export function EntityForm({ fields, initialValues, onSubmit, onCancel, submitLabel }: EntityFormProps) {
  const initial = useMemo(() => buildInitial(fields, initialValues), [fields, initialValues]);
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        const nextErrors = validateValues(fields, values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
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
          {errors[field.name] && <div className="text-xs">{errors[field.name]}</div>}
          {field.type === 'image' && typeof getNested(values, field.name) === 'string' && (
            <img
              src={String(getNested(values, field.name) ?? '')}
              alt="Preview"
              className="mt-2 h-16 w-24 rounded border object-cover"
            />
          )}
          {field.type === 'file' && typeof getNested(values, field.name) === 'string' && (
            <div className="mt-2 text-sm">
              <a href={String(getNested(values, field.name) ?? '')} target="_blank" rel="noreferrer">
                Download
              </a>
            </div>
          )}
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
