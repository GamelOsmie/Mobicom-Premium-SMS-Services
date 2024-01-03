import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminUsers = lazy(() => import('../components/admin/adminUsers'));

function Users() {
  const { user } = useSelector((state) => state.user);

  return (
    user?.user_role.includes('Admin') && (
      <Suspense fallback={<CustomLoading />}>
        <AdminUsers />
      </Suspense>
    )
  );
}

export default Users;
