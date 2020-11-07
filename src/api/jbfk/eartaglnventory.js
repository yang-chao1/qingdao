import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
    HusbStockGet: http + '/Material/BH_HusbStockGet'
}

// 列表查询
export function getHusbStockGet (personalbar) {
    return request({
        url: apiTop.HusbStockGet + '?BHAnimal=' + personalbar.BHAnimal,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}
