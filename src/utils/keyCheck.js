export default function getKey (options, val) {
    var resKey = ''
    options.forEach(item => {
        if (item.label === val) {
            resKey = item.key
        } else {
            if (item.children) {
                item.children.forEach(items => {
                    if (items.label === val) {
                        resKey = items.key
                    } else {
                        if (items.children) {
                            items.children.forEach(itemt => {
                                if (itemt.label === val) {
                                    resKey = itemt.key
                                }
                        })
                        }
                    }
                  })
            }
        }
      })
      return resKey
}
