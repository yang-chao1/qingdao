import request from '@/utils/request'
import http from '@/utils/httpapi'

const jbfkApi = {
    HusbStockGet: '/Material/BH_HusbStockGet',
    BadgeHSGet: '/Material/BS_BadgeHSGet',
    BadgeHSGetCK: '/Material/BS_BadgeHSGetCK',
    BadgeHSDel: '/Material/BS_BadgeHSDel',
    ZYRKDjList: http + '/Quarantine/FY_ZYRKDjList',
    ZYRKDjaddxllist: http + '/Quarantine/FY_ZYRKDjaddxllist',
    ZYRKDjXQ: http + '/Quarantine/FY_ZYRKDjXQ',
    Getrkwz: http + '/Quarantine/FY_Getrkwz',
    ZYRKDjInsert: http + '/Quarantine/FY_ZYRKDjInsert',
    ZYRKDjUpdateame: http + '/Quarantine/FY_ZYRKDjUpdate',
    ZYRKDjDel: http + '/Quarantine/FY_ZYRKDjDel',
    ZYCKDJList: http + '/Quarantine/FY_ZYCKDJList',
    ZYCKDJListAdd: http + '/Quarantine/FY_ZYCKDJInsert',
    ZYCKDJListUpdate: http + '/Quarantine/FY_ZYCKDJUpdate',
    ZYCKDJDel: http + '/Quarantine/FY_ZYCKDJDel',
    getrkwz: http + '/Quarantine/FY_getrkwz',
    ZYCKDJLYDW: http + '/Quarantine/FY_ZYCKDJLYDW',
    ZYCKDJXQ: http + '/Quarantine/FY_ZYCKDJXQ'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// 本人畜牧耳标库存
export function husbStockGet (parameter) {
  return request({
    url: jbfkApi.HusbStockGet + '?BHAnimal=' + parameter.BHAnimal,
    method: 'get',
    headers: {
        'UserId': parameter.UserId
      }
  })
}
// 动物标识回收
export function badgeHSGet (parameter) {
  return request({
    url: jbfkApi.BadgeHSGet + '?offset=' + parameter.Query.offset + '&limit=' + parameter.Query.limit + '&YYDW=' + parameter.Query.YYDW,
    method: 'get',
    headers: {
        'UserId': parameter.UserId
      }
  })
}
// 动物标识回收查看详情
export function badgeHSGetCK (parameter) {
  return request({
    url: jbfkApi.BadgeHSGetCK + '?FStId=' + parameter,
    method: 'get'
  })
}
// 动物标识回收删除
export function badgeHSDel (parameter) {
  return request({
    url: jbfkApi.BadgeHSDel + '?FStId=' + parameter,
    method: 'get'
  })
}
// 防疫物资入库登记列表
export function zYRKDjList (parameter) {
  return request({
    url: jbfkApi.ZYRKDjList + '?pageindex=' + parameter.offset + '&pagesize=' + parameter.limit + '&selectwhere=' + parameter.selectwhere,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资入库物资类型下拉
export function zYRKDjaddxllist (parameter) {
  return request({
    url: jbfkApi.ZYRKDjaddxllist + '?wttype=' + parameter.wttype + '&fyname=' + parameter.fyname + '&name=' + parameter.name,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资获取入库物资
export function getrkwz (parameter) {
  return request({
    url: jbfkApi.Getrkwz + '?wttype=' + parameter.wttype + '&fyname=' + parameter.fyname + '&name=' + parameter.name,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资入库登记新增
export function zYRKDjInsert (parameter, UserId) {
  return request({
    url: jbfkApi.ZYRKDjInsert,
    method: 'post',
    headers: {
      'UserId': UserId
    },
    data: parameter
  })
}
// 防疫物资入库登记详情
export function ZYRKDjXQ (parameter) {
  return request({
    url: jbfkApi.ZYRKDjXQ + '?FStId=' + parameter.FStId,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资入库登记修改
export function zYRKDjUpdate (parameter, UserId) {
  return request({
    url: jbfkApi.ZYRKDjUpdateame,
    method: 'post',
    headers: {
      'UserId': UserId
    },
    data: parameter
  })
}
// 防疫物资入库登记删除
export function zYRKDjDel (parameter) {
  return request({
    url: jbfkApi.ZYRKDjDel,
    method: 'post',
    headers: {
      'UserId': parameter.UserId
    },
    data: parameter
  })
}
// 防疫物资出库登记列表
export function zYCKDJList (parameter) {
  console.log(jbfkApi.ZYCKDJList + '?pageindex=' + parameter.pageindex + '&pagesize=' + parameter.pagesize + '&selectwhere=' + parameter.selectwhere)
 return request({
    url: jbfkApi.ZYCKDJList + '?pageindex=' + parameter.pageindex + '&pagesize=' + parameter.pagesize + '&selectwhere=' + parameter.selectwhere,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资出库新增
export function ZYCKDJListAdd (parameter, UserId) {
  return request({
    url: jbfkApi.ZYCKDJListAdd,
    method: 'post',
    headers: {
      'UserId': UserId
    },
    data: parameter
  })
}
// 防疫物资出库登记详情
export function ZYCKDJXQ (parameter) {
  return request({
    url: jbfkApi.ZYCKDJXQ + '?FStId=' + parameter.FStId,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 防疫物资出库修改
export function ZYCKDJListUpdate (parameter, UserId) {
  return request({
    url: jbfkApi.ZYCKDJListUpdate,
    method: 'post',
    headers: {
      'UserId': UserId
    },
    data: parameter
  })
}
// 防疫物资删除
export function ZYCKDJDel (parameter) {
  return request({
    url: jbfkApi.ZYCKDJDel + '?FStId=' + parameter,
    method: 'post'
    // headers: {
    //   'UserId': UserId
    // },
  })
}
// 防疫物资物资名称查询
export function Getgetrkwz (parameter) {
  return request({
    url: jbfkApi.getrkwz + '?wztype=' + parameter.wztype + '&pageindex=' + parameter.offset + '&pagesize=' + parameter.limit,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
// 出库领用单位查询

export function GetZYCKDJLYDW (parameter) {
  return request({
    url: jbfkApi.ZYCKDJLYDW + '?wztype=' + parameter.wztype + '&pageindex=' + parameter.offset + '&pagesize=' + parameter.limit,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
