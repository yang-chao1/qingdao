// eslint-disable-next-line
import * as loginService from '@/api/login'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),
'home': () => import('@/views/home.vue'),
  // 你需要动态引入的页面组件
// 养殖场
  'yzc': () => import('@/views/jcsj/yzc/Zcqcxxda'),
  // 'xinzeng': () => import('@/views/jcsj/yzc/guimoyangzhi/xinzeng'),

  // dashboard   系统管理   ---  通知管理
  'Analysis': () => import('@/views/dashboard/Analysis'),
  // dashboard   系统管理   ---  通知管理
  'sy': () => import('@/views/dashboard/Workplace'),
   // dashboard   系统管理   ---  分类参数
   'Parameter': () => import('@/views/dashboard/classifyparameter'),

   // dashboard   系统管理   ---  区化管理
  'Monitor': () => import('@/views/dashboard/Monitor'),
  // dashboard   系统管理   ---  行政单位
  'administrative': () => import('@/views/dashboard/administrative'),
// dashboard   系统管理   ---  用户管理
  'Usercontrol': () => import('@/views/dashboard/Usercontrol'),

// dashboard   系统管理   ---  角色管理
'Authority': () => import('@/views/dashboard/authority'),
  // dashboard   系统管理   ---  权限管理
'SuperSU': () => import('@/views/dashboard/SuperSU'),
  // dashboard   系统管理   ---  密码修改
  'password': () => import('@/views/dashboard/password'),
  // dashboard   系统管理   ---  散养户及企业管理权限分配
  'logrecord': () => import('@/views/dashboard/logrecord'),

  // xdhb   先打后补   ---  养殖场强制免疫疫苗申请
'yzcqzmyymsq': () => import('@/views/xdhb/yzcqzmyymsq/yzcqzmyymsq'),

  // xdhb   先打后补   ---  基层动监站审核
'jcdjzsq': () => import('@/views/xdhb/jcdjzsq/jcdaishen'),
'jcdaishen': () => import('@/views/xdhb/jcdjzsq/jcdaishen'),
'jcyishen': () => import('@/views/xdhb/jcdjzsq/jcyishen'),

  // xdhb   先打后补   ---  区市畜牧主管部门审核
'qsxmzgbmsh': () => import('@/views/xdhb/qsxmzgbmsh/qsdaishen'),
'qsdaishen': () => import('@/views/xdhb/qsxmzgbmsh/qsdaishen'),
'qsyishen': () => import('@/views/xdhb/qsxmzgbmsh/qsyishen'),

  // xdhb   先打后补   ---  市级畜牧主管部门审核
'sjxmzgbmsh': () => import('@/views/xdhb/sjxmzgbmsh/sjxmzgbmsh'),
// 'sjxmzgbmsh': () => import('@/views/xdhb/sjxmzgbmsh/sjxmzgbmsh'),
'sjxmyishen': () => import('@/views/xdhb/sjxmzgbmsh/sjxmyishen'),

// 无害化处理
// 'cgl': () => import('@/views/whhcl/whhclgl/cgl'),
'rwfp': () => import('@/views/whhcl/clrw/rwfp'),
'sbjl': () => import('@/views/whhcl/clqk/sbjl'),
'sbjindu': () => import('@/views/whhcl/clqk/sbjindu'),
// form
  // 'BasicForm': () => import('@/views/form/basicForm'),
  // 'StepForm': () => import('@/views/form/stepForm/StepForm'),
  // 'AdvanceForm': () => import('@/views/form/advancedForm/AdvancedForm'),

  // list
  'TableList': () => import('@/views/list/TableList'),
  'StandardList': () => import('@/views/list/BasicList'),
  'CardList': () => import('@/views/list/CardList'),
  'SearchLayout': () => import('@/views/list/search/SearchLayout'),
  'SearchArticles': () => import('@/views/list/search/Article'),
  'SearchProjects': () => import('@/views/list/search/Projects'),
  'SearchApplications': () => import('@/views/list/search/Applications'),
  'ProfileBasic': () => import('@/views/profile/basic'),
  'ProfileAdvanced': () => import('@/views/profile/advanced/Advanced'),

  // result
  'ResultSuccess': () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
  'ResultFail': () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),

  // exception
  'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),

  // account
  'AccountCenter': () => import('@/views/account/center'),
  'AccountSettings': () => import('@/views/account/settings/Index'),
  'BaseSettings': () => import('@/views/account/settings/BaseSetting'),
  'SecuritySettings': () => import('@/views/account/settings/Security'),
  'CustomSettings': () => import('@/views/account/settings/Custom'),
  'BindingSettings': () => import('@/views/account/settings/Binding'),
  'NotificationSettings': () => import('@/views/account/settings/Notification'),

  // 产品A
  'chanA': () => import('@/views/component/chanA')

  // jyjg
  // 'TestWork': () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork')

}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  child: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    loginService.getCurrentUserNav(token).then(res => {
      console.log('res', res)
      const { result } = res
      const menuNav = []
      const childNav = []
      //      后端数据, 根级树数组,  根级 PID
      listToTree(result, childNav, 0)
      rootRouter.child = childNav
      menuNav.push(rootRouter)
      console.log('menuNav', menuNav)
      const routers = generator(menuNav)
       routers.push(notFoundRouter)
      console.log('routers', routers)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title = '测试', show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),
      children: [],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title || '测试',
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    currentRouter.title = '测试'
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.child && item.child.length > 0) {
      // Recursion
      currentRouter.children = generator(item.child, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        child: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.child, item.id)
      // 删掉不存在 child 值的属性
      if (child.child.length <= 0) {
        delete child.child
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
