import request from '@/utils/request'
import http from '@/utils/httpapi'
// import qs from 'qs'
const manage = {
    cdAll: http + '/Quarantine/Qua_QuarantineDeclarationCDList',
    deleteId: http + '/Quarantine/QuarantineDeclarationCDDel',
    cdjyInfo: http + '/Quarantine/Qua_QuarantineDeclarationCDXQ',
    addInfo: '/api2/HtmlAshxQua/UplaodJYFiles.ashx',
    OriginGet: http + '/Material/NXT_AnimalOriginGet',
    OriginGetCK: http + '/Material/NXT_AnimalOriginGetCK',
    AnimalA: http + '/Material/VWGHDataInterface_AnimalA',
    AnimalB: http + '/Material/VWGHDataInterface_AnimalB',
    AnimalAinfo: http + '/Material/VWGHDataInterface_AnimalACK',
    AnimalBinfo: http + '/Material/VWGHDataInterface_AnimalBCK',
    cdjyInfoUpdate: http + '/Quarantine/QuarantineDeclarationCDUpdate',
   cdBaoAll: http + '/Quarantine/Qua_QuarantineDeclarationCDSHList',
   cdBaoInfo: http + '/Quarantine/Qua_QuarantineDeclarationCDXQ',
   AnimalQuarantineAList: http + '/Quarantine/Qua_AnimalQuarantineAList',
   AnimalQuarantineAXQ: http + '/Quarantine/Qua_AnimalQuarantineAXQ',
   AnimalQuarantineADel: http + '/Quarantine/Qua_AnimalQuarantineADel',

   AnimalQuarantineBList: http + '/Quarantine/Qua_AnimalQuarantineBList',
   AnimalQuarantineBXQ: http + '/Quarantine/Qua_AnimalQuarantineBXQ',
   AnimalQuarantineBDel: http + '/Quarantine/Qua_AnimalQuarantineBDel',
   AH_AnimalOriginUpdate: http + '/Quarantine/AH_AnimalOriginUpdate',
   antineAUpdate: http + '/Quarantine/Qua_AnimalQuarantineAUpdate',
   AnimalQuarantineBUpdate: http + '/Quarantine/Qua_AnimalQuarantineBUpdate',
   OwnerGet: http + '/Material/OwnerGet',
   SbdList: http + '/Quarantine/V_AH_AnimalOrigin_SbdList'

}

