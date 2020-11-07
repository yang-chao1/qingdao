<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" placeholder="" />
      <a-button class="abutton" type="primary">查询</a-button>
      <a-button type="primary">导出</a-button>
      <a-row>
        <a-col :span="12" :offset="6">
          <a-tree-select
            style="width: 25%; position: relative; left: 100%; top: 0"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select>
        </a-col>
      </a-row>
      <a-table :pagination="false" :columns="columns1" :data-source="listInfo" style="margin-top: 5px">
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
          @showSizeChange="onShowSizeChange"
        />
        <span
          style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
        >当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span>
      </div>
    </a-card>

    <a-modal
      class="amodal"
      v-model="visible"
      title="产地检疫申报详情"
      :footer="null"
    >
      <a-descriptions :column="2" title="产地检疫申报信息" bordered>
        <a-descriptions-item label="申报单编号">
          {{ info.code }}
        </a-descriptions-item>
        <a-descriptions-item label="申报时间">
          {{ info.inspDateTime }}
        </a-descriptions-item>
        <a-descriptions-item label="申报单位(人)">
          {{ info.consignee }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ info.telephone }}
        </a-descriptions-item>
        <a-descriptions-item label="动物种类">
          {{ info.sort }}
        </a-descriptions-item>
        <a-descriptions-item label="申报数量、单位">
          {{ info.num }}{{ info.unit }}
        </a-descriptions-item>
        <a-descriptions-item label="来源">
          {{ info.source }}
        </a-descriptions-item>
        <a-descriptions-item label="用途">
          {{ info.purpose }}
        </a-descriptions-item>
        <a-descriptions-item label="启运地点">
          {{ info.leaveLocal }}
        </a-descriptions-item>
        <a-descriptions-item label="启运时间">
          {{ info.leavelTime }}
        </a-descriptions-item>
        <a-descriptions-item label="到达地点">
          {{ info.arrivalLocal }}
        </a-descriptions-item>
        <a-descriptions-item label="报检人签字">
          {{ info.inspUserSign }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2" title="申报处理结果" bordered>
        <a-descriptions-item label="状态">
          {{ info.status }}
        </a-descriptions-item>
        <a-descriptions-item label="不受理原因">
          {{ info.reason }}
        </a-descriptions-item>
        <a-descriptions-item label="经办人">
          {{ info.operatorer }}
        </a-descriptions-item>
        <a-descriptions-item label="受理时间">
          {{ info.declDate }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getQuarantineDeclarationCPGet, getQuarantineDeclarationCPCK } from '@/api/tzjysl/tzjysb'
import { formatTime } from '@/utils/public'
var yenum = 1
var yeOffset = 10
const columns1 = [
  {
    title: '序号',
    width: 80,
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
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    dataIndex: 'status'
  },
  //  {
  //   title: '申报时间',
  //   key: 'sbTime',
  //   align: 'center',
  //   dataIndex: 'sbTime',
  //   width: 80
  // },
  //  {
  //   title: '申报单位(人)',
  //   key: 'ren',
  //   align: 'center',
  //   dataIndex: 'ren',
  //   width: 80
  // },
  //  {
  //   title: '联系电话',
  //   key: 'phone',
  //   align: 'center',
  //   dataIndex: 'phone',
  //   width: 80
  // },
  //  {
  //   title: '动物种类',
  //   key: 'animal',
  //   align: 'center',
  //   dataIndex: 'animal',
  //   width: 80
  // },
  //  {
  //   title: '用途',
  //   key: 'yontu',
  //   align: 'center',
  //   dataIndex: 'yontu',
  //   width: 80
  // },
   {
    title: '申报数量(头/只)',
    key: 'num',
    align: 'center',
    dataIndex: 'num',
    width: 80
  },
  // {
  //   title: '起运地点',
  //   key: 'qin',
  //   align: 'center',
  //   dataIndex: 'num',
  //   width: 80
  // },
  // {
  //   title: '到达地点',
  //   key: 'daoAdree',
  //   align: 'center',
  //   dataIndex: 'daoAdree',
  //   width: 80
  // },

  {
    title: '操作',
    key: 'cz',
    align: 'center',
    width: 80,
     fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    return {
      yenum,
      yeOffset,
      limit: 10,
      offset: 1,
      total: 0,
      totalPage: 1,
      UserId: sessionStorage.getItem('FStId'),
      // 模糊查询
      consignee: '',
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
      listInfo: [],
      info: {}
    }
  },
  created () {
    yenum = 1
    yeOffset = 10
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
     this.getQuarantineDeclarationCPGetList()
  },
  methods: {
    // 列表数据查询
    getQuarantineDeclarationCPGetList () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        consignee: this.consignee
      }
      getQuarantineDeclarationCPGet(p).then(res => {
        console.log(res)
        if (res.Result) {
          var Clres = JSON.parse(res.Data)
          this.listInfo = Clres.rows
          this.total = Clres.total
          this.totalPage = Math.ceil(this.total / this.limit)
        }
      }).catch(rol => {
        console.log(rol)
      })
    },

    showModal (val) {
      this.visible = true
      getQuarantineDeclarationCPCK(val.FStId).then(res => {
        console.log(res)
        if (res.Result) {
          this.info = res.Data[0]
          this.info.declDate = formatTime(this.info.declDate, 'YYYY-MM-DD HH:mm:ss')
        }
      }).catch(rol => {
        console.log(rol)
      })
    },
    // 页码改变
    changePage (current, pageSize) {
      //  current 改变后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      yenum = current

      this.getQuarantineDeclarationCPGetList()
    },
    // 每页数量改变
    onShowSizeChange (current, pageSize) {
      // console.log(current, pageSize)
       this.limit = pageSize
      yenum = current
      yeOffset = pageSize

      this.getQuarantineDeclarationCPGetList()
    }
  }
}
</script>

<style scoped lang="less">
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

/deep/ .ant-modal {
  width: 900px !important;
}
</style>
