import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/Harmless/AppletCallDeclare',
    findbyinfo: http + '/Harmless/AppletProgress',
    totalDataInfo: http + '/Harmless/WHHStatistics',
    AppletCallDeclareDel: http + '/Harmless/AppletCallDeclareDel'
}
// 查询所有用户信息
export function FindAll (p) {
  console.log(p)
    return request({
      url: manage.allinfo + '?FSenterpriseName=' + p.FSenterpriseName + '&offset=' + p.offset + '&limit=' + p.limit + '&Status=' + p.Status + '&unitID=' + p.unitID,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 根据id查信息
export function FindByInfo (p) {
    return request({
      url: manage.findbyinfo + '?FStId=' + p,
      method: 'get'
    })
}

// 统计
export function TotalDataInfo (p) {
  console.log(p)
  return request({
    url: manage.totalDataInfo + '?Status=' + p.Status + '&FSenterpriseName=' + p.FSenterpriseName + '&unitID=' + p.unitID,
    method: 'get',
    headers: {
      'UserId': p.UserId
    }
  })
}
// 删除
export function getAppletCallDeclareDel (p) {
  return request({
    url: manage.AppletCallDeclareDel,
    method: 'post',
    data: p
  })
}
