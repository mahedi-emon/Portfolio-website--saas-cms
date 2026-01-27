import { useEffect, useMemo, useState } from 'react';
import type { FieldSchema } from '../cms/cmsSchemas';

export type EntityFormProps = {
  fields: FieldSchema[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

function buildInitial(fields: FieldSchema[], initialValues?: Record<string, unknown>) {
  const base: Record<string, unknown> = {};
  for (const field of fields) {
    if (initialValues && field.name in initialValues) {
      base[field.name] = initialValues[field.name];
      continue;
    }

    switch (field.type) {
      case 'checkbox':
        base[field.name] = false;
        break;
      case 'number':
        base[field.name] = 0;
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
    setValues((prev) => ({ ...prev, [name]: value }));
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
                value={String(values[field.name] ?? '')}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(values[field.name])}
                onChange={(event) => handleChange(field.name, event.target.checked)}
              />
            ) : (
              <input
                type={field.type ?? 'text'}
                value={String(values[field.name] ?? '')}
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
