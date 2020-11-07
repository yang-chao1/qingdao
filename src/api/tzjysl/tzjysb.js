import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    QuarantineDeclarationCPGet: http + '/Material/Qua_QuarantineDeclarationCPGet',
    QuarantineDeclarationCPCK: http + '/Material/Qua_QuarantineDeclarationCPCK'

}

// 列表查询
export function getQuarantineDeclarationCPGet (personalbar) {
    return request({
        url: apiTop.QuarantineDeclarationCPGet + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&consignee=' + personalbar.consignee,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
// 详情查询

export function getQuarantineDeclarationCPCK (personalbar) {
    return request({
        url: apiTop.QuarantineDeclarationCPCK + '?FStId=' + personalbar,
        method: 'get'
    })
}
