import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    FYGet: http + '/Material/V_DW_FYGet',
    FYDel: http + '/Material/DW_FYDel',
    FYGetXQ: http + '/Material/V_DW_FYGetCK'

}

// 列表查询
export function getFYGetList (personalbar) {
    return request({
        url: apiTop.FYGet + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&FarmName=' + personalbar.FarmName,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 单项删除
export function getFYDelItem (personalbar) {
    return request({
        url: apiTop.FYDel + '?FStId=' + personalbar.FStId,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }

    })
}
// 单项查询
export function getFYGetXQ (personalbar) {
    return request({
        url: apiTop.FYGetXQ + '?FStId=' + personalbar,
        method: 'get'

    })
}
