export function getXiang (xiang) {
  if (xiang.indexOf('/') !== -1) {
   const arr = xiang.split('/')
   const s = arr.length
   const x = arr[s - 1]
   return x
  } else {
    return xiang
  }
}

export function getadree (addree) {
 var arr = []
  const arr1 = addree.split('/')
      arr1.forEach(item => {
        arr.push(item)
      })
    return arr
}
