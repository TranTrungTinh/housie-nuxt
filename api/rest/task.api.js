import { axios } from '@/api/axios.config';

export default {
  createTask(token, payload) {
    const options = {
        headers: { 
          Authorization: token
        }
    }
    const { id, message, duedate } = payload;
    return axios.post(`/posts/${id}/tasks`, { message, duedate }, options);
  },
  getMyTask(token, idUser) {
    const options = {
      headers: { 
        Authorization: token
      }
    }
    return axios.get(`/Accounts/${idUser}/tasks`, options);
  },
  getTaskById(token, payload) {
    const options = {
      headers: { 
        Authorization: token
      }
    }
    const { postId, taskId } = payload;
    return axios.get(`/posts/${postId}/tasks/${taskId}`, options);
  },
  updateTask(token, payload) {
    const options = {
      headers: { 
        Authorization: token
      }
    }
    const { postId, taskId, message } = payload;
    return axios.put(`/posts/${postId}/tasks/${taskId}`, { message } ,options);
  }
}