import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';

export const useFetchAllSubscribers = (category) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['contents', category],
    queryFn: () => request({ url: `/${category}/subscribers` }),
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
