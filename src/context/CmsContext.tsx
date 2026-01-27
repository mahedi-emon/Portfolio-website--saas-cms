import type { ReactNode } from 'react';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import cmsMock from '../data/mock/cms.mock.json';

export type CmsData = typeof cmsMock;
export type SingletonKey = keyof CmsData['singletons'];
export type CollectionKey = keyof CmsData['collections'];
export type CollectionItem = Record<string, unknown> & { id: string };

type CmsContextValue = {
  data: CmsData;
  updateSingleton: (key: SingletonKey, values: Record<string, unknown>) => void;
  createItem: (key: CollectionKey, values: Record<string, unknown>) => void;
  updateItem: (key: CollectionKey, id: string, values: Record<string, unknown>) => void;
  deleteItem: (key: CollectionKey, id: string) => void;
};

export const CmsContext = createContext<CmsContextValue | null>(null);

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function CmsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CmsData>(() => cmsMock);

  const updateSingleton = useCallback(
    (key: SingletonKey, values: Record<string, unknown>) => {
      setData((prev) => ({
        ...prev,
        singletons: {
          ...prev.singletons,
          [key]: values,
        },
      }));
    },
    []
  );

  const createItem = useCallback(
    (key: CollectionKey, values: Record<string, unknown>) => {
      setData((prev) => ({
        ...prev,
        collections: {
          ...prev.collections,
          [key]: [
            ...prev.collections[key],
            {
              id: createId(),
              ...values,
            },
          ],
        },
      }));
    },
    []
  );

  const updateItem = useCallback(
    (key: CollectionKey, id: string, values: Record<string, unknown>) => {
      setData((prev) => ({
        ...prev,
        collections: {
          ...prev.collections,
          [key]: prev.collections[key].map((item) =>
            (item as CollectionItem).id === id ? { ...(item as CollectionItem), ...values } : item
          ),
        },
      }));
    },
    []
  );

  const deleteItem = useCallback(
    (key: CollectionKey, id: string) => {
      setData((prev) => ({
        ...prev,
        collections: {
          ...prev.collections,
          [key]: prev.collections[key].filter((item) => (item as CollectionItem).id !== id),
        },
      }));
    },
    []
  );

  const value = useMemo<CmsContextValue>(
    () => ({ data, updateSingleton, createItem, updateItem, deleteItem }),
    [data, updateSingleton, createItem, updateItem, deleteItem]
  );
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
