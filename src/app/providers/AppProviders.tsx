import type { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { CmsProvider } from '../../context/CmsContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CmsProvider>{children}</CmsProvider>
    </AuthProvider>
  );
}
