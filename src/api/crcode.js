import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/Quarantine/getcode'
}
// 查询所有用户信息
export function getQrCode (p) {
  // var p = {
  //   Mid: 29,
  //   UserId: 1,
  //   FStId: 38
  // }
  console.log(p)
    return request({
      url: manage.allinfo + '?Mid=' + p.Mid + '&FStId=' + p.FStId,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
