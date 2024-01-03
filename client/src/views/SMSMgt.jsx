import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import CustomLoading from '../components/global/loading';

const AdminSMSMgt = lazy(() => import('../components/admin/adminSMSMgt'));

function SMSMgt() {
  const { user } = useSelector((state) => state.user);

  return (
    user?.user_role.includes('Admin') && (
      <Suspense fallback={<CustomLoading />}>
        <AdminSMSMgt />
      </Suspense>
    )
  );
}

export default SMSMgt;
