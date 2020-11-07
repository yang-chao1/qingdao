import request from '@/utils/request'
import http from '@/utils/httpapi'

// import Qs from 'qs'
const manage = {
    allinfo: http + '/HarmlessProcess/GetYZC',
    addinfo: http + '/HarmlessProcess/GetYZCXZ',
    deleteinfo: http + '/HarmlessProcess/GetYZCSC',
    updateinfo: http + '/HarmlessProcess/GetYZCXG',
    checkInfo: http + '/HarmlessProcess/SelectYZC',
    checkOFF: http + '/HarmlessProcess/YZCOFF',
    Bindmobile: http + '/HarmlessProcess/Bindmobile',
    DeleteBindmobile: http + '/HarmlessProcess/DeleteBindmobile'

}
// 查询所有用户信息
export function findAll (p) {
    return request({
      url: manage.allinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&FSunitUstrId=' + p.FSunitUstrId + '&FSyzcmc=' + p.FSyzcmc + '&FSfzr=' + p.FSfzr + '&FSzt=' + p.FSzt,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 新增
export function AddInfo (p, UserId) {
  console.log(p)
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
export function UpdateInfo (p, UserId) {
    return request({
      url: manage.updateinfo,
      method: 'post',
      data: p,
      headers: {
        'UsersId': UserId
      }
    })
}
// 根据fstid查询数据
export function checkInfo (p) {
  return request({
    url: manage.checkInfo + '?FStId=' + p.FStId,
    method: 'get'
  })
}
// 禁用启用
export function checkOFFs (p) {
  return request({
    url: manage.checkOFF + '?FstId=' + p.FStId + '&FSzt=' + p.FSzt + '&FuseEid=' + p.FuseEid,
    method: 'post'
  })
}
// 电话号码添加
export function getBindmobile (p) {
  return request({
    url: manage.Bindmobile + '?FStId=' + p.FStId + '&Mobile=' + p.Mobile + '&EnterpriseName=' + p.EnterpriseName + '&Type=' + p.Type,
    method: 'post',
    headers: {
      'UserId': p.UserId
    }
  })
}
// 电话号码删除
export function getDeleteBindmobile (Mobile) {
  return request({
    url: manage.DeleteBindmobile + '?Mobile=' + Mobile,
    method: 'post'
  })
}
