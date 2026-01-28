import type { Dispatch, SetStateAction } from 'react';
import type { CmsData, CollectionItem, CollectionKey, SingletonKey } from '../context/CmsContext';

export type CmsRepository = {
  updateSingleton: (key: SingletonKey, values: Record<string, unknown>) => void;
  createItem: (key: CollectionKey, values: Record<string, unknown>) => void;
  updateItem: (key: CollectionKey, id: string, values: Record<string, unknown>) => void;
  deleteItem: (key: CollectionKey, id: string) => void;
  replaceCollection: (key: CollectionKey, items: CollectionItem[]) => void;
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createCmsRepository = (
  setData: Dispatch<SetStateAction<CmsData>>
): CmsRepository => ({
  updateSingleton: (key, values) => {
    setData((prev) => ({
      ...prev,
      singletons: {
        ...prev.singletons,
        [key]: {
          ...(prev.singletons[key] as Record<string, unknown>),
          ...values,
        },
      },
    }));
  },
  createItem: (key, values) => {
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
  updateItem: (key, id, values) => {
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
  deleteItem: (key, id) => {
    setData((prev) => ({
      ...prev,
      collections: {
        ...prev.collections,
        [key]: prev.collections[key].filter((item) => (item as CollectionItem).id !== id),
      },
    }));
  },
  replaceCollection: (key, items) => {
    setData((prev) => ({
      ...prev,
      collections: {
        ...prev.collections,
        [key]: items,
      },
    }));
  },
});
