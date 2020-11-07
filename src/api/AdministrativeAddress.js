import request from '@/utils/request'
import http from '@/utils/httpapi'

const adminA = {
    addressApi: http + '/Unit/GetUnitTree'
}

export function getAdminAddress () {
    return request({
        url: adminA.addressApi + '?FStId=1',
        method: 'get'
    })
}
