import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Stats2021 from './components/admin/stats/stats2021';
import StatsOverview from './components/admin/stats/statsOverview';
import ProtectedRoute from './components/global/protectedRoute';
import Toast from './components/global/toast';
import { useFetchMyProfile } from './hooks/useAuth';
import { setUserIsLoggedOut } from './redux/authSlice';
import { getUser } from './utils/helpers';
import AddUser from './views/AddUser';
import Contents from './views/Contents';
import CreateContent from './views/CreateContent';
import Dashboard from './views/Dashboard';
import EditUser from './views/EditUser';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Overview from './views/Overview';
import Profile from './views/Profile';
import SMS from './views/SMS';
import SMSMgt from './views/SMSMgt';
import UpdateContent from './views/UpdateContent';
import UpdateProfile from './views/UpdateProfile';
import Users from './views/Users';

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Navigate to='/dashboard/overview' replace />,
      errorElement: <NotFound />,
    },
    {
      path: '/overview',
      element: (
        <ProtectedRoute>
          <Overview />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'overview',
          element: (
            <ProtectedRoute>
              <StatsOverview />
            </ProtectedRoute>
          ),
        },
        {
          path: '2021',
          element: (
            <ProtectedRoute>
              <Stats2021 />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      ),
    },
    {
      path: '/users/create',
      element: (
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      ),
    },
    {
      path: '/users/:slug',
      element: (
        <ProtectedRoute>
          <EditUser />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-contents',
      element: (
        <ProtectedRoute>
          <Contents />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-contents/create',
      element: (
        <ProtectedRoute>
          <CreateContent />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-contents/:slug',
      element: (
        <ProtectedRoute>
          <UpdateContent />
        </ProtectedRoute>
      ),
    },
    {
      path: '/sms-contents',
      element: (
        <ProtectedRoute>
          <SMS />
        </ProtectedRoute>
      ),
    },
    {
      path: '/sms/:category/:message',
      element: (
        <ProtectedRoute>
          <SMSMgt />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-profile',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-profile/update',
      element: (
        <ProtectedRoute>
          <UpdateProfile />
        </ProtectedRoute>
      ),
    },
  ]);

  const { refetch: getUserProfile } = useFetchMyProfile({ enabled: false });

  useLayoutEffect(() => {
    const local_user = getUser();

    if (!local_user) {
      dispatch(setUserIsLoggedOut());

      return;
    }

    getUserProfile();
  }, [dispatch, getUserProfile]);

  return (
    <>
      <div className='overflow-x-hidden relative text-white'>
        <Toast />
        <>
          <RouterProvider router={router} />
        </>
      </div>
    </>
  );
}

export default App;
