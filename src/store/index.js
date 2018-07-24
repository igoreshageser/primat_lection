import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentUser: {
    username: 'IgoreshaGeser',
    avatar: 'https://t.me/i/userpic/320/IgoreshaGeser.jpg'
  }
}

const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = { ...payload }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
