<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-row>
        <a-col :span="2"><span class="zi">货主姓名</span> </a-col>
        <a-col :span="8">
          <a-input size="large" v-model="selectwhere"/>
        </a-col>
        <a-col :span="2" :offset="2">
          <a-button type="primary" @click="cx">查询</a-button>
        </a-col>
        <a-col :span="2">
          <a-button type="primary">导出</a-button>
        </a-col>
      </a-row>

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
      <a-table
        :loading="isloading"
        :pagination="false"
        :columns="columns1"
        :data-source="data1"
        :scroll="{ x: 2000 }"
        style="margin-top: 5px"
      >

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
      title="动物产地检疫工作记录单"
      :footer="null"
    >
      <a-descriptions :column="4" title="产地检疫申报信息" bordered>
        <a-descriptions-item label="记录单编号" :span="4">
          {{ info.recordNo }}
        </a-descriptions-item>
        <a-descriptions-item label="监督所名称" :span="4">
          {{ info.declarationtime }}
        </a-descriptions-item>
        <a-descriptions-item label="基本情况" :span="4">
          <a-descriptions :column="3" bordered>
            <a-descriptions-item label="报检时间" :span="1.5"> {{ info.inspectiontime }} </a-descriptions-item>
            <a-descriptions-item label="检疫时间" :span="1.5"> {{ info.quarantinetime }} </a-descriptions-item>
            <a-descriptions-item label="货主姓名"> {{ info.shippername }} </a-descriptions-item>
            <a-descriptions-item label="联系电话"> {{ info.teltphone }} </a-descriptions-item>
            <a-descriptions-item label="身份证号码"> {{ info.idcardnum }} </a-descriptions-item>
            <a-descriptions-item label="养殖场名称" :span="2"> {{ info.farmsnme }} </a-descriptions-item>
            <a-descriptions-item label="检疫地点" :span="1"> {{ info.quarantineaddress }} </a-descriptions-item>
            <a-descriptions-item label="动物种类" :span="1.5"> {{ info.animalsort }} </a-descriptions-item>
            <a-descriptions-item label="用途" :span="1.5"> {{ info.myuse }} </a-descriptions-item>
            <a-descriptions-item label="动物来源" :span="3"> {{ info.animalsources	}} </a-descriptions-item>
            <a-descriptions-item label="驯养繁殖许可证号" :span="1.5"> {{ info.domesticatedid }} </a-descriptions-item>
            <a-descriptions-item label="捕捉许可证号" :span="1.5"> {{ info.catchid }} </a-descriptions-item>
            <a-descriptions-item label="数量"> {{ info.animalnum }} </a-descriptions-item>
            <a-descriptions-item label="启运地点" :span="3"> {{ info.startaddress }} </a-descriptions-item>
            <a-descriptions-item label="到达地点" :span="3"> {{ info.getaddress }} </a-descriptions-item>
          </a-descriptions>
        </a-descriptions-item>
        <a-descriptions-item label="查验材料与疫情调查" :span="4">
          <a-descriptions :column="3" bordered>
            <a-descriptions-item label="是否强制免疫"> {{ info.qzmy }} </a-descriptions-item>
            <a-descriptions-item label="养殖档案是否归档"> {{ info.recordrule }} </a-descriptions-item>
            <a-descriptions-item label="畜禽标识是否符合规定"> {{ info.logorule }} </a-descriptions-item>
            <a-descriptions-item label="养殖场疫情"> {{ info.outbreak }} </a-descriptions-item>
            <a-descriptions-item label="是否疫区"> {{ info.eridemicarea }} </a-descriptions-item>
            <a-descriptions-item label="其他"> {{ info.other }} </a-descriptions-item>
          </a-descriptions>
        </a-descriptions-item>

        <a-descriptions-item label="临床检测" :span="4"> {{ info.clinical }} </a-descriptions-item>
        <a-descriptions-item label="实验室检查" :span="2"> {{ info.laboratory }} </a-descriptions-item>
        <a-descriptions-item label="检测情况" :span="2"> {{ info.situation }} </a-descriptions-item>

        <a-descriptions-item label="检疫结果处理" :span="4">
          <a-descriptions :column="3" bordered>
            <a-descriptions-item label="是否符合检疫规定" :span="1.5"> {{ info.quarantinerule }} </a-descriptions-item>
            <a-descriptions-item label="动物检疫合格证明编号" :span="1.5"> {{ info.code }} </a-descriptions-item>

            <a-descriptions-item label="检疫不合格" :span="3">
              <a-descriptions bordered :column="2">
                <a-descriptions-item label="一般处理" :span="1"> {{ info.general }} </a-descriptions-item>
                <a-descriptions-item label="无害化处理" :span="1"> {{ info.harmless }} </a-descriptions-item>
                <a-descriptions-item label="无害化处理数量" :span="1"> {{ info.harmlesnum }} </a-descriptions-item>
                <a-descriptions-item label="是否法定检疫对象" :span="1"> {{ info.legal }} </a-descriptions-item>
                <a-descriptions-item label="法定检疫对象数量" :span="1"> {{ info.legalnum }} </a-descriptions-item>
                <a-descriptions-item label="其他对象数量" :span="1"> {{ info.otherNum }} </a-descriptions-item>
                <a-descriptions-item label="检疫处理通知单编号" :span="2"> {{ info.jyclcard }} </a-descriptions-item>
              </a-descriptions>
            </a-descriptions-item>
          </a-descriptions>
        </a-descriptions-item>

        <a-descriptions-item label="兽医签字" :span="1"> {{ info.vetname }} </a-descriptions-item>
        <a-descriptions-item label="合格数量" :span="1"> {{ info.qualifiedNum }} </a-descriptions-item>
        <a-descriptions-item label="备注" :span="2"> {{ info.remark }} </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { OriginGet, OriginGetCK } from '@/api/cdjy'
