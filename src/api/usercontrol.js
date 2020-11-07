import request from '@/utils/request'
import http from '@/utils/httpapi'
// import user from '@/store/modules/user'
// import store from '@/store'
// import { getToken } from '@/api/getToken'
const usercoApi = {

  FAUser: http + '/User/GetUsers',
  AUser: http + '/User/AppletUserAdd',
  UDUser: http + '/User/PutUserUp',
  DUser: http + '/User/DelUserBatch',
  RUPwd: http + '/User/PutPassword',
  FUDanWei: http + '/User/UnitType',
  FBFStId: http + '/User/GetUserSelectUp',
  FBName: http + '/User/GetUserWhere',
  CKUser: http + '/User/GetRole',
  DISUser: http + '/User/AppletAisable',
  Condit: http + '/User/GetUnitType'
}
// 查询所有用户信息
export function findAllUser (parameter) {
  return request({
    url: usercoApi.FAUser + '?FSunitUstrId=' + parameter.FSunitUstrId + '&FuName=' + parameter.FuName + '&offset=' + parameter.offset + '&limit=' + parameter.limit + '&FSzt=' + parameter.FSzt,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'AccessToken': parameter.token,
      'timestamp': parameter.timestamp,
      'UserId': parameter.UserId
    }
  })
}
// 查询通过用户名
export function FinfByName (parameter) {
  return request({
    url: usercoApi.FBName + '?offset=' + parameter.offset + '&limit=' + parameter.limit + '&FuName=' + parameter.FuName,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'AccessToken': parameter.token,
      'timestamp': parameter.timestamp
    }
  })
}
// 查询通过FStID
export function FindByFStId (parameter) {
  return request({
    url: usercoApi.FAUser + '?FStId=' + parameter,
    method: 'get'
  })
}
// 新增查询户单位
export function FindUserDanWei (parameter) {
  return request({
    url: usercoApi.FUDanWei,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'AccessToken': parameter.AccessToken,
      'timestamp': parameter.timestamp

    }
  })
}
// 增加用户
export function AddUser (parameter, queryInfo) {
  return request({
    url: usercoApi.AUser,
    method: 'post',
    data: parameter,
    headers: {
      'AccessToken': queryInfo.AccessToken,
      'timestamp': queryInfo.timestamp,
      'UserId': queryInfo.UserId
    }
  })
}
// 修改用户
export function UpdateUser (parameter) {
  return request({
    url: usercoApi.UDUser,
    method: 'post',
    data: parameter
  })
}
// 删除用户
export function DeleteUser (parameter) {
  return request({
    url: usercoApi.DUser + '?FStId=' + parameter.FStId,
    method: 'post',
    headers: {
      'AccessToken': parameter.token,
      'timestamp': parameter.timestamp,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 重置密码
export function ReplaceUserPassword (parameter) {
  return request({
    url: usercoApi.RUPwd + '?FStId=' + parameter.FStId,
    method: 'post',
    headers: {
      'AccessToken': parameter.token,
      'timestamp': parameter.timestamp,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 用户角色查询
export function checkUserPole (parameter) {
  return request({
    url: usercoApi.CKUser,
    method: 'get',
    headers: {
      'AccessToken': parameter.AccessToken,
      'timestamp': parameter.timestamp

    }
  })
}
// 禁用角色
export function DISUserPole (parameter) {
  return request({
    url: usercoApi.DISUser + '?FStId=' + parameter.FStId + '&FuLogoff=' + parameter.FuLogoff,
    method: 'post',
    headers: {
      'AccessToken': parameter.AccessToken,
      'timestamp': parameter.timestamp

    }
  })
}
// 条件查询
export function checkCondit (parameter) {
  return request({
    url: usercoApi.Condit + '?limit=' + parameter.limit + '&offset=' + parameter.offset + '&FSQuFenName=' + parameter.FSQuFenName + '&FSeName=' + parameter.FSeName,
    headers: {
      'AccessToken': parameter.AccessToken,
      'timestamp': parameter.timestamp,
      'UserId': parameter.UserId
    },
    method: 'get'
  })
}
