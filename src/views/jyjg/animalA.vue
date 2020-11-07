<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" placeholder="请输入货主姓名" v-model="selectWhere"/>
      <a-button class="abutton" type="primary" @click="cx()">查询</a-button>
      <!-- <a-button class="abutton" type="primary">列表定制</a-button> -->
      <!-- <a-button type="primary">导出</a-button> -->
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
        :data-source="data1"
        :scroll="{ x: 2000 }"
        style="margin-top: 5px"
      >
        <template slot="action" slot-scope="text,record">
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
          style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页 {{ this.limit }} 条</span>
      </div>
    </a-card>

    <a-modal v-model="visible" :footer="null">
      <h1 class="infoTop">动物检疫合格证明<span class="s">（动物A）</span></h1>
      <h3 class="hao">NO：{{ infoA.code }}</h3>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="货主" :span="1.5"> {{ infoA.consignee }} </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1.5"> {{ infoA.consTel }} </a-descriptions-item>
        <a-descriptions-item label="动物种类" :span="1.5"> {{ infoA.sort }} </a-descriptions-item>
        <a-descriptions-item label="数量及单位" :span="1.5"> {{ infoA.num }}{{ infoA.unit }} </a-descriptions-item>
        <a-descriptions-item label="起运地点" :span="3"> {{ infoA.dispStart }} </a-descriptions-item>
        <a-descriptions-item label="到达地点" :span="3"> {{ infoA.dispEnd }} </a-descriptions-item>
        <a-descriptions-item label="用途" :span="1"> {{ infoA.purpose }}  </a-descriptions-item>
        <a-descriptions-item label="承运人" :span="1"> {{ infoA.carrier }}  </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1"> {{ infoA.carTel }}  </a-descriptions-item>
        <a-descriptions-item label="运载方式" :span="2"> {{ infoA.tranMode }}  </a-descriptions-item>
        <a-descriptions-item label="运载工具牌号" :span="1"> {{ infoA.tranToolCode }}  </a-descriptions-item>
        <a-descriptions-item label="运载工具消毒情况" :span="3"> 装在前经<u>{{ infoA.tranToolSter }}</u>消毒 </a-descriptions-item>
      </a-descriptions>
      <div class="zhong">
        <h3 class="ben">本批动物经检疫合格，应于<u>{{ infoA.validDate }}</u>日内到达有效</h3>
        <h3 class="er">官方兽医签字：<u>{{ infoA.veterinarySign }}</u></h3>
        <h3 class="er">签发日期：{{ infoA.issuedDate |dateFormat }}</h3>
        <h4 class="z">（动物卫生监督所检疫专用章）</h4>
      </div>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="畜生耳标号" :span="3">{{ infoA.earTagNumber }} </a-descriptions-item>
        <a-descriptions-item label="动物卫生监督检查签章" :span="3"></a-descriptions-item>
        <a-descriptions-item label="备注" :span="3">{{ infoA.remark }}</a-descriptions-item>
      </a-descriptions>

      <div class="foot">
        <h4>1.本证书一式两份，第一联由动物卫生监督所保留，第二联随货同行</h4>
        <h4>2.跨省调运动物到达目的地后，货主或承运人应在24小时内向输入动物卫生监督机构报告。</h4>
        <h4>3.动物卫生鉴定监督机构联系电话：{{ infoA.haPhone }}</h4>
      </div>
      <a-button type="primary" class="dayi">打印</a-button>
    </a-modal>
  </div>
</template>

<script>
import { AnimalA, AnimalAinfo } from '@/api/cdjy'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public'

