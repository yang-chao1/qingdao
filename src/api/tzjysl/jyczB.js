import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    ProductB: http + '/Material/VWGHDataInterface_ProductB'
}

// 列表查询
export function getProductB (personalbar) {
    return request({
        url: apiTop.ProductB + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&consignee=' + personalbar.consignee,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
