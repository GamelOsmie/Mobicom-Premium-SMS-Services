import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminSMS = lazy(() => import('../components/admin/adminSMS'));

function SMS() {
  const { user } = useSelector((state) => state.user);

  return (
    user?.user_role.includes('Admin') && (
      <Suspense fallback={<CustomLoading />}>
        <AdminSMS />
      </Suspense>
    )
  );
}

export default SMS;
