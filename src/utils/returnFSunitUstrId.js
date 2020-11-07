/**
 *
 * @param {行政树} options
 * @param {所选行政树文字} val
 * 返回行政id
 */
export function returnFSunitUstrId (options, val) {
    console.log(val)
    if (val.length) {
        var Clres = ''
        options.forEach(item => {
            if (item.label === val[0]) {
                Clres = item.key
            } else {
              item.children.forEach(itemCh => {
                if (itemCh.label === val[0]) {
                    Clres = itemCh.key
                } else {
                  itemCh.children.forEach(itemS => {
                    if (itemS.label === val[0]) {
                        Clres = itemS.key
                    }
                  })
                }
              })
            }
          })
          return Clres
    } else {
        return sessionStorage.getItem('FSunitUstrId')
    }
}
/**
 *
 * @param {行政树} options
 * 返回符合本身的行政树信息
 */
export function returnFSunitUstrIdTree (options) {
    console.log(options)
    var FSunitUstrId = sessionStorage.getItem('FSunitUstrId')
    var returnOptions = options
    if (FSunitUstrId.length === 2) {
        return options
    } else if (FSunitUstrId.length === 4) {
       options[0].children.forEach(item => {
           if (item.key === FSunitUstrId) {
            returnOptions[0].children = [item]
           }
       })
    } else if (FSunitUstrId.length === 6) {
        options[0].children.forEach(item => {
            item.children.forEach(itemOne => {
                if (itemOne.key === FSunitUstrId) {
                    returnOptions[0].children = [item]
                    returnOptions[0].children[0].children = [itemOne]
                }
            })
        })
    } else if (FSunitUstrId.length > 6) {
        var FSunitUstrIdsub = FSunitUstrId.substring(0, 6)
        options[0].children.forEach(item => {
            item.children.forEach(itemOne => {
                if (itemOne.key === FSunitUstrIdsub) {
                    returnOptions[0].children = [item]
                    returnOptions[0].children[0].children = [itemOne]
                }
            })
        })
    }
    return returnOptions
}
