import { Link } from 'react-router-dom';
import { sectionList } from '../../cms/cmsSchemas';

export function CmsIndexPage() {
  return (
    <div>
      <h1>CMS Sections</h1>
      <ul>
        {sectionList.map((section) => (
          <li key={section.key}>
            <Link to={`/admin/cms/${section.key}`}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
