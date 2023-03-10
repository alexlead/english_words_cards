import { createStore } from 'vuex'

export default createStore({
  state: {

      currentLibrary: [],

  },
  getters: {
    getCurrentLibrary (state) {
      return state.currentLibrary;
    }
  },
  mutations: {
    setCurrentLibrary(state, arr){
      state.currentLibrary = arr;
    }
  },
  actions: {
  },
  modules: {
  }
})
