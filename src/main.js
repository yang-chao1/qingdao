// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import mavonEditor from 'mavon-editor'
import '../node_modules/mavon-editor/dist/css/index.css'
import Antd from '../node_modules/ant-design-vue'
import '../node_modules/ant-design-vue/dist/antd.css'
import Viewer from 'v-viewer'
// import Print from '@/plugs/print'
import Print from 'vue-print-nb'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import 'viewerjs/dist/viewer.css'
import './utils/permission'
Vue.prototype.$axios = axios
Vue.use(Viewer)
Vue.use(Print)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.use(Antd)
Vue.use(mavonEditor)
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: '1343be9bead95cfe405403c5bbb4562e'
})
Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}年${m}月${d}日`
})
Vue.filter('dateFormatH', function (originVal) {
  const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    // const mm=(dt.getMinutes()+'').padStart(2,'0')
    // const ss=(dt.getSeconds()+'').padStart(2,'0')
    return `${y}年${m}月${d}日 ${hh}时`
})
Vue.filter('dateFormatHms', function (originVal) {
  const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
})
Vue.filter('replaceX', function (originVal) {
    if (originVal) {
      return originVal.replace(/\//g, '')
    }
})
window.umi_plugin_ant_themeVar = themePluginConfig.theme
window.vm = new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
