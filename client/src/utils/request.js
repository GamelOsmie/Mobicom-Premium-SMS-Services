import axios from 'axios';
// export const baseURL = 'http://localhost:5000/api/v1'; 
export const baseURL = 'http://146.190.169.69/api/v1';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export const request = async ({ ...options }) => {
  const onSuccess = (response) => response.data;
  const onError = (error) => error.response.data;

  try {
    const response = await instance(options);

    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
