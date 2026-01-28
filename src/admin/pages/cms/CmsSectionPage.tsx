import { useParams } from 'react-router-dom';
import { CmsSectionEditor } from './CmsSectionEditor';

export function CmsSectionPage() {
  const { sectionKey } = useParams();
  if (!sectionKey) {
    return (
      <div>
        <h1>Unknown section</h1>
        <p>Section not found.</p>
      </div>
    );
  }
  return <CmsSectionEditor sectionKey={sectionKey} />;
}
