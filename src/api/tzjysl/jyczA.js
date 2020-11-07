import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    ProductA: http + '/Material/VWGHDataInterface_ProductA'
}

// 列表查询
export function getProductA (personalbar) {
    return request({
        url: apiTop.ProductA + '?offset=' + personalbar.offset + '&limit=' + personalbar.limit + '&consignee=' + personalbar.consignee,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
