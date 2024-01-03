import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminEditUser = lazy(() => import('../components/admin/adminEditUser'));

function EditUser() {
  const { user } = useSelector((state) => state.user);

  return (
    user?.user_role.includes('Admin') && (
      <Suspense fallback={<CustomLoading />}>
        <AdminEditUser />
      </Suspense>
    )
  );
}

export default EditUser;
