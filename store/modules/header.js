const initialState = () => {
    return {
        step: 1,
        isStepHeader: false
    }
}
  
const state = initialState();

const getters = {
    step: state => {
        return state.step;
    },
    currentHeader: state => {
        return state.isStepHeader;
    }
}

const mutations = {
    setStep (state, step) {
        Object.assign(state, { step })
    },
    setCurrentHeader (state, isStepHeader) {
        Object.assign(state, { isStepHeader })
    },
    reset(state) {
        Object.assign(state, initialState())
    }
}

const actions = {
    setCurrentStep({ commit }, step) {
        commit('setStep', step);
    },
    setCurrentHeader({ commit }, option) {
        commit('setCurrentHeader', option);
    },
    resetHeader({ commit }) {
        commit('reset');
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}