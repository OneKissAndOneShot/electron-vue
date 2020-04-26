import Vuex from "vuex";

export default Vuex.createStore({
  state: {
    num: 0
  },
  mutations: {
    UPDATE(state, num) {
      state.num = num;
    }
  },
  actions: {},
  modules: {}
});
