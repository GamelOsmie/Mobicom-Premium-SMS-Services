import { lazy, Suspense } from 'react';
import CustomLoading from '../components/global/loading';

const AdminContents = lazy(() => import('../components/admin/adminContents'));

function Contents() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <AdminContents />
    </Suspense>
  );
}

export default Contents;
