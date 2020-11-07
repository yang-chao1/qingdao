import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    ButcherQuarantineGet: http + '/Material/NXT_ButcherQuarantineGet',
    ButcherQuarantineGetCK: http + '/Material/NXT_ButcherQuarantineGetCK'

}

// 列表查询
export function getButcherQuarantineGet (personalbar) {
    return request({
        url: apiTop.ButcherQuarantineGet + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&butchername=' + personalbar.butchername,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 详情查询

export function getButcherQuarantineGetCK (personalbar) {
    return request({
        url: apiTop.ButcherQuarantineGetCK + '?FStId=' + personalbar,
        method: 'get'
    })
}
