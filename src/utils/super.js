export default function superInfo (v, key, PCArrydata, selectedRow) {
    var outInfo = []
    var inInfo = []
    var zinInfo = []
    var siInfo = []
    let add = ''
    var selectedRowKeys = []
    // console.log(selectedRow)
    if (selectedRow) {
        selectedRowKeys = [...selectedRow]
    }

    if (key === 'add') {
        add = 'add'
    } else if (key === 'upd') {
        add = 'upd'
    } else if (key === 'dele') {
        add = 'dele'
    } else if (key === 'sele') {
        add = 'sele'
    }
    // console.log(add)
    PCArrydata.forEach(item => {
      outInfo.push(item[add])
      if (item.children) {
        item.children.forEach(items => {
          inInfo.push(items[add])
          if (items.children) {
            items.children.forEach(itemt => {
              zinInfo.push(itemt[add])
              if (itemt.children) {
                itemt.children.forEach(itemSz => {
                  siInfo.push(itemSz[add])
                })
              }
            })
          }
        })
      }
    })
    // console.log(siInfo)
    // 选择的是最外层
    if (selectedRowKeys.indexOf(v[add]) === -1) {
      if (outInfo.indexOf(v[add]) !== -1) {
        selectedRowKeys.push(v[add])
        PCArrydata.forEach(item => {
          if (item[add] === v[add]) {
            if (item.children) {
              item.children.forEach(items => {
                if (selectedRowKeys.indexOf(items[add]) === -1) {
                  selectedRowKeys.push(items[add])
                }
                if (items.children) {
                  items.children.forEach(itemt => {
                    if (selectedRowKeys.indexOf(itemt) === -1) {
                      selectedRowKeys.push(itemt[add])
                    }
                    if (itemt.children) {
                      itemt.children.forEach(itemSi => {
                        if (selectedRowKeys.indexOf(itemSi) === -1) {
                          selectedRowKeys.push(itemSi[add])
                        }
                      })
                    }
                  })
                }
              })
            } else {
              if (selectedRowKeys.indexOf(item[add]) === -1) {
                selectedRowKeys.push(item[add])
              }
            }
          }
        })
      } else if (inInfo.indexOf(v[add]) !== -1) {
        // 第二层
        PCArrydata.forEach(item => {
          if (item.children) {
            item.children.forEach(items => {
              if (items[add] === v[add]) {
                if (selectedRowKeys.indexOf(items[add]) === -1) {
                  selectedRowKeys.push(items[add])
                }
                if (selectedRowKeys.indexOf(item[add]) === -1) {
                  selectedRowKeys.push(item[add])
                }
                if (items.children) {
                  items.children.forEach(itemt => {
                    if (selectedRowKeys.indexOf(itemt[add]) === -1) {
                      selectedRowKeys.push(itemt[add])
                    }
                    if (itemt.children) {
                      itemt.children.forEach(itemSi => {
                        if (selectedRowKeys.indexOf(itemSi) === -1) {
                          selectedRowKeys.push(itemSi[add])
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      } else if (zinInfo.indexOf(v[add]) !== -1) {
        // 第三层
        PCArrydata.forEach(item => {
          if (item.children) {
            item.children.forEach(items => {
              if (items.children) {
                items.children.forEach(itemt => {
                  if (itemt[add] === v[add]) {
                    if (selectedRowKeys.indexOf(itemt[add]) === -1) {
                      selectedRowKeys.push(itemt[add])
                      if (itemt.children) {
                        itemt.children.forEach(itemSi => {
                          if (selectedRowKeys.indexOf(itemSi) === -1) {
                            selectedRowKeys.push(itemSi[add])
                          }
                        })
                      }
                    }
                    if (selectedRowKeys.indexOf(item[add]) === -1) {
                      selectedRowKeys.push(item[add])
                    }
                    if (selectedRowKeys.indexOf(items[add]) === -1) {
                      selectedRowKeys.push(items[add])
                    }
                  }
                })
              }
            })
          }
        })
      } else if (siInfo.indexOf(v[add]) !== -1) {
        // 第四层
        PCArrydata.forEach(item => {
          if (item.children) {
            item.children.forEach(items => {
              if (items.children) {
                items.children.forEach(itemt => {
                  if (itemt.children) {
                    itemt.children.forEach(itemSi => {
                      if (itemSi[add] === v[add]) {
                        if (selectedRowKeys.indexOf(item[add]) === -1) {
                          selectedRowKeys.push(item[add])
                        }
                        if (selectedRowKeys.indexOf(items[add]) === -1) {
                          selectedRowKeys.push(items[add])
                        }
                        if (selectedRowKeys.indexOf(itemt[add]) === -1) {
                          selectedRowKeys.push(itemt[add])
                        }
                        selectedRowKeys.push(itemSi[add])
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    } else {
      if (outInfo.indexOf(v[add]) !== -1) {
        // 取消选择最外层
        if (selectedRowKeys.indexOf(v[add]) !== -1) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(v[add]), 1)
        }
        PCArrydata.forEach(item => {
          if (item[add] === v[add]) {
            if (item.children) {
              item.children.forEach(items => {
                if (selectedRowKeys.indexOf(items[add]) !== -1) {
                  selectedRowKeys.splice(selectedRowKeys.indexOf(items[add]), 1)
                  if (items.children) {
                    items.children.forEach(itemt => {
                      if (selectedRowKeys.indexOf(itemt[add]) !== -1) {
                        selectedRowKeys.splice(selectedRowKeys.indexOf(itemt[add]), 1)
                      }
                      if (itemt.children) {
                        itemt.children.forEach(itemSi => {
                          if (selectedRowKeys.indexOf(itemSi[add]) !== -1) {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(itemSi[add]), 1)
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        })
      } else if (inInfo.indexOf(v[add]) !== -1) {
        // 取消选择第二层
        if (selectedRowKeys.indexOf(v[add]) !== -1) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(v[add]), 1)
        }
        PCArrydata.forEach(item => {
          if (item.children) {
            item.children.forEach(items => {
              if (items[add] === v[add]) {
                if (selectedRowKeys.indexOf(items[add]) !== -1) {
                  selectedRowKeys.splice(selectedRowKeys.indexOf(items[add]), 1)
                }
                if (items.children) {
                  items.children.forEach(itemt => {
                    if (selectedRowKeys.indexOf(itemt[add]) !== -1) {
                      selectedRowKeys.splice(selectedRowKeys.indexOf(itemt[add]), 1)
                    }
                    if (itemt.children) {
                      itemt.children.forEach(itemSi => {
                        if (selectedRowKeys.indexOf(itemSi[add]) !== -1) {
                          selectedRowKeys.splice(selectedRowKeys.indexOf(itemSi[add]), 1)
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      } else if (zinInfo.indexOf(v[add]) !== -1) {
        if (selectedRowKeys.indexOf(v[add]) !== -1) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(v[add]), 1)
        }
        PCArrydata.forEach(item => {
          if (item.children) {
            item.children.forEach(items => {
              if (items.children) {
                items.children.forEach(itemt => {
                  if (itemt[add] === v[add]) {
                    if (selectedRowKeys.indexOf(itemt[add]) !== -1) {
                      selectedRowKeys.splice(selectedRowKeys.indexOf(itemt[add]))
                    }
                    // console.log(itemt)
                    if (itemt.children) {
                      // console.log('执行了')
                      itemt.children.forEach(itemSi => {
                        if (selectedRowKeys.indexOf(itemSi[add]) !== -1) {
                          selectedRowKeys.splice(selectedRowKeys.indexOf(itemSi[add]), 1)
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      } else if (siInfo.indexOf(v[add]) !== -1) {
        if (selectedRowKeys.indexOf(v[add]) !== -1) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(v[add]), 1)
        }
      }
    }
    return selectedRowKeys
  }
