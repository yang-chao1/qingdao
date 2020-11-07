// 当前最大值为78

const PCArrydata = [
    {
        title: '系统目录',
        key: '0',
        children: [
            {
                key: '1',
                title: '系统管理',
                children: [
                  {
                    key: '2',
                    title: '通知管理'
                  },
                  {
                    key: '3',
                    title: '分类参数'

                  },
                  {
                    key: '4',
                    title: '区划管理'

                  },
                  {
                    key: '5',
                    title: '行政单位管理'

                  },
                  {
                    key: '6',
                    title: '用户管理'

                  },
                  {
                    key: '7',
                    title: '角色管理'

                  },
                  {
                    key: '8',
                    title: '权限管理'

                  },
                  {
                    key: '9',
                    title: '密码修改'

                  },
                  {
                    key: '10',
                    title: '散养户及企业管理权限分配'

                  }
                ]
              },
              {
                key: '11',
                title: '先打后补',
                children: [
                  {
                    key: '12',
                    title: '养殖场强制免疫疫苗申请'

                  },
                  {
                    key: '78',
                    title: '企业统计汇总'
                  },
                  {
                    key: '13',
                    title: '基层动监站审核',

                    children: [
                      {
                        key: '14',
                        title: '待审核'

                      },
                      {
                        key: '15',
                        title: '已审核'

                      }
                    ]
                  },
                  {
                    key: '16',
                    title: '区市畜牧主管部门审核',

                    children: [
                      {
                        key: '17',
                        title: '待审核'

                      },
                      {
                        key: '18',
                        title: '已审核'

                      }
                    ]
                  },
                  {
                    key: '19',
                    title: '市级畜牧主管部门审核',
                    checked: false,

                    children: [
                      {
                        key: '20',
                        title: '待审核'

                      },
                      {
                        key: '21',
                        title: '已审核'

                      }
                    ]
                  }
                ]
              },
              {
                key: '22',
                title: '基础数据',

                children: [
                  {
                    key: '23',
                    title: '养殖场户信息审核',

                    children: [
                      {
                        key: '24',
                        title: '注册信息审核'

                      }
                    ]
                  },
                  {
                    key: '25',
                    title: '养殖场',

                    children: [
                      {
                        key: '26',
                        title: '养殖场户'

                      }
                    ]
                  },
                  {
                    key: '27',
                    title: '屠宰场',

                    children: [
                      {
                        key: '28',
                        title: '畜禽屠宰企业信用档案'

                      }
                    ]
                  },
                  {
                    key: '29',
                    title: '无害化处理厂',

                    children: [
                      {
                        key: '30',
                        title: '无害化处理厂'

                      }
                    ]
                  },
                  {
                    key: '31',
                    title: '协管员'

                  }

                ]
              },
              {
                key: '32',
                title: '无害化处理',

                children: [
                  {
                    key: '33',
                    title: '无害化集中处理任务',

                    children: [
                      {
                        key: '34',
                        title: '无害化处理厂集中任务处理'

                      }
                    ]
                  },
                  {
                    key: '35',
                    title: '无害化申报处理情况',

                    children: [
                      {
                        key: '36',
                        title: '无害化申报记录'

                      }
                    ]
                  }
                ]
              },
              {
                key: '37',
                title: '疫病防控',

                children: [
                  {
                    key: '38',
                    title: '防疫物资',

                    children: [
                      {
                        key: '39',
                        title: '入库登记'

                      },
                      {
                        key: '40',
                        title: '出库登记'

                      },
                      {
                        key: '41',
                        title: '本人畜牧耳标库存'

                      },
                      {
                        key: '42',
                        title: '动物标识回收'

                      }
                    ]
                  },
                  {
                    key: '43',
                    title: '动物防疫'

                    }
                ]
              },
              {
                key: '44',
                title: '屠宰管理',

                children: [
                  {
                    key: '45',
                    title: '入场查验'

                  },
                  {
                    key: '46',
                    title: '瘦肉精检测'

                  },
                  {
                    key: '47',
                    title: '肉品品质合格报告单'

                  }
                ]
              },
              {
                key: '48',
                title: '检疫监管',

                children: [
                  {
                    key: '49',
                    title: '产地检疫（省里数据）',

                    children: [
                      {
                        key: '50',
                        title: '产地检疫申报'
                      },
                      {
                        key: '51',
                        title: '产地检疫工作记录'

                      },
                      {
                        key: '52',
                        title: '检疫出证',

                        children: [
                          {
                            key: '53',
                            title: '动物A出证'

                          },
                          {
                            key: '54',
                            title: '动物B出证'

                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: '55',
                    title: '产地检疫（耳标）',

                    children: [
                      {
                        key: '56',
                        title: '产地检疫申报单'

                      },
                      {
                        key: '57',
                        title: '产地检疫申报单处理'

                      },
                      {
                        key: '58',
                        title: '动物产地检疫工作记录单'

                      },
                      {
                        key: '59',
                        title: '乳用、种用动物检疫工作记录单'

                      },
                      {
                        key: '60',
                        title: '种蛋、胚胎、精液检疫工作记录单'

                      },
                      {
                        key: '61',
                        title: '动物检疫证明（动物A）'

                      },
                      {
                        key: '62',
                        title: '动物检疫证明（动物B）'

                      }
                    ]
                  },
                  {
                    key: '63',
                    title: '屠宰检疫（省里数据）',

                    children: [
                      {
                        key: '64',
                        title: '屠宰检疫申报'
                      },
                      {
                        key: '65',
                        title: '屠宰检疫记录'

                      },
                      {
                        key: '66',
                        title: '检疫出证',

                        children: [
                          {
                            key: '67',
                            title: '产品A出证'

                          },
                          {
                            key: '68',
                            title: '产品B出证'

                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: '69',
                    title: '屠宰检疫（耳标）',

                    children: [
                      {
                        key: '70',
                        title: '屠宰申报点'

                      },
                      // {
                      //   key: 'SQdeclaration',
                      //   title: '屠宰检疫申报单',
                      //   add: 'SQdeclarationadd',
                      //   dele: 'SQdeclarationdele',
                      //   upd: 'SQdeclarationupd',
                      //   sele: 'SQdeclarationsele',
                      //   checked: false
                      // },
                      // {
                      //   key: 'SQdeclarationCl',
                      //   title: '屠宰检疫申报单处理',
                      //   add: 'SQdeclarationCladd',
                      //   dele: 'SQdeclarationCldele',
                      //   upd: 'SQdeclarationClupd',
                      //   sele: 'SQdeclarationClsele',
                      //   checked: false
                      // },
                      {
                        key: '71',
                        title: '急宰通知单'

                      },
                      {
                        key: '72',
                        title: '准宰通知单'

                      },
                      {
                        key: '73',
                        title: '动物检疫证明（产品A）'

                      },
                      {
                        key: '74',
                        title: '动物检疫证明（产品B）'

                      }
                    ]
                  },
                  {
                    key: '75',
                    title: '证章管理',

                    children: [
                      {
                        key: '76',
                        title: '本人库存'

                      },
                      {
                        key: '77',
                        title: '证章入库'

                      }
                    ]
                  }
                ]
              }
        ]
    }

  ]
  export {
    PCArrydata
  }