// eslint-disable-next-line no-unused-vars
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
    title: '签发日期',
    key: 'issuedDate',
    width: 150,
    align: 'center',
    dataIndex: 'issuedDate',
  customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd') : ''
    }
  },
  {
    title: '检疫证编号',
    key: 'code',
    align: 'center',
    dataIndex: 'code',
    width: 180
  },
  {
    title: '货主',
    key: 'consignee',
    align: 'center',
    dataIndex: 'consignee',
    width: 250
  },
  {
    title: '动物种类',
    key: 'sort',
    align: 'center',
    dataIndex: 'sort',
    width: 120
  },
  {
    title: '数量',
    key: 'num',
    align: 'center',
    dataIndex: 'num',
    width: 120
  },
  {
    title: '单位',
    key: 'unit',
    align: 'center',
    dataIndex: 'unit',
    width: 120
  },
  {
    title: '用途',
    key: 'purpose',
    align: 'center',
    dataIndex: 'purpose',
    width: 120
  },
  {
    title: '启运地点',
    key: 'dispStart',
    align: 'center',
    dataIndex: 'dispStart',
    width: 320
  },
  {
    title: '到达地点',
    key: 'dispEnd',
    align: 'center',
    dataIndex: 'dispEnd',
    width: 320
  },
  {
    title: '承运人',
    key: 'carrier',
    align: 'center',
    dataIndex: 'carrier',
    width: 150
  },
  {
    title: '有效到达日',
    key: 'validDate',
    align: 'center',
    dataIndex: 'validDate',
    width: 120
  },

  {
    title: '官方兽医签字',
    key: 'veterinarySign',
    align: 'center',
    dataIndex: 'veterinarySign',
    width: 150
  },
  {
    title: '检疫证状态',
    key: 'isPrint',
    align: 'center',
    dataIndex: 'isPrint',
    width: 120
  },

  {
    title: '网格名称',
    key: 'Gname',
    align: 'center',
    dataIndex: 'Gname',
    width: 150
  },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      isloading: false,
      infoA: {},
      data1: [],
      selectWhere: '',
       // header 里的 userid
      UserId: sessionStorage.getItem('FStId'),
       // 总条数
      total: 0,
      // 单位总数
      DWtotal: 0,
      // 当前页
      yenum: 1,
      // 单位选择当前页数
      offset: 1,
      // 每页条数
      limit: 10,
      // 模糊查询当前页
      findBynameyenum: 1,

      queryParam: { status: 0, status1: 0 },
      visible: false,
      options: [],
      columns1

    }
  },
  created () {
    this.isloading = true
     this.findAll({
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      })
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    cx () {
      this.findAll({
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      }).then(res => {
        console.log(res)
      })
    },
    async findAll (data) {
     const res = await AnimalA(data, this.UserId)
     this.data1 = JSON.parse(res.Data).rows
     this.total = parseInt(JSON.parse(res.Data).total)
     this.isloading = false
    },
   onShowSizeChange (current, pageSize) {
       console.log('1111', current, pageSize)
      const data = {
        limit: pageSize,
        offset: current,
        selectWhere: ''
        }
        yeOffset = pageSize
        this.findAll(data)
        this.limit = pageSize
        yenum = current

        this.totalPage = Math.ceil(this.total / this.limit)
    },
      onChanges (checkedValues) {
        this.selectedRowKeys = []
        console.log(checkedValues)
        yenum = checkedValues

        this.offset = checkedValues
      var p = {
          limit: this.limit,
          offset: this.offset,
          selectWhere: ''
        }
        this.findAll(p)
    },
    showModal (id) {
      AnimalAinfo(id).then(res => {
        this.infoA = res.Data[0]
        console.log(this.infoA)
      }).catch(res => {
        console.log('失败')
      })
      this.visible = true
    }
  }
}
</script>

<style scoped lang="less">
.z {
  margin-left: 70%;
}
.zhong {
  margin: 20px 0;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.foot {
  margin-left: 40px;
  position: relative;
}
.foot:before {
  content: "注：";
  position: absolute;
  top: 0;left: -40px;
}
.er {
  margin-left: 60%;
}
.ben {
  margin-left: 20%;
}
.hao {
  color: red;
  margin-left: 70%;
  display: inline-block;
}
.s {
  margin-left: 10px;
  font-size: 18px;
}

.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
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
  width: 800px !important;
}
/deep/ .a-button {
  margin-right: 40px !important;
}
</style>
