import Vue from 'vue'
import App from '@/App.vue'
// import './base.css' // 可以作用于所有组件
// Vue.prototype.$globaEventBus = new Vue()
Vue.config.productionTip = false
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#root')
