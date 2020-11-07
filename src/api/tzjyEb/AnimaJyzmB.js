import request from '@/utils/request'
import http from '@/utils/httpapi'
const apiTop = {
    allinfo: http + '/Quarantine/Qua_AnimalProductsB_List',
    addinfo: http + '/Quarantine/Qua_AnimalProductsBInsert',
    oneinfo: http + '/Quarantine/Qua_AnimalProductsBXQ',
    updateinfo: http + '/Quarantine/Qua_AnimalProductsBUpdate',
    deleteinfo: http + '/Quarantine/Qua_AnimalProductsBDel',
    shipperinfo: http + '/Material/P_SelectionQuaHistoryB'
}
// 查询动物检疫证明（产品B）列表
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
    return request({
        url: apiTop.shipperinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&PBCargoOwner=' + p.PBCargoOwner,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}
