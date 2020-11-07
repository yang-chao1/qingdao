import request from '@/utils/request'
import http from '@/utils/httpapi'
import Qs from 'qs'

const apiTop = {
    HAleanmeatList: http + '/Quarantine/HAleanmeatList',
    HAleanmeatInsert: http + '/Quarantine/HAleanmeatInsert',
    HAleanmeatxq: http + '/Quarantine/HAleanmeatxq',
    HAleanmeatUpdate: http + '/Quarantine/HAleanmeatUpdate',
    HAleanmeatDel: http + '/Quarantine/HAleanmeatDel'
}

// 列表查询
export function getHAleanmeatList (personalbar) {
    return request({
        url: apiTop.HAleanmeatList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 新增
export function getHAleanmeatInsert (personalbar, UserId) {
    console.log(personalbar)
    return request({
        url: apiTop.HAleanmeatInsert,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: Qs.stringify(personalbar)
    })
}
// 详情查询
export function getHAleanmeatxq (personalbar) {
    return request({
        url: apiTop.HAleanmeatxq + '?FStId=' + personalbar.FStId,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 列表修改
export function getHAleanmeatUpdate (personalbar, UserId) {
    console.log(personalbar)
    return request({
        url: apiTop.HAleanmeatUpdate,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: Qs.stringify(personalbar)
    })
}

// 列表删除
export function getHAleanmeatDel (personalbar) {
    return request({
        url: apiTop.HAleanmeatDel + '?FStId=' + personalbar.FStId,
        method: 'post',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
