import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminCreateContent = lazy(() =>
  import('../components/admin/adminCreateContent'),
);

function CreateContent() {
 

  return (
    
      <Suspense fallback={<CustomLoading />}>
        <AdminCreateContent />
      </Suspense>
    
  );
}

export default CreateContent;
