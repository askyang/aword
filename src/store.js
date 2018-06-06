// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    userInfo: {},
    hasUserInfo: false
  },
  mutations: {
    storeUserInfo (state, payload) {
      state.userInfo = payload
    },
    storeHasUserInfo(state, payload) {
      state.hasUserInfo = payload
    }
  }
})

export default store