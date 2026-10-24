import { Suspense } from 'react';
import { ContentEditor } from '@/components/admin/ContentEditor';

export default function AdminPage() {
  // ContentEditor reads ?section= from the URL, which needs a Suspense boundary.
  return (
    <Suspense>
      <ContentEditor />
    </Suspense>
  );
}
