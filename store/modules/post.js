const state = () => ({
    news: [],
    stocks: [],
    singlePost: {}
});

const getters = {};

const mutations = {
    SET_NEWS(state, payload) {
        state.news = payload
    },
    SET_STOCKS(state, payload) {
        state.stocks = payload
    },
};

const actions = {
    setNews({commit}, payload) {
        commit('SET_NEWS', payload)
    },
    setStocks({commit}, payload) {
        commit('SET_STOCKS', payload)
    },
};


const postModule = {
    state,
    getters,
    mutations,
    actions
};

export default postModule