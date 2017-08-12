import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import service from '@/api/service'
import * as types from './Types.js'
Vue.use(Vuex)
Vue.use(VueResource)

function clearSession(){
  window.sessionStorage.setItem('isLogin', '')
}

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  isLogin: window.sessionStorage.getItem('isLogin'),
  houseInfo:window.sessionStorage.getItem('houseInfo'),
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [types.HOUSE_INFO] (state, datas) {
    state.houseInfo = datas
  },
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  setHouseInfo: ({ commit, state }, params) => {
    service.setHouseInfo(params, function(datas){
      commit(types.HOUSE_INFO, datas.data)
    })
  },
}

// getters are functions
const getters = {
  isLogin: (state) => {
    return state.isLogin
  },
  getHouseInfo: state => state.houseInfo
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
