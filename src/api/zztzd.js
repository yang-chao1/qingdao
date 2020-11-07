import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
  ApprovalGet: http + '/Material/Qua_ApprovalGet',
  ApprovalGetCK: http + '/Material/Qua_ApprovalGetCK',
  DeclarationCDDel: http + '/Material/Qua_ApprovalDel',
  ApprovalGetInsert: http + '/Material/Qua_ApprovalGetInsert',
  ApprovalInsert: http + '/Material/Qua_ApprovalInsert',
  ApprovalGetUp: http + '/Material/Qua_ApprovalGetUp',
  ApprovalUp: http + '/Material/Qua_ApprovalUp',
  TZGet: http + '/Material/V_Qua_QuarantineDeclarationTZGet'
}

export function TZGet (data, userid) {
  return request({
    url: manage.TZGet + '?offset=' + data.offset + '&limit=' + data.limit + '&QCPNumber=' + data.selectWhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}

// 准宰通知单 修改查看
export function ApprovalGetUp (id, userid) {
  return request({
    url: manage.ApprovalGetUp + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}

// 准宰通知单 修改
export function ApprovalUp (data, userid) {
  console.log(data)
  return request({
    url: manage.ApprovalUp,
    method: 'post',
    data: data

  })
}

// 准宰通知单 增加
export function ApprovalInsert (data, userid) {
  return request({
    url: manage.ApprovalInsert,
    method: 'post',
    data: data,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'UserId': userid
    }
  })
}

// 编单号
export function ApprovalGetInsert (userid) {
  return request({
    url: manage.ApprovalGetInsert,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 查询列表 准宰通知单
export function ApprovalGet (data, userid) {
  return request({
    url: manage.ApprovalGet + '?offset=' + data.offset + '&limit=' + data.limit + '&TName=' + data.selectWhere + '&unitID=' + data.unitID,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 准宰通知单 详情(耳标)
export function ApprovalGetCK (id, userid) {
  return request({
    url: manage.ApprovalGetCK + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}

// 准宰通知单 删除(耳标)
export function DeclarationCDDel (id, userid) {
  return request({
    url: manage.DeclarationCDDel + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
