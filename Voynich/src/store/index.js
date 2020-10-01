import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    user: null,
    token: null
  },
  getters:{
    isLogin(state){
      return state.user;
    }
  },
  mutations:{
    setUser(state,user){
      state.user = user;
    },
    setToken(state, token){
      state.token = token;
    }
  }

});