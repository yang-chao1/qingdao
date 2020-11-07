// eslint-disable-next-line
import { UserLayout, BasicLayout,HomeLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'dashboard',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    // redirect: '/dashboard',
    children: [

      {
        path: '',
        name: '',
        // component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '', keepAlive: true, icon: bxAnaalyse }
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        // redirect: '/dashboard/workplace',
        hidden: false,
        component: RouteView,
        redirect: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
        meta: { title: '系统管理', keepAlive: true, icon: bxAnaalyse, permission: 'System' },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            // component: RouteView,
            meta: { title: '通知管理', keepAlive: false, permission: 'notice' }
          },
          {
            path: '/dashboard/classifyparameter',
            name: 'Parameter',
            hidden: false,
            component: () => import('@/views/dashboard/classifyparameter'),
            meta: { title: '分类参数', keepAlive: true, permission: 'classify' }
          },
           {
            path: '/dashboard/Monitor',
            name: 'Monitor',
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '区划管理', keepAlive: true, permission: 'Area' }
          },
          {
            path: '/dashboard/administrative',
            name: 'administrative',
            component: () => import('@/views/dashboard/administrative'),
            meta: { title: '行政单位管理', keepAlive: true, permission: 'admin' }
          },
          {
            path: '/dashboard/Usercontrol',
            name: 'Usercontrol',
            component: () => import('@/views/dashboard/Usercontrol'),
            meta: { title: '用户管理', keepAlive: true, permission: 'manage' }
          },
          {
            path: '/dashboard/authority',
            name: 'Authority',
            component: () => import('@/views/dashboard/authority'),
            meta: { title: '角色管理', keepAlive: true, permission: 'role' }
          },
          {
            path: '/dashboard/SuperSU',
            name: 'SuperSU',
            component: () => import('@/views/dashboard/SuperSU'),
            meta: { title: '权限管理', keepAlive: true, permission: 'perm' }
          },
          {
            path: '/dashboard/password',
            name: 'password',
            component: () => import('@/views/dashboard/password'),
            meta: { title: '密码修改', keepAlive: true, permission: 'password' }
          },

         {
           path: '/dashboard/logrecord',
           name: 'logrecord',
           component: () => import('@/views/dashboard/logrecord'),
           meta: { title: '散养户及企业管理权限分配', keepAlive: true, permission: 'scatte' }
         }
          // ,{
          //   path: '/dashboard/workplace',
          //   name: 'Workplace',
          //   component: () => import('@/views/dashboard/Workplace'),
          //   meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
          // }
        ]
      },
      // forms

      {
        path: '/form',
        name: 'form',
        // redirect: '/form/base-form',
        component: RouteView,
        redirect: '/xdhb/yzcqzmyymsq',
        meta: { title: '先打后补', icon: 'form', permission: 'After' },
        children: [
          {
            path: '/xdhb/yzcqzmyymsq',
            name: 'yzcqzmyymsq',
            component: () => import('@/views/xdhb/yzcqzmyymsq/yzcqzmyymsq'),
            meta: { title: '养殖场强制免疫疫苗申请', keepAlive: true, permission: 'first' }
          },
          {
            path: '/xdhb/qytj',
            name: 'qytj',
            component: () => import('@/views/xdhb/qytj/qytj'),
            meta: { title: '企业统计汇总', keepAlive: true, permission: 'After' }
          },
          {
            path: '/xdhb/jcdjzsq',
            name: 'jcdjzsq',
            component: RouteView,
            redirect: '/xdhb/jcdjzsq/daishen',
            meta: { title: '基层动监站审核', keepAlive: true, permission: 'EEtjudge' },
            children: [
              {
                path: '/xdhb/jcdjzsq/daishen',
                name: 'jcdaishen',
                component: () => import('@/views/xdhb/jcdjzsq/jcdaishen'),
                meta: { title: '待审核', keepAlive: true, permission: 'BasicToaudit' }
              },
              {
                path: '/xdhb/jcdjzsq/yishen',
                name: 'jcyishen',
                component: () => import('@/views/xdhb/jcdjzsq/jcyishen'),
                meta: { title: '已审核', keepAlive: true, permission: 'Audited' }
              }
            ]
          },
          {
            path: '/xdhb/qsxmzgbmsh',
            name: 'qsxmzgbmsh',
            meta: { title: '区市畜牧主管部门审核', keepAlive: true, permission: 'Districtcity' },
            component: RouteView,
            children: [
              {
                path: '/xdhb/qsxmzgbmsh/daishen',
                name: 'qsdaishen',
                component: () => import('@/views/xdhb/qsxmzgbmsh/qsdaishen'),
                meta: { title: '待审核', keepAlive: true, permission: 'zoneaudit' }
              },
              {
                path: '/xdhb/qsxmzgbmsh/yishen',
                name: 'qsyishen',
                component: () => import('@/views/xdhb/qsxmzgbmsh/qsyishen'),
                meta: { title: '已审核', keepAlive: true, permission: 'zoneked' }
              }
            ]
          },
          {
            path: '/xdhb/sjxmzgbmsh',
            name: 'sjxmzgbmsh',
            meta: { title: '市级畜牧主管部门审核', keepAlive: true, permission: 'SHcity' },
            component: RouteView,
            redirect: '/xdhb/sjxmzgbmsh/sjxmzgbmsh',
            children: [{
              path: '/xdhb/sjxmzgbmsh/sjxmzgbmsh',
                name: 'sjxmzgbmshs',
                component: () => import('@/views/xdhb/sjxmzgbmsh/sjxmzgbmsh'),
                meta: { title: '待审核', keepAlive: true, permission: 'municudit' }
            }, {
              path: '/xdhb/qsxmzgbmsh/sjxmyishen',
              name: 'sjxmyishen',
              component: () => import('@/views/xdhb/sjxmzgbmsh/sjxmyishen'),
              meta: { title: '已审核', keepAlive: true, permission: 'munked' }
            }
            ]

          }
        ]
      },
      // table
      {
        path: '/jcsj',
        name: 'jcsj',
        component: RouteView,
        redirect: '/jcsj/zcsh',
        meta: { title: '基础数据', icon: 'slack', permission: 'Basicdata' },
        children: [
          {
            path: '/jcsj/zcsh',
            name: 'zcsh',
            component: RouteView,
            redirect: '/jcsj/zcsh/yzchxxsh',
            meta: { title: '注册信息审核', icon: 'slack', permission: 'HEfield' },
            children: [
              {
                path: '/jcsj/zcsh/yzchxxsh',
                name: 'yzchxxsh',
                component: () => import('@/views/jcsj/zcsh/yzchxxsh'),
                meta: { title: '养殖场户信息审核', icon: 'slack', permission: 'register' }
              }
            ]
          },
          {
            path: '/jcsj/yzc',
            name: 'yzc',
            component: RouteView,
            redirect: '/jcsj/yzc/Zcqcxxda',
            meta: { title: '养殖场', icon: 'slack', permission: 'HEchang' },
            children: [
              {
                path: '/jcsj/yzc/Zcqcxxda',
                name: 'zcqcxyda',
                component: () => import('@/views/jcsj/yzc/Zcqcxxda'),
                meta: { title: '养殖场户', icon: 'slack', permission: 'farmer' }
              }
            ]
          },
          {
            path: '/jcsj/tzc',
            name: 'tzc',
            component: RouteView,
            redirect: '/jcsj/tzc/xqtzqyxyda',
            meta: { title: '屠宰场', icon: 'slack', permission: 'TZchang' },
            children: [
              {
                path: '/jcsj/tzc/xqtzqyxyda',
                name: 'xqtzqyxyda',
                component: () => import('@/views/jcsj/tzc/xqtzqyxyda'),
                meta: { title: '畜禽屠宰企业信用档案', icon: 'slack', permission: 'slaughter' }
              }
            ]
          },
          {
            path: '/jcsj/whhclc',
            name: 'Whhclc',
            component: RouteView,
            redirect: '/jcsj/Whhclc/whhclc',
            meta: { title: '无害化处理厂', icon: 'slack', permission: 'HarmlessAll' },
            children: [
              {
                path: '/jcsj/Whhclc/whhclc',
                name: 'whhclc',
                component: () => import('@/views/jcsj/Whhclc/whhclc'),
                meta: { title: '无害化处理厂', icon: 'slack', permission: 'harmless' }
              }
            ]
          },
          {
            path: '/jcsj/assistant',
            name: 'assistant',
            component: () => import('@/views/jcsj/xgy/assistant'),
            meta: { title: '协管员', icon: 'slack', permission: 'assistantAll' }
          }
        ]
      },
      // 无害化处理
      {
        path: '/whhcl',
        name: 'whhcl',
        component: RouteView,
        redirect: '/whhcl/clrw',
        meta: { title: '无害化处理', icon: 'profile', permission: 'disposal' },
        children: [
          // {
          //   path: '/whhcl/whhclcgl',
          //   name: 'whhclcgl',
          //   component: RouteView,
          //   redirect: '/whhcl/whhclcgl/cgl',
          //   meta: { title: '无害化处理厂管理', permission: [ 'profile' ] },
          //   children: [
          //     {
          //       path: '/whhcl/whhclcgl/cgl',
          //       name: 'cgl',
          //       component: () => import('@/views/whhcl/whhclcgl/cgl'),
          //       meta: { title: '无害化处理厂管理', permission: [ 'profile' ] }
          //     }
          //   ]
          // },
          {
            path: '/whhcl/clrw',
            name: 'clrw',
            component: RouteView,
            redirect: '/whhcl/clrw/rwfp',
            meta: { title: '无害化集中处理任务', permission: 'HarmlessCP' },
            children: [
              {
                path: '/whhcl/clrw/rwfp',
                name: 'rwfp',
                component: () => import('@/views/whhcl/clrw/rwfp'),
                meta: { title: '无害化处理厂集中任务处理', permission: 'conce' }
              }
            ]
          },
          {
            path: '/whhcl/clqk',
            name: 'clqk',
            component: RouteView,
            redirect: '/whhcl/clqk/sbjl',
            meta: { title: '无害化申报处理情况', permission: 'EREiCondition' },
            children: [
              {
                path: '/whhcl/clqk/sbjl',
                name: 'sbjl',
                component: () => import('@/views/whhcl/clqk/sbjl'),
                meta: { title: '无害化申报记录', permission: 'declare' }
              }
              // {
              //   path: '/whhcl/clqk/sbjindu',
              //   name: 'sbjindu',
              //   component: () => import('@/views/whhcl/clqk/sbjindu'),
              //   meta: { title: '无害化申报处理详细进度', permission: [ 'profile' ] }
              // }
              // {
              //   path: '/whhcl/clqk/sbcl',
              //   name: 'sbcl',
              //   component: () => import('@/views/whhcl/clqk/sbcl'),
              //   meta: { title: '无害化申报处理', permission: [ 'profile' ] }
              // },
              // {
              //   path: '/whhcl/clqk/rygl',
              //   name: 'rygl',
              //   component: () => import('@/views/whhcl/clqk/rygl'),
              //   meta: { title: '收集人员管理', permission: [ 'profile' ] }
              // },
              // {
              //   path: '/whhcl/clqk/ditcl',
              //   name: 'ditcl',
              //   component: () => import('@/views/whhcl/clqk/ditcl'),
              //   meta: { title: '病死动物无害化处理', permission: [ 'profile' ] }
              // },
              // {
              //   path: '/whhcl/clqk/zcsyqr',
              //   name: 'zcsyqr',
              //   component: () => import('@/views/whhcl/clqk/zcsyqr'),
              //   meta: { title: '场兽医确认', permission: [ 'profile' ] }
              // }
            ]
          }
        ]
      },
      // 防疫物资
      {
        path: '/jbfk',
        name: 'jbfk',
        component: RouteView,
        redirect: '/jbfk/fywz',
        meta: { title: '疫病防控', icon: 'profile', permission: 'DPAControl' },
        children: [
          {
            path: '/jbfk/fywz',
            name: 'fywz',
            component: RouteView,
            redirect: '/jbfk/fywz/WarehousingDj',
            meta: { title: '防疫物资', permission: 'EPSupplies' },
            children: [
              {
                path: '/jbfk/fywz/WarehousingDj',
                name: 'WarehousingDj',
                component: () => import('@/views/jbfk/fywz/WarehousingDj'),
                meta: { title: '入库登记', permission: 'WRegistration' }
              },
              {
                path: '/jbfk/fywz/OutboundDj',
                name: 'OutboundDj',
                component: () => import('@/views/jbfk/fywz/OutboundDj'),
                meta: { title: '出库登记', permission: 'ORegistration' }
              },
              {
                path: '/jbfk/fywz/EartagInventory',
                name: 'EartagInventory',
                component: () => import('@/views/jbfk/fywz/EartagInventory'),
                meta: { title: '本人畜牧耳标库存', permission: 'ISLETags' }
              },
              {
                path: '/jbfk/fywz/AnimalBshs',
                name: 'AnimalBshs',
                component: () => import('@/views/jbfk/fywz/AnimalBshs'),
                meta: { title: '动物标识回收', permission: 'AIRecycling' }
              }
            ]
          },
          {
            path: '/jbfk/dwfy',
            name: 'dwfy',
            component: () => import('@/views/jbfk/ybfk/dwfy'),
            meta: { title: '动物防疫', permission: 'Animalprevention' }
            // children: [
            //   {
            //     path: '/jbfk/ybfk/dwfy',
            //     name: 'dwfy',
            //     component: () => import('@/views/jbfk/ybfk/dwfy'),
            //     meta: { title: '动物防疫', permission: 'WRegistration' }
            //   }
            // ]
          }
        ]
      },
      // 屠宰管理
      {
        path: '/tzgl',
        name: 'tzgl',
        component: RouteView,
        meta: { title: '屠宰管理', icon: 'profile', permission: 'SManagement' },
        children: [
          {
            path: '/tzgl/EntranceCheck',
            name: 'EntranceCheck',
            component: () => import('@/views/tzgl/EntranceCheck'),
            meta: { title: '入场查验', keepAlive: true, permission: 'TEExamination' }
          }, {
            path: '/tzgl/ClenbuteroJC',
            name: 'ClenbuteroJC',
            component: () => import('@/views/tzgl/ClenbuteroJC'),
            meta: { title: '瘦肉精检测', keepAlive: true, permission: 'CTesting' }
          }, {
            path: '/tzgl/MeatReport',
            name: 'MeatReport',
            component: () => import('@/views/tzgl/MeatReport'),
            meta: { title: '肉品品质合格报告单', keepAlive: true, permission: 'MQQReporte' }
          }
        ]
        },
      {
        path: '/jyjg',
        name: 'jyjg',
        component: RouteView,
        redirect: '/jyjg/cdjy',
        meta: { title: '检疫监管', icon: 'slack', permission: 'QSupervisionk' },
        children: [
           {
            path: '/jyjg/cdjy',
            name: 'cdjy',
            component: RouteView,
            redirect: '/jyjg/cdjycb',
            meta: { title: '产地检疫（省里数据）', icon: 'slack', permission: 'OQProvincek' },
            children: [
              {
                path: '/jyjg/cdjycb',
                name: 'cdjycb',
                component: () => import('@/views/jyjg/quarantine'),
                meta: { title: '产地检疫申报', permission: 'EOQDeclaration' }
              }, {
                path: '/jyjg/cdjygzjl',
                name: 'cdjygzjl',
                component: () => import('@/views/jyjg/record.vue'),
                meta: { title: '产地检疫工作记录', permission: 'OQWorkrecord' }
              },
              {
                path: '/jyjg/jycz',
                name: 'jycz',
                component: RouteView,
                redirect: '/jyjg/jycza',
                meta: { title: '检疫出证', permission: 'QuarantineHis' },
                children: [
                  {
                    path: '/jyjg/jycza',
                    name: 'jycza',
                    component: () => import('@/views/jyjg/animalA.vue'),
                    meta: { title: '动物A出证', permission: 'AnimalhiskA' }
                  },
                  {
                    path: '/jyjg/jyczb',
                    name: 'jyczb',
                    component: () => import('@/views/jyjg/animalB.vue'),
                    meta: { title: '动物B出证', permission: 'AnimalhiskB' }
                  }
                ]
              }
            ]
           },
           {
            path: '/jyjg/cder',
            name: 'cder',
            component: RouteView,
            redirect: '/jyjg/cderbd',
            meta: { title: '产地检疫（耳标）', icon: 'slack', permission: 'EOQuarantineeartag' },
            children: [
              {
                path: '/jyjg/cderbd',
               name: 'cderbd',
               component: () => import('@/views/jyjg/cderbd.vue'),
               meta: { title: '产地检疫申报单', permission: 'OQDeclarationforme' }
              },
              {
                path: '/jyjg/cderbdcl',
               name: 'cderbdcl',
               component: () => import('@/views/jyjg/cderbdcl.vue'),
               meta: { title: '产地检疫申报单处理', permission: 'OQDFProcessing' }
              },
              {
                path: '/jyjg/dwcdjy',
               name: 'dwcdjy',
               component: () => import('@/views/jyjg/dwjy/dwcdjy.vue'),
               meta: { title: '动物产地检疫工作记录单', permission: 'QWRSheetEofAOrigin' }
              },
              {
                path: '/jyjg/lzjy',
               name: 'lzjy',
               component: () => import('@/views/jyjg/dwjy/lzjy.vue'),
               meta: { title: '乳用、种用动物检疫工作记录单', permission: 'QWRSEforMandS' }
              },
              {
                path: '/jyjg/zdgz',
               name: 'zdgz',
               component: () => import('@/views/jyjg/dwjy/zdgz.vue'),
               meta: { title: '种蛋、胚胎、精液检疫工作记录单', permission: 'QRofeggSandsemena' }
              },
              {
                path: '/jyjg/dwjyA',
               name: 'dwjyA',
               component: () => import('@/views/jyjg/dwjy/dwjyA.vue'),
               meta: { title: '动物检疫证明（动物A）', permission: 'AQCAanimals' }
              },
              {
                path: '/jyjg/dwjyB',
               name: 'dwjyB',
               component: () => import('@/views/jyjg/dwjy/dwjyB.vue'),
               meta: { title: '动物检疫证明（动物B）', permission: 'AQCBanimals' }
              }

            ]
           },

           { path: '/jyjg/tzjy',
           name: 'tzjy',
           component: RouteView,
           redirect: '/jyjg/tzjycb',
           meta: { title: '屠宰检疫（省里数据）', icon: 'slack', permission: 'SQTheprovincedatae' },
          children: [

             {
               path: '/jyjg/tzjycb',
               name: 'tzjycb',
               component: () => import('@/views/jyjg/tuzai.vue'),
               meta: { title: '屠宰检疫申报', permission: 'TSQDeclarationbligh' }
             },
             {
              path: '/jyjg/tzjyjl',
              name: 'tzjyjl',
              component: () => import('@/views/jyjg/tuzaijl.vue'),
              meta: { title: '屠宰检疫记录', permission: 'SQuarantinerecordsK' }
            },
            {
              path: '/jyjg/tzjycz',
              name: 'tzjycz',
              component: RouteView,
             redirect: '/jyjg/tzjyczA',
              meta: { title: '检疫出证', permission: 'Quarantinehise' },
            children: [
              {
                path: '/jyjg/tzjyczA',
                name: 'tzjyczA',
                component: () => import('@/views/jyjg/tuzaiA.vue'),
                meta: { title: '产品A出证', permission: 'ProductAtoe' }
              },
              {
                path: '/jyjg/tzjyczB',
                name: 'tzjyczB',
                component: () => import('@/views/jyjg/tuzaiB.vue'),
                meta: { title: '产品B出证', permission: 'ProductBtoe' }
              }
            ]
            }

          ]
          },
          {
            path: '/jyjg/tzjyEartag',
            name: 'tzjyEartag',
            component: RouteView,
            // redirect: '/jyjg/tzjyEartag',
            meta: { title: '屠宰检疫（耳标）', icon: 'slack', permission: 'SQEartage' },
            children: [
              {
                path: '/jyjg/tzjyEartag/tzsbd',
                name: 'tzsbd',
                component: () => import('@/views/jyjg/tzjyEartag/tzsbd'),
                meta: { title: '屠宰申报点', permission: 'DPointeturate' }
              },
              // {
              //   path: '/jyjg/tzjyEartag/tzjysb',
              //   name: 'tzjysb',
              //   component: () => import('@/views/jyjg/tzjyEartag/tzjysb'),
              //   meta: { title: '屠宰检疫申报单', permission: 'SQdeclaration' }
              // },
              // {
              //   path: '/jyjg/tzjyEartag/tzjysbdcl',
              //   name: 'tzjysbdcl',
              //   component: () => import('@/views/jyjg/tzjyEartag/tzjysbdcl'),
              //   meta: { title: '屠宰检疫申报单处理', permission: 'SQdeclarationCl' }
              // },
               {
                path: '/jyjg/tzjyEartag/jztzd',
                name: 'jztzd',
                component: () => import('@/views/jyjg/tzjyEartag/jztzd'),
                meta: { title: '急宰通知单', permission: 'UNESlaughter' }
              }, {
                path: '/jyjg/tzjyEartag/zztzd',
                name: 'zztzd',
                component: () => import('@/views/jyjg/tzjyEartag/zztzd'),
                meta: { title: '准宰通知单', permission: 'MNESlaughter' }
              }, {
                path: '/jyjg/tzjyEartag/AnimaJyzmA',
                name: 'AnimaJyzmA',
                component: () => import('@/views/jyjg/tzjyEartag/AnimaJyzmA'),
                meta: { title: '动物检疫证明（产品A）', permission: 'AQCProductA' }
              }, {
                path: '/jyjg/tzjyEartag/AnimaJyzmB',
                name: 'AnimaJyzmB',
                component: () => import('@/views/jyjg/tzjyEartag/AnimaJyzmB'),
                meta: { title: '动物检疫证明（产品B）', permission: 'AQCProductB' }
              }
            ]
          },
          // 检疫监管-证章管理
          {
            path: '/jyjg/BadgeGl',
            name: 'BadgeGl',
            component: RouteView,
            // redirect: '/jyjg/BadgeGl',
            meta: { title: '证章管理', icon: 'slack', permission: 'BManagement' },
            children: [
              {
                path: '/jyjg/BadgeGl/MyInventory',
                name: 'MyInventory',
                component: () => import('@/views/jyjg/BadgeGl/MyInventory'),
                meta: { title: '本人库存', permission: 'IStocke' }
              }, {
                path: '/jyjg/BadgeGl/Badgeswarehousing',
                name: 'Badgeswarehousing',
                component: () => import('@/views/jyjg/BadgeGl/BadgesWarehousing'),
                meta: { title: '证章入库', permission: 'BWarehousinge' }
              }
            ]
          }
        ]
      },
      // 外部链接
          {
            path: 'http://qdxmsupervision.qingdao.gov.cn:8181/QDPT/LoginPage.aspx',
            name: 'Erbiao',
            meta: { title: '耳标号', target: '_blank' }
         }

      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '兽药饲料', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '疫病防控', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: '畜产品安全', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '屠宰管理', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '无害化处理', icon: 'user', keepAlive: true, permission: [ 'user' ] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         }
      //       ]
      //     }
      //   ]
      // }

    ]
  },

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
{
  path: '/home',
  component: HomeLayout,
  redirect: '/myhome',
  hidden: true,
  children: [ {
    path: '/myhome',
    name: 'myhome',
    component: () => import('@/views/home.vue'),
    meta: { title: 'home' }
  }]
},
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [

       {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
       {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
