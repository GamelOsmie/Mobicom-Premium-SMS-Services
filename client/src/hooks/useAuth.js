import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';
import { removeUser, storeUser } from '../utils/helpers';
import {
  clearUser,
  setUser,
  setUserIsLoggedIn,
  setUserIsLoggedOut,
} from '../redux/authSlice';
import { setNotification } from '../redux/notificationSlice';

export const useLogin = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => request({ method: 'post', url: '/auth/login', data }),
    ...options,
    onSettled: (response) => {
      const { status, data, message } = response;

      if (status === 'success') {
        storeUser({
          _id: data._id,
          email: data.email,
        });

        dispatch(setUserIsLoggedIn());
        dispatch(setUser(data));
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

export const useLogout = (options) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['logout'],
    queryFn: () => request({ url: '/auth/logout' }),
    ...options,
    enabled: false,
    onSettled: async (response) => {
      const { status, message } = response;

      if (status === 'success') {
        removeUser();
        dispatch(setUserIsLoggedOut());
        dispatch(clearUser());
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

export const useFetchMyProfile = (options) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => request({ url: '/users/me' }),
    ...options,
    enabled: false,
    onSettled: async (response) => {
      const { status, data, message } = response;

      if (status === 'success') {
        dispatch(setUser(data));
      }

      if (status === 'error') {
        removeUser();
        dispatch(setUserIsLoggedOut());
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

export const useRegisterUser = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => request({ method: 'post', url: '/auth/create-user', data }),
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
