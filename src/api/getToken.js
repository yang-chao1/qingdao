import request from '@/utils/request'
import http from '@/utils/httpapi'
const GT = {
    token: http + '/Security/GetAccessToken'
}
// 查询所有用户信息
export function GetToken () {
    return request({
      url: GT.token + '?appKey=tysfrz&appSecret=86F0063E11A7BD282537DCCE1FEC6F6E',
      method: 'get'
    })
}
