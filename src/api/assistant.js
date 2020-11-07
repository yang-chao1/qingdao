import request from '@/utils/request'
import http from '@/utils/httpapi'
const assistantTop = {
    CFYYInforFileGet: http + '/HarmlessProcess/TV_CFYYInforFileGet',
    CFYYInforFileGetCK: http + '/HarmlessProcess/TV_CFYYInforFileGetCK',
    CFYYInforFileAdd: http + '/HarmlessProcess/TV_CFYYInforFileAdd',
    CFYYInforFileDe: http + '/HarmlessProcess/TV_CFYYInforFileDel',
    CFYYInforFileUp: http + '/HarmlessProcess/TV_CFYYInforFileUp'
}
// 查询列表
export function getCFYYInforFileGet (parameter) {
    return request({
      url: assistantTop.CFYYInforFileGet + '?offset=' + parameter.offset + '&limit=' + parameter.limit + '&FSunitUstrId=' + parameter.FSunitUstrId + '&FEPCName=' + parameter.FEPCName,
      method: 'get',
      headers: {
        'UserId': parameter.UserId
      }
    })
}
// 查询单项
export function getCFYYInforFileGetCK (parameter) {
    return request({
      url: assistantTop.CFYYInforFileGetCK + '?FStId=' + parameter,
      method: 'get'
    })
}
// 新增
export function getCFYYInforFileAdd (data, UserId) {
    return request({
      url: assistantTop.CFYYInforFileAdd,
      method: 'post',
      data: data,
      headers: {
          'UserId': UserId
      }
    })
}
// 删除
export function getCFYYInforFileDe (parameter) {
    return request({
      url: assistantTop.CFYYInforFileDe + '?FStId=' + parameter,
      method: 'get'
    })
}
// 修改
export function getCFYYInforFileUp (data, UserId) {
  return request({
    url: assistantTop.CFYYInforFileUp,
    method: 'post',
    data: data,
    headers: {
        'UserId': UserId
    }
  })
}
