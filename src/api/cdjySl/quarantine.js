import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    QuarantineDeclarationCPGet: http + '/Material/Qua_QuarantineDeclarationCPGet'
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
