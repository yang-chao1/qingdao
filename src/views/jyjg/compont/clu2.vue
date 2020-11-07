// 自定义弹窗[公用]
<template>
  <div>
    <div>
      <a-row>
        <a-col :span="7" v-if="haveType">
          <span>类型：</span>
          <a-select
            style="width:200px;margin-left:1%"
            @select="searchByType"
            :default-value="typeDatas[0].id">
            <a-select-option v-for="(item, index) in typeDatas" :key="index" :value="item.id">
              {{ item.label }}
            </a-select-option>
            <!-- <a-select-option value="养殖场">养殖场</a-select-option>
            <a-select-option value="种畜禽场">种畜禽场</a-select-option>
            <a-select-option value="散养户">散养户</a-select-option> -->
          </a-select>
        </a-col>
        <a-col :span="12">
          <span>关键字：</span>
          <a-input
            :placeholder="keyword"
            v-model="selectWhere"
            style="width:220px;margin-left:1%"
          />
          <a-button
            @click="cx"
            type="primary"
            style="position: absolute; margin-left:3%;">
            搜索
          </a-button>
        </a-col>
      </a-row>
    </div>

    <!-- <slot></slot>
    <a-input size="large" v-model="selectWhere" class="ainput" placeholder="default size" />
    <a-button class="abutton" @click="cx" type="primary">查询</a-button>

    <a-row>
      <a-col :span="12" :offset="6">

      </a-col>
    </a-row> -->
    <a-table
      :pagination="false"
      :scroll="{ x:1200 }"
      :columns="columns1"
      :data-source="shu"
      style="margin-top: 5px"
    >
      <template slot="xun" slot-scope="text, record,index">
        <span slot="xun"> {{ (offset-1)*limit+parseInt(index)+1 }}</span>

      </template>
      <template slot="action" slot-scope="text, record">
        <a slot="action" @click="qu(record)">选择&nbsp;&nbsp;</a>
      </template>
    </a-table>
    <div>
      <a-pagination
        v-model="current"
        :page-size-options="pageSizeOptions"
        :total="totalnum"
        show-size-changer
        :page-size="pageSize"
        @showSizeChange="onShowSizeChange"
        @change="onChanges"
      />
      <span
        style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
      >当前第 {{ this.offset }}/{{ Math.ceil(this.totalnum / this.limit) }} 页 共 {{ this.totalnum }} 条记录 每页 {{ this.pageSize }}
        条</span>
    </div>

  </div>
</template>

<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  props: {

    keyword: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    dis: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    shu: {
      type: Array
    },
    // eslint-disable-next-line vue/require-default-prop
    columns1: {
      type: Array
    },
    // eslint-disable-next-line vue/require-default-prop
    totalnum: {
      type: Number
    },
    haveType: {// 是否有类型
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    typeDatas: {
      type: Array
    }
  },
  data () {
    return {
      dist: '',
      selectWhere: '',
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,
      yenum: 1, // 当前页
      offset: 1, // 当前选择页数
      limit: 10, // 每页条数
      options: [],
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      xingzheng: false,
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],

      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',

      form: {
        name: '',
        phone: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rowSelection,
      visible: false,
      updatevisible: false,
      showvisible: false,

      info: {
        bianhao: 'sdfy12123',
        declarationtime: '2020-01-03',
        Applicant: '单位i',
        phoneNum: '12345323',
        animal: '动物种类',
        numApplicant: 30,
        yuan: '来源',
        userTu: 'userTu',
        di: 'dsfkjk',
        shiji: '2020-02-03',
        didian: 'dfd',
        name: '张三',
        ztai: '不受理',
        yuany: 'jesdfds',
        jbr: '李氏',
        slsj: '2015-10-11'
      }
    }
  },
  created () {
    // 行政树
    getAdminAddress()
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach((item) => {
          this.FeQD = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
            })
          })
        })
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch((rol) => {
        console.log(rol)
      })
  },
  methods: {
    searchByType (obj) {
       this.$emit('tiao', { offset: this.offset, limit: this.limit, selectWhere: this.selectWhere, Type: obj })
    },
    qu (data) {
      this.selectWhere = ''
      this.$emit('child-event1', data)
    },
    updateModal () {
      this.updatevisible = true
    },
    addModal () {
      this.visible = true
    },
    showModal () {
      this.showvisible = true
    },
    cx () {
      this.$emit('tiao', { offset: 1, limit: 10, selectWhere: this.selectWhere })
    },
     onChanges (current, pageSize) {
       this.offset = current
       this.limit = pageSize
       console.log(this.dist)
       this.$emit('tiao', { offset: current, limit: pageSize, selectWhere: this.selectWhere, dist: this.dis })
     },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
      this.limit = pageSize
      this.offset = current
      this.$emit('tiao', { offset: current, limit: pageSize, selectWhere: this.selectWhere })
    },
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF = false
      } else {
        this.peoTF = false
        setTimeout(() => {
          this.peoTF = true
          this.regName = this.regInfo[val].label
          this.peoName = '请选择'
          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label

        console.log(this.regName, this.peoName)
      }
    }
  }
}
</script>

<style scoped lang="less">
.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.z {
  margin-left: 70%;
}
.foot1 {
  margin-left: 40px;
  position: relative;
}
.foot1:before {
  content: "注：";
  position: absolute;
  top: 0;left: -40px;
}
.er {
  margin-left: 60%;
}

.zhong {
  margin: 20px 0;
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

.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
.zb {
  margin-left: 55%;
}
.foot {
  letter-spacing:2px
}
.maintop {
  font-size: 20px;
  margin-left: 50%;
  margin-bottom: 10px;
  display: inline-block;
  transform: translateX(-50%);
}

.test {
  display: inline-block;
  width: 700px;
  letter-spacing: 2px;
  margin-left: 50%;
  transform: translateX(-50%);
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
  width: 900px !important;
}
</style>
