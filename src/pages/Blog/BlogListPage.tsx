import { useCms } from '../../hooks/useCms';

export function BlogListPage() {
  const { data } = useCms();
  return <pre>{JSON.stringify(data.collections.blogs, null, 2)}</pre>;
}
