import { authApi } from '@/api';
import { messageError } from '@/helpers/messageError';

const initialState = () => {
  return {
    userId: null,
    user: {},
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
  userId: state => {
    return state.userId
  },
  currentUser: (_state, getters) => {
    return getters.authState.user
  },
  currentError: (_state, getters) => {
      return getters.authState.error
  },
  isAuthenticated: (_, getters) => {
    return getters.userId;
  }
}

// actions
const actions = {
  async firstLoading({ commit }) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const response = await authApi.fetchUser(token);
      commit('loginSuccess', { user: response.data.user, userId: token });
    } catch(error) {
      localStorage.removeItem('auth');
      throw new Error('FAIL_FETCH_API_ME');
    }
  },

  async logout ({ commit }) {
    try {
      const token = localStorage.getItem('auth');
      await authApi.logout(token);
      localStorage.removeItem('auth');
      localStorage.removeItem('authFb');
      commit('reset');
    } catch (error) {
      throw new Error('CAN_NOT_LOGOUT');      
    }
  },

  async login ({ commit }, payload) {
    const { email, password } = payload;
    try {
      const response = await authApi.login(email, password);
      commit('loginSuccess', { user: response.data.user, userId: response.data.id });
      localStorage.setItem('auth', response.data.id);
    } catch (error) {
      commit('loginFail', messageError(error.response.status))
    }
  },

  async loginGoogle({ commit }, payload) {
    const { token } = payload;
    try {
      const response = await authApi.loginGoogle(token);
      commit('loginSuccess', { user: response.data.user, userId: response.data.id });
      localStorage.setItem('auth', response.data.id);
    } catch(ex) {
      throw new Error('GOOGLE_FAIL');
    }
  },

  async loginFacebook({ commit }, payload) {
    const token = payload.token || localStorage.getItem('authFb');
    try {
      const response = await authApi.loginFacebook(token);
      commit('loginSuccess', { user: response.data.user, userId: response.data.id });
      localStorage.setItem('auth', response.data.id);
    } catch(ex) {
      throw new Error('FACEBOOK_FAIL');
    }
  },

  logoutFacebook({ commit }, payload) {
    localStorage.setItem('authFb', payload.token);
  },

  async signUp(_, payload) {
    return authApi.signUp(payload);
  },

  async updateProfile({ commit }, profile) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const response = await authApi.updateProfile(token, profile);
      commit('updateProfile', { user: response.data });
    } catch(error) {
      throw new Error('FAIL_UPDATE_PROFILE');
    }
  },

  async changePassword(_, profile) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      await authApi.changePassword(token, profile);
    } catch(error) {
      throw new Error('FAIL');
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
    Object.assign(state, { ...payload, error: '' });
  },
  updateProfile(state, payload) {
    Object.assign(state, { user: payload.user })
  },
  loginFail(state, error) {
    Object.assign(state, { error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
