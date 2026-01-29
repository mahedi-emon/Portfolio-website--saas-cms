import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import type { FieldSchema } from '../cms/cmsSchemas';
import { detectSocialPlatform, formatPlatformLabel } from '../../utils/detectSocialPlatform';
import { iconMap } from '../../utils/iconMap';

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
  let base: Record<string, unknown> = {};
  for (const field of fields) {
    const nestedValue = initialValues ? getNested(initialValues, field.name) : undefined;
    if (initialValues && nestedValue !== undefined) {
      base = setNested(base, field.name, nestedValue) as Record<string, unknown>;
      continue;
    }

    switch (field.type) {
      case 'checkbox':
        base = setNested(base, field.name, false) as Record<string, unknown>;
        break;
      case 'number':
        base = setNested(base, field.name, 0) as Record<string, unknown>;
        break;
      case 'list':
        base = setNested(base, field.name, []) as Record<string, unknown>;
        break;
      default:
        if (field.name === 'status') {
          base = setNested(base, field.name, 'draft') as Record<string, unknown>;
        } else if (field.name === 'orderIndex') {
          base = setNested(base, field.name, 0) as Record<string, unknown>;
        } else {
          base = setNested(base, field.name, '') as Record<string, unknown>;
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

    if (field.type === 'socialLinks') {
      const links = Array.isArray(value) ? (value as SocialLinkItem[]) : [];
      const emptyLink = links.find((link) => !String(link.url ?? '').trim());
      if (emptyLink) {
        errors[field.name] = 'Social link URL is required.';
        return;
      }
      const invalidLink = links.find((link) =>
        !z.string().url().safeParse(String(link.url ?? '')).success
      );
      if (invalidLink) {
        errors[field.name] = 'Enter valid URLs for social links.';
        return;
      }
    }

    if (field.required && isEmptyValue(value)) {
      errors[field.name] = 'Required';
      return;
    }

    const isUrlField =
      field.type === 'url' || (field.name.toLowerCase().includes('url') && field.type !== 'socialLinks');
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

type SocialLinkItem = {
  url: string;
  platform?: string;
  iconKey?: string;
};

export function EntityForm({ fields, initialValues, onSubmit, onCancel, submitLabel }: EntityFormProps) {
  const initial = useMemo(() => buildInitial(fields, initialValues), [fields, initialValues]);
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasSocialLinksField = useMemo(() => fields.some((field) => field.type === 'socialLinks'), [fields]);

  const mediaFields = useMemo(
    () => fields.filter((field) => field.type === 'image'),
    [fields]
  );

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => setNested(prev, name, value));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateValues(fields, values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        onSubmit(values);
      }}
    >
      <div className={mediaFields.length > 0 ? 'grid gap-6 lg:grid-cols-[2fr_1fr]' : ''}>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => {
            const isWideField =
              field.type === 'socialLinks' || field.type === 'textarea' || field.name === 'pageIntroText';
            return (
              <div key={field.name} className={`space-y-2 ${isWideField ? 'md:col-span-2' : ''}`}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {field.label}
                {field.type === 'image' ? (
                  <input
                    className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:file:bg-slate-800 dark:file:text-slate-200"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => handleChange(field.name, reader.result ?? '');
                      reader.readAsDataURL(file);
                    }}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    value={String(getNested(values, field.name) ?? '')}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                ) : field.type === 'checkbox' ? (
                  <input
                    className="ml-2"
                    type="checkbox"
                    checked={Boolean(getNested(values, field.name))}
                    onChange={(event) => handleChange(field.name, event.target.checked)}
                  />
                ) : field.type === 'list' ? (
                  <input
                    className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    type="text"
                    value={
                      Array.isArray(getNested(values, field.name))
                        ? ((getNested(values, field.name) as unknown[]) ?? []).join(', ')
                        : ''
                    }
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
                ) : field.type === 'socialLinks' ? (
                  <div className="mt-1 space-y-3">
                    {(() => {
                      const currentLinks = Array.isArray(getNested(values, field.name))
                        ? (getNested(values, field.name) as SocialLinkItem[])
                        : [];
                      const hasAnyLinks = currentLinks.length > 0;
                      const hasEmptyLink = currentLinks.some((item) => !String(item.url ?? '').trim());
                      const hasInvalidLink = currentLinks.some((item) => {
                        const url = String(item.url ?? '').trim();
                        if (!url) return false;
                        return !z.string().url().safeParse(url).success;
                      });

                      return (
                        <>
                          {currentLinks.map((link, index) => {
                      const detected = detectSocialPlatform(String(link.url ?? ''));
                      const platformKey = (link.platform ?? detected.platform) as keyof typeof iconMap;
                      const iconKey = (link.iconKey ?? detected.iconKey) as keyof typeof iconMap;
                      const Icon = iconMap[iconKey] ?? iconMap.custom;
                      const label = formatPlatformLabel(String(platformKey), detected.label);
                      return (
                        <div key={`${field.name}-${index}`} className="flex flex-col gap-2 rounded border border-slate-200 p-3 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-slate-500" />
                            <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
                          </div>
                          <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <input
                              className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              placeholder="https://"
                              value={String(link.url ?? '')}
                              onChange={(event) => {
                                const url = event.target.value;
                                const nextDetected = detectSocialPlatform(url);
                                const current = Array.isArray(getNested(values, field.name))
                                  ? ([...(getNested(values, field.name) as SocialLinkItem[])] as SocialLinkItem[])
                                  : [];
                                current[index] = {
                                  url,
                                  platform: nextDetected.platform,
                                  iconKey: nextDetected.iconKey,
                                };
                                handleChange(field.name, current);
                              }}
                            />
                            <button
                              type="button"
                              className="rounded border border-red-200 px-3 py-2 text-xs text-red-600 dark:border-red-900/60 dark:text-red-400"
                              onClick={() => {
                                const current = Array.isArray(getNested(values, field.name))
                                  ? ([...(getNested(values, field.name) as SocialLinkItem[])] as SocialLinkItem[])
                                  : [];
                                current.splice(index, 1);
                                handleChange(field.name, current);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                          })}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              className="rounded border border-slate-200 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
                              onClick={() => {
                                const current = Array.isArray(getNested(values, field.name))
                                  ? ([...(getNested(values, field.name) as SocialLinkItem[])] as SocialLinkItem[])
                                  : [];
                                current.push({ url: '', platform: 'custom', iconKey: 'custom' });
                                handleChange(field.name, current);
                              }}
                            >
                              Add social link
                            </button>
                            {hasAnyLinks && (
                              <button
                                type="submit"
                                className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
                                disabled={hasEmptyLink || hasInvalidLink}
                              >
                                {submitLabel ?? 'Save'}
                              </button>
                            )}
                            {hasAnyLinks && onCancel && (
                              <button
                                type="button"
                                onClick={onCancel}
                                className="rounded border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <input
                    className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    type={field.type ?? 'text'}
                    value={String(getNested(values, field.name) ?? '')}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                )}
              </label>
              {errors[field.name] && <div className="text-xs text-red-600">{errors[field.name]}</div>}
              </div>
            );
          })}
        </div>

        {mediaFields.length > 0 && (
          <aside className="rounded border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Media Preview</div>
            <div className="mt-3 space-y-4">
              {mediaFields.map((field) => {
                const value = getNested(values, field.name);
                if (!value) return null;
                return (
                  <div key={field.name} className="space-y-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{field.label}</div>
                    {field.type === 'image' ? (
                      <img
                        src={String(value)}
                        alt="Preview"
                        className="h-20 w-full rounded border border-slate-200 object-cover dark:border-slate-700"
                      />
                    ) : (
                      <a className="text-sm text-slate-700 underline dark:text-slate-200" href={String(value)} target="_blank" rel="noreferrer">
                        Download file
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>
      {!hasSocialLinksField && (
        <div className="flex items-center gap-2">
          <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
            {submitLabel ?? 'Save'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </form>
  );
}
