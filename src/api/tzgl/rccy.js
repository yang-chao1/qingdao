import request from '@/utils/request'
import http from '@/utils/httpapi'
import Qs from 'qs'

const apiTop = {
    QuaEntranceList: http + '/Quarantine/QuaEntranceList',
    QuaEntrancexq: http + '/Quarantine/QuaEntrancexq',
    QuaEntranceUpdate: http + '/Quarantine/QuaEntranceUpdate',
    QuaEntranceDel: http + '/Quarantine/QuaEntranceDel'
}

// 列表查询
export function getHusbStockGet (personalbar) {
    return request({
        url: apiTop.QuaEntranceList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 详情查询
export function getQuaEntrancexq (personalbar) {
    return request({
        url: apiTop.QuaEntrancexq + '?FStId=' + personalbar.FStId,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 列表修改
export function getQuaEntranceUpdate (personalbar, UserId) {
    console.log(personalbar)
    return request({
        url: apiTop.QuaEntranceUpdate,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: Qs.stringify(personalbar)
    })
}

// 列表删除
export function getQuaEntranceDel (personalbar) {
    return request({
        url: apiTop.QuaEntranceDel + '?FStId=' + personalbar.FStId,
        method: 'post',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
