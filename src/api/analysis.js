import request from '@/utils/request'
import http from '@/utils/httpapi'
const analysisApi = {

    DInform: http + '/Management/AppletInformDel',
    FBID: http + '/Management/AppletInformGetWhere'

}
// 删除通知
export function DeleteInform (parameter) {
    console.log(parameter)
    return request({
      url: analysisApi.DInform,
      method: 'post',
      data: parameter
    })
}
// 查询通过FStID
export function FindByFStId (parameter) {
    return request({
      url: analysisApi.FBID + '?FStId=' + parameter.FStId,
      method: 'get'
    })
  }
