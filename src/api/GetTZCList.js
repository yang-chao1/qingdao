import request from '@/utils/request'
import http from '@/utils/httpapi'
const apiTop = {
    GetTZCList: http + '/Quarantine/GetTZCList'
}
// 查询屠宰场
export function getGetTZCList (personalbar) {
    return request({
        url: apiTop.GetTZCList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere + '&yzctype=' + personalbar.yzctype,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
