const state = {
  defaultAccout: '',
  tokenData:[],
  pairData:[],
  tolerance:0
}
const mutations = {
  SET_DEFAULT_ACCOUT(state, name) {
    state.defaultAccout = name
  },
  SET_TOKEN_DATA(state, name) {
    state.tokenData = name
  },
  SET_PAIR_DATA(state, name) {
    state.pairData = name
  },
  SET_TOLERANCE(state, name) {
    state.tolerance = name
  }
}
const actions = {
  // 设置name
  setDefaultAccout({ commit }, name) {
    commit('SET_DEFAULT_ACCOUT', name)
  },
  setTokenData({ commit }, name) {
    commit('SET_TOKEN_DATA', name)
  },
  setTokenData({ commit }, name) {
    commit('SET_PAIR_DATA', name)
  },
  setTolerance({ commit }, name) {
    commit('SET_TOLERANCE', name)
  }
}
export default {
  state,
  mutations,
  actions
}
