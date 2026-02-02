/**
 * CMS Context - Central Data Store
 * 
 * Provides CMS data and operations throughout the app.
 * Currently uses in-memory mock data; structured for Supabase integration.
 * 
 * TODO [SUPABASE]: Replace mock data with Supabase queries
 * - Use React Query or SWR for data fetching
 * - Implement real-time subscriptions for live updates
 * - Add proper caching strategy
 */

import type { ReactNode } from 'react';
import React, { createContext, useMemo, useState, useCallback } from 'react';
import cmsMock from '../data/mock/cms.mock.json';
import { createCmsRepository } from '../services/cmsRepository';

// ============================================================================
// Types
// ============================================================================

export type CmsData = typeof cmsMock;
export type SingletonKey = keyof CmsData['singletons'];
export type CollectionKey = keyof CmsData['collections'];
export type CollectionItem = Record<string, unknown> & { id: string };

/**
 * Loading state for async operations
 */
export type CmsLoadingState = {
  /** Initial data loading */
  isLoading: boolean;
  /** Specific operation in progress */
  isMutating: boolean;
  /** Which operation is in progress */
  mutatingOperation: string | null;
};

/**
 * Error state for operations
 */
export type CmsErrorState = {
  /** Last error message */
  error: string | null;
  /** Which operation caused the error */
  errorOperation: string | null;
};

type CmsContextValue = {
  data: CmsData;
  loadingState: CmsLoadingState;
  errorState: CmsErrorState;
  /** Clear the current error */
  clearError: () => void;
  // Singleton operations
  updateSingleton: (key: SingletonKey, values: Record<string, unknown>) => void;
  // Collection operations
  createItem: (key: CollectionKey, values: Record<string, unknown>) => void;
  updateItem: (key: CollectionKey, id: string, values: Record<string, unknown>) => void;
  deleteItem: (key: CollectionKey, id: string) => void;
  replaceCollection: (key: CollectionKey, items: CollectionItem[]) => void;
  // Contact messages
  addContactMessage: (message: Record<string, unknown>) => void;
  updateContactMessage: (id: string, values: Record<string, unknown>) => void;
  deleteContactMessage: (id: string) => void;
  // Resume
  setActiveResume: (resumeId: string) => void;
};

// ============================================================================
// Context
// ============================================================================

export const CmsContext = createContext<CmsContextValue | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

export function CmsProvider({ children }: { children: ReactNode }) {
  /**
   * CMS Data State
   * 
   * TODO [SUPABASE]: Replace with React Query or SWR for proper caching:
   * ```typescript
   * const { data, isLoading, error } = useQuery(['cms'], fetchCmsData);
   * ```
   */
  const [data, setData] = useState<CmsData>(() => cmsMock);
  
  /**
   * Loading State
   * 
   * TODO [SUPABASE]: Loading state will be managed by React Query/SWR
   */
  const [loadingState, setLoadingState] = useState<CmsLoadingState>({
    isLoading: false,
    isMutating: false,
    mutatingOperation: null,
  });
  
  /**
   * Error State
   * 
   * TODO [SUPABASE]: Errors will come from Supabase client
   */
  const [errorState, setErrorState] = useState<CmsErrorState>({
    error: null,
    errorOperation: null,
  });

  const clearError = useCallback(() => {
    setErrorState({ error: null, errorOperation: null });
  }, []);

  /**
   * Wrap an operation with loading/error handling.
   * This pattern prepares for async operations with Supabase.
   * 
   * TODO [SUPABASE]: Operations will become async:
   * ```typescript
   * const wrapOperation = async (operation: string, fn: () => Promise<void>) => {
   *   setLoadingState({ ...loadingState, isMutating: true, mutatingOperation: operation });
   *   try {
   *     await fn();
   *   } catch (err) {
   *     setErrorState({ error: err.message, errorOperation: operation });
   *   } finally {
   *     setLoadingState({ ...loadingState, isMutating: false, mutatingOperation: null });
   *   }
   * };
   * ```
   */
  const wrapOperation = useCallback((operation: string, fn: () => void) => {
    setLoadingState((prev) => ({ ...prev, isMutating: true, mutatingOperation: operation }));
    setErrorState({ error: null, errorOperation: null });
    
    try {
      fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setErrorState({ error: message, errorOperation: operation });
      console.error(`[CmsContext] ${operation} failed:`, err);
    } finally {
      setLoadingState((prev) => ({ ...prev, isMutating: false, mutatingOperation: null }));
    }
  }, []);

  // Create repository with wrapped operations
  const repo = useMemo(() => createCmsRepository(setData), []);

  // Wrap all repository methods for consistent loading/error handling
  const wrappedMethods = useMemo(() => ({
    updateSingleton: (key: SingletonKey, values: Record<string, unknown>) => {
      wrapOperation(`updateSingleton:${key}`, () => repo.updateSingleton(key, values));
    },
    createItem: (key: CollectionKey, values: Record<string, unknown>) => {
      wrapOperation(`createItem:${key}`, () => repo.createItem(key, values));
    },
    updateItem: (key: CollectionKey, id: string, values: Record<string, unknown>) => {
      wrapOperation(`updateItem:${key}:${id}`, () => repo.updateItem(key, id, values));
    },
    deleteItem: (key: CollectionKey, id: string) => {
      wrapOperation(`deleteItem:${key}:${id}`, () => repo.deleteItem(key, id));
    },
    replaceCollection: (key: CollectionKey, items: CollectionItem[]) => {
      wrapOperation(`replaceCollection:${key}`, () => repo.replaceCollection(key, items));
    },
    addContactMessage: (message: Record<string, unknown>) => {
      wrapOperation('addContactMessage', () => repo.addContactMessage(message));
    },
    updateContactMessage: (id: string, values: Record<string, unknown>) => {
      wrapOperation(`updateContactMessage:${id}`, () => repo.updateContactMessage(id, values));
    },
    deleteContactMessage: (id: string) => {
      wrapOperation(`deleteContactMessage:${id}`, () => repo.deleteContactMessage(id));
    },
    setActiveResume: (resumeId: string) => {
      wrapOperation(`setActiveResume:${resumeId}`, () => repo.setActiveResume(resumeId));
    },
  }), [repo, wrapOperation]);

  const value = useMemo<CmsContextValue>(
    () => ({
      data,
      loadingState,
      errorState,
      clearError,
      ...wrappedMethods,
    }),
    [data, loadingState, errorState, clearError, wrappedMethods]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

