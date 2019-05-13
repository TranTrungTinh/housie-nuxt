const initialState = () => {
    return {
        currentTab: 1
    }
}

const state = initialState();

const getters = {
    currentTab: state => {
        return state.currentTab;
    }
}

const mutations = {
    updateProfileCurrentTab(state, currentTab) {
        Object.assign(state, { currentTab })
    }
}

const actions = {
    updateCurrentTab({ commit }, tab) {
        commit('updateProfileCurrentTab', tab)
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}