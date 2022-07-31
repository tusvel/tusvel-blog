import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:5000',
});

$host.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { $host };
