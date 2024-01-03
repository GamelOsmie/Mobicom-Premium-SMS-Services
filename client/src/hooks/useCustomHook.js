import { useMutation, useQuery } from 'react-query';
import { request } from '../utils/request';

export const useFetch = (url, options) => {
  return useQuery(url, () => request({ url }), options);
};
