import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/HarmlessProcess/GetYZCDSH',
    FIBid: http + '/HarmlessProcess/GetYZCSHXQ',
    add: http + '/HarmlessProcess/InsertYZCH',
    shenhe: http + '/HarmlessProcess/GetYZCYSH',
    bohui: http + '/HarmlessProcess/GetYZCBH'
}
// 查询所有用户信息
export function FindAll (p) {
    return request({
      url: manage.allinfo + '?FSunitUstrId=' + p.FSunitUstrId + '&FSyzcmc=' + p.FSyzcmc + '&offset=' + p.offset + '&limit=' + p.limit,
      method: 'get',
      headers: {
          'UserId': p.UserId
      }
    })
}
// 根据 FStId 查询信息
export function FindInfoByFStId (p) {
    return request({
      url: manage.FIBid + '?FStId=' + p,
      method: 'get'
    })
}
// 审核
export function AddInfo (p) {
    return request({
      url: manage.shenhe + '?FStId=' + p.FStId + '&FSshdw=' + p.FSshdw + '&FSshr=' + p.FSshr + '&FSshyj=' + p.FSshyj + '&FSshdate=' + p.FSshdate,
      method: 'post',
      headers: {
        'UserId': p.UserId
      }
    })
}

// 驳回
export function BHInfo (p) {
  return request({
    url: manage.bohui + '?FStId=' + p.FStId + '&FSshdw=' + p.FSshdw + '&FSshr=' + p.FSshr + '&FSshyj=' + p.FSshyj + '&FSshdate=' + p.FSshdate + '&FSbhly=' + p.FSbhly,
    method: 'post'
    // headers: {
    //   UserId: p.UserId
    // }
  })
}
