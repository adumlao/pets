import { api } from './api';

export const getPosts = async () => {
  const resp = await api.get('/posts');
  console.log(resp.data);
  return resp.data.posts;
};


export const createPost = async (id, data) => {
  const resp = await api.post(`/users/${id}/posts`, data);
  console.log(resp.data);
  return resp.data;
}

export const getUserPosts = async (id) => {
  const resp = await api.get(`/users/${id}/posts`)
  console.log(resp.data);
  return resp.data;
}

export const updatePosts = async (userId, postId, data) => {
  const resp = await api.put(`/users/${userId}/posts/${postId}`, data)
  console.log(resp.data);
  return resp.data;
}

export const deletePost = async (userId, postId) => {
  const resp = await api.delete(`/users/${userId}/posts/${postId}`)
  console.log(resp.data);
  return resp.data;
}

export const getSpecificPost = async (userId, postId) => {
  const resp = await api.get(`/users/${userId}/posts/${postId}`)
  console.log(resp.data);
  return resp.data;
}
