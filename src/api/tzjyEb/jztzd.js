import request from '@/utils/request'
import http from '@/utils/httpapi'
const apiTop = {
    allinfo: http + '/Material/Qua_SlaughterGet',
    addinfo: http + '/Material/Qua_SlaughterInsert',
    getFTzcidinfo: http + '/Material/Qua_SlaughterGetInsert',
    oneinfo: http + '/Material/Qua_SlaughterGetUp',
    updateinfo: http + '/Material/Qua_SlaughterUp',
    deleteinfo: http + '/Material/Qua_SlaughterDel',
    sbdinfo: http + '/Material/V_Qua_QuarantineDeclarationTZGet',
    numberinfo: http + '/Material/Qua_ApprovalGetInsert'
}
// 查询急宰通知单列表
export function FindAllInfo (p) {
    return request({
        url: apiTop.allinfo + '?offset=' + p.offset + '&limit=' + p.limit + '&TName=' + p.selectwhere + '&unitID=' + p.unitID,
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
// 获取屠宰场Id
export function GetFTzcid (p) {
    return request({
        url: apiTop.getFTzcidinfo + '?FStId=' + p.FStId,
        method: 'get',
        headers: {
            'UserId': p.UserId
        }
    })
}

// 修改
export function UpdateInfo (p) {
  console.log(p)
    return request({
        url: apiTop.updateinfo,
        method: 'post',
        data: p

    })
}

// 删除
export function DeleteInfo (p) {
    return request({
        url: apiTop.deleteinfo + '?FStId=' + p.FStId,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}

// 获取申报单列表
export function FindSbdInfo (p) {
    return request({
        url: apiTop.sbdinfo + '?offset=' + p.offsetSbd + '&limit=' + p.limitSbd + '&QCPNumber=' + p.QCPNumber,
        method: 'get', // method: 'post',
        headers: {
            'UserId': p.UserId
        }
    })
}

// 获取No
export function getNumberInfo (userId) {
    return request({
        url: apiTop.numberinfo,
        method: 'get',
        headers: {
            'UserId': userId
        }
    })
}
