import request from '@/utils/request'
import http from '@/utils/httpapi'
const authorityApi = {

    findRole: http + '/Role/GetAllRole',
    addRole: http + '/Role/InsertRole',
    updateRole: http + '/Role/UpdateRole',
    deleteRole: http + '/Role/DeleteRole',
    CheckRoleName: http + '/Role/GetRoleByFrName',
    CheckuserName: http + '/Role/GetAllRoleByFStId'

}
// 查询所有
export function FindAllRole (parameter) {
    return request({
      url: authorityApi.findRole + '?offset=' + parameter.offset + '&limit=' + parameter.limit + '&FSunitUstrId=' + parameter.FSunitUstrId,
      method: 'get',
      headers: {
        'AccessToken': parameter.AccessToken,
        'timestamp': parameter.timestamp,
        'UserId': parameter.UserId
      }
    })
}
// 新增角色
export function AddRole (parameter, headerQuery) {
    return request({
      url: authorityApi.addRole + '?FrName=' + parameter.FrName + '&FrOrder=' + parameter.FrOrder + '&FrRemark=' + parameter.FrRemark,
      method: 'post',
      headers: {
        'AccessToken': headerQuery.AccessToken,
        'timestamp': headerQuery.timestamp,
        'UserId': headerQuery.UserId
      }
    })
}
// 修改角色
export function UpdateRole (parameter, headerQuery) {
    return request({
      url: authorityApi.updateRole,
      method: 'post',
      data: parameter,
      headers: {
        'AccessToken': headerQuery.AccessToken,
        'timestamp': headerQuery.timestamp,
        'UserId': headerQuery.UserId
      }

    })
}
// 删除角色
export function DeleteRole (FStId, parameter) {
    return request({
      url: authorityApi.deleteRole + '?FStId=' + FStId,
      method: 'post',
      headers: {
        'AccessToken': parameter.AccessToken,
        'timestamp': parameter.timestamp,
        'UserId': parameter.UserId
      }
    })
}
// 查询角色名称
export function CheckRoleName (parameter) {
  return request({
    url: authorityApi.CheckRoleName,
    method: 'get',
    headers: {
      'AccessToken': parameter.AccessToken,
      'timestamp': parameter.timestamp,
      'UserId': parameter.UserId
    }
  })
}
// 模糊查询
export function CheckuserName (parameter) {
  return request({
    url: authorityApi.CheckuserName + '?offset=' + parameter.offset + '&limit=' + parameter.limit + '&FrName=' + parameter.FrName,
    method: 'get',
    headers: {
      'UserId': parameter.UserId
    }
  })
}
