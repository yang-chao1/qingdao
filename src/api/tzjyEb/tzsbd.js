import request from '@/utils/request'
import http from '@/utils/httpapi'
// import Qs from 'qs'

const apiTop = {
    SBDInfosGetList: http + '/Material/V_AH_SBDInfosGet',
    SBDInfoUpCK: http + '/Material/AH_SBDInfoUpCK',
    SBDInfosGetCK: http + '/Material/V_AH_SBDInfosGetCK',
    SBDInfoCAInsert: http + '/Material/AH_SBDInfoCAInsert',
    SBDInfoInsert: http + '/Material/AH_SBDInfoInsert',
    SlaughterBkGet: http + '/Material/VHA_SlaughterBkGet',
    VeterionaryGet: http + '/Material/V_SeSys_VeterionaryGet',
    SBDInfoDel: http + '/Material/AH_SBDInfoDel',
    SBDInfoDelGF: http + '/Material/AH_SBDInfoCADel'

}

// 列表查询
export function getSBDInfosGetList (personalbar) {
    return request({
        url: apiTop.SBDInfosGetList + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&FsbdName=' + personalbar.FsbdName + '&unitID=' + personalbar.unitID,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 官方兽医查看
export function getSBDInfoUpCK (personalbar) {
    return request({
        url: apiTop.SBDInfoUpCK + '?FStId=' + personalbar,
        method: 'get'
        // headers: {
        //     'UserId': personalbar.UserId
        // }
    })
}
// 申报点查看
export function getSBDInfosGetCK (personalbar) {
    return request({
        url: apiTop.SBDInfosGetCK + '?FStId=' + personalbar,
        method: 'get'

        // headers: {
        //     'UserId': personalbar.UserId
        // }
    })
}

// 官方兽医新增
export function getSBDInfoCAInsert (personalbar, UserId, SYFStId) {
    return request({
        url: apiTop.SBDInfoCAInsert,
        method: 'post',
        headers: {
            'UserId': UserId,
            'SYFStId': SYFStId
        },
        data: personalbar
    })
}
// 申报点新增
export function getSBDInfoInsert (personalbar, UserId) {
    return request({
        url: apiTop.SBDInfoInsert,
        method: 'post',
        headers: {
            'UserId': UserId
        },
        data: personalbar
    })
}
// 申报点名称查询
export function getSlaughterBkGet (personalbar) {
    return request({
        url: apiTop.SlaughterBkGet + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&FhLegal=' + personalbar.FhLegal,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 官方兽医查询
export function getVeterionaryGet (personalbar) {
    return request({
        url: apiTop.VeterionaryGet + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&FuName=' + personalbar.FuName,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 官方兽医删除
export function getSBDInfoDelGF (personalbar) {
    return request({
        url: apiTop.SBDInfoDelGF + '?FStId=' + personalbar.FStId + '&FGlid=' + personalbar.FGlid,
        method: 'get'
        // headers: {
        //     'UserId': personalbar.UserId
        // }
    })
}
// 单项删除
export function getSBDInfoDel (personalbar) {
    return request({
        url: apiTop.SBDInfoDel + '?FStId=' + personalbar,
        method: 'get'
        // headers: {
        //     'UserId': personalbar.UserId
        // }
    })
}
