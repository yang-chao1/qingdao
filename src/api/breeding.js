function breeding (index, breeding, market) {
// index 选择下标   存栏量breeding，年出栏market

// 1----规模养殖场判断条件：种畜禽场属于规模场，由用户自己判断是否是种畜禽场

// 0      生猪         年出栏量500头以上
// 1      奶牛         存栏量100头以上
// 2      肉鸡         年出栏量50000只以上
// 3      肉鸭         年出栏量50000只以上
// 4      蛋鸡         存栏量10000只以上
// 5      蛋鸭         存栏量10000只以上
// 6      肉牛         出栏量100头以上
// 7      羊           年出栏量500只以上
// 8      兔           存栏量3000只以上

// 2-----养殖专业户判断条件：

// 50 头<生猪出栏量<500 头
// 5 头<奶牛存栏量<100 头
// 10 头<肉牛出栏量<100 头
// 500 只<蛋鸡存栏量<10000 只
// 2000 只<肉鸡出栏量<50000 只
// 50头<羊出栏量<500 头
// 500 只<蛋鸭存栏量<10000 只
// 2000只<肉鸭出栏量<50000 只
// 300 只<兔出栏量<3000 只

// 3------不在该判断条件范围内的是散养户，
  // 类型转换为字符串
  if (!index) return
  if (breeding !== undefined) { breeding = parseInt(breeding) }
  if (market !== undefined) { market = parseInt(market) }
  // const typeChZ = ['猪', '奶牛', '肉牛', '羊', '蛋鸡', '肉鸡（含小公鸡）', '蛋鸭', '肉鸭', '肉兔', '种兔', '鹅', '其它']
  // console.log(index + ':' + typeChZ[index], breeding, market)
  var resultType = ''
  switch (index) {
    case '猪':
      if (!market) { resultType = '未填写年出栏' }
      if (market >= 500) resultType = '规模养殖场'
      else if (market >= 50 && market < 500) {
        resultType = '养殖专业户'
      } else if (market < 50 && market > 0) {
        resultType = '散养户'
      } else { resultType = '未填写年出栏' }
      break
    case '奶牛':
      if (!breeding) resultType = '未填写存栏量'
      if (breeding >= 100) {
        resultType = '规模养殖场'
      } else if (breeding >= 5 && breeding < 100) {
        resultType = '养殖专业户'
      } else if (breeding < 5 && breeding > 0) {
        resultType = '散养户'
      } else { resultType = '未填写存栏量' }
      break
    case '肉牛':
      if (!market) { resultType = '未填写年出栏' }
      if (market >= 100) {
        resultType = '规模养殖场'
      } else if (market >= 10 && market < 100) {
        resultType = '养殖专业户'
      } else if (market < 10 && market > 0) {
        resultType = '散养户'
      } else { resultType = '未填写年出栏' }
      break
    case '羊':
      if (!market) { resultType = '未填写年出栏' }
      if (market >= 500) {
        resultType = '规模养殖场'
      } else if (market >= 50 && market < 500) {
        resultType = '养殖专业户'
      } else if (market < 50 && market > 0) {
        resultType = '散养户'
      } else { resultType = '未填写年出栏' }
      break
    case '蛋鸡' || '蛋鸭':
      if (!breeding) resultType = '未填写存栏量'
      if (breeding >= 10000) {
        resultType = '规模养殖场'
      } else if (breeding >= 500 && breeding < 10000) {
        resultType = '养殖专业户'
      } else if (breeding < 500 && breeding > 0) {
        resultType = '散养户'
      } else { resultType = '未填写存栏量' }
      break
    case '肉鸡（含小公鸡）' || '肉鸭':
      if (!market) { resultType = '未填写年出栏' }
      if (market >= 50000) {
        resultType = '规模养殖场'
      } else if (market >= 2000 && market < 50000) {
        resultType = '养殖专业户'
      } else if (market < 2000 && market > 0) {
        resultType = '散养户'
      } else { resultType = '未填写年出栏' }
      break
    case '肉兔' || '种兔':
      if (!breeding) resultType = '未填写存栏量'
      if (breeding >= 3000) {
        resultType = '规模养殖场'
      } else if (breeding >= 300 && breeding < 3000) {
        resultType = '养殖专业户'
      } else if (breeding < 300 && breeding > 0) {
        resultType = '散养户'
      } else { resultType = '未填写存栏量' }
      break
    case '鹅':
      resultType = '散养户'
      break
    case '其他':
      resultType = '散养户'
      break
    default:
      resultType = '散养户'
      break
  }
  console.log(resultType + '$$$$')
  if (resultType) return resultType

  // ===========以下代码废弃===============
//   if (index === 0) { // 生猪
//   if (market >= 500) {
// return '规模养殖场'
// } else if (market >= 50 && market < 500) {
//   return '养殖专业户'
// } else if (market < 50 && market > 0) {
//   return '散养户'
//   } else {
//     return '未填写年出栏'
//   }
// } else if (index === 1) { // 奶牛
//   if (breeding >= 100) {
// return '规模养殖场'
//   } else if (breeding >= 5 && breeding < 100) {
//     return '养殖专业户'
//   } else if (breeding < 5 && breeding > 0) {
//     return '散养户'
//          } else {
//           return '未填写存栏量'
//          }
// } else if (index === 2 || index === 3) { // 肉鸡/肉鸭
// if (market >= 50000) {
//   return '规模养殖场'
// } else if (market >= 500 && market < 50000) {
//   return '养殖专业户'
// } else if (market < 500 && market > 0) {
//   return '散养户'
//        } else {
//         return '未填写年出栏'
//        }
// } else if (index === 4 || index === 5) { // 蛋鸡/蛋鸭
// if (breeding >= 10000) {
//   return '规模养殖场'
// } else if (breeding >= 2000 && breeding < 10000) {
//    return '养殖专业户'
// } else if (breeding < 2000 && breeding > 0) {
//   return '散养户'
//        } else {
//         return '未填写存栏量'
//        }
// } else if (index === 6) { // 肉牛
// if (market >= 100) {
//   return '规模养殖场'
// } else if (market >= 10 && market < 100) {
//   return '养殖专业户'
// } else if (market < 10 && market > 0) {
//   return '散养户'
//        } else {
//         return '未填写年出栏'
//        }
// } else if (index === 7) { // 羊
// if (market >= 500) {
//   return '规模养殖场'
// } else if (market >= 50 && market < 500) {
//   return '养殖专业户'
// } else if (market < 50 && market > 0) {
//   return '散养户'
//        } else {
//         return '未填写年出栏'
//        }
// } else if (index === 8) { // 兔
// if (breeding >= 3000) {
//   return '规模养殖场'
// } else if (breeding >= 300 && breeding < 3000) {
//   return '养殖专业户'
// } else if (breeding < 300 && breeding > 0) {
// return '散养户'
//      } else {
//       return '未填写存栏量'
//      }
//   } else {
//     return ''// 默认为空，以防undefined
//    }
}

export default breeding
