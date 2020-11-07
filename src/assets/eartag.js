//        0104 崂山区 7 370212
//        0105 城阳区 6 370214
//        0106 黄岛区 5 370211
//        0108 即墨市 1 370282
//        0109 胶州市 2 370281
//        0110 平度市 3 370283
//        0111 莱西市 4 370285

export function eartag (Fsunitustrid) {
if (Fsunitustrid != null) {
    if (Fsunitustrid.startsWith('0104')) {
      const shengshi = '370212'
        return shengshi
    } else if (Fsunitustrid.startsWith('0105')) {
      const shengshi = '370214'
        return shengshi
    } else if (Fsunitustrid.startsWith('0106')) {
      const shengshi = '370211'
        return shengshi
    } else if (Fsunitustrid.startsWith('0108')) {
      const shengshi = '370282'
        return shengshi
    } else if (Fsunitustrid.startsWith('0109')) {
      const shengshi = '370281'
        return shengshi
    } else if (Fsunitustrid.startsWith('0110')) {
      const shengshi = '370283'
        return shengshi
    } else if (Fsunitustrid.startsWith('0111')) {
      const shengshi = '370285'
        return shengshi
    } else {
      const shengshi = '370200'
        return shengshi
    }
 }
}

export function leixin (DWZL) {
  if (DWZL != null) {
    if (DWZL.indexOf('猪') !== -1) {
      const type = '1'
        return type
    } else if (DWZL.indexOf('牛') !== -1) {
      const type = '2'
        return type
    } else if (DWZL.indexOf('羊') !== -1) {
      const type = '3'
        return type
    } else {
      const type = '1'
        return type
    }
  }
}
