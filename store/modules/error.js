const state = () => ({
    content: [],
});

const getters = {};

const mutations = {
    SET_ERROR_PAGE_CONTENT(state, payload) {
        state.content = payload
    },
};


const actions = {
    setContent({commit}, payload) {
        commit('SET_ERROR_PAGE_CONTENT', payload)
    }
};

const errorModule = {
    state,
    getters,
    mutations,
    actions
};

export default errorModule
