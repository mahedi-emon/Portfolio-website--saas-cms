import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { Plus, X, Save, AlertCircle } from 'lucide-react';
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
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateValues(fields, values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        onSubmit(values);
      }}
    >
      <div className={mediaFields.length > 0 ? 'grid gap-6 lg:grid-cols-[2fr_1fr]' : ''}>
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => {
            const isWideField =
              field.type === 'socialLinks' || field.type === 'textarea' || field.name === 'pageIntroText';
            return (
              <div key={field.name} className={`space-y-2 ${isWideField ? 'md:col-span-2' : ''}`}>
              <label className="block text-sm font-medium text-[#C9D1D9]">
                <span className="flex items-center gap-1">
                  {field.label}
                  {field.required && <span className="text-[#C77DFF]">*</span>}
                </span>
                {field.type === 'image' ? (
                  <input
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1320]/60 px-4 py-3 text-sm text-[#C9D1D9] file:mr-3 file:rounded-lg file:border-0 file:bg-[#C77DFF]/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#C77DFF] hover:file:bg-[#C77DFF]/30 transition-colors"
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
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1320]/50 px-4 py-3 text-sm text-[#C9D1D9] focus:outline-none focus:ring-2 focus:ring-[#C77DFF]/20 focus:border-[#C77DFF] transition-all min-h-[120px] resize-y"
                    value={String(getNested(values, field.name) ?? '')}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="mt-2 flex items-center">
                    <input
                      className="h-5 w-5 rounded border-white/10 text-[#C77DFF] focus:ring-[#C77DFF] transition-colors"
                      type="checkbox"
                      checked={Boolean(getNested(values, field.name))}
                      onChange={(event) => handleChange(field.name, event.target.checked)}
                    />
                    <span className="ml-2 text-[#C9D1D9]">Enable</span>
                  </div>
                ) : field.type === 'list' ? (
                  <input
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1320]/50 px-4 py-3 text-sm text-[#C9D1D9] focus:outline-none focus:ring-2 focus:ring-[#C77DFF]/20 focus:border-[#C77DFF] transition-all"
                    type="text"
                    placeholder="Comma-separated values"
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
                  <div className="mt-2 space-y-3">
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
                        <div key={`${field.name}-${index}`} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0B1320]/60 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C77DFF]/20">
                              <Icon className="h-4 w-4 text-[#C77DFF]" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{label}</span>
                          </div>
                          <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <input
                              className="flex-1 rounded-xl border border-white/10 bg-[#0B1320]/50 px-4 py-2.5 text-sm text-[#C9D1D9] focus:outline-none focus:ring-2 focus:ring-[#C77DFF]/20 focus:border-[#C77DFF] transition-all"
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
                              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
                              onClick={() => {
                                const current = Array.isArray(getNested(values, field.name))
                                  ? ([...(getNested(values, field.name) as SocialLinkItem[])] as SocialLinkItem[])
                                  : [];
                                current.splice(index, 1);
                                handleChange(field.name, current);
                              }}
                            >
                              <X className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                          })}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B1320]/50 px-4 py-2.5 text-sm font-medium text-[#C9D1D9] hover:bg-white/5 transition-colors"
                              onClick={() => {
                                const current = Array.isArray(getNested(values, field.name))
                                  ? ([...(getNested(values, field.name) as SocialLinkItem[])] as SocialLinkItem[])
                                  : [];
                                current.push({ url: '', platform: 'custom', iconKey: 'custom' });
                                handleChange(field.name, current);
                              }}
                            >
                              <Plus className="w-4 h-4" />
                              Add social link
                            </button>
                            {hasAnyLinks && (
                              <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#C77DFF]/20 hover:shadow-lg hover:shadow-[#C77DFF]/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                disabled={hasEmptyLink || hasInvalidLink}
                              >
                                <Save className="w-4 h-4" />
                                {submitLabel ?? 'Save'}
                              </button>
                            )}
                            {hasAnyLinks && onCancel && (
                              <button
                                type="button"
                                onClick={onCancel}
                                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-[#C9D1D9] hover:bg-white/5 transition-colors"
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
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1320]/50 px-4 py-3 text-sm text-[#C9D1D9] focus:outline-none focus:ring-2 focus:ring-[#C77DFF]/20 focus:border-[#C77DFF] transition-all"
                    type={field.type ?? 'text'}
                    value={String(getNested(values, field.name) ?? '')}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                )}
              </label>
              {errors[field.name] && (
                <div className="flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors[field.name]}
                </div>
              )}
              </div>
            );
          })}
        </div>

        {mediaFields.length > 0 && (
          <aside className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1320]/60 to-[#C77DFF]/10 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Media Preview</div>
            <div className="mt-4 space-y-4">
              {mediaFields.map((field) => {
                const value = getNested(values, field.name);
                if (!value) return null;
                return (
                  <div key={field.name} className="space-y-2">
                    <div className="text-xs text-white/60">{field.label}</div>
                    {field.type === 'image' ? (
                      <img
                        src={String(value)}
                        alt="Preview"
                        className="h-24 w-full rounded-xl border border-white/10 object-cover shadow-sm"
                      />
                    ) : (
                      <a className="text-sm text-[#C77DFF] hover:text-[#9D4EDD] font-medium underline transition-colors" href={String(value)} target="_blank" rel="noreferrer">
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
        <div className="flex items-center gap-3 pt-2">
          <button 
            type="submit" 
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#C77DFF]/20 hover:shadow-lg hover:shadow-[#C77DFF]/30 transition-all"
          >
            <Save className="w-4 h-4" />
            {submitLabel ?? 'Save'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-[#C9D1D9] hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </form>
  );
}
