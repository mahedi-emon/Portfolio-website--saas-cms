import { useCms } from '../../../hooks/useCms';

export function DashboardHomePage() {
  const { data } = useCms();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Collections</h2>
      <ul>
        {Object.entries(data.collections).map(([key, items]) => (
          <li key={key}>
            {key}: {items.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
