import { commentApi } from '@/api';
import { cookie } from '@/helpers';

// const initialState = () => {
//     return {
//     }
// }
  
// const state = initialState();

// const getters = {
//     // step: state => {
//     //     return state;
//     // },
//     // currentHeader: state => {
//     //     return state.isStepHeader;
//     // }
// }

// const mutations = {
//     setStep (state, step) {
//         Object.assign(state, { step })
//     },
//     reset(state) {
//         Object.assign(state, initialState())
//     }
// }

const actions = {
    async getCommentsByPostId(_, id) {
        try {
            const res = await commentApi.getAll(id);
            return res.data;
        } catch (error) {
            throw new Error('CAN_NOT_GET_COMMENT');
        }
    },
    async createComment(_, payload) {
        const token = cookie.get('auth');
        if(!token) throw new Error('TOKEN_EXPIED');

        try {
            const res = await commentApi.createComment(token, payload);
            return res.data;
        } catch (error) {
            throw new Error('CAN_NOT_POST_COMMENT');            
        }
    },
    async deleteComment(_, payload) {
        const token = cookie.get('auth');
        if(!token) throw new Error('TOKEN_EXPIED');

        try {
            await commentApi.deleteComment(token, payload);
        } catch (error) {
            throw new Error('CAN_NOT_DELETE_COMMENT');            
        }
    }
}
  
export default {
    namespaced: true,
    // state,
    // getters,
    // mutations,
    actions
}