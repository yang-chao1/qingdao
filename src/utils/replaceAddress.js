export default function replaceAddress (address, options) {
    console.log('执行了截取', address, options)
    var returnInfo = []
    if (address !== '') {
        if (options && options !== [] && Array.isArray(options)) {
            options.forEach(item => {
                if (item.label === address) {
                    returnInfo.push(address)
                } else {
                    if (item.children && Array.isArray(item.children)) {
                        item.children.forEach(itemOne => {
                            if ((item.label + itemOne.label) === address) {
                                returnInfo = [item.label, itemOne.label]
                            } else {
                                if (itemOne.children && Array.isArray(itemOne.children)) {
                                    itemOne.children.forEach(itemTwo => {
                                        if ((item.label + itemOne.label + itemTwo.label === address)) {
                                            returnInfo = [item.label, itemOne.label, itemTwo.label]
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
            console.log(returnInfo)
            return returnInfo
        } else {
            return false
        }
    } else {
        return false
    }
}
