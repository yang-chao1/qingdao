
// 判断产地检疫启运地

function placexiangx (place) {
  if (place.search('/') !== -1) {
    place = place.replace('/', '')
  }

  var arrdz = []

  var province = '山东省'

  arrdz.push(province)

  var city = '青岛市'

  arrdz.push(city)

  var addr = place.substring(place.indexOf('青岛市') + 3)

  /* 2. 得到区/县 */
  var xian = '' // 区市/县

  if (addr.startsWith('莱西市')) {
    xian = '莱西市'
  } else if (addr.startsWith('市南区')) {
    xian = '市南区'
  } else if (addr.startsWith('市北区')) {
    xian = '市北区'
  } else if (addr.startsWith('黄岛区')) {
    xian = '黄岛区'
  } else if (addr.startsWith('崂山区')) {
    xian = '崂山区'
  } else if (addr.startsWith('城阳区')) {
    xian = '城阳区'
  } else if (addr.startsWith('胶州市')) {
    xian = '胶州市'
  } else if (addr.startsWith('即墨市')) {
    xian = '即墨市'
  } else if (addr.startsWith('平度市')) {
    xian = '平度市'
  } else if (addr.startsWith('红岛经济区')) {
    xian = '红岛经济区'
  } else if (addr.startsWith('李沧区')) {
    xian = '李沧区'
  }

  arrdz.push(xian)

  /* 3. 得到详细地址 */
  var xz = '' // 乡镇详情地址
  xz = addr.substring(addr.indexOf(xian) + xian.length) // 截取 县 后面的内容

  arrdz.push(xz)

  return arrdz // 返回包含 省  市  县   详细地址 的数组
}

module.exports = {

  placexiangx: placexiangx

}
