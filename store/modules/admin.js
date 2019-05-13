import { authApi } from '@/api';
import { messageError } from '@/helpers/messageError';

const initialState = () => {
  return {
    adminId: '',
    admin: {},
    role: '',
    error: ''
  }
}

// initial state
const state = initialState()

// getters
const getters = {
  authState: state => {
    return state
  },
  currentAdmin: (_state, getters) => {
    return getters.authState.admin
  },
  currentError: (_state, getters) => {
      return getters.authState.error
  }
}

// actions
const actions = {

  async login ({ commit }, payload) {
    const { email, password } = payload;
    try {
      const response = await authApi.login(email, password);
      const { id, user, role } = response.data;
      commit('loginSuccess', { admin: user, adminId: id, role: role });
    } catch (error) {
      commit('loginFail', messageError(error.response.status))
    }
  },

  clearError({ commit }) {
    commit('resetError');
  }

}

// mutations
const mutations = {
  set (state, payload) {
    Object.assign(state, payload)
  },
  reset (state) {
    Object.assign(state, initialState())
  },
  resetError(state) {
    Object.assign(state, { error: '' })
  },
  loginSuccess(state, payload) {
    Object.assign(state, { ...payload, error: '' })
  },
  loginFail(state, error) {
    Object.assign(state, { error })
  },
  logout(state) {
    Object.assign(state, { user: {} })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
