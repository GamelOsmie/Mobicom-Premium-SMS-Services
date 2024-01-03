import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { request } from '../utils/request';

import { setNotification } from '../redux/notificationSlice';

export const useCreateContent = (options) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => request({ method: 'post', url: `/contents`, data }),
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

export const useFetchAllContents = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['contents'],
    queryFn: () => request({ url: '/contents' }),
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

export const useFetchAllMyContents = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['contents-mine'],
    queryFn: () => request({ url: '/contents/mine/all' }),
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

export const useFetchMyContent = (slug) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['contents-mine', slug],
    queryFn: () => request({ url: `/contents/mine/all/${slug}` }),
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

export const useFetchContent = (slug) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['contents', 'slug'],
    queryFn: () => request({ url: `/contents/${slug}` }),
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

export const useUpdateContent = ({ options, slug }) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({ method: 'put', url: `/contents/mine/${slug}`, data }),
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

export const useUpdateContentApprovalStatus = ({ options, slug }) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) =>
      request({ method: 'put', url: `/contents/${slug}`, data }),
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
