export function getAddreeCondition (arr, label1, options) {
  console.log(label1)
  var rr = ''
  options[0].children.forEach((item, index) => {
    if (item.label === label1) {
      rr = rr + ';' + arr[1] + ':' + label1
    } else {
      item.children.forEach((item, index) => {
        if (item.label === label1) {
          rr = rr + ';' + arr[2] + ':' + label1
        }
      })
    }
  })

  return rr
}
