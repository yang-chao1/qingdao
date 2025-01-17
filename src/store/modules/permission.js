import { asyncRouterMap } from '@/config/router.config'

// /**
//  * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
//  *
//  * @param permission
//  * @param route
//  * @returns {boolean}
//  */
// function hasPermission (permission, route) {
//   if (route.meta && route.meta.permission) {
//     let flag = false
//     for (let i = 0, len = permission.length; i < len; i++) {
//       flag = route.meta.permission.includes(permission[i])
//       if (flag) {
//         return true
//       }
//     }
//     return false
//   }
//   return true
// }

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

// function filterAsyncRouter (routerMap, roles) {
//   const accessedRouters = routerMap.filter(route => {
//     if (hasPermission(roles.permissionList, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: asyncRouterMap,
    addRouters: asyncRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // state.addRouters = routers
      state.route[0].children = routers
      state.addRouters = state.route
      console.log(state.addRouters)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', data)
        resolve()
      })
    }
  }
}

export default permission
