import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 0
}
const mutations = {
  increment(state){
    state.count++
  },
  decrement(state){
    state.count--
  },
}
const actions = {
  // increment(context){
  //   context.commit('increment')
  // },
  // decrement(context){
  //   context.commit('decrement')
  // },
  incrementOrOdd({commit,state}){
    if (state.count % 2 !== 0) {
      commit('increment')
    }
  },
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('increment')
    }, 1000);
  }
}
const getters = {
  evenOrOdd(state){
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store ({
  state,
  mutations,
  actions,
  getters,
})
