const state = {
    show: false
}
const mutations = {
    CHANGE_STATE: (state, show) => {
        state.show = show
    }
}
const actions = {
    changeState({ commit }, show) {
        commit('CHANGE_STATE', show)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}