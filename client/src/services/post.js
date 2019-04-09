import { api } from './api';

export const getPosts = async () => {
  const resp = await api.get('/posts');
  return resp.data.posts;
};


export const createPost = async (data) => {
  const resp = await api.post('/posts', data);
  console.log(resp.data);
  return resp.data;
}
