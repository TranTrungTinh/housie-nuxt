import { authApi } from '@/api';
import { messageError } from '@/helpers/messageError';
import { cookie } from '@/helpers';

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
  async nuxtServerInit({ commit }, { req }) {
    console.log(req.headers.cookie)
  },
  async firstLoading({ commit }) {
    const token = cookie.get('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      const response = await authApi.fetchUser(token);
      commit('loginSuccess', { user: response.data.user });
    } catch(error) {
      throw new Error('FAIL_FETCH_API_ME');
    }
  },

  initAuth({ commit }, req) {
    console.log(req);
  },

  async logout ({ commit }) {
    try {
      const token = cookie.get('auth');
      await authApi.logout(token);
      cookie.remove('auth');
      cookie.remove('authFb');
      commit('logout');
    } catch (error) {
      throw new Error('CAN_NOT_LOGOUT');      
    }
  },

  async login ({ commit }, payload) {
    const { email, password } = payload;
    try {
      const response = await authApi.login(email, password);
      commit('loginSuccess', { user: response.data.user, userId: response.data.id });
      cookie.set('auth', response.data.id);
    } catch (error) {
      commit('loginFail', messageError(error.response.status))
    }
  },

  async loginGoogle({ commit }, payload) {
    const { token } = payload;
    try {
      const response = await authApi.loginGoogle(token);
      commit('loginSuccess', { user: response.data.user });
      cookie.set('auth', response.data.id);
    } catch(ex) {
      throw new Error('GOOGLE_FAIL');
    }
  },

  async loginFacebook({ commit }, payload) {
    const token = payload.token || cookie.get('authFb');
    try {
      const response = await authApi.loginFacebook(token);
      commit('loginSuccess', { user: response.data.user });
      cookie.set('auth', response.data.id);
    } catch(ex) {
      throw new Error('FACEBOOK_FAIL');
    }
  },

  logoutFacebook({ commit }, payload) {
    cookie.set('authFb', payload.token);
  },

  async signUp(_, payload) {
    return authApi.signUp(payload);
  },

  async updateProfile({ commit }, profile) {
    const token = cookie.get('auth');
    if(!token) return;

    try {
      const response = await authApi.updateProfile(token, profile);
      commit('updateProfile', { user: response.data });
    } catch(error) {
      throw new Error('FAIL_UPDATE_PROFILE');
    }
  },

  async changePassword(_, profile) {
    const token = cookie.get('auth');
    if(!token) return;

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