export function SbdList (data, userid) {
  console.log(manage.SbdList + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=QDWCargoOwner:' + data.selectWhere)
  return request({
    url: manage.SbdList + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=QDWCargoOwner:' + data.selectWhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
export function OwnerGet (data, userid) {
  console.log(data)
  return request({
    url: manage.OwnerGet + '?offset=' + data.offset + '&limit=' + data.limit + '&FFarmName=' + data.selectWhere + '&Type=' + data.dist,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 产地检疫申报单的修改（耳标）
// eslint-disable-next-line camelcase
export function AH_AnimalOriginUpdate (data, userid) {
  console.log(data)
  return request({
    url: manage.AH_AnimalOriginUpdate,
    method: 'post',
    data: data,
    headers: {
      'UserId': userid
    }
  })
}
export function addInfo (data, userid) {
  const dataJson = JSON.stringify(data)
  const p = {
    json: dataJson,
    type: 'Qua_QuarantineDeclarationCD',
    uid: 58471
  }
  return request({
    url: manage.addInfo + '?type=' + p.type + '&uid=' + p.uid + '&json=' + p.json,
    method: 'post'

  })
}
export function getCdAll (data, userid) {
  if (!data.addree) {
    data.addree = ''
  }
  // console.log(manage.cdAll + '?pageindex=' + data.pageindex + '&pagesize=' + data.pagesize + '&selectwhere=QDWCargoOwner:' + data.selectwhere+';'+data.)
  return request({
    url: manage.cdAll + '?pageindex=' + data.pageindex + '&pagesize=' + data.pagesize + '&selectwhere=QDWCargoOwner:' + data.selectwhere + data.addree,
    method: 'get',
  //  data:qs.stringify(data),
    headers: {
      'UserId': userid
    }
  })
}
export function cdjyInfo (id, userid) {
  console.log(`${manage.cdjyInfo}?FStId=${id}`)
  return request({
    url: `${manage.cdjyInfo}?FStId=${id}`,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}

// 产地检疫申报单处理详情

export function cdBaoInfo (id, Usetid) {
  return request({
    url: manage.cdBaoInfo + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': Usetid
    }
  })
}

// 产地检疫申报单处理列表

export function cdBaoAll (data, userid) {
  if (!data.addree) {
    data.addree = ''
  }
  return request({
    url: manage.cdBaoAll + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=QDWCargoOwner:' + data.selectWhere + data.addree,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 产地检疫申报单的修改（耳标）
export function cdjyInfoUpdate (data, userid) {
  console.log(data)
  return request({
    url: manage.cdjyInfoUpdate,
    method: 'post',
    data: data,
    headers: {
      'UserId': userid
    }
  })
}
export function deleteIds (ids, userid) {
  return request({
    url: manage.deleteId + '?FStId=' + ids,
    method: 'post',
    headers: {
      'UserId': userid
    }
  })
}

export function OriginGet (data, userid) {
  return request({
    url: manage.OriginGet + '?offset=' + data.offset + '&limit=' + data.limit + '&shippername=' + data.shippername,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
export function OriginGetCK (id, userid) {
  return request({
    url: manage.OriginGetCK + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
export function AnimalA (data, userid) {
  return request({
    url: manage.AnimalA + '?offset=' + data.offset + '&limit=' + data.limit + '&consignee=' + data.selectWhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
export function AnimalB (data, userid) {
  return request({
    url: manage.AnimalB + '?offset=' + data.offset + '&limit=' + data.limit + '&consignee=' + data.selectWhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 产地检疫动物A证 [查看](省里数据)
export function AnimalAinfo (id) {
  return request({
    url: manage.AnimalAinfo + '?FStId=' + id,
    method: 'get'

  })
}
// 产地检疫动物B证 [查看](省里数据)
export function AnimalBinfo (id) {
  return request({
    url: manage.AnimalBinfo + '?FStId=' + id,
    method: 'get'

  })
}
// 动物A证列表(耳标)

export function AnimalQuarantineAList (data, userid) {
  console.log(manage.AnimalQuarantineAList + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=ACargoOwner:' + data.selectwhere)
 return request({
    url: manage.AnimalQuarantineAList + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=ACargoOwner:' + data.selectwhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 动物A证列表新增(耳标) Qua_AnimalQuarantineAUpdate
export function antineAUpdate (data, userid) {
  console.log(data)
  return request({
    url: manage.antineAUpdate,
    method: 'post',
    data: data,
    headers: {
      'UserId': userid
    }
  })
}
// 动物A证列表 详情(耳标)
export function AnimalQuarantineAXQ (id, userid) {
  return request({
    url: manage.AnimalQuarantineAXQ + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 动物A证列表 删除(耳标)
export function AnimalQuarantineADel (id, userid) {
  return request({
    url: manage.AnimalQuarantineADel + '?FStId=' + id,
    method: 'post',
    headers: {
      'UserId': userid
    }
  })
}
// B
export function AnimalQuarantineBList (data, userid) {
  return request({
    url: manage.AnimalQuarantineBList + '?pageindex=' + data.offset + '&pagesize=' + data.limit + '&selectwhere=AQCargoOwner:' + data.selectwhere,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}

// 动物b证列表 详情(耳标)
export function AnimalQuarantineB (id, userid) {
  return request({
    url: manage.AnimalQuarantineBXQ + '?FStId=' + id,
    method: 'get',
    headers: {
      'UserId': userid
    }
  })
}
// 动物b证列表 删除(耳标)
export function AnimalQuarantineBDel (id, userid) {
  return request({
    url: manage.AnimalQuarantineBDel + '?FStId=' + id,
    method: 'post',
    headers: {
      'UserId': userid
    }
  })
}

// 动物b证列表 修改(耳标)
export function AnimalQuarantineBUpdate (data, userid) {
  return request({
    url: manage.AnimalQuarantineBUpdate,
    method: 'post',
    data: data,
    headers: {
      'UserId': userid
    }
  })
}
