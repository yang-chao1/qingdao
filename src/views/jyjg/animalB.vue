<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" placeholder="请输入货主姓名" v-model="selectWhere" />
      <a-button class="abutton" type="primary" @click="cx()">查询</a-button>
      <a-button class="abutton" type="primary" @click="handleEdit()">列表定制</a-button>
      <a-button type="primary" @click="handleEdit()">导出</a-button>
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
        <template slot="action" slot-scope="text, recoped">
          <a slot="action" @click="showModal(recoped.FStId)">查看&nbsp;&nbsp;</a>
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

    <a-modal v-model="visible" :footer="null">
      <h1 class="infoTop">动物检疫合格证明<span class="s">（动物B）</span></h1>
      <h3 class="hao">{{ infoB.code }}</h3>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="货主" :span="1.5"> {{ infoB.consignee }} </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1.5"> {{ infoB.consTel }} </a-descriptions-item>
        <a-descriptions-item label="动物种类" :span="1"> {{ infoB.sort }} </a-descriptions-item>
        <a-descriptions-item label="数量及单位" :span="1"> {{ infoB.num }} &nbsp;&nbsp;{{ infoB.unit }} </a-descriptions-item>
        <a-descriptions-item label="用途" :span="1"> {{ infoB.purpose }} </a-descriptions-item>
        <a-descriptions-item label="启运地点" :span="3"> {{ infoB.dispStart }} </a-descriptions-item>
        <a-descriptions-item label="到达地点" :span="3"> {{ infoB.dispEnd }} </a-descriptions-item>
        <a-descriptions-item label="畜生耳标号" :span="3"> {{ infoB.earTagNumber }} </a-descriptions-item>
      </a-descriptions>
      <div class="zhong">
        <h3 class="ben">本批动物经检疫合格，应于<u>3</u>日内到达有效</h3>
        <h3 class="er">官方兽医签字：<u>{{ infoB.veterinarySign }}</u></h3>
        <h3 class="er">签发日期：{{ infoB.issuedDate | dateFormat }}</h3>
        <h4 class="z">（动物卫生监督所检疫专用章）</h4>
      </div>

      <div class="foot">
        <h4>1.本证书一式两份，第一联由动物卫生监督所保留，第二联随货同行</h4>
        <h4>2.本证书限省境内使用</h4>
        <h4>3.畜生耳标号是需填写后3位，可另赋纸填写，并注明本检疫证明编号，同时加盖动物卫生监督所检疫专用章。</h4>
      </div>
      <a-button type="primary" class="dayi">打印</a-button>
    </a-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-irregular-whitespace
import formatTime from '@/utils/public.js'
import { AnimalB, AnimalBinfo } from '@/api/cdjy'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import smallToBig from '@/utils/numberTocase'
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
     return formatTime(t, 'yyyy-MM-dd')
    }
  },
  {
    title: '检疫证编号',
    key: 'code',
    align: 'center',
    dataIndex: 'code',
    width: 200
  },
  {
    title: '货主',
    key: 'consignee',
    align: 'center',
    dataIndex: 'consignee',
    width: 200
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
    key: 'ren',
    align: 'center',
    dataIndex: 'ren',
    width: 150
  },
  {
    title: '有效到达日',
    key: 'ri',
    align: 'center',
    dataIndex: 'ri',
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
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    return {
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
      visible: false,
      options: [],
      columns1,
      data1: [],
      infoB: {},
      isloading: false
    }
  },
  created () {
    this.isloading = true
    this.findAll()
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
      this.findAll().then(res => {
        this.$message.success('查询成功')
      }).catch(res => {
        this.$message.error('服务器异常')
      })
    },
     onShowSizeChange (current, pageSize) {
       console.log('1111', current, pageSize)

        this.offset = current
        this.limit = pageSize

     this.findAll()
      yenum = current
 yeOffset = pageSize
      this.totalPage = Math.ceil(this.total / this.limit)
    },
      onChanges (checkedValues) {
        this.selectedRowKeys = []
        console.log('checked = ', checkedValues)
        yenum = checkedValues
        var that = this
        that.offset = checkedValues

       this.findAll()
    },
    async findAll () {
     var data = {
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      }
     const res = await AnimalB(data, this.UserId)
     this.total = JSON.parse(res.Data).total
     this.data1 = JSON.parse(res.Data).rows
             this.isloading = false
    },
    async showModal (id) {
      const res = await AnimalBinfo(id)
      console.log(res)
      this.infoB = res.Data[0]
      this.infoB.num = smallToBig(this.infoB.num)
      this.visible = true
    },
    // 列表定制
    handleEdit () {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
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
