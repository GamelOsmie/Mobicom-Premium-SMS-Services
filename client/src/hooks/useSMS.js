import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';

import { setNotification } from '../redux/notificationSlice';

export const useBlastSMS = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => request({ method: 'post', url: '/blast-sms', data }),
    ...options,
    onSettled: (response) => {
      const { status, message } = response;

      if (status === 'success') {
        dispatch(
          setNotification({
            type: 'success',
            message,
          }),
        );
      }

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
