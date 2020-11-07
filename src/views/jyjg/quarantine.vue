<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" v-model="selectWhere" placeholder="请输入申报单位（人）" />
      <a-button class="abutton" type="primary" @click="cx">查询</a-button>
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
      <a-table :loading="isloading" :pagination="false" :columns="columns1" :data-source="data1" style="margin-top: 5px">
        <template slot="action" slot-scope="text, record">
          <a slot="action" @click="showModal(record.FStId)">查看&nbsp;&nbsp;</a>
        </template>
      </a-table>
      <div>
        <a-pagination
          size="small"
          :total="total"
          :default-current="offset"
          show-size-changer
          show-quick-jumper
          style="margin: 10px"
          :current="offset"
          @change="onChanges"
          @showSizeChange="onShowSizeChange"
        />
        <span
          style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页 {{ this.limit }} 条</span>
      </div>
    </a-card>

    <a-modal
      class="amodal"
      v-model="visible"
      :footer="null"
    >
      <!-- title="产地检疫申报详情" -->
      <a-descriptions :column="2" title="产地检疫申报信息" bordered>
        <a-descriptions-item label="申报单编号">
          {{ info.code }}
        </a-descriptions-item>
        <a-descriptions-item label="申报时间">
          {{ info.inspDateTime }}
        </a-descriptions-item>
        <a-descriptions-item label="申报单位">
          {{ info.consignee }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ info.telephone }}
        </a-descriptions-item>
        <a-descriptions-item label="动物种类">
          {{ info.sort }}
        </a-descriptions-item>
        <a-descriptions-item label="申报数量、单位">
          {{ info.num }}  {{ info.unit }}
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

import http from '@/utils/httpapi'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public'
// eslint-disable-next-line no-unused-vars
var yenum = 1
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
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
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
  {
    title: '申报数量(头/只)',
    key: 'num',
    align: 'center',
    dataIndex: 'num',
    width: 80
  },
  {
    title: '操作',
    key: 'cz',
    align: 'center',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]
// eslint-disable-next-line no-unused-vars

export default {
  data () {
    return {
      selectWhere: '',
       // header 里的 userid
      UserId: sessionStorage.getItem('FStId'),
      // 数据
      data1: [],
      // 页码
      limit: 10,
      // 当前页
      offset: 1,
      // 总条数
      total: 1,
      isloading: false,
      totalNum: 1,
      // 总页数
      totalPage: 1,
      visible: false,
      options: [
      ],
      columns1,
      info: {

      }
    }
  },
  created () {
      this.isloading = true
      this.quarAll({ offset: this.offset, limit: this.limit, selectWhere: this.selectWhere })
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
    // var p = {
    //   offset: this.offset,
    //   limit: this.limit,
    //   consignee: this.consignee,
    //   UserId: this.UserId
    // }
    // 列表数据查询
    // getQuarantineDeclarationCPGet(p).then(res => {
    //   console.log(res)
    // }).catch(rol => {
    //   console.log(rol)
    // })
  },
  methods: {
     async cx () {
      const data = {
         offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      }
      console.log(data)
    await this.quarAll(data)
    },
    async quarAll (data) {
      const res = await this.$axios.get(
      `${http}/Material/OriginQuarantine?offset=${data.offset}&limit=${data.limit}&consignee=${data.selectWhere}`
      , {
          headers: {

            UserId: this.UserId
          }
        })
      this.data1 = JSON.parse((res.data.Data)).rows

      this.total = parseInt(JSON.parse(res.data.Data).total)
      this.isloading = false
    },
      onShowSizeChange (current, pageSize) {
       console.log('1111', current, pageSize)
       const data = {
        limit: pageSize,
        offset: current,
        selectWhere: ''
        }

        this.quarAll(data)
        this.limit = pageSize
        yenum = current
        this.offset = current
        this.totalPage = Math.ceil(this.total / this.limit)
    },
      onChanges (checkedValues) {
        this.selectedRowKeys = []

        yenum = checkedValues
        var that = this
        that.offset = checkedValues

        var p = {
          limit: that.limit,
          offset: that.offset,
          selectWhere: ''
        }
        this.quarAll(p)
    },

    async showModal (id) {
        const res = await this.$axios.get(
      `${http}/Material/OriginQuarantineCK?FStId=${id}`
      , {
          headers: {
            UserId: this.UserId
          }
        })
        this.info = res.data.Data[0]
        this.info.inspDateTime = formatTime(this.info.inspDateTime, 'yyyy-MM-dd hh:mm:ss')
        this.info.leavelTime = formatTime(this.info.leavelTime, 'yyyy-MM-dd hh:mm:ss')
        this.info.declDate = formatTime(this.info.declDate, 'yyyy-MM-dd hh:mm:ss')
      this.visible = true
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
