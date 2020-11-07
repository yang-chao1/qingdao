export default function Clfunid (options) {
    var FSunitUstrId = sessionStorage.getItem('FSunitUstrId')
    var regInfo = []
    var regName = ''
    var peoInfo = []
    var peoName = ''
    if (FSunitUstrId && FSunitUstrId.length) {
        if (FSunitUstrId.length === 2) {
           regInfo = options[0].children
           regName = options[0].children[0].label
           peoInfo = regInfo[0].children
           peoName = regInfo[0].children[0].label
        } else if (FSunitUstrId.length === 4) {
           options.forEach(item => {
            item.children.forEach(itemOne => {
              if (itemOne.key === FSunitUstrId) {
                 regInfo = [itemOne]
                 regName = itemOne.label
                 peoInfo = regName.children
                 peoName = peoInfo[0].label
              }
            })
          })
        } else if (FSunitUstrId.length === 6) {
           options.forEach(item => {
            item.children.forEach(itemOne => {
              if (itemOne.children) {
                itemOne.children.forEach(itemTwo => {
                  if (itemTwo.key === FSunitUstrId) {
                     regInfo = [itemOne]
                     regName = itemOne.label
                     peoInfo = [itemTwo]
                     peoName = itemTwo.label
                  }
                })
              }
            })
          })
        } else {
          var Clres = FSunitUstrId.substring(0, 6)
          // console.log(Clres, options)
           options.forEach(item => {
            item.children.forEach(itemOne => {
              console.log(itemOne)
              if (itemOne.children) {
                itemOne.children.forEach(itemTwo => {
                  // console.log(itemTwo)
                  if (itemTwo.key === Clres) {
                     regInfo = [itemOne]
                     regName = itemOne.label
                     peoInfo = [itemTwo]
                     peoName = itemTwo.label
                  }
                })
              }
            })
          })
        }
        return { regInfo: regInfo, regName: regName, peoInfo: peoInfo, peoName: peoName }
      } else {
          return false
      }
}
