import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { GlobalLoader } from '../components/common/GlobalLoader';
import { useCmsLoading } from '../hooks/useCms';
import { useLoading } from '../context/LoadingContext';

function AppContent() {
  const { showLoader, hideLoader } = useLoading();
  const { isLoading: isCmsLoading } = useCmsLoading();

  useEffect(() => {
    // Sync global loader with CMS data loading
    if (isCmsLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isCmsLoading, showLoader, hideLoader]);

  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
