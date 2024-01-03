import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';

import { setNotification } from '../redux/notificationSlice';

export const useFetchAllUsers = ( ) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => request({ url: '/users' }),
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

export const useFetchUser = ({ slug, options }) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['users', 'slug'],
    queryFn: () => request({ url: `/users/${slug}` }),
    ...options,
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

export const useUpdateUser = ({ options, slug }) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({ method: 'put', url: `/users/${slug}`, data }),
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

export const useUpdateMyProfile = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({ method: 'put', url: '/users/update/profile', data }),
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

export const useUpdateMyPassword = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({ method: 'put', url: '/users/update/password', data }),
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
