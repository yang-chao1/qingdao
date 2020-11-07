import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/HarmlessProcess/GetHASAll',
    addinfo: http + '/HarmlessProcess/InsertHAS',
    deleteinfo: http + '/HarmlessProcess/DelHAS',
    updateinfo: http + '/HarmlessProcess/UpdateHAS',
    findbyid: http + '/HarmlessProcess/SelectHAS',
    TZCOFF: http + '/HarmlessProcess/TZCOFF'
}
// 查询所有用户信息
export function findAll (p) {
    return request({
      url: manage.allinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&FSunitUstrId=' + p.FSunitUstrId + '&FhName=' + p.FhName + '&FSzt=' + p.FSzt,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 新增
export function AddInfo (p, UserId) {
    return request({
      url: manage.addinfo,
      method: 'post',
      data: p,
      headers: {
        'UserId': UserId
      }
    })
}
// 删除
export function DeleteInfo (p) {
    return request({
      url: manage.deleteinfo,
      method: 'post',
      data: p
    })
}
// 修改
export function UpdateInfo (p) {
    return request({
      url: manage.updateinfo + '?FStId=' + p.FStId,
      method: 'post',
      data: p
    })
}
// 根据FStid查询info
export function FindById (p) {
    return request({
      url: manage.findbyid + '?FStId=' + p,
      method: 'get'
    })
}
// 启用或禁用
export function GetTZCOFF (p, UserId) {
  return request({
    url: manage.TZCOFF + '?FuTableTid=' + p,
    method: 'post',
    headers: {
      'UserId': UserId
    }
  })
}
