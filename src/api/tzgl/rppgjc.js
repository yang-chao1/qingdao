import request from '@/utils/request'
import http from '@/utils/httpapi'
import Qs from 'qs'

const apiTop = {
    RppzjyhgList: http + '/Quarantine/HA_RppzjyhgList',
    RppzjyhgInsert: http + '/Quarantine/HA_RppzjyhgInsert',
    Rppzjyhgxq: http + '/Quarantine/HA_Rppzjyhgxq',
    RppzjyhgUpdate: http + '/Quarantine/HA_RppzjyhgUpdate',
    RppzjyhgDel: http + '/Quarantine/HA_RppzjyhgDel'
}

// 列表查询
export function getRppzjyhgList (personalbar) {
  console.log(apiTop.RppzjyhgList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=YZCName:' + personalbar.selectwhere)
    return request({
        url: apiTop.RppzjyhgList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=YZCName:' + personalbar.selectwhere,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 新增
export function getRppzjyhgInsert (personalbar, UserId) {
    console.log(personalbar)
    return request({
        url: apiTop.RppzjyhgInsert,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: Qs.stringify(personalbar)
    })
}
// 详情查询
export function getRppzjyhgxq (personalbar) {
    return request({
        url: apiTop.Rppzjyhgxq + '?FStId=' + personalbar.FStId,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 列表修改
export function getRppzjyhgUpdate (personalbar, UserId) {
    console.log(personalbar)
    return request({
        url: apiTop.RppzjyhgUpdate,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: Qs.stringify(personalbar)
    })
}

// 列表删除
export function getRppzjyhgDel (personalbar) {
    return request({
        url: apiTop.RppzjyhgDel + '?FStId=' + personalbar.FStId,
        method: 'post',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
