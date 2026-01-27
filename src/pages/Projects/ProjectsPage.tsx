import { useCms } from '../../hooks/useCms';

export function ProjectsPage() {
  const { data } = useCms();
  return <pre>{JSON.stringify(data.collections.projects, null, 2)}</pre>;
}
