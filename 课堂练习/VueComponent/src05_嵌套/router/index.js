import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MessageDetail from '@/pages/MessageDetail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  // mode: 'hash'
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/news',
          component: News,
        },
        {
          // path: '/home/message', // 完整写法
          path: 'message', // 简写  注意左边没有/
          component: Message,
          children: [
            {
              name: 'Detail',
              // path: '/home/message/detail/:id',
              path: 'detail/:id',
              component: MessageDetail,
              props: route => ({
                _id: route.params.id,
                _title: route.query.title
              })
            }
          ]
        },
        { // 自动重定向的路由  当请求/home时自动跳转到/home/news
          // path: '/home',
          path: '', // 相当于/home
          redirect: '/home/news'
        }
      ]
    },
    { // 自动跳转的路由
			path: '/', // 项目根路径
			redirect: '/about' // 自动转向到/about
		}
  ],
  linkActiveClass: 'my-active' // 配置当前路由链接的类名
})