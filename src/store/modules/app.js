const state = {
  defaultAccout: '',
  tokenData:[],
  pairData:[],
  tolerance:sessionStorage.getItem('tolerance') || 0.5,
  language:'en'
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
  },
  SET_LANGUAGE(state, name) {
    state.language = name
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
  setPairData({ commit }, name) {
    commit('SET_PAIR_DATA', name)
  },
  setTolerance({ commit }, name) {
    commit('SET_TOLERANCE', name)
  },
  setLanguage({ commit }, name) {
    commit('SET_LANGUAGE', name)
  }
}
export default {
  state,
  mutations,
  actions
}
