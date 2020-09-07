import Vue from 'vue'
import './elements'
import App from '@/App.vue'
// import ElementUI from 'element-ui';  // 引入整个element-ui
// import 'element-ui/lib/theme-chalk/index.css'; // 引入整个element-ui的样式
Vue.config.productionTip = false
// 声明使用vue的插件
// Vue.use(ElementUI)
new Vue({
  render: h => h(App)
}).$mount('#root')