// import http from '@/utils/httpapi'
import { getAdminAddress } from '@/api/AdministrativeAddress'
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
    title: '检疫结果',
    key: 'situation',
    width: 80,
    align: 'center',
    dataIndex: 'situation'
  },
  {
    title: '检疫时间',
    key: 'quarantinetime',
    align: 'center',
    dataIndex: 'quarantinetime',
    width: 80
  },
  {
    title: '货主姓名',
    key: 'shippername',
    align: 'center',
    dataIndex: 'shippername',
    width: 80
  },
  {
    title: '动物种类',
    key: 'animalsort',
    align: 'center',
    dataIndex: 'animalsort',
    width: 80
  },
  {
    title: '用途',
    key: 'myuse',
    align: 'center',
    dataIndex: 'myuse',
    width: 80
  },
  {
    title: '法人联系电话',
    key: 'teltphone',
    align: 'center',
    dataIndex: 'teltphone',
    width: 80
  },
  {
    title: '养殖场名称',
    key: 'farmsnme',
    align: 'center',
    dataIndex: 'farmsnme',
    width: 80
  },
  {
    title: '检疫地点',
    key: 'quarantineaddress',
    align: 'center',
    dataIndex: 'quarantineaddress',
    width: 80
  },
  {
    title: '启运地点',
    key: 'startaddress',
    align: 'center',
    dataIndex: 'startaddress',
    width: 80
  },
  {
    title: '到达地点',
    key: 'getaddress',
    align: 'center',
    dataIndex: 'getaddress',
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

      totalNum: 1,
      // 总页数
      totalPage: 1,
      visible: false,
      selectwhere: '',
      options: [

      ],
      columns1,
      info: {},
      isloading: false
    }
  },
  created () {
    this.isloading = true
    this.getAll({ offset: this.offset, limit: this.limit, shippername: this.selectwhere }, this.UserId)
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.isloading = false
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    async cx () {
      const data = {
         offset: this.offset,
        limit: this.limit,
        shippername: this.selectwhere
      }
    await this.getAll(data, this.UserId)
    },
    async getAll (data, id) {
      const res = await OriginGet(data, id)
     const List1 = JSON.parse(res.Data)
     this.total = parseInt(List1.total)
     this.data1 = List1.rows
    },
    onShowSizeChange (current, pageSize) {
       const data = {
        offset: pageSize,
        limit: current,
        shippername: this.selectwhere
      }
     this.getAll(data, this.UserId)
    },
      onChanges (checkedValues) {
        this.selectedRowKeys = []

         yenum = checkedValues
        var that = this
        that.offset = checkedValues

        var p = {
          limit: that.limit,
          offset: that.offset,
           shippername: this.selectwhere
        }
        console.log(this.UserId)
       this.getAll(p, this.UserId)
    },
    async showModal (id) {
     const res = await OriginGetCK(id, this.UserId)
     this.info = res.Data[0]
     console.log(this.info)
      this.visible = true
    }
  }
}
</script>

<style scoped lang="less">
.zi {
  font-size: 14px;
 font-weight: bold;
  line-height: 36px;
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
/deep/ .ant-modal {
  width: 1200px !important;
}
</style>
