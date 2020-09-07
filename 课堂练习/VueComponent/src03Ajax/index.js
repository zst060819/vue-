import '@babel/polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from '@/App.vue'
// import './base.css' // 可以作用于所有组件
// Vue.prototype.$globaEventBus = new Vue()
Vue.config.productionTip = false
Vue.use(VueResource)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#root')
