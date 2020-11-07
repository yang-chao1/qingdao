import request from '@/utils/request'
import http from '@/utils/httpapi'

const apiTop = {
  DeclarationCDDel: http + '/Quarantine/AH_AnimalOriginDel',
    QuarantineDeclarationCDList: http + '/Quarantine/Qua_QuarantineDeclarationCDList',
    AnimalOriginList: http + '/Quarantine/AH_AnimalOriginList',
    getAnimalOriginInfo: http + '/Quarantine/AH_AnimalOriginXQ'
}
// 动物产地检疫工作记录单 删除

export function DeclarationCDDel (id, Usetid) {
  return request({
    url: apiTop.DeclarationCDDel + '?FStId=' + id,
    method: 'post',
    headers: {
      'UserId': Usetid
    }
  })
}
//  产地检疫申报单 列表查询
export function getQuarantineDeclarationCPGet (personalbar) {
    return request({
        url: apiTop.QuarantineDeclarationCDList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=' + personalbar.selectwhere,
        method: 'get',

        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 动物产地检疫工作记录单 列表
export function getAnimalOriginList (personalbar) {
  if (!personalbar.addree) {
    personalbar.addree = ''
  }
  console.log(apiTop.AnimalOriginList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=shippername:' + personalbar.selectwhere + personalbar.addree)
    return request({
        url: apiTop.AnimalOriginList + '?pageindex=' + personalbar.offset + '&pagesize=' + personalbar.limit + '&selectwhere=shippername:' + personalbar.selectwhere + personalbar.addree,
        method: 'get',
        headers: {
            'UserId': personalbar.UserId
        }
    })
}

// 动物产地检疫工作记录单 （详情）

export function getAnimalOriginInfo (id, userid) {
  return request({
      url: apiTop.getAnimalOriginInfo + '?FStId=' + id,
      method: 'get',
      headers: {
          'UserId': userid
      }
  })
}
