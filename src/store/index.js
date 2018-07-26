import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentUser: {}
}

const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = { ...payload }
  },
  deleteCurrentUser(state) {
    state.currentUser = {}
  }
}

const getters = {
  userAuth(state) {
    return Object.keys(state.currentUser).length
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
