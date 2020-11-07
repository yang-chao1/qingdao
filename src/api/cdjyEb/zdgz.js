import request from '@/utils/request'
import http from '@/utils/httpapi'
const apiTop = {
    allinfo: http + '/Quarantine/AH_AEmbryoQuarantineList',
    addinfo: http + '/Quarantine/AH_AEmbryoQuarantineInsert',
    oneinfo: http + '/Quarantine/AH_AEmbryoQuarantineXQ',
    updateinfo: http + '/Quarantine/AH_AEmbryoQuarantineUpdate',
    deleteinfo: http + '/Quarantine/AH_AEmbryoQuarantineDel',
    sbdinfo: http + '/Quarantine/V_Qua_QuarantineDeclarationCD_FZList',
    shipperinfo: http + '/Material/OwnerGet'
}
// 查询种蛋、胚胎、精液检疫工作记录单列表
export function FindAllInfo (p) {
   if (!p.addree) {
     p.addree = ''
   }
   return request({
        url: apiTop.allinfo + '?pageindex=' + p.offset + '&pagesize=' + p.limit + '&selectwhere=shippername:' + p.selectwhere + p.addree,
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
        method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}
// 获取申报单列表
export function FindSbdInfo (p) {
    return request({
        url: apiTop.sbdinfo + '?pageindex=' + p.offsetSbd + '&pagesize=' + p.limitSbd + '&selectwhere=' + p.selectwhere,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}

export function FindShipperInfo (p) {
    return request({
        url: apiTop.shipperinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&Type=' + p.Type + '&FFarmName=' + p.FFarmName,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}
