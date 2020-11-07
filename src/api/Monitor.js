import request from '@/utils/request'
import http from '@/utils/httpapi'
const MonitorApi = {
    getqhdata: http + '/unit/Getunitone',
    alterData: http + '/unit/UpdateQH',
    removeData: http + '/unit/UnitDel',
    newAddSH: http + '/unit/Getunitone'
}
// 查询所有区站信息
export function getqhdata () {
    return request({
        url: MonitorApi.getqhdata,
        method: 'get'
        // headers: {
        //     'AccessToken': parameter.AccessToken,
        //     'timestamp': parameter.timestamp
        //   }
    })
}
// 修改
export function alterData (parameter) {
    return request({
        url: MonitorApi.alterData,
        method: 'post',
        data: parameter
    })
}
// 删除
export function removeData (parameter) {
    return request({
        url: MonitorApi.alterData + '?FStId=' + parameter,
        method: 'DELETE'
    })
}
