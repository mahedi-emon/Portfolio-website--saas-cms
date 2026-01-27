import { useCms } from '../../hooks/useCms';

export function HomePage() {
  const { data } = useCms();
  return <pre>{JSON.stringify(data.singletons, null, 2)}</pre>;
}
