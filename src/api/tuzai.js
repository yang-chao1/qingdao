import request from '@/utils/request'
import http from '@/utils/httpapi'
const TuzaiApi = {
  DeclarationCPGet: http + '/Quarantine/Qua_QuarantineDeclarationCDList'
}
// 查询所有 屠宰检疫申报(省里数据)
// ?pageindex=1&pagesize=10&selectwhere
export function getTu (parameter, userId) {
  console.log('111', parameter)
  return request({
     url: TuzaiApi.DeclarationCPGet + '?pageindex=' + parameter.pageindex + '&pagesize=' + parameter.pagesize + '&selectwhere=' + parameter.selectwhere,

    method: 'get',

    headers: {
      'UserId': userId
    }
  })
}
