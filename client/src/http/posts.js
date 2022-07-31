import { $host } from './index';

export const fetchPosts = async () => {
  const { data } = await $host.get('/posts/getAll');
  return data;
};

export const fetchPostsByTag = async (tag) => {
  const { data } = await $host.get(`/posts/getAllByTag/${tag}`);
  return data;
};

export const fetchTags = async () => {
  const { data } = await $host.get('/posts/tags');
  return data;
};

export const fetchRemovePost = async (id) => {
  const { data } = await $host.delete(`/posts/delete/${id}`);
  return data;
};
