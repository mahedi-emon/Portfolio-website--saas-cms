import type { ReactNode } from 'react';
import React, { createContext, useMemo, useState } from 'react';
import cmsMock from '../data/mock/cms.mock.json';
import { createCmsRepository } from '../services/cmsRepository';

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
  replaceCollection: (key: CollectionKey, items: CollectionItem[]) => void;
};

export const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CmsData>(() => cmsMock);

  const repo = useMemo(() => createCmsRepository(setData), [setData]);

  const value = useMemo<CmsContextValue>(
    () => ({
      data,
      updateSingleton: repo.updateSingleton,
      createItem: repo.createItem,
      updateItem: repo.updateItem,
      deleteItem: repo.deleteItem,
      replaceCollection: repo.replaceCollection,
    }),
    [data, repo]
  );
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
