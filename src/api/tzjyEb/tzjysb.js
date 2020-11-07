import request from '@/utils/request'
import http from '@/utils/httpapi'
// import Qs from 'qs'

const apiTop = {
    QuarantineDeclarationTZList: http + '/Quarantine/V_Qua_QuarantineDeclarationTZList',
    QuarantineDeclarationCPXQ: http + '/Quarantine/V_Qua_QuarantineDeclarationCPXQ',
    QuarantineDeclarationCPInsert: http + '/Quarantine/Qua_QuarantineDeclarationCPInsert',
    QuarantineDeclarationCPUpdate: http + '/Quarantine/Qua_QuarantineDeclarationCPUpdate',
    QuarantineDeclarationCPDel: http + '/Quarantine/Qua_QuarantineDeclarationCPDel'

}

// 列表查询
export function getQuarantineDeclarationTZList (personalbar) {
  console.log(apiTop.QuarantineDeclarationTZList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere)
    return request({
        url: apiTop.QuarantineDeclarationTZList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 新增
export function getQuarantineDeclarationCPInsert (personalbar, UserId) {
    return request({
        url: apiTop.QuarantineDeclarationCPInsert,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: personalbar
    })
}

// 单项详细
export function getQuarantineDeclarationCPXQ (personalbar) {
    return request({
        url: apiTop.QuarantineDeclarationCPXQ + '?FStId=' + personalbar.FStId,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 修改
export function getQuarantineDeclarationCPUpdate (personalbar, UserId) {
    return request({
        url: apiTop.QuarantineDeclarationCPUpdate,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: personalbar
    })
}

// 删除QuarantineDeclarationCPDel
export function getQuarantineDeclarationCPDel (personalbar) {
    return request({
        url: apiTop.QuarantineDeclarationCPDel + '?FStId=' + personalbar,
        method: 'post'

    })
}
