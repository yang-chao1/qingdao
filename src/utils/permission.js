import Vue from 'vue'
Vue.directive('permission', {
  inserted (el, bind) {
    // eslint-disable-next-line no-unused-vars
    const arr = JSON.parse(localStorage.getItem('permissionList'))
    if (arr.indexOf(bind.value.active) === -1) {
        el.parentNode.removeChild(el)
      // el.disabled = true
      // el.setAttribute('disabled', true)
    }
  }
})
