import { $host } from './index';

export const fetchCommentById = async (params) => {
  const { data } = await $host.get(`/comment/getAllByPost/${params.post}`);
  return data;
};
