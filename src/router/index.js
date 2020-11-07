import Vue from 'vue'
import Router from 'vue-router'
import { asyncRouterMap } from '@/config/router.config'

// // hack router push callback
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

// const head = document.getElementsByTagName('head')
// const meta = document.createElement('meta')
// meta.name = 'referrer'
// // 根据实际情况修改referrer的值，可选值参考上文
// meta.content = 'unsafe-url'
// head[0].appendChild(meta)
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: asyncRouterMap
})

export default router
