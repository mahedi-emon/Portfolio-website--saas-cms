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
    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-slate-700">
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="rounded border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
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
