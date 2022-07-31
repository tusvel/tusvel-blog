import { $host } from './index';

export const userLogin = async (params) => {
  const { data } = await $host.post('/users/login', params);
  return data;
};

export const userRegister = async (params) => {
  const { data } = await $host.post('/users/registration', params);
  return data;
};

export const userCheck = async () => {
  const { data } = await $host.get('/users/check');
  return data;
};
