import { axios } from '@/api/axios.config';

export default {
    getAll(postId) {
        return axios.get(`/posts/${postId}/comments?limit=10`)
    },
    createComment(token, payload) {
        const options = {
            headers: { 
                Authorization: token
            }
        }
        const { id, content } = payload;
        return axios.post(`/posts/${id}/comments`, { content }, options);
    },
    deleteComment(token, payload) {
        console.log(token)
        const options = {
            headers: { 
                Authorization: token
            }
        }
        const { taskId, postId } = payload;
        return axios.delete(`/posts/${postId}/comments/${taskId}`, options);
    } 
}