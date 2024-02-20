import { default as axios, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
// const baseURL = process.env.BASE_URL || 'http://localhost:3000'
// Todo: convert http to https

export const api = (): AxiosInstance => {
  const baseUrl = 'http://localhost:3000';
  const params: AxiosRequestConfig = {
    baseURL: `${baseUrl}/api/`,
    headers: { 'X-Custom-Header': 'foobar', Accept: '*', 'Access-Control-Allow-Origin': '*' },
  };

  return axios.create(params);
};

export const catchErrorHandeler = (error: AxiosError) => {
  // Handle the error
  if (error.response) {
    // The request was made and the server responded with a status code
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};
