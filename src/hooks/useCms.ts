import { useContext } from 'react';
import { CmsContext } from '../context/CmsContext';

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return ctx;
}
