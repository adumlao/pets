import { api } from './api';

export const getPosts = async () => {
  const resp = await api.get('/posts');
  console.log(resp.data);
  return resp.data.posts;
};


export const createPost = async (data) => {
  const resp = await api.post('/posts', data);
  console.log(resp.data);
  return resp.data;
}

export const getUserPosts = async (id) => {
  const resp = await api.get(`/users/${id}/posts`)
  console.log(resp.data);
  return resp.data;
}
