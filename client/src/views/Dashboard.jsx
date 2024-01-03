import { useSelector } from 'react-redux';
import AdminDashboard from '../components/admin/adminDashboard';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user?.user_role.includes('Admin') && <AdminDashboard />}
      {user?.user_role === 'Content Creator' && (
        <Navigate to='/overview' replace />
      )}
    </>
  );
}

export default Dashboard;
