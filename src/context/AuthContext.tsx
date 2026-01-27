import type { ReactNode } from 'react';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export type Role = 'admin' | 'user';

type AuthState = {
  isAuthenticated: boolean;
  role: Role | null;
};

type AuthContextValue = AuthState & {
  refresh: () => void;
};

const STORAGE_KEY = 'portfolio.mockAuth';

export const AuthContext = createContext<AuthContextValue | null>(null);

function readMockAuth(): AuthState {
  if (!import.meta.env.DEV) {
    return { isAuthenticated: false, role: null };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isAuthenticated: false, role: null };

    const parsed = JSON.parse(raw) as Partial<AuthState>;
    const role = parsed.role === 'admin' || parsed.role === 'user' ? parsed.role : null;

    return {
      isAuthenticated: parsed.isAuthenticated === true && role !== null,
      role,
    };
  } catch {
    return { isAuthenticated: false, role: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readMockAuth());

  const refresh = useCallback(() => {
    setState(readMockAuth());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [refresh]);

  const value = useMemo<AuthContextValue>(() => ({ ...state, refresh }), [state, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
