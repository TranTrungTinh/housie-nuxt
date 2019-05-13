import { taskApi } from '@/api';
import { cookie } from '@/helpers';

const initialState = () => {
  return {
    tasks: []
  }
}

const state = initialState();

const getters = {
  tasks: state => {
    return state.tasks;
  }
}

const mutations = {
  set (state, payload) {
    Object.assign(state, payload)
  },
}

const actions = {

  async createTask(_, payload) {
    const token = cookie.get('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      await taskApi.createTask(token, payload);
    } catch (error) {
      throw new Error('CAN_NOT_CREATE_TASK');
    }
  },

  async getMyTask(_, id) {
    const token = cookie.get('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const res = await taskApi.getMyTask(token, id);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET_MY_TASK');
    }
  },

  async getTaskById(_, payload) {
    const token = cookie.get('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const res = await taskApi.getTaskById(token, payload);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET_TASK_BY_ID');
    }
  },

  async updateTask(_, payload) {
    const token = cookie.get('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const res = await taskApi.updateTask(token, payload);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_UPDATE_TASK');
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}