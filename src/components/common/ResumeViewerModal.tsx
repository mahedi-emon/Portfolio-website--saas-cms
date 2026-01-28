import type { ReactNode } from 'react';

export type ResumeViewerModalProps = {
  isOpen: boolean;
  title?: ReactNode;
  previewUrl?: string;
  onClose: () => void;
};

export function ResumeViewerModal({ isOpen, title, previewUrl, onClose }: ResumeViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl rounded border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title ?? 'Resume Preview'}</h2>
          <button type="button" className="rounded border px-2 py-1 text-sm" onClick={onClose}>
            Close
          </button>
        </div>
        {previewUrl ? (
          <iframe title="Resume Preview" src={previewUrl} className="h-[70vh] w-full rounded border" />
        ) : (
          <div className="rounded border p-4 text-sm">No preview available.</div>
        )}
      </div>
    </div>
  );
}
