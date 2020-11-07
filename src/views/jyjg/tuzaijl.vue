<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" placeholder="" />
      <a-button class="abutton" type="primary">查询</a-button>
      <a-button class="abutton" type="primary">定制</a-button>
      <a-button type="primary">导出</a-button>
      <!-- <a-row>
        <a-col :span="12" :offset="6">
           <a-tree-select
              style="width: 25%;position: relative;left: 100%; top: 0;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
               :tree-data="options"
            >
            </a-tree-select>
        </a-col>
      </a-row> -->
      <a-table
        :loading="isloading"
        :pagination="false"
        :columns="columns1"
        :data-source="listInfo"
        :scroll="{ x: 2000 }"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="record">
          <a slot="action" @click="showModal(record)">查看&nbsp;&nbsp;</a>
        </template>
      </a-table>
      <div>
        <a-pagination
          size="small"
          :total="total"
          show-size-changer
          show-quick-jumper
          style="margin: 10px"
          :current="offset"
          @change="changePage"
          @showSizeChange="onShowSizeChange" />
        <span
          style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
        >当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span
        >
      </div>
    </a-card>
    <a-modal class="amodal" v-model="visible" :footer="null">
      <div id="printNew">
        <div class="infoTop">屠宰检疫工作情况日记录表</div>
        <table class="tablePrint" border>
          <tbody>
            <tr>
              <td class="tdTitle" rowspan="4">
                基本情况
              </td>
              <td class="tdTitle">
                检疫日期
              </td>
              <td>
                {{ oneItemInfo.quarantinetime }}
              </td>
              <td class="tdTitle">
                监督所名称
              </td>
              <td>
                {{ oneItemInfo.supervisename }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                记录单号
              </td>
              <td>
                {{ oneItemInfo.recordNO }}
              </td>
              <td class="tdTitle" style="width: 120px">
                屠宰场名称
              </td>
              <td>
                {{ oneItemInfo.butchername }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                屠宰动物种类
              </td>
              <td>
                {{ oneItemInfo.butchersort }}
              </td>
              <td class="tdTitle">
                申报人
              </td>
              <td>
                {{ oneItemInfo.shippername }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                产地
              </td>
              <td>
                {{ oneItemInfo.quarantineaddress }}
              </td>
              <td class="tdTitle">
                入场数量
              </td>
              <td>
                {{ oneItemInfo.animalnum }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle" rowspan="2">
                入场监督查验
              </td>
              <td class="tdTitle">
                临床情况是否良好
              </td>
              <td>
                {{ oneItemInfo.isclinic }}
              </td>
              <td class="tdTitle">
                是否佩戴畜禽标识
              </td>
              <td>
                {{ oneItemInfo.islogo }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                回收动物检疫合格证明编号
              </td>
              <td colspan="3">
                {{ oneItemInfo.recyclehkznum }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle" rowspan="2">
                宰前检查
              </td>
              <td class="tdTitle">
                宰前检查合格数
              </td>
              <td>
                {{ oneItemInfo.ischecknum }}
              </td>
              <td class="tdTitle">
                宰前检查不合格数
              </td>
              <td>
                {{ oneItemInfo.nochecknum }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                宰前无害化处理
              </td>
              <td colspan="4">
                {{ oneItemInfo.ZQharmlesstreatment }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle" rowspan="5">
                同步检疫
              </td>
              <td class="tdTitle">
                同步检疫合格数
              </td>
              <td>
                {{ oneItemInfo.quarantinenum }}
              </td>
              <td class="tdTitle">
                动物合格证明编号
              </td>
              <td>
                {{ oneItemInfo.issuehkznum }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                不合格并处理数
              </td>
              <td>
                {{ oneItemInfo.nonum }}
              </td>
              <td class="tdTitle">
                同步检疫无害化处理
              </td>
              <td>
                {{ oneItemInfo.jyharmlesstreatment }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                兽医姓名
              </td>
              <td>
                {{ oneItemInfo.veterinarianname }}
              </td>
              <td class="tdTitle">
                总计
              </td>
              <td>
                {{ oneItemInfo.total }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                出具《检疫处理通知单》编号
              </td>
              <td>
                {{ oneItemInfo.requisitionnum }}
              </td>
              <td class="tdTitle">
                登记时间
              </td>
              <td>
                {{ oneItemInfo.addDate }}
              </td>
            </tr>
            <tr>
              <td class="tdTitle">
                备注
              </td>
              <td colspan="4">
                {{ oneItemInfo.remark }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a-button v-print="'#printNew'">打印</a-button>
    </a-modal>
  </div>
</template>

<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getButcherQuarantineGet, getButcherQuarantineGetCK } from '@/api/tzjysl/tzjyjl'
import { formatTime } from '@/utils/public'

var yenum = 1
var yeOffset = 10
const columns1 = [
  {
    title: '序号',
    width: 40,
    key: 'FStId',
    align: 'center',
    dataIndex: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * yeOffset + 1
      }
    }
  },
  {
    title: '屠宰场名称',
    key: 'butchername',
    width: 80,
    align: 'center',
    dataIndex: 'butchername'
  },

  {
    title: '申报人',
    key: 'shippername',
    align: 'center',
    dataIndex: 'shippername',
    width: 80
  },
  {
    title: '屠宰动物种类',
    key: 'butchersort',
    align: 'center',
    dataIndex: 'butchersort',
    width: 80
  },
  {
    title: '产地',
    key: 'quarantineaddress',
    align: 'center',
    dataIndex: 'quarantineaddress',
    width: 80
  },
  {
    title: '入场数量',
    key: 'animalnum',
    align: 'center',
    dataIndex: 'animalnum',
    width: 80
  },
  {
    title: '同步检疫合格数',
    key: 'quarantinenum',
    align: 'center',
    dataIndex: 'quarantinenum',
    width: 80
  },
  {
    title: '监督所名称',
    key: 'supervisename',
    align: 'center',
    dataIndex: 'supervisename',
    width: 80
  },
  {
    title: '兽医签字',
    key: 'veterinarianname',
    align: 'center',
    dataIndex: 'veterinarianname',
    width: 80
  },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    return {
     printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      yenum,
      yeOffset,
      limit: 10,
      offset: 1,
      total: 0,
      totalPage: 1,
      UserId: sessionStorage.getItem('FStId'),
      // 模糊查询
      butchername: '',
      visible: false,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      columns1,
      // 列表数据
      listInfo: [],
      // 单项查看数据
      oneItemInfo: [],
      isloading: false
    }
  },
  created () {
    this.isloading = true
    yenum = 1
    yeOffset = 10
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch(err => {
        console.log(err)
      })
    var p = {
      limit: this.limit,
      offset: this.offset,
      UserId: this.UserId,
      butchername: this.butchername
    }
    getButcherQuarantineGet(p)
      .then(res => {
        this.isloading = false
        console.log(res)
        var Clres = JSON.parse(res.Data)
        console.log(Clres)
        this.listInfo = Clres.rows
        this.total = Clres.total
        this.totalPage = Math.ceil(this.total / this.limit)
      })
      .catch(rol => {
        console.log(rol)
      })
    // this.checkapply()
  },
  methods: {
    getButcherQuarantineGetlist (p) {
      getButcherQuarantineGet(p)
      .then(res => {
        console.log(res)
        var Clres = JSON.parse(res.Data)
        console.log(Clres)
        this.listInfo = Clres.rows
      })
      .catch(rol => {
        console.log(rol)
      })
    },
    showModal (val) {
      this.visible = true
      console.log(val)
      getButcherQuarantineGetCK(val.FStId)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.oneItemInfo = res.Data[0]
            // 检疫日期
            this.oneItemInfo.quarantinetime = formatTime(this.oneItemInfo.quarantinetime, 'YYYY-MM-DD HH:mm:ss')
            // 登录日期
            this.oneItemInfo.addDate = formatTime(this.oneItemInfo.addDate, 'YYYY-MM-DD HH:mm:ss')
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 页码改变
    changePage (current, pageSize) {
      //  current 改变后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      yenum = current
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        butchername: this.butchername
      }
      this.getButcherQuarantineGetlist(p)
    },
    // 每页数量改变
    onShowSizeChange (current, pageSize) {
      // console.log(current, pageSize)
       this.limit = pageSize
      yenum = current
      yeOffset = pageSize
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        butchername: this.butchername
      }
      this.getButcherQuarantineGetlist(p)
    },
    //   打印报表
    printBB () {
      console.log('执行了打印')
      this.$print(this.$refs.printObj)
    }
  }
}
</script>

<style scoped lang="less">
@media print {
  #printNew {
    td{
      height: 65px;
    }
  }
}
.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.tablePrint {
  width: 900px;
  padding: 10px;
  margin-left: 15px;
  border: 1px solid #000;
  border-collapse: collapse;
}
.tablePrint td {
  padding: 0 0 0 12px;
  border: 1px solid #000;
  height: 28px;
  line-height: 28px;
}
.tdTitle {
  font-family: 黑体;
  text-align: center;
  background: #f1eded;
}

.card {
  margin-top: 30px;
}

.ainput {
  width: 400px;
  margin-right: 20px;
}

.abutton {
  margin-right: 30px;
}

.da {
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
}
/deep/ .ant-modal {
  width: 1000px !important;
}
/deep/ .a-button {
  margin-right: 40px !important;
}
</style>
