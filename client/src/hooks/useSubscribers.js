import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';
import { setNotification } from '../redux/notificationSlice';

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

export const useFetchSMSTargetGroup = (category) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['sms-target-group', category],
    queryFn: () => request({ url: `/${category}/subscribers/sms-targets` }),
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


export const useSearchSubscriber = ({options, category}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({
        method: 'post',
        url: `/${category}/subscribers/search`,
        data,
      }),
    ...options,
    onSettled: (response) => {
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