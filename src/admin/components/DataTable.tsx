import type { ReactNode } from 'react';

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export function DataTable<T>({ columns, rows, rowKey, onEdit, onDelete }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-slate-50 dark:hover:bg-slate-800">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-slate-700 dark:text-slate-200">
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="rounded border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-900/20"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
