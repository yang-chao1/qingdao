import request from '@/utils/request'
import http from '@/utils/httpapi'
const manage = {
    allinfo: http + '/Harmless/AppletC_TreatmentPlant_RWGet',
    findren: http + '/Harmless/AppletTreatmentPlant_Collect',
    finddjz: http + '/Harmless/AppletTreatmentPlant_Unit',
    addinfo: http + '/Harmless/AppletTreatmentPlant_FenPai',
    toUpInfo: http + '/Harmless/HarmlessSelect',
    upinfo: http + '/Harmless/HarmlessUp',
    delinfo: http + '/Harmless/HarmlessDel',
    checkUserDj: http + '/Harmless/AppletSelect',
    NumberPlatesCPH: http + '/Harmless/WHH_NumberPlatesCPH'
}
// 查询所有用户信息
export function FindAll (p) {
    return request({
      url: manage.allinfo + '?FSsjrName=' + p.FSsjrName + '&offset=' + p.offset + '&limit=' + p.limit + '&unitID=' + p.unitID,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 查询收集人员
export function Findren (p) {
    return request({
      url: manage.findren,
      method: 'get',
      headers: {
        'UserId': p
      }
    })
}
// 查询所有动监站
export function Finddjz (p) {
    return request({
      url: manage.finddjz,
      method: 'get',
      headers: {
        'UserId': p.UserId
      }
    })
}
// 新增
export function AddInfo (p) {
    return request({
      url: manage.addinfo,
      method: 'post',
      data: p,
      headers: {
        'UserId': p.UserId
      }
    })
}

// 修改前进行查询
export function toUpInfo (p) {
  return request({
    url: manage.toUpInfo + '?FStId=' + p.FStId,
    method: 'get',
    data: p,
    headers: {
      'UserId': p.UserId
    }
  })
}

// 修改
export function UpInfo (p) {
  return request({
    url: manage.upinfo + '?FStId=' + p.FStId,
    method: 'post',
    data: p,
    headers: {
      'UserId': p.UserId
    }
  })
}

// 删除
export function DelInfo (p) {
  return request({
    url: manage.delinfo + '?FStId=' + p.FStId,
    method: 'post',
    // data: { FStId: p.FStId }
    headers: {
      'UserId': p.UserId
    }
  })
}

// 根据收集人id查询已有任务动监站
export function checkUserDjInfo (FSsjrID) {
  return request({
    url: manage.checkUserDj + '?FSsjrID=' + FSsjrID,
    method: 'get'
  })
}
// 车牌号加载
export function checkNumberPlatesCPH (FStId) {
  return request({
    url: manage.NumberPlatesCPH + '?FStId=' + FStId,
    method: 'get'
  })
}
