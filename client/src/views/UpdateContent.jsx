import { lazy, Suspense } from 'react';
import CustomLoading from '../components/global/loading';

const AdminUpdateContent = lazy(() =>
  import('../components/admin/adminUpdateContent'),
);

function UpdateContent() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <AdminUpdateContent />
    </Suspense>
  );
}

export default UpdateContent;
