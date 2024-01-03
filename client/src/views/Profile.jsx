import { lazy, Suspense } from 'react';
import CustomLoading from '../components/global/loading';

const MyProfile = lazy(() => import('../components/common/profile'));

function Profile() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <MyProfile />
    </Suspense>
  );
}

export default Profile;
