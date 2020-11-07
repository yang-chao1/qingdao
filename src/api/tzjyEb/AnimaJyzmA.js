import request from '@/utils/request'
import http from '@/utils/httpapi'
const apiTop = {
    allinfo: http + '/Quarantine/Qua_AnimalProductsA_List',
    addinfo: http + '/Quarantine/Qua_AnimalProductsAInsert',
    oneinfo: http + '/Quarantine/Qua_AnimalProductsAXQ',
    updateinfo: http + '/Quarantine/Qua_AnimalProductsAUpdate',
    deleteinfo: http + '/Quarantine/Qua_AnimalProductsADel',
    shipperinfo: http + '/Material/P_SelectionQuaHistoryA',
    Gettzcsbdaddress: http + '/Quarantine/Gettzcsbdaddress'
}
// 查询动物检疫证明（产品A）列表
export function FindAllInfo (p) {
    return request({
        url: apiTop.allinfo + '?pageindex=' + p.offset + '&pagesize=' + p.limit + '&selectwhere=' + p.selectwhere,
        method: 'get',
        headers: {
            'UserId': p.UserId
        }
    })
}
// 查看
export function FindInfoByFStId (p) {
    return request({
        url: apiTop.oneinfo + '?FStId=' + p.FStId,
        method: 'get',
        headers: {
            'UserId': p.UserId
        }
    })
}

// 新增
export function AddInfo (p) {
    return request({
        url: apiTop.addinfo,
        method: 'post',
        data: p,
        headers: {
            'UserId': p.UserId
        }
    })
}

// 修改
export function UpdateInfo (p) {
    return request({
        url: apiTop.updateinfo,
        method: 'post',
        data: p,
        headers: {
            'UserId': p.UserId
        }

    })
}

// 删除
export function DeleteInfo (p) {
    return request({
        url: apiTop.deleteinfo + '?FStId=' + p.FStId,
        method: 'post', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}

// 获取货主列表
export function FindShipperInfo (p) {
  console.log(apiTop.shipperinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&PCargoOwner=' + p.PCargoOwner)
    return request({
        url: apiTop.shipperinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&PCargoOwner=' + p.PCargoOwner,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}
// 获取地址
export function GettzcsbdaddressInfo (UserId) {
    return request({
        url: apiTop.Gettzcsbdaddress,
        method: 'get', // method: 'post',
        headers: {
            'UserId': UserId
        }
    })
}
