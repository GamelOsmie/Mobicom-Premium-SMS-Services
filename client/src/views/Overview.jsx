import { useSelector } from 'react-redux';
import ContentCreatorDashboard from '../components/content creator/contentCreatorDashboard';

function Overview() {
  const { user } = useSelector((state) => state.user);

  return (
    <>{user?.user_role === 'Content Creator' && <ContentCreatorDashboard />}</>
  );
}

export default Overview;
