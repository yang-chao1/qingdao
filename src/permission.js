import router from './router'
// import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
import { asyncRouterMap } from '@/config/router.config'

// import permission from './store/modules/permission'

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
// const loginRoutePath = '/user/login'
// const defaultRoutePath = '/dashboard/workplace'
router.beforeEach((to, from, next) => {
  // NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  console.log(from)

  console.log('进到方法')
  const permissionList = storage.get('permissionList')

  if (storage.get(ACCESS_TOKEN)) {
    const permissionStr = to.meta.permission
    asyncRouterMap[0].children.forEach(item => {
      if (permissionList) {
        if (permissionList.indexOf(item.meta.permission) === -1 && item.meta.title !== '首页' && item.meta.title !== '耳标号') {
          item.hidden = true
        } else {
          item.hidden = false
          if (item.children) {
            item.children.forEach(items => {
              if (permissionList.indexOf(items.meta.permission) === -1) {
                items.hidden = true
              } else {
                items.hidden = false
                if (items.children) {
                  items.children.forEach(itemt => {
                    if (permissionList.indexOf(itemt.meta.permission) === -1) {
                      itemt.hidden = true
                    } else {
                      itemt.hidden = false
                      if (itemt.children) {
                        itemt.children.forEach(itemFF => {
                          if (permissionList.indexOf(itemFF.meta.permission) === -1) {
                            itemFF.hidden = true
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      } else {
        if (item.meta.title !== '首页' && item.meta.title !== '耳标号') {
          item.hidden = true
        }
      }
    })

    if (permissionStr) {
    for (let i = 0; i < permissionList.length; i++) {
        if (permissionStr === permissionList[i]) {
          next()
          return
        }
      }
      // if (permissionList.indexOf(permissionStr) === -1) {
      //   to.hidden = true
      // } else {
      //   next()
      //   return
      // }
    } else {
      next()
      return
    }
    // 提示组件
    window.vm.$notification['success']({
      message: '温馨提示',
      description: '您没有该权限！',
      duration: 2
    })
 } else {
   next()
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})
