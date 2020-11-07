import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/HarmlessProcess/GetCTPGALL',
    addinfo: http + '/HarmlessProcess/InsertCTPG',
    updateinfo: http + '/HarmlessProcess/UpdateCTPG',
    deleteinfo: http + '/HarmlessProcess/DelCTPG',
    checkItem: http + '/HarmlessProcess/SelectCTPG',
    WHHOFF: http + '/HarmlessProcess/WHHOFF'

}
// 查询所有用户信息
export function findAll (p) {
    return request({
      url: manage.allinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&FSunitUstrId=' + p.FSunitUstrId + '&FFcmc=' + p.FFcmc + '&FSzt=' + p.FSzt,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 根据FStId 查询
export function checkItemInfo (p) {
  return request({
    url: manage.checkItem + '?FStId=' + p,
    method: 'get'
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
// 修改
export function UpdateInfo (p) {
  console.log(p)
    return request({
      url: manage.updateinfo,
      method: 'post',
      data: p,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
// 启用或禁用
export function GetWHHOFF (p, UserId) {
  return request({
    url: manage.WHHOFF + '?FuTableTid=' + p,
    method: 'post',
    headers: {
      'UserId': UserId
    }
  })
}
