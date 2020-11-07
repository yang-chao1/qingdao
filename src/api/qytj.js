import request from '@/utils/request'
import http from '@/utils/httpapi'
const analysisApi = {

    SetChartAndTable: http + '/After/SetChartAndTable'

}
// 查询通过FStID
export function GetSetChartAndTable (parameter) {
    return request({
      url: analysisApi.SetChartAndTable + '?fuStrId=' + parameter.fuStrId + '&dtartDate=' + parameter.dtartDate + '&endDate=' + parameter.endDate +
      '&TyName=' + parameter.TyName + '&yzcName=' + parameter.yzcName,
      method: 'get'
    })
  }
