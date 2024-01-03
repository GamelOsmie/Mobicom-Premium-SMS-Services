import { useSelector } from 'react-redux';
import AdminDashboard from '../components/admin/adminDashboard';

function Dashboard() {
  const { user } = useSelector((state) => state.user);

  return <>{user?.user_role === 'Super Admin' && <AdminDashboard />}</>;
}

export default Dashboard;
