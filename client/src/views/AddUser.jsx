import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminAddUser = lazy(() => import('../components/admin/adminAddUser'));

function AddUser() {
  const { user } = useSelector((state) => state.user);

  return (
    user?.user_role.includes('Admin') && (
      <Suspense fallback={<CustomLoading />}>
        <AdminAddUser />
      </Suspense>
    )
  );
}

export default AddUser;
