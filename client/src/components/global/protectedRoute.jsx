import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  let location = useLocation();
  const { loggedIn } = useSelector((state) => state.user);

  if (!loggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
