import { postApi } from '@/api';

const initialState = () => {
  return {
    address: {
      city: {
        code: '',
        data: ''
      },
      district: {
          code: '',
          data: ''
      },
      town: {
          code: '',
          data: ''
      },
      home: ''
    },
    capacity: 0,
    square: 0,
    facility: {
      beds: 2,
      rooms: 3,
      baths: 1,
      tvs: false,
      ac: false,
      balcony: false,
      elevator: false,
      wifi: false,
      refrigerator: false,
      wm: false,
      sd: false
    },
    location: {
      lat: '',
      lng: ''
    },
    cost: {
      main: 0,
      electric: 0,
      water: 0,
      wifi: 0,
      addOn: []
    },
    roomType: {
      code: '',
      data: ''
    },
    title: '',
    description: '',
    attachment: []
  }
}

// initial state
const state = initialState()

// getters
const getters = {
  postState: state => {
    return state
  },
  postAddress: state => {
    return state.address
  },
  postSecondStep: (_state, getters) => {
    return {
      roomType: getters.postState.roomType,
      capacity: getters.postState.capacity,
      square: getters.postState.square,
      facility: getters.postState.facility
    }
  },
  postThirdStep: (_state, getters) => {
    return getters.postState.cost
  },
  postFourthStep: (_state, getters) => {
    return {
      title: getters.postState.title,
      description: getters.postState.description,
      attachment: getters.postState.attachment
    }
  },
  postReferTitle: (_state, getter) => {
    return {
      area: getter.postState.roomType.data,
      district: getter.postAddress.district.data,
      square: getter.postState.square
    }
  }
}

// actions
const actions = {
  cleanPost({commit}) { commit('reset') },
  setPostAddress({ commit }, address) {
    commit('updateAddress', address);
  },
  setSecondPost({ commit }, payload) {
    commit('updateSecondStep', payload);
  },
  setThirdPost({ commit }, cost) {
    commit('updateThirdStep', cost);
  },
  setFourthPost({ commit }, payload) {
    commit('updateFourthStep', payload);
  },
  setLocation({ commit }, payload) {
    commit('updateLocation', payload);
  },
  getAllPost() {
    return postApi.getAll();
  },

  async getPostById(_, id) {
    const token = localStorage.getItem('auth') || '';
    try {
      const res = await postApi.getPostById(token, id);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET');
    }
  },
  async uploadFile(_, payload) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');
    try {
      const res = await postApi.upload(token, payload);
      return res.data.files;
    } catch (error) {
      throw new Error('CAN_NOT_UPLOAD');     
    }
  },

  async createPost({ commit }, payload) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');

    try {
      await postApi.createPost(token, payload);
      commit('reset');
    } catch (error) {
      throw new Error('CAN_NOT_CRAETE_POST'); 
    }
  },

  async getPostsByOwner(_, id) {
    // const token = cookie.get('auth');
    // if(!token) throw new Error('TOKEN_EXPIRED');
    
    try {
      const res = await postApi.getPostsByOwner(id);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET_POSTS');       
    }
  },

  async deletePostById(_, id) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');
    
    try {
      await postApi.deletePost(token, id);
    } catch (err) {
      throw new Error('CAN_NOT_GET_POSTS');       
    }
  },

  async getPostsByFiltered(_, payload) {
    try {
      const res = await postApi.getPostsByFiltered(payload);
      return res.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET_POSTS');       
    }
  },

  async createRent(_, payload) {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');
    try {
      await postApi.createRent(token, payload);
    } catch(err) {
      throw new Error('CAN_NOT_CREATE_RENT');       
    }
  },

  async getRentByOwner() {
    const token = localStorage.getItem('auth');
    if(!token) throw new Error('TOKEN_EXPIRED');
    try {
      const response = await postApi.getRentByOwner(token);
      return response.data;
    } catch (error) {
      throw new Error('CAN_NOT_GET_RENT');             
    }
  },

  async getSuggestionsKeywords(_, keywords) {
    try {
      const results = await postApi.getSuggestionsKeywords(keywords);
      const mixData = results.data.map(item => {
        const { id, display, searchable } = item;
        return { id, description: display, text: searchable };
      });
      return mixData; 
    } catch (error) {
      throw new Error('CAN_NOT_GET_SUGGEST');
    }
  }

}

// mutations
const mutations = {
  set (state, payload) {
    Object.assign(state, payload);
  },
  reset (state) {
    Object.assign(state, initialState());
  }, 
  updateAddress(state, address) {
    Object.assign(state, { address });
  },
  updateSecondStep(state, payload) {
    const { square, capacity, facility, roomType } = payload;
    Object.assign(state, { square, capacity, facility, roomType });
  },
  updateThirdStep(state, cost) {
    Object.assign(state, { cost });
  },
  updateFourthStep(state, payload) {
    const { title, description, attachment } = payload;
    Object.assign(state, { title, description, attachment });
  },
  updateLocation(state, payload) {
    const { lat, lng } = payload;
    Object.assign(state, { location: { lat, lng } })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
