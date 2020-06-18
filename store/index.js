export const state = () => {
    return {
        apartments: [],
        apartmentsCount: null,
        apartmentsFilter: {},
        houseList: {},
    }
};

export const mutations = {
    SET_APARTMENTS(state, payload) {
        state.apartments = payload;
    },
    SET_APARTMENTS_COUNT(state, payload) {
        state.apartmentsCount = payload;
    },
    SET_APARTMENTS_FILTER(state, payload) {
        state.apartmentsFilter = payload;
    },
    SET_APARTMENTS_FILTER_AREA(state, payload) {
        state.apartmentsFilter.area = payload;
    },
    SET_APARTMENTS_FILTER_FLAT(state, payload) {
        state.apartmentsFilter.flat = payload;
    },
    SET_APARTMENTS_FILTER_PRICE(state, payload) {
        state.apartmentsFilter.price = payload;
    },
    SET_HOUSE_LIST(state, payload) {
        state.houseList = payload;
    },
};

export const actions = {
    async setApartments({commit}, payload) {
        commit('SET_APARTMENTS', payload)
    },
    async setApartmentsCount({commit}, payload) {
        commit('SET_APARTMENTS_COUNT', payload)
    },
    async setApartmentsFilter({commit}, payload) {
        commit('SET_APARTMENTS_FILTER', payload)
    },
    async setApartmentsFilterArea({commit}, payload) {
        // console.log('vuex: setApartmentsFilterArea....');
        commit('SET_APARTMENTS_FILTER_AREA', payload)
    },
    async setApartmentsFilterFlat({commit}, payload) {
        commit('SET_APARTMENTS_FILTER_FLAT', payload)
    },
    async setApartmentsFilterPrice({commit}, payload) {
        // console.log('vuex: SET_APARTMENTS_FILTER_PRICE....');
        commit('SET_APARTMENTS_FILTER_PRICE', payload)
    },
    async setHouseList({commit}, payload) {
        commit('SET_HOUSE_LIST', payload)
    },
};