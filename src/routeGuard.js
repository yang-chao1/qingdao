// // import Vue from 'vue'
// import router from './router'
// // import store from './store'

// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// // import { ACCESS_TOKEN } from '@/store/mutation-types'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// router.beforeEach((to, from, next) => {
//   NProgress.start() // start progress bar
//   to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
//   // && Vue.ls.get(ACCESS_TOKEN)
//   if (to.path === '/user/login') {
//     next({ path: '/dashboard/workplace' })
//     NProgress.done()
//     // && Vue.ls.get(ACCESS_TOKEN)
//   } else if (to.path !== '/user/login') {
//     next({ path: '/user/login' })
//     NProgress.done()
//   } else {
//     next()
//     NProgress.done()
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
