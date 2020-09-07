import Vue from 'vue'
import App from '@/App.vue'
// import router from './router'
import store from './vuex/store.js'

// 不显示当前不是生产环境打包的提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router,
  store
}).$mount('#root')