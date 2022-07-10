import axios from 'axios';
// import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  'Access-Control-Allow-Credentials': true,
});

instance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  // eslint-disable-next-line no-unused-vars
  const { data } = response;
  return response.data;
});

export default instance;
