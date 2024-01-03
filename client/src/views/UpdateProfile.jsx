import { lazy, Suspense } from 'react';
import CustomLoading from '../components/global/loading';

const UpdateMyProfile = lazy(() => import('../components/common/updateProfile'));

function UpdateProfile() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <UpdateMyProfile />
    </Suspense>
  );
}

export default UpdateProfile;
