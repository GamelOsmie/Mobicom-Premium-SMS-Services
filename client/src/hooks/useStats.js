import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';

import { setNotification } from '../redux/notificationSlice';

export const useGetDashboardStats = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['overview-stats'],
    queryFn: () => request({ url: '/records/dashboard-overview' }),
    onSettled: async (response) => {
      const { status, message } = response;

      if (status === 'error') {
        dispatch(
          setNotification({
            type: 'error',
            message,
          }),
        );
      }
    },
  });
};
