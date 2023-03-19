import { createStore } from 'vuex'

export default createStore({
  state: {
    songInfo: {}
  },
  getters: {
  },
  mutations: {
    songInfoMutation(state, payload) {
      state.songInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

